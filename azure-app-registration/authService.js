/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 *  AUTH SERVICE — MSAL LOGIN / LOGOUT / TOKEN HELPERS
 *  ─────────────────────────────────────────────────────────────────────
 *  Wraps @azure/msal-browser APIs into simple, reusable functions.
 *  Use these in non-React contexts (utilities, API clients, etc.).
 *  Inside React components prefer the  useMsal()  hook instead.
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { msalInstance } from "./msalInstance.js";
import { loginRequest, tokenRequest, AZURE_CREDENTIALS } from "./azureConfig.js";

// ─── Sign-in ────────────────────────────────────────────────────────────
/**
 * Initiates a full-page redirect sign-in flow.
 * After authentication, the user is redirected back to redirectUri.
 */
export async function signIn() {
  await msalInstance.loginRedirect(loginRequest);
}

/**
 * Opens a popup sign-in window (alternative to redirect).
 * Returns the AuthenticationResult on success.
 */
export async function signInPopup() {
  return await msalInstance.loginPopup(loginRequest);
}

// ─── Sign-out ───────────────────────────────────────────────────────────
/**
 * Signs the current user out and redirects to postLogoutRedirectUri.
 */
export async function signOut() {
  const account = msalInstance.getActiveAccount();
  await msalInstance.logoutRedirect({
    account: account ?? undefined,
  });
}

// ─── Access tokens ──────────────────────────────────────────────────────
/**
 * Acquires an access token silently.
 * Falls back to an interactive redirect if silent acquisition fails
 * (e.g. token expired, consent required).
 *
 * @returns {Promise<string>} Access token string
 */
export async function getAccessToken() {
  const account = msalInstance.getActiveAccount();
  if (!account) throw new Error("[AuthService] No authenticated account. Call signIn() first.");

  try {
    const response = await msalInstance.acquireTokenSilent({
      ...tokenRequest,
      account,
    });
    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      // Silent acquisition failed — redirect to consent/login
      await msalInstance.acquireTokenRedirect({ ...tokenRequest, account });
    }
    throw error;
  }
}

// ─── User info ──────────────────────────────────────────────────────────
/**
 * Returns the currently authenticated MSAL AccountInfo, or null if not signed in.
 */
export function getCurrentUser() {
  return msalInstance.getActiveAccount();
}

/**
 * Returns true if the current user's UPN belongs to the configured allowed domain.
 * Domain check is skipped (returns true) when AZURE_CREDENTIALS.allowedDomain
 * still holds the placeholder value — useful during initial development.
 */
export function isAllowedDomain() {
  const user = getCurrentUser();
  if (!user) return false;

  const domain = AZURE_CREDENTIALS.allowedDomain;
  // Skip enforcement while placeholder is in place
  if (!domain || domain.startsWith("REPLACE")) return true;

  return user.username?.toLowerCase().endsWith(`@${domain.toLowerCase()}`);
}

/**
 * Returns basic profile fields from the active account's ID token claims.
 * No Graph API call required — this data is included in the JWT.
 *
 * @returns {{ name: string, email: string, roles: string[] } | null}
 */
export function getUserProfile() {
  const account = getCurrentUser();
  if (!account) return null;

  return {
    name:   account.name  ?? account.username,
    email:  account.username,
    roles:  account.idTokenClaims?.roles ?? [],
  };
}
