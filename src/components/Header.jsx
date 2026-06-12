import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import ThemeToggle from "./ThemeToggle";
import OnlineUsers from "./OnlineUsers";
import { JupiterLogoIcon } from "./JupiterLogo";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

/* ── Public navigation ──────────────────────────────────────────────── */
const PUBLIC_NAV = [
  { label: "Home",          path: "/",                  exact: true  },
  { label: "About Us",      path: "/about",              exact: false },
  { label: "Products",      path: "/products",           exact: false },
  { label: "Manufacturing", path: "/manufacturing",      exact: false },
  { label: "Beyond Profit", path: "/beyond-profit",     exact: false },
  { label: "Investors",     path: "/investor-relations", exact: false },
  { label: "Media",         path: "/media",              exact: false },
  { label: "Careers",       path: "/careers",            exact: false },
  { label: "Contact Us",    path: "/contact",            exact: false },
];

/* ── Employee nav ───────────────────────────────────────────────────── */
const EMPLOYEE_PAGES = [
  { label: "Dashboard",      path: "/employee/dashboard"      },
  { label: "Forms Hub",      path: "/employee/forms"          },
  { label: "Teams Chat",     path: "/employee/chat"           },
  { label: "Fun Zone",       path: "/employee/fun"            },
  { label: "Infrastructure", path: "/employee/infrastructure" },
];

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
    isActive
      ? "bg-jilBlue-50 dark:bg-jilBlue-900/20 text-jilBlue-500 dark:text-jilBlue-300 font-semibold"
      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
  }`;

function ProfileMenu() {
  const { instance, accounts } = useMsal();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const account = accounts[0];

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!account) return null;

  const initials = account.name
    ? account.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : (account.username ?? "?").slice(0, 2).toUpperCase();

  const handleLogout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
  };

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Profile menu"
        className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0061AF] to-indigo-700 flex items-center justify-center text-white text-xs font-bold hover:ring-2 hover:ring-[#0061AF]/60 transition-all duration-200 select-none"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-[#010c1e] rounded-2xl shadow-xl border border-slate-200 dark:border-[#0f2035]/90 overflow-hidden animate-fade-up z-50">
          {/* User info */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0061AF] to-indigo-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                  {account.name || "Employee"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {account.username}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header({ isPublic, onToggleSidebar }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (mobileRef.current && !mobileRef.current.contains(e.target))
        setMobileOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="
      fixed top-0 left-0 right-0 z-50 h-16
      bg-white dark:bg-[#010c1e]/97 backdrop-blur-xl
      border-b-2 border-[#0061AF]/20 dark:border-[#0f2035]/90
      flex items-center px-4 gap-3
      shadow-[0_2px_16px_rgba(0,97,175,0.10)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.4)]
    ">
      {/* Sidebar toggle — employee only */}
      {!isPublic && (
        <button onClick={onToggleSidebar} aria-label="Toggle sidebar"
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
          <MenuIcon />
        </button>
      )}

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
        <JupiterLogoIcon size={56} />
        <div className="hidden sm:block">
          <span className="text-sm font-extrabold solar-text tracking-tight leading-none block">JUPITER</span>
          <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase leading-none">International Limited</span>
        </div>
      </Link>

      {/* ── Public: horizontal nav ─────────────────────────────────── */}
      {isPublic && (
        <>
          {/* Desktop — all nav links */}
          <nav className="hidden xl:flex items-center gap-0.5 ml-4 flex-1">
            {PUBLIC_NAV.map(link => (
              <NavLink key={link.path} to={link.path} end={link.exact} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1 xl:hidden" />

          {/* Employee portal button — desktop */}
          <Link to="/employee/dashboard"
            className="hidden xl:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-navy-800 to-navy-600 text-white hover:from-navy-900 hover:to-navy-700 hover:shadow-glow-navy transition-all duration-200 whitespace-nowrap">
            🔐 Employee Portal
          </Link>

          {/* Mobile hamburger */}
          <div ref={mobileRef} className="xl:hidden relative">
            <button onClick={() => setMobileOpen(o => !o)} aria-label="Open menu"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <MenuIcon />
            </button>

            {mobileOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white dark:bg-[#010c1e] rounded-2xl shadow-xl border border-slate-200 dark:border-[#0f2035]/90 overflow-hidden animate-fade-up z-50">
                <div className="p-1.5">
                  {PUBLIC_NAV.map(link => (
                    <NavLink key={link.path} to={link.path} end={link.exact}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                          isActive
                            ? "bg-solar-50 dark:bg-solar-900/30 text-solar-600 dark:text-solar-400"
                            : "text-slate-700 dark:text-slate-200 hover:bg-solar-50 dark:hover:bg-solar-900/20 hover:text-solar-600"
                        }`
                      }>
                      {link.label}
                    </NavLink>
                  ))}
                  <div className="border-t border-slate-200 dark:border-slate-700 my-1.5" />
                  <Link to="/employee/dashboard" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-900/20 transition-colors">
                    🔐 Employee Portal
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Employee: direct nav + online presence ──────────────────── */}
      {!isPublic && (
        <>
          <div className="flex-1" />
          <nav className="hidden md:flex items-center gap-0.5 mr-2">
            {EMPLOYEE_PAGES.map(page => (
              <NavLink key={page.path} to={page.path} className={navLinkClass}>
                {page.label}
              </NavLink>
            ))}
          </nav>
          {/* Online users — only shown inside PresenceProvider (employee layout) */}
          <OnlineUsers />
          <ProfileMenu />
        </>
      )}

      {/* Theme toggle */}
      <ThemeToggle />
    </header>
  );
}
