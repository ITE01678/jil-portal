/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 *  SETUP SERVICE  —  One-time initialisation
 *  ─────────────────────────────────────────────────────────────────────
 *  Run ONCE after completing the Azure App Registration.
 *  Creates all 4 lists + the JIL-Media document library folder tree,
 *  then prints every ID you need to paste into sharepointConfig.js.
 *
 *  HOW TO RUN:
 *    1. Open http://localhost:5173 and sign in (needs SharePoint admin)
 *    2. Open DevTools → Console and paste:
 *
 *       const { runFullSetup } = await import("/src/services/setupService.js");
 *       const ids = await runFullSetup();
 *       console.table(ids);
 *
 *    3. Copy each printed ID into sharepointConfig.js
 *
 *  To only discover your site ID first:
 *       const { discoverSite } = await import("/src/services/setupService.js");
 *       discoverSite().then(console.table);
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { graphClient } from "./graphClient.js";
import { SHAREPOINT_CONFIG } from "../../azure-app-registration/sharepointConfig.js";

const { hostname, sitePath, drive } = SHAREPOINT_CONFIG;

/* ── Site discovery ─────────────────────────────────────────────────── */

export async function discoverSite() {
  const result = await graphClient.get("/sites?search=*");
  return (result?.value ?? []).map(s => ({
    name:   s.displayName,
    id:     s.id,
    webUrl: s.webUrl,
  }));
}

