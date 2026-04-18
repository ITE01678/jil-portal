import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginRequest } from "./msalConfig";

function MicrosoftLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" fill="none" aria-hidden="true">
      <rect x="1"  y="1"  width="9" height="9" fill="#f25022"/>
      <rect x="11" y="1"  width="9" height="9" fill="#7fba00"/>
      <rect x="1"  y="11" width="9" height="9" fill="#00a4ef"/>
      <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
    </svg>
  );
}

export default function AuthGuard({ children }) {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(console.error);
  };

  /* MSAL is initialising / handling a redirect */
  if (inProgress !== InteractionStatus.None) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0d1117]">
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          Authenticating…
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0d1117] px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="card max-w-md w-full text-center py-14 px-8"
        >
          {/* Lock icon */}
          <div className="icon-box w-16 h-16 text-3xl bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-6 shadow-glow-indigo">
            🔐
          </div>

          <h1 className="text-2xl font-extrabold mb-2">Employee Access Only</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed max-w-xs mx-auto">
            This section is restricted to verified employees. Sign in with your
            Microsoft work account to continue.
          </p>

          <button
            onClick={handleLogin}
            className="btn-primary w-full justify-center py-3.5 text-base gap-3"
          >
            <MicrosoftLogo />
            Sign in with Microsoft
          </button>

          <Link
            to="/"
            className="block mt-5 text-sm text-slate-400 hover:text-indigo-500 transition-colors duration-150"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return children;
}
