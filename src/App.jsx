import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import PublicLayout    from "./layouts/PublicLayout";
import EmployeeLayout  from "./layouts/EmployeeLayout";
import AuthGuard       from "./auth/AuthGuard";

/* After MSAL redirect auth completes, navigate to the route the user was on */
function PostAuthRedirect() {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && inProgress === InteractionStatus.None) {
      const dest = sessionStorage.getItem("auth-redirect-to");
      if (dest) {
        sessionStorage.removeItem("auth-redirect-to");
        navigate(dest, { replace: true });
      }
    }
  }, [isAuthenticated, inProgress, navigate]);

  return null;
}

/* ── Public pages (no login required) ─────────────────────────────── */
import Home              from "./pages/Home";
import About             from "./pages/About";
import Products          from "./pages/Products";
import Manufacturing     from "./pages/Manufacturing";
import BeyondProfit      from "./pages/BeyondProfit";
import InvestorRelations from "./pages/InvestorRelations";
import Media             from "./pages/Media";
import Careers           from "./pages/Careers";
import Contact           from "./pages/Contact";

/* ── Employee pages (Entra login required) ─────────────────────────── */
import Dashboard      from "./pages/employee/Dashboard";
import FormsHub       from "./pages/employee/FormsHub";
import TeamsChat      from "./pages/employee/TeamsChat";
import FunZone        from "./pages/employee/FunZone";
import EmployeeMedia  from "./pages/employee/EmployeeMedia";
import Infrastructure from "./pages/Infrastructure";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PostAuthRedirect />
      <Routes>

        {/* ── PUBLIC — accessible by everyone, no auth ─────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/"               element={<Home />}          />
          <Route path="/about"          element={<About />}         />
          <Route path="/products"       element={<Products />}      />
          <Route path="/manufacturing"  element={<Manufacturing />} />
          <Route path="/beyond-profit"      element={<BeyondProfit />}      />
          <Route path="/investor-relations" element={<InvestorRelations />} />
          <Route path="/media"              element={<Media />}             />
          <Route path="/careers"            element={<Careers />}           />
          <Route path="/contact"            element={<Contact />}           />
        </Route>

        {/* ── EMPLOYEE — protected by Azure AD Entra ID login ─────────
             AuthGuard checks MSAL authentication state.
             If not signed in → shows "Sign in with Microsoft" screen.
             Credentials are configured in /azure-app-registration/
        ─────────────────────────────────────────────────────────────── */}
        <Route element={<AuthGuard><EmployeeLayout /></AuthGuard>}>
          <Route path="/employee/dashboard"      element={<Dashboard />}      />
          <Route path="/employee/forms"          element={<FormsHub />}       />
          <Route path="/employee/chat"           element={<TeamsChat />}      />
          <Route path="/employee/fun"            element={<FunZone />}        />
          <Route path="/employee/media"          element={<EmployeeMedia />}  />
          <Route path="/employee/infrastructure" element={<Infrastructure />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
