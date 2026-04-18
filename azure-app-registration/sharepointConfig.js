/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 *  SHAREPOINT CONFIGURATION  —  JIL Portal
 *  ─────────────────────────────────────────────────────────────────────
 *
 *  ONLY 2 THINGS TO FILL IN MANUALLY:
 *    1. azureConfig.js  →  clientId, tenantId  (App Registration)
 *    2. This file       →  siteId, hostname, and the IDs below
 *       (IDs come from running runFullSetup() in the browser console)
 *
 *  QUICK SETUP STEPS  (full guide in SETUP_GUIDE.md):
 *    Step 1 — Register the app in Azure Portal (5 min)
 *    Step 2 — Sign in to the portal, open DevTools console, run:
 *             const { runFullSetup } = await import("/src/services/setupService.js");
 *             const ids = await runFullSetup();
 *             console.table(ids);
 *    Step 3 — Copy the printed IDs into the fields below
 *    Step 4 — Reload the portal — everything is live
 *
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

export const SHAREPOINT_CONFIG = {

  /* ── YOUR SHAREPOINT SITE ─────────────────────────────────────────────
     Find these in your SharePoint URL:
     https://<hostname>/sites/<siteName>
     e.g.  hostname = "jilit.sharepoint.com"
           sitePath = "/sites/JILPortal"
     Leave sitePath = "/" if you are using the root site.
  ────────────────────────────────────────────────────────────────────── */
  siteId:   "jupiterkolkata.sharepoint.com,60a9f382-5466-422b-b2cd-e4256accff61,ec122f43-bfc5-4c4b-b6ce-aceacec078b1",       // ← paste from runFullSetup() output
  hostname: "jupiterkolkata.sharepoint.com",      // ← e.g. "jilit.sharepoint.com"
  sitePath: "/sites/DemoJupiterSite",           // ← change if your site path differs


  /* ── 4 SHAREPOINT LISTS ───────────────────────────────────────────────
     Created automatically by runFullSetup().
     Paste the IDs printed in the console after running it.
  ────────────────────────────────────────────────────────────────────── */
  lists: {

    /** Who is currently active on the portal (cross-device presence) */
    activeSessions: "275dddb3-c276-41a0-bcf1-a899a5933dcd",   // ← JIL Active Sessions

    /** Company awards and recognitions shown on /media */
    awards:         "2eab847b-f98a-46d1-ad1f-e1ba4e4c521c",   // ← JIL Awards

    /** News articles AND activities/events shown on /media */
    newsActivities: "34f498ca-c20a-48c6-9733-78828096d3d0",   // ← JIL News & Activities

    /** Employee gaming leaderboard in the Fun Zone */
    leaderboard:    "69a8f128-027d-4490-ad84-d20672aa547e",   // ← JIL Leaderboard

    /* ── OPTIONAL ──────────────────────────────────────────────────────
       To save public contact-form submissions to SharePoint:
         1. Run: findOrCreateList(siteId, "JIL Contact Enquiries", CONTACT_COLUMNS)
         2. Paste the returned ID here
       Leave as "SKIP" to use the built-in email fallback instead.
    ──────────────────────────────────────────────────────────────────── */
    contactEnquiries: "SKIP",                 // ← optional; "SKIP" = email fallback
  },


  /* ── DOCUMENT LIBRARY (Drive) ─────────────────────────────────────────
     One SharePoint Document Library called "JIL-Media" holds ALL files.
     runFullSetup() creates the folder tree automatically.
     No metadata list needed — files are read directly from Drive.

     Drive folder map:
       images/     → facility & product photos
       news/       → cover images for press-release cards
       events/     → event gallery photos
       awards/     → award ceremony / certificate photos
       videos/     → company videos, reels, product demos
       activities/ → CSR, celebrations, sports events
  ────────────────────────────────────────────────────────────────────── */
  drive: {
    driveId: "b!gvOpYGZUK0KyzeQlasz_YUMvEuzFv0tMts6s6s7AeLG40Z5YwUIdS7VqfYxAFXI1",         // ← paste from runFullSetup() output

    folders: {
      images:     "JIL-Media/images",
      news:       "JIL-Media/news",
      events:     "JIL-Media/events",
      awards:     "JIL-Media/awards",
      videos:     "JIL-Media/videos",
      activities: "JIL-Media/activities",
    },
  },
};