async function resolveSiteId() {
  const path    = sitePath.replace(/^\//, "");
  const segment = path ? `:/${path}` : "";
  const result  = await graphClient.get(`/sites/${hostname}${segment}`);
  return result.id;
}

/* ── List creation helper ───────────────────────────────────────────── */

async function findOrCreateList(siteId, displayName, columns) {
  const existing = await graphClient.getAll(
    `/sites/${siteId}/lists?$filter=displayName eq '${encodeURIComponent(displayName)}'`
  );
  if (existing.length > 0) {
    console.info(`[Setup] List "${displayName}" already exists — ID: ${existing[0].id}`);
    return existing[0].id;
  }

  const list = await graphClient.post(`/sites/${siteId}/lists`, {
    displayName,
    list: { template: "genericList" },
  });
  console.info(`[Setup] Created list "${displayName}" — ID: ${list.id}`);

  for (const col of columns) {
    try {
      await graphClient.post(`/sites/${siteId}/lists/${list.id}/columns`, col);
    } catch (err) {
      console.warn(`[Setup] Column "${col.name}" on "${displayName}": ${err.message}`);
    }
  }
  return list.id;
}

/* ── Column schemas ─────────────────────────────────────────────────── */

/*
 * LIST 1: JIL Active Sessions
 * Purpose: Cross-device online presence — one row per browser tab.
 * Columns:
 *   Title              (built-in)  User display name
 *   UserPrincipalName  text        Email / UPN
 *   SessionId          text        UUID per browser tab
 *   LastSeen           dateTime    Heartbeat timestamp (updated every 60s)
 *   DeviceType         choice      Desktop | Mobile | Tablet | Unknown
 *   Status             choice      Active | Away | Offline
 *   IsActive           boolean     false when the tab closes
 */
const ACTIVE_SESSIONS_COLUMNS = [
  { name: "UserPrincipalName", text:     { allowMultipleLines: false, maxLength: 255 } },
  { name: "SessionId",         text:     { allowMultipleLines: false, maxLength: 100 } },
  { name: "LastSeen",          dateTime: { displayAs: "dateTime", format: "dateTime" } },
  { name: "DeviceType",        choice:   { choices: ["Desktop", "Mobile", "Tablet", "Unknown"], allowTextEntry: false, defaultValue: "Desktop" } },
  { name: "Status",            choice:   { choices: ["Active", "Away", "Offline"],              allowTextEntry: false, defaultValue: "Active"  } },
  { name: "IsActive",          boolean:  {} },
];

/*
 * LIST 2: JIL Awards
 * Purpose: Awards and recognitions shown on the /media page.
 * Columns:
 *   Title          (built-in)  Award name
 *   Organization   text        Awarding body (e.g. "India Solar Week 2026")
 *   Description    text        1–2 sentence description
 *   Year           number      Award year (2000–2100)
 *   Icon           text        Single emoji (e.g. "🏆")
 *   GradientClass  text        Tailwind gradient (e.g. "from-solar-500 to-amber-600")
 *   ImageUrl       text        Photo URL from Drive or external source
 */
const AWARDS_COLUMNS = [
  { name: "Organization",  text:    { allowMultipleLines: false, maxLength: 300  } },
  { name: "Description",   text:    { allowMultipleLines: true,  linesForEditing: 4 } },
  { name: "Year",          number:  { decimalPlaces: "none", minimum: 2000, maximum: 2100 } },
  { name: "Icon",          text:    { allowMultipleLines: false, maxLength: 10   } },
  { name: "GradientClass", text:    { allowMultipleLines: false, maxLength: 200  } },
  { name: "ImageUrl",      text:    { allowMultipleLines: false, maxLength: 1000 } },
];

/*
 * LIST 3: JIL News & Activities
 * Purpose: Combined list for press releases, news articles, AND events/activities.
 *          Use the "Type" column to distinguish them in the UI.
 * Columns:
 *   Title          (built-in)  Headline / event name
 *   Type           choice      News | Activity | Press Release
 *   Excerpt        text        Short teaser (shown on card)
 *   Content        text        Full article body / details
 *   PublishDate    dateTime    Publication or event date
 *   Tag            text        Label (e.g. "Investment", "Trade Show")
 *   TagColor       text        Tailwind class for the tag pill
 *   GradientClass  text        Tailwind gradient for card accent
 *   ImageUrl       text        Cover image URL
 *   Year           number      For year filter
 *   IsPublished    boolean     false = draft, true = visible in UI
 *   Icon           text        Emoji (mainly for activities, e.g. "☀️")
 *   Category       choice      For activities: Trade Show | Employee | CSR | Anniversary | Other
 */
const NEWS_ACTIVITIES_COLUMNS = [
  { name: "jType",         choice:   { choices: ["News", "Activity", "Press Release"], allowTextEntry: false, defaultValue: "News" } },
  { name: "Excerpt",       text:     { allowMultipleLines: true,  linesForEditing: 4  } },
  { name: "Content",       text:     { allowMultipleLines: true,  linesForEditing: 20 } },
  { name: "PublishDate",   dateTime: { displayAs: "dateTime" } },
  { name: "Tag",           text:     { allowMultipleLines: false, maxLength: 100  } },
  { name: "TagColor",      text:     { allowMultipleLines: false, maxLength: 200  } },
  { name: "GradientClass", text:     { allowMultipleLines: false, maxLength: 200  } },
  { name: "ImageUrl",      text:     { allowMultipleLines: false, maxLength: 1000 } },
  { name: "Year",          number:   { decimalPlaces: "none", minimum: 2000, maximum: 2100 } },
  { name: "IsPublished",   boolean:  {} },
  { name: "Icon",          text:     { allowMultipleLines: false, maxLength: 10  } },
  { name: "Category",      choice:   { choices: ["Trade Show", "Employee", "CSR", "Anniversary", "Other"], allowTextEntry: false } },
];

/*
 * LIST 4: JIL Leaderboard
 * Purpose: Employee gaming leaderboard in the Fun Zone.
 *          One row per employee per game. Use GameId to support multiple games.
 * Columns:
 *   Title        (built-in)  Employee / player display name
 *   EmployeeId   text        Employee email or ID for uniqueness
 *   Department   text        Team / department
 *   Score        number      Total accumulated score
 *   Level        number      Current game level reached
 *   Wins         number      Total wins
 *   Losses       number      Total losses
 *   Streak       number      Current consecutive win streak
 *   GameId       text        Game identifier (e.g. "trivia", "snake", "quiz")
 *   AvatarEmoji  text        Player avatar emoji (e.g. "🦊")
 *   LastPlayed   dateTime    Timestamp of last game session
 */
const LEADERBOARD_COLUMNS = [
  { name: "EmployeeId",   text:     { allowMultipleLines: false, maxLength: 255 } },
  { name: "Department",   text:     { allowMultipleLines: false, maxLength: 200 } },
  { name: "Score",        number:   { decimalPlaces: "none", minimum: 0        } },
  { name: "Level",        number:   { decimalPlaces: "none", minimum: 1        } },
  { name: "Wins",         number:   { decimalPlaces: "none", minimum: 0        } },
  { name: "Losses",       number:   { decimalPlaces: "none", minimum: 0        } },
  { name: "Streak",       number:   { decimalPlaces: "none", minimum: 0        } },
  { name: "GameId",       text:     { allowMultipleLines: false, maxLength: 100 } },
  { name: "AvatarEmoji",  text:     { allowMultipleLines: false, maxLength: 10  } },
  { name: "LastPlayed",   dateTime: {} },
];

/* ── Drive folder setup ─────────────────────────────────────────────── */

async function resolveDriveId(siteId) {
  const drives   = await graphClient.getAll(`/sites/${siteId}/drives`);
  const jilDrive = drives.find(d => d.name === "JIL-Media" || d.name === "Documents");
  if (jilDrive) {
    console.info(`[Setup] Drive "${jilDrive.name}" — ID: ${jilDrive.id}`);
    return jilDrive.id;
  }
  throw new Error(
    "[Setup] No suitable drive found. " +
    "Create a document library named 'JIL-Media' in SharePoint first, then re-run."
  );
}

async function ensureFolder(siteId, driveId, folderPath) {
  try {
    await graphClient.get(`/sites/${siteId}/drives/${driveId}/root:/${folderPath}`);
    console.info(`[Setup] Folder "${folderPath}" already exists.`);
  } catch {
    const parts = folderPath.split("/");
    let current = "";
    for (const part of parts) {
      const parent = current;
      current      = current ? `${current}/${part}` : part;
      try {
        const parentPath = parent
          ? `/sites/${siteId}/drives/${driveId}/root:/${parent}:/children`
          : `/sites/${siteId}/drives/${driveId}/root/children`;
        await graphClient.post(parentPath, {
          name:   part,
          folder: {},
          "@microsoft.graph.conflictBehavior": "fail",
        });
        console.info(`[Setup] Created folder "${current}"`);
      } catch (err) {
        if (!err.message.includes("nameAlreadyExists")) {
          console.warn(`[Setup] Folder "${current}": ${err.message}`);
        }
      }
    }
  }
}

/* ── Main setup function ────────────────────────────────────────────── */

/**
 * Run once after completing the Azure App Registration.
 * Creates all 4 lists + JIL-Media folder tree.
 * Prints every ID you need to paste into sharepointConfig.js.
 *
 * @returns {Promise<object>}  { siteId, driveId, lists: { ... } }
 */
export async function runFullSetup() {
  console.group("[JIL Portal] Running full SharePoint setup…");

  /* Step 1 — Resolve site ID */
  let siteId;
  try {
    siteId = await resolveSiteId();
    console.info(`✅ siteId: "${siteId}"`);
  } catch (err) {
    console.error(`❌ Could not resolve site.\nCheck hostname/sitePath in sharepointConfig.js\n${err.message}`);
    console.groupEnd();
    throw err;
  }

  /* Step 2 — Create the 4 lists */
  const [
    activeSessionsId,
    awardsId,
    newsActivitiesId,
    leaderboardId,
  ] = await Promise.all([
    findOrCreateList(siteId, "JIL Active Sessions",  ACTIVE_SESSIONS_COLUMNS),
    findOrCreateList(siteId, "JIL Awards",           AWARDS_COLUMNS),
    findOrCreateList(siteId, "JIL News & Activities",NEWS_ACTIVITIES_COLUMNS),
    findOrCreateList(siteId, "JIL Leaderboard",      LEADERBOARD_COLUMNS),
  ]);
  console.info("✅ All 4 lists created / verified.");

  /* Step 3 — Drive and folder tree */
  const driveId = await resolveDriveId(siteId);
  for (const folder of Object.values(drive.folders)) {
    await ensureFolder(siteId, driveId, folder);
  }
  console.info("✅ JIL-Media folder tree ready.");

  /* Step 4 — Print results */
  const ids = {
    siteId,
    driveId,
    lists: { activeSessionsId, awardsId, newsActivitiesId, leaderboardId },
  };

  console.groupEnd();
  console.log("\n══════════════════════════════════════════════════════════");
  console.log("  COPY THESE INTO azure-app-registration/sharepointConfig.js");
  console.log("══════════════════════════════════════════════════════════");
  console.log(`  siteId:           "${siteId}"`);
  console.log(`  driveId:          "${driveId}"`);
  console.log(`  activeSessions:   "${activeSessionsId}"`);
  console.log(`  awards:           "${awardsId}"`);
  console.log(`  newsActivities:   "${newsActivitiesId}"`);
  console.log(`  leaderboard:      "${leaderboardId}"`);
  console.log("══════════════════════════════════════════════════════════\n");

  return ids;
}
