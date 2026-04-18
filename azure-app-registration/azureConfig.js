/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 *  AZURE AD APP REGISTRATION — CONFIGURATION
 *  ─────────────────────────────────────────────────────────────────────
 *  SETUP STEPS:
 *  1. Go to https://portal.azure.com
 *  2. Navigate to: Azure Active Directory → App registrations → New registration
 *  3. Name:           EnterpriseHub Portal
 *     Account types:  "Accounts in this organizational directory only" (single tenant)
 *     Redirect URI:   Web → http://localhost:5174   (add production URL later)
 *  4. Click Register, then copy:
 *     – Application (client) ID  →  AZURE_CREDENTIALS.clientId
 *     – Directory (tenant) ID    →  AZURE_CREDENTIALS.tenantId
 *  5. Under Authentication:
 *     – Add redirect URIs for all environments (dev + prod)
 *     – Enable: ID tokens  (under Implicit grant)
 *     – Allowed domains:   set AZURE_CREDENTIALS.allowedDomain
 *  6. Under API permissions:
 *     – Add Microsoft Graph → Delegated → User.Read  (click Grant admin consent)
 *  7. Fill in the values below and save.
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

// ─── 1. CREDENTIALS — fill these in ────────────────────────────────────
export const AZURE_CREDENTIALS = {
  /** Application (client) ID from Azure Portal > App registrations > Overview */
  clientId: "6276dd16-8494-4532-866f-2d70a390ff5f",

  /** Directory (tenant) ID from Azure Portal > Azure Active Directory > Overview */
  tenantId: "56f1281f-8bae-4a11-b547-c68f7f8679fb",

  /**
   * Allowed email domain for your organisation.
   * Only users whose UPN ends with @<allowedDomain> will be permitted.
   * Example: "contoso.com"  →  only user@contoso.com can sign in.
   * Leave as placeholder to skip domain enforcement while testing.
   */
  allowedDomain: "jil-jupiter.com",

  /**
   * Redirect URI — MUST match exactly what is registered in Azure Portal.
   * Development:  http://localhost:5173
   * Production:   https://ite01678.github.io/jil-portal/
   *
   * VITE_REDIRECT_URI is set in .github/workflows/deploy.yml for the build.
   * Add BOTH URIs in Azure Portal › Authentication › Redirect URIs.
   */
  redirectUri: import.meta.env.VITE_REDIRECT_URI ?? "http://localhost:5173",
};

// ─── 2. MSAL BROWSER CONFIGURATION ─────────────────────────────────────
export const msalConfig = {
  auth: {
    clientId:               AZURE_CREDENTIALS.clientId,
    authority:              `https://login.microsoftonline.com/${AZURE_CREDENTIALS.tenantId}`,
    redirectUri:            AZURE_CREDENTIALS.redirectUri,
    postLogoutRedirectUri:  AZURE_CREDENTIALS.redirectUri,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    /**
     * "sessionStorage" — cleared when the browser tab is closed (recommended).
     * "localStorage"   — persists across tabs and browser restarts.
     */
    cacheLocation:          "localStorage",  // share token across tabs so presence works in all tabs
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        // Only log in development
        if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
          console.log(`[MSAL ${level}] ${message}`);
        }
      },
    },
  },
};

// ─── 3. LOGIN REQUEST ───────────────────────────────────────────────────
/**
 * Scopes requested during sign-in.
 * "openid" and "profile" provide basic identity info.
 * "User.Read" allows reading the signed-in user's profile from MS Graph.
 */
export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};

// ─── 4. GRAPH API TOKEN REQUEST ─────────────────────────────────────────
/**
 * Scopes for Microsoft Graph API access (SharePoint Lists + Drive).
 *
 * ⚠ ADMIN CONSENT REQUIRED:
 *   Sites.ReadWrite.All and Files.ReadWrite.All are tenant-wide permissions.
 *   An M365 admin must grant consent in Azure Portal:
 *   App registrations → API Permissions → Grant admin consent for [org]
 */
export const tokenRequest = {
  scopes: ["User.Read"],
};

