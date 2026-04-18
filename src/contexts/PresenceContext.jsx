/**
 * PresenceContext — tracks who is actively using the portal.
 *
 * Two modes (chosen at runtime):
 *
 *  LIVE MODE  (SHAREPOINT_READY=true && user is authenticated)
 *  ─────────────────────────────────────────────────────────────
 *  • Calls PresenceService to write/read the "JIL Active Sessions" list.
 *  • Works across any device, browser, or location.
 *  • Heartbeat + poll every 60 seconds.
 *  • On login: creates a row keyed by SessionId (stable per browser tab).
 *  • On logout / unload: marks the row IsActive=false.
 *
 *  FALLBACK MODE  (SharePoint not configured or call failed)
 *  ─────────────────────────────────────────────────────────────
 *  • Uses localStorage + BroadcastChannel (same browser only).
 *  • Behaviour identical to the original implementation.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useMsal } from "@azure/msal-react";
import { PresenceService } from "../services/presenceService";
import { SHAREPOINT_CONFIG } from "../../azure-app-registration/sharepointConfig";
import { AZURE_CREDENTIALS, graphRequest } from "../../azure-app-registration/azureConfig";
import { msalInstance } from "../../azure-app-registration/msalInstance";

/* ── Config ─────────────────────────────────────────────────────────── */
const SHAREPOINT_READY = SHAREPOINT_CONFIG.siteId !== "REPLACE_WITH_SITE_ID";

/* ── Timings ─────────────────────────────────────────────────────────── */
const HEARTBEAT_MS     = 60_000;   // write heartbeat every 60 s
const ONLINE_THRESHOLD = 90_000;   // < 90 s  → "Online" (localStorage mode)
const AWAY_THRESHOLD   = 300_000;  // < 5 min → "Away"   (localStorage mode)

/* ── localStorage keys (fallback mode) ──────────────────────────────── */
const STORAGE_KEY  = "jil_portal_presence";
const CHANNEL_NAME = "jil_presence";

/* ── Helpers ─────────────────────────────────────────────────────────── */
export function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function detectDevice() {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone/i.test(ua)) return "Mobile";
  if (/iPad|Tablet/i.test(ua))          return "Tablet";
  return "Desktop";
}

/** Stable per browser-tab; survives page refresh, clears on tab close */
function getOrCreateSessionId() {
  let id = sessionStorage.getItem("jil_session_id");
  if (!id) {
    id = crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("jil_session_id", id);
  }
  return id;
}

/* ── localStorage helpers (fallback) ────────────────────────────────── */
function readStore() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}"); }
  catch { return {}; }
}
function writeStore(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}
function localStatus(lastSeen) {
  const age = Date.now() - lastSeen;
  if (age < ONLINE_THRESHOLD) return "online";
  if (age < AWAY_THRESHOLD)   return "away";
  return "offline";
}

/* ── Context ─────────────────────────────────────────────────────────── */
const PresenceContext = createContext({
  onlineUsers:    [],
  currentUserId:  null,
  isLivePresence: false,
  presenceError:  null,
  adminConsentUrl: null,
});

