import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresence } from "../contexts/PresenceContext";

/* ── Helpers ────────────────────────────────────────────────────────── */
function formatAge(ms) {
  if (ms < 60_000)   return "Active now";
  const min = Math.floor(ms / 60_000);
  return `${min}m ago`;
}

/* ── Avatar ─────────────────────────────────────────────────────────── */
function Avatar({ user, isSelf, size = "sm" }) {
  const dim   = size === "sm" ? "w-6 h-6 text-[10px]" : "w-9 h-9 text-sm";
  const grad  = isSelf
    ? "bg-gradient-to-br from-solar-500 to-amber-600"
    : "bg-gradient-to-br from-navy-600 to-navy-800";

  return (
    <div className={`relative ${dim} rounded-full flex items-center justify-center font-bold text-white border-2 border-white dark:border-slate-900 flex-shrink-0 ${grad}`}>
      {user.initials}
      {size !== "sm" && (
        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${
          user.status === "online" ? "bg-emerald-400" : "bg-amber-400"
        }`} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function OnlineUsers() {
  const { onlineUsers, currentUserId, isLivePresence, presenceError, adminConsentUrl } = usePresence();
  const [open, setOpen] = useState(false);
  const ref  = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Nothing to show if context isn't ready or no users
  if (!onlineUsers.length) return null;

  const MAX_AVATARS  = 3;
  const visibleUsers = onlineUsers.slice(0, MAX_AVATARS);
  const extra        = onlineUsers.length - MAX_AVATARS;
  const onlineCount  = onlineUsers.filter(u => u.status === "online").length;

  return (
    <div ref={ref} className="relative">

      {/* ── Pill trigger ──────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-150 group"
        aria-label="Show online users"
      >
        {/* Stacked avatars */}
        <div className="flex -space-x-2">
          {visibleUsers.map((u) => (
            <Avatar key={u.id} user={u} isSelf={u.id === currentUserId} size="sm" />
          ))}
          {extra > 0 && (
            <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-[9px] font-bold text-slate-600 dark:text-slate-300 border-2 border-white dark:border-slate-900">
              +{extra}
            </div>
          )}
        </div>

        {/* Pulse dot + count */}
        <div className="flex items-center gap-1.5">
          {isLivePresence ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          ) : (
            <span className="text-amber-500 text-xs leading-none" title="This browser only — cross-device unavailable">⚠</span>
          )}
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 hidden sm:block whitespace-nowrap">
            {onlineCount === 1 && onlineCount === onlineUsers.length
              ? "Just you"
              : `${onlineUsers.length} online`}
          </span>
        </div>
      </button>

      {/* ── Dropdown ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={   { opacity: 0, y: 6,  scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/60 overflow-hidden z-50"
          >
            {/* Header row */}
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Portal Activity
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isLivePresence ? "All devices · cross-platform" : "This browser only"}
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                {onlineCount} online
              </span>
            </div>

            {/* User list */}
            <div className="p-2 max-h-72 overflow-y-auto">
              {onlineUsers.map((u) => {
                const isSelf = u.id === currentUserId;
                return (
                  <motion.div
                    key={u.id}
                    layout
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-default"
                  >
                    <Avatar user={u} isSelf={isSelf} size="lg" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate leading-none">
                          {u.name}
                        </p>
                        {isSelf && (
                          <span className="text-[9px] bg-solar-100 dark:bg-solar-900/30 text-solar-700 dark:text-solar-400 px-1.5 py-0.5 rounded-full font-bold leading-none flex-shrink-0">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{u.email}</p>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className={`block text-[10px] font-bold ${
                        u.status === "online" ? "text-emerald-500" : "text-amber-500"
                      }`}>
                        {u.status === "online" ? "●" : "◐"} {u.status === "online" ? "Online" : "Away"}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        {formatAge(u.lastSeenMs)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              {isLivePresence ? (
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    Live · all devices · updates every 60s
                  </p>
                </div>
              ) : presenceError === "consent" ? (
                <div className="text-center space-y-1.5">
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                    ⚠ This browser only — cross-device unavailable
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    If admin consent was already granted, sign out and sign back in to activate cross-device presence.
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Otherwise, ask your M365 Admin to{" "}
                    <a
                      href={adminConsentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-1 hover:text-indigo-800"
                      onClick={e => e.stopPropagation()}
                    >
                      grant Sites.ReadWrite.All →
                    </a>
                  </p>
                </div>
              ) : (
                <p className="text-[10px] text-slate-400 text-center">
                  This browser only · configure SharePoint for cross-device
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
