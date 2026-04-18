/**
 * Thin re-export layer.
 * All credentials and MSAL config live in  /azure-app-registration/
 * — edit that folder to change credentials, scopes, or redirect URIs.
 */
export { msalConfig, loginRequest, tokenRequest } from "../../azure-app-registration/azureConfig.js";
export { msalInstance }                           from "../../azure-app-registration/msalInstance.js";
