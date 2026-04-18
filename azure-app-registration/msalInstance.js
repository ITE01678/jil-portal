/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 *  MSAL PUBLIC CLIENT APPLICATION INSTANCE
 *  ─────────────────────────────────────────────────────────────────────
 *  This module creates and exports the single shared MSAL instance used
 *  throughout the app.
 *
 *  ⚠  IMPORTANT: Call  msalInstance.initialize()  before rendering React.
 *     This is already handled in  src/main.jsx.
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./azureConfig.js";

/**
 * Singleton MSAL instance.
 * Import this wherever you need to call MSAL APIs directly.
 * Most React components should use  useMsal()  from @azure/msal-react instead.
 */
export const msalInstance = new PublicClientApplication(msalConfig);
