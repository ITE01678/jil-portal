/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 *  PRESENCE SERVICE  —  Cross-device online status via SharePoint List
 *  ─────────────────────────────────────────────────────────────────────
 *  Stores each browser session as a row in "JIL Active Sessions" list.
 *  Heartbeat PATCH keeps LastSeen fresh every 60 s.
 *  getActive() filters IsActive=true & LastSeen within last 8 minutes.
 *  pruneStale() cleans up rows last seen > 10 minutes ago.
 *
 *  LIST: "JIL Active Sessions"
 *  Columns:
 *    Title              (built-in)  — user display name
 *    UserPrincipalName  text        — email / UPN
 *    SessionId          text        — unique per browser tab (sessionStorage)
 *    LastSeen           dateTime    — heartbeat timestamp
 *    DeviceType         choice      — Desktop | Mobile | Tablet | Unknown
 *    Status             choice      — Active | Away | Offline
 *    IsActive           boolean     — true while session is live
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { graphClient } from "./graphClient.js";
import { SHAREPOINT_CONFIG } from "../../azure-app-registration/sharepointConfig.js";

const { siteId, lists } = SHAREPOINT_CONFIG;

const listBase = () =>
  `/sites/${siteId}/lists/${lists.activeSessions}`;

const itemsUrl = (query = "") =>
  `${listBase()}/items?expand=fields${query ? `&${query}` : ""}`;

/* A session is "active" if LastSeen is within these windows */
const ONLINE_WINDOW_MS = 3 * 60_000;   //  < 3 min  → Online
const AWAY_WINDOW_MS   = 8 * 60_000;   //  3–8 min  → Away
const STALE_WINDOW_MS  = 10 * 60_000;  //  > 10 min → prune

/* ══════════════════════════════════════════════════════════════════════
   PresenceService
   ══════════════════════════════════════════════════════════════════════ */
export const PresenceService = {

  /**
   * Register this session in the list.
   * If a row with the same SessionId already exists (e.g. page refresh),
   * it updates the existing row instead of creating a duplicate.
   *
   * @param {{ name, upn, sessionId, deviceType }} opts
   * @returns {Promise<string>}  The Graph list item ID — store this in a
   *                             ref so heartbeat/leave can PATCH by ID.
   */
  async join({ name, upn, sessionId, deviceType = "Desktop" }) {
    // Check for existing row with same sessionId (handles page refresh)
    const existing = await graphClient.getAll(
      itemsUrl(`$filter=fields/SessionId eq '${encodeURIComponent(sessionId)}'`)
    );

    if (existing.length > 0) {
      await graphClient.patch(
        `${listBase()}/items/${existing[0].id}/fields`,
        { LastSeen: new Date().toISOString(), Status: "Active", IsActive: true }
      );
      return existing[0].id;
    }

    const item = await graphClient.post(`${listBase()}/items`, {
      fields: {
        Title:             name,
        UserPrincipalName: upn,
        SessionId:         sessionId,
        LastSeen:          new Date().toISOString(),
        DeviceType:        deviceType,
        Status:            "Active",
        IsActive:          true,
      },
    });
    return item.id;
  },

  /**
   * Refresh the heartbeat timestamp for this session.
   * Call every 60 seconds to keep the session alive.
   * @param {string} itemId  — list item ID returned by join()
   */
  async heartbeat(itemId) {
    return graphClient.patch(`${listBase()}/items/${itemId}/fields`, {
      LastSeen: new Date().toISOString(),
      Status:   "Active",
      IsActive: true,
    });
  },

  /**
   * Mark this session as offline.
   * Called on component unmount / page unload.
   * @param {string} itemId
   */
  async leave(itemId) {
    return graphClient.patch(`${listBase()}/items/${itemId}/fields`, {
      Status:   "Offline",
      IsActive: false,
    });
  },

  /**
   * Fetch all currently active sessions across all devices / browsers.
   * Filters IsActive=true from the list, then computes status from LastSeen.
   *
   * @returns {Promise<Array>}  Sorted by most-recently-seen first.
   */
  async getActive() {
    const items = await graphClient.getAll(
      itemsUrl("$filter=fields/IsActive eq 1&$orderby=fields/LastSeen desc")
    );

    const now = Date.now();
    return items
      .map(item => {
        const lastSeen    = new Date(item.fields.LastSeen ?? 0).getTime();
        const lastSeenMs  = now - lastSeen;
        let   status;
        if      (lastSeenMs < ONLINE_WINDOW_MS) status = "online";
        else if (lastSeenMs < AWAY_WINDOW_MS)   status = "away";
        else                                     status = "offline";

        return {
          itemId:    item.id,
          id:        item.fields.SessionId,       // used for isSelf check
          name:      item.fields.Title || item.fields.UserPrincipalName || "Employee",
          email:     item.fields.UserPrincipalName || "",
          sessionId: item.fields.SessionId || "",
          device:    item.fields.DeviceType || "Desktop",
          lastSeen,
          lastSeenMs,
          status,
        };
      })
      .filter(u => u.status !== "offline");
  },

  /**
   * Mark all sessions with LastSeen > 10 minutes ago as offline.
   * Call once on portal login to clean up orphaned sessions.
   */
  async pruneStale() {
    const cutoff = new Date(Date.now() - STALE_WINDOW_MS).toISOString();
    const stale  = await graphClient.getAll(
      itemsUrl(`$filter=fields/IsActive eq 1 and fields/LastSeen lt '${cutoff}'`)
    );
    await Promise.allSettled(
      stale.map(item =>
        graphClient.patch(`${listBase()}/items/${item.id}/fields`, {
          Status:   "Offline",
          IsActive: false,
        })
      )
    );
  },
};
