/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 *  GRAPH API CLIENT
 *  ─────────────────────────────────────────────────────────────────────
 *  Authenticated fetch wrapper for Microsoft Graph API v1.0.
 *  Automatically acquires access tokens via MSAL (silent → redirect).
 *
 *  All services (listsService, mediaService) import from here.
 *  Do NOT call fetch() directly — always use graphClient.
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { msalInstance } from "../../azure-app-registration/msalInstance.js";
import { graphRequest } from "../../azure-app-registration/azureConfig.js";

/* ── Constants ──────────────────────────────────────────────────────── */
export const GRAPH_BASE   = "https://graph.microsoft.com/v1.0";
export const GRAPH_SCOPES = graphRequest.scopes;

/* ── Token acquisition ──────────────────────────────────────────────── */
async function acquireToken() {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw new Error(
      "[GraphClient] No authenticated account. User must sign in first."
    );
  }

  try {
    const result = await msalInstance.acquireTokenSilent({
      scopes:  GRAPH_SCOPES,
      account,
    });
    return result.accessToken;
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      // Token expired or consent needed — redirect to login
      await msalInstance.acquireTokenRedirect({
        scopes:  GRAPH_SCOPES,
        account,
      });
    }
    throw err;
  }
}

/* ── Core fetch ─────────────────────────────────────────────────────── */
/**
 * Authenticated fetch against Graph API.
 * @param {string} path  — e.g. "/sites/{id}/lists" or full URL
 * @param {RequestInit} options  — standard fetch options
 * @returns {Promise<any>}  parsed JSON, or null for 204 No Content
 */
async function graphFetch(path, options = {}) {
  const token = await acquireToken();
  const url   = path.startsWith("http") ? path : `${GRAPH_BASE}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization:  `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept:         "application/json",
      ...options.headers,              // allow caller to override Content-Type (file upload)
    },
  });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = await response.json();
      message = body?.error?.message ?? message;
    } catch { /* non-JSON error body */ }
    throw new Error(`[Graph ${response.status}] ${message}`);
  }

  if (response.status === 204) return null; // No Content — DELETE, etc.
  return response.json();
}

/* ── Paginated GET ──────────────────────────────────────────────────── */
/**
 * Fetches all pages of a Graph API collection (follows @odata.nextLink).
 * @param {string} path
 * @returns {Promise<any[]>}  flat array of all items across all pages
 */
async function graphFetchAll(path) {
  const items = [];
  let   url   = `${GRAPH_BASE}${path}`;

  while (url) {
    const page = await graphFetch(url);   // already absolute URL on subsequent pages
    if (Array.isArray(page?.value)) items.push(...page.value);
    url = page?.["@odata.nextLink"] ?? null;
  }

  return items;
}

/* ── Public client ──────────────────────────────────────────────────── */
export const graphClient = {
  /** GET — returns parsed JSON */
  get: (path) => graphFetch(path),

  /** GET all pages — returns flat array */
  getAll: (path) => graphFetchAll(path),

  /** POST — creates a resource, returns parsed JSON */
  post: (path, body) =>
    graphFetch(path, { method: "POST", body: JSON.stringify(body) }),

  /** PATCH — partial update, returns parsed JSON */
  patch: (path, body) =>
    graphFetch(path, { method: "PATCH", body: JSON.stringify(body) }),

  /** DELETE — returns null */
  delete: (path) => graphFetch(path, { method: "DELETE" }),

  /**
   * PUT — binary file upload.
   * Content-Type is set from the File object; overrides default JSON header.
   */
  upload: (path, file) =>
    graphFetch(path, {
      method:  "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body:    file,
    }),
};

/* ── Helpers ────────────────────────────────────────────────────────── */
/**
 * Returns true if there is a currently authenticated MSAL account.
 * Use this to guard Graph API calls in components.
 */
export function isGraphReady() {
  return !!msalInstance.getActiveAccount();
}
