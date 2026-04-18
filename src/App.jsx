import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout    from "./layouts/PublicLayout";
import EmployeeLayout  from "./layouts/EmployeeLayout";
import AuthGuard       from "./auth/AuthGuard";

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
import Infrastructure from "./pages/Infrastructure";

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="/employee/infrastructure" element={<Infrastructure />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
