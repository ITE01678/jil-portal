import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ── Inline SVG icons ──────────────────────────────────────────────── */
const icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  forms: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="13" y2="17"/>
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  fun: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
};

const NAV_ITEMS = [
  { icon: icons.dashboard, label: "Dashboard",  path: "/employee/dashboard", color: "text-indigo-500" },
  { icon: icons.forms,     label: "Forms Hub",  path: "/employee/forms",     color: "text-purple-500" },
  { icon: icons.chat,      label: "Teams Chat", path: "/employee/chat",      color: "text-cyan-500"   },
  { icon: icons.fun,       label: "Fun Zone",   path: "/employee/fun",       color: "text-emerald-500"},
];

/* ═══════════════════════════════════════════════════════════════════════ */
export default function Sidebar({ isOpen }) {
  const W_OPEN = 256;
  const W_CLOSED = 68;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? W_OPEN : W_CLOSED }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="
        fixed left-0 z-40 flex flex-col overflow-hidden
        bg-white dark:bg-slate-900
        border-r border-slate-200/80 dark:border-slate-700/60
        shadow-lg
      "
      style={{ top: "var(--header-h, 64px)", height: "calc(100vh - 64px)" }}
    >
      {/* Decorative gradient strip */}
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex-shrink-0" />

      {/* Section label */}
      <div className="px-4 pt-5 pb-2 flex-shrink-0 overflow-hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.p
              key="label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-bold uppercase tracking-widest
                         text-slate-400 dark:text-slate-500 px-2"
            >
              Menu
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2.5 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            title={!isOpen ? item.label : undefined}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {/* Icon */}
            <span className={`flex-shrink-0 transition-colors duration-200 ${
              /* colour tint on icon always visible */
              "text-slate-500 dark:text-slate-400"
            }`}>
              {item.icon}
            </span>

            {/* Label — fades in/out with sidebar */}
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex-1 min-w-0 truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Bottom: back to home link */}
      <div className="px-2.5 pb-4 pt-2 border-t border-slate-200/60 dark:border-slate-700/50 flex-shrink-0">
        <NavLink
          to="/"
          title={!isOpen ? "Back to Home" : undefined}
          className="sidebar-link"
        >
          <span className="flex-shrink-0 text-slate-400">{icons.home}</span>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                key="home-label"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                className="flex-1 min-w-0 truncate text-sm"
              >
                Back to Home
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
      </div>
    </motion.aside>
  );
}