export const graphRequest = {
  scopes: [
    "User.Read",
    "Sites.ReadWrite.All",   // read + write SharePoint Lists
    "Files.ReadWrite.All",   // read + write SharePoint Document Library (media)
  ],
};export const FORMS = [
  {
    id: "leave-request",
    icon: "💼",
    title: "SAP VENDOR MASTER CODE",
    description: "Submit Requst to create new SAP Vendor/Supplier. After Approval from Banking,Taxation and Accounts Vendor Code will be created in SAP",
    gradient: "from-blue-500 to-indigo-600",
    badge: "SAP",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
    iframeSrc: "https://forms.office.com/r/8AsXAeC0sR",
  },
  {
    id: "expense-report",
    icon: "📊",
    title: "SAP Tiles Request",
    description: "Request to create new SAP Tiles for your role. After approval from your HOD and GM-Accounts proper license will be assigned for your required SAP Tiles",
    gradient: "from-purple-500 to-pink-600",
    badge: "SAP",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
    iframeSrc: "https://forms.office.com/r/pEBiXyP05U",
  },
  {
    id: "it-support",
    icon: "🗓️",
    title: "SAP Support Ticket",
    description: "Report issues related to SAP sytems and fill all the details required. SAP team will try to resolve the issues at the earliest.",
    gradient: "from-cyan-500 to-teal-600",
    badge: "SAP",
    badgeColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400",
    iframeSrc: "https://forms.office.com/r/nfYAmvgttp",
  },
  {
    id: "performance-review",
    icon: "🖨️",
    title: "IT Material Request",
    description: "Request IT materials and equipment for your work. It will be allotted to you if in stock or will be sent to procurement team for purchase after approvals from required authorities",
    gradient: "from-amber-500 to-orange-600",
    badge: "IT",
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    iframeSrc: "https://forms.office.com/r/gPpttqERMc",
  },
  {
    id: "onboarding",
    icon: "👋",
    title: "Mail ID Creation",
    description: "Request for creation of new email ID for new joinee or existing employee. IT team will create the mail ID after HOD and Management approvals",
    gradient: "from-emerald-500 to-green-600",
    badge: "New Hire",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    iframeSrc: "https://forms.office.com/r/7hWsN7DaMG",
  },
  {
    id: "training",
    icon: "🖥️",
    title: "Laptop Request",
    description: "Lodge Request for a new laptop for special cases (exception from company policy). It will be procured and allotted after HOD and Management Approvals",
    gradient: "from-violet-500 to-purple-600",
    badge: "IT",
    badgeColor: "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
    iframeSrc: "https://forms.office.com/r/07cfpkkDgB",
  },
  {
    id: "travel",
    icon: "✈️",
    title: "Travel Authorization",
    description: "Request pre-approval for domestic or international business travel, including flights and accommodation.",
    gradient: "from-sky-500 to-blue-600",
    badge: "Traveldesk",
    badgeColor: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400",
    iframeSrc: "https://forms.office.com/r/dFvCRWH0Yg",
  },
  {
    id: "remote-work",
    icon: "🎁",
    title: "Jupiter Awards",
    description: "Only HODs of different Departments can submit requests. Recognize worth of valuable employees and nominate them from various categories enlisted",
    gradient: "from-rose-500 to-red-600",
    badge: "HR",
    badgeColor: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400",
    iframeSrc: "https://forms.office.com/r/jsP6ZJXnVJ",
  },
  {
    id: "asset-request",
    icon: "🎓",
    title: "Jupiter Scholarship",
    description: "Apply for the Jupiter Scholarship program to support your childs educational pursuits.",
    gradient: "from-slate-500 to-gray-600",
    badge: "HR",
    badgeColor: "bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300",
    iframeSrc: "https://forms.office.com/r/e4CPdCYgkZ",
  },
  {
    id: "feedback",
    icon: "💬",
    title: "Feedback & Suggestions",
    description: "Share ideas, improvement suggestions, and general feedback to help build a better workplace.",
    gradient: "from-fuchsia-500 to-pink-600",
    badge: "Culture",
    badgeColor: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/50 dark:text-fuchsia-400",
    iframeSrc: "",
  },
];