export function PresenceProvider({ children }) {
  const { accounts } = useMsal();
  const account = accounts[0] ?? null;

  /* Stable session ID — initialised before state so lazy initialiser can use it */
  const sessionIdRef  = useRef(getOrCreateSessionId());
  /* Ref holds the Graph list item ID for heartbeat / leave */
  const listItemIdRef = useRef(null);

  /* Whether to use the Graph-based presence (cross-device) */
  const useGraphPresence = SHAREPOINT_READY && !!account;

  /* Admin consent URL — shown in UI when Graph calls return 403 */
  const adminConsentUrl = (() => {
    const { tenantId, clientId, redirectUri } = AZURE_CREDENTIALS;
    return `https://login.microsoftonline.com/${tenantId}/adminconsent?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  })();

  /**
   * Build a self-entry object immediately from MSAL account data.
   * No API call required — used to seed the list before the first GraphQL response.
   */
  function buildSelfEntry() {
    if (!account) return null;
    return {
      id:         sessionIdRef.current,
      name:       account.name ?? account.username,
      email:      account.username,
      initials:   getInitials(account.name ?? account.username),
      status:     "online",
      lastSeenMs: 0,
      device:     detectDevice(),
    };
  }

  /* Seed the list with the current user immediately — widget is visible on first render */
  const [onlineUsers,    setOnlineUsers]    = useState(() => {
    const self = buildSelfEntry();
    return self ? [self] : [];
  });
  const [isLivePresence, setIsLivePresence] = useState(false);
  const [presenceError,  setPresenceError]  = useState(null); // null | "consent" | "error"

  /* ── FALLBACK (localStorage) callbacks ──────────────────────────────
     Defined BEFORE graphJoin so graphJoin can call localHeartbeat()
     as a fallback when SharePoint is unreachable.
  ─────────────────────────────────────────────────────────────────── */

  const localRefresh = useCallback(() => {
    const data = readStore();
    const now  = Date.now();
    setOnlineUsers(
      Object.values(data)
        .map(u => ({
          ...u,
          status:     localStatus(u.lastSeen),
          lastSeenMs: now - u.lastSeen,
          initials:   getInitials(u.name),
        }))
        .filter(u => u.status !== "offline")
        .sort((a, b) => a.lastSeenMs - b.lastSeenMs)
    );
  }, []);

  const localHeartbeat = useCallback(() => {
    if (!account) return;
    const data = readStore();
    data[account.localAccountId] = {
      id:       account.localAccountId,
      name:     account.name ?? account.username,
      email:    account.username,
      initials: getInitials(account.name ?? account.username),
      lastSeen: Date.now(),
    };
    writeStore(data);
    try {
      const ch = new BroadcastChannel(CHANNEL_NAME);
      ch.postMessage({ type: "heartbeat" });
      ch.close();
    } catch {}
    localRefresh();
  }, [account, localRefresh]);

  const localLeave = useCallback(() => {
    if (!account) return;
    const data = readStore();
    delete data[account.localAccountId];
    writeStore(data);
    try {
      const ch = new BroadcastChannel(CHANNEL_NAME);
      ch.postMessage({ type: "leave" });
      ch.close();
    } catch {}
  }, [account]);

  /* ── GRAPH MODE callbacks ────────────────────────────────────────── */

  const graphJoin = useCallback(async () => {
    if (!account) return;

    const doJoin = async () => {
      const itemId = await PresenceService.join({
        name:       account.name ?? account.username,
        upn:        account.username,
        sessionId:  sessionIdRef.current,
        deviceType: detectDevice(),
      });
      listItemIdRef.current = itemId;
      setIsLivePresence(true);
      PresenceService.pruneStale().catch(() => {});
    };

    try {
      await doJoin();
    } catch (err) {
      if (err.message.includes("[Graph 403]")) {
        // Token may be stale (admin consent was granted after login) — force-refresh and retry once
        try {
          await msalInstance.acquireTokenSilent({
            scopes: graphRequest.scopes,
            account,
            forceRefresh: true,
          });
          await doJoin();
          return; // succeeded after token refresh
        } catch { /* fall through to localStorage */ }

        console.error(
          `[Presence] 403 from SharePoint even after token refresh.\n` +
          `Admin consent URL: ${adminConsentUrl}`
        );
        setPresenceError("consent");
      } else {
        console.warn("[Presence] SharePoint join failed:", err.message);
        setPresenceError("error");
      }
      setIsLivePresence(false);
      localHeartbeat();
    }
  }, [account, localHeartbeat, adminConsentUrl]);

  const graphHeartbeat = useCallback(async () => {
    if (!listItemIdRef.current) return;
    try { await PresenceService.heartbeat(listItemIdRef.current); }
    catch {}
  }, []);

  const graphRefresh = useCallback(async () => {
    try {
      const users = await PresenceService.getActive();
      const mapped = users.map(u => ({ ...u, initials: getInitials(u.name) }));

      // Always keep self in the list even if the API hasn't indexed the row yet
      const hasSelf = mapped.some(u => u.id === sessionIdRef.current);
      if (!hasSelf && account) {
        mapped.unshift({
          id:         sessionIdRef.current,
          name:       account.name ?? account.username,
          email:      account.username,
          initials:   getInitials(account.name ?? account.username),
          status:     "online",
          lastSeenMs: 0,
          device:     detectDevice(),
        });
      }

      setOnlineUsers(mapped);
    } catch {}
  }, [account]);

  const graphLeave = useCallback(async () => {
    if (!listItemIdRef.current) return;
    try { await PresenceService.leave(listItemIdRef.current); }
    catch {}
  }, []);

  /* ── Effects ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!account) return;

    if (useGraphPresence) {
      /* ── Live cross-device presence ─────────────────────────────── */
      graphJoin().then(() => graphRefresh());

      const hbTimer   = setInterval(graphHeartbeat, HEARTBEAT_MS);
      const pollTimer = setInterval(graphRefresh,   HEARTBEAT_MS);

      const handleUnload = () => { graphLeave(); };
      window.addEventListener("beforeunload", handleUnload);

      return () => {
        clearInterval(hbTimer);
        clearInterval(pollTimer);
        window.removeEventListener("beforeunload", handleUnload);
        graphLeave();
      };

    } else {
      /* ── localStorage fallback (per-browser) ────────────────────── */
      localHeartbeat();
      const timer = setInterval(localHeartbeat, HEARTBEAT_MS);

      let bc;
      try {
        bc = new BroadcastChannel(CHANNEL_NAME);
        bc.onmessage = localRefresh;
      } catch {}

      const onStorage = (e) => { if (e.key === STORAGE_KEY) localRefresh(); };
      window.addEventListener("storage",       onStorage);
      window.addEventListener("beforeunload",  localLeave);

      return () => {
        clearInterval(timer);
        bc?.close();
        window.removeEventListener("storage",      onStorage);
        window.removeEventListener("beforeunload", localLeave);
        localLeave();
      };
    }
  }, [
    account,
    useGraphPresence,
    graphJoin, graphHeartbeat, graphRefresh, graphLeave,
    localHeartbeat, localRefresh, localLeave,
  ]);

  /* currentUserId is matched against user.id in OnlineUsers */
  const currentUserId = useGraphPresence
    ? sessionIdRef.current          // Graph: match by sessionId
    : account?.localAccountId;      // Local: match by MSAL localAccountId

  return (
    <PresenceContext.Provider value={{ onlineUsers, currentUserId, isLivePresence, presenceError, adminConsentUrl }}>
      {children}
    </PresenceContext.Provider>
  );
}

export const usePresence = () => useContext(PresenceContext);
