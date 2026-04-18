/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 *  SHAREPOINT LISTS SERVICE  —  4 lists
 *  ─────────────────────────────────────────────────────────────────────
 *  All CRUD operations for the four JIL Portal lists.
 *
 *  Exports:
 *    AwardsService         → /media awards section
 *    NewsActivitiesService → /media news + activities gallery
 *    LeaderboardService    → /employee/fun leaderboard
 *    ContactEnquiriesService → /contact form (optional — needs contactEnquiries ID)
 *
 *  USAGE:
 *    import { AwardsService } from "../services/listsService";
 *    const awards = await AwardsService.getAll();
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { graphClient } from "./graphClient.js";
import { SHAREPOINT_CONFIG } from "../../azure-app-registration/sharepointConfig.js";

const { siteId, lists } = SHAREPOINT_CONFIG;

/* ── Shared helpers ─────────────────────────────────────────────────── */

const listBase = (id)           => `/sites/${siteId}/lists/${id}`;
const itemsUrl = (id, query="") => `${listBase(id)}/items?expand=fields${query ? `&${query}` : ""}`;
const toFields = (item)         => ({ _id: item.id, ...item.fields });


/* ═══════════════════════════════════════════════════════════════════════
   1. AWARDS SERVICE
   ═══════════════════════════════════════════════════════════════════════
   List:    "JIL Awards"    →   sharepointConfig.lists.awards
   Columns: Title (award name) · Organization · Description · Year
            Icon · GradientClass · ImageUrl
*/
export const AwardsService = {

  /** All awards, newest year first. */
  async getAll() {
    const items = await graphClient.getAll(
      itemsUrl(lists.awards, "$orderby=fields/Year desc")
    );
    return items.map(toFields);
  },

  /** Awards filtered by year. */
  async getByYear(year) {
    const items = await graphClient.getAll(
      itemsUrl(lists.awards, `$filter=fields/Year eq ${year}`)
    );
    return items.map(toFields);
  },

  /**
   * Create an award.
   * @param {{ title, organization, description, year, icon, gradientClass, imageUrl }} data
   */
  async create({ title, organization, description, year, icon, gradientClass, imageUrl }) {
    const item = await graphClient.post(`${listBase(lists.awards)}/items`, {
      fields: {
        Title:         title,
        Organization:  organization  || "",
        Description:   description   || "",
        Year:          year          || new Date().getFullYear(),
        Icon:          icon          || "🏆",
        GradientClass: gradientClass || "from-solar-500 to-amber-600",
        ImageUrl:      imageUrl      || "",
      },
    });
    return toFields(item);
  },

  /** Update any fields on an award. */
  async update(itemId, fields) {
    return graphClient.patch(`${listBase(lists.awards)}/items/${itemId}/fields`, fields);
  },

  /** Delete an award. */
  async delete(itemId) {
    return graphClient.delete(`${listBase(lists.awards)}/items/${itemId}`);
  },
};


/* ═══════════════════════════════════════════════════════════════════════
   2. NEWS & ACTIVITIES SERVICE
   ═══════════════════════════════════════════════════════════════════════
   List:    "JIL News & Activities"   →   sharepointConfig.lists.newsActivities
   Columns: Title · jType · Excerpt · Content · PublishDate
            Tag · TagColor · GradientClass · ImageUrl
            Year · IsPublished · Icon · Category

   jType values (named "jType" because SharePoint has a built-in "Type" column):
     "News"            → press releases, company news
     "Press Release"   → formal press releases
     "Activity"        → events, CSR drives, celebrations
*/
export const NewsActivitiesService = {

  /** Published news and press releases (public UI). */
  async getNews() {
    const items = await graphClient.getAll(
      itemsUrl(
        lists.newsActivities,
        "$filter=fields/IsPublished eq 1 and (fields/jType eq 'News' or fields/jType eq 'Press Release')&$orderby=fields/PublishDate desc"
      )
    );
    return items.map(toFields);
  },

  /** Published activities / events (public UI gallery). */
  async getActivities() {
    const items = await graphClient.getAll(
      itemsUrl(
        lists.newsActivities,
        "$filter=fields/IsPublished eq 1 and fields/jType eq 'Activity'&$orderby=fields/PublishDate desc"
      )
    );
    return items.map(toFields);
  },

  /** Published activities filtered by category. */
  async getActivitiesByCategory(category) {
    const catFilter = category ? ` and fields/Category eq '${category}'` : "";
    const items = await graphClient.getAll(
      itemsUrl(
        lists.newsActivities,
        `$filter=fields/IsPublished eq 1 and fields/jType eq 'Activity'${catFilter}&$orderby=fields/PublishDate desc`
      )
    );
    return items.map(toFields);
  },

  /** All items including drafts — for employee admin. */
  async getAll() {
    const items = await graphClient.getAll(
      itemsUrl(lists.newsActivities, "$orderby=fields/PublishDate desc")
    );
    return items.map(toFields);
  },

  /** News filtered by year. */
  async getByYear(year) {
    const items = await graphClient.getAll(
      itemsUrl(
        lists.newsActivities,
        `$filter=fields/Year eq ${year} and fields/IsPublished eq 1`
      )
    );
    return items.map(toFields);
  },

  /**
   * Create a news article or activity.
   * @param {{ title, type, excerpt, content, publishDate, tag, tagColor,
   *           gradientClass, imageUrl, year, isPublished, icon, category }} data
   */
  async create({
    title, type = "News", excerpt, content, publishDate,
    tag, tagColor, gradientClass, imageUrl, year, isPublished = false,
    icon, category,
  }) {
    const item = await graphClient.post(`${listBase(lists.newsActivities)}/items`, {
      fields: {
        Title:         title,
        jType:         type,
        Excerpt:       excerpt       || "",
        Content:       content       || "",
        PublishDate:   publishDate   || new Date().toISOString(),
        Tag:           tag           || "",
        TagColor:      tagColor      || "bg-solar-100 text-solar-700 dark:bg-solar-900/30 dark:text-solar-400",
        GradientClass: gradientClass || "from-solar-500 to-amber-600",
        ImageUrl:      imageUrl      || "",
        Year:          year          || new Date().getFullYear(),
        IsPublished:   isPublished,
        Icon:          icon          || "",
        Category:      category      || "",
      },
    });
    return toFields(item);
  },

  /** Publish or unpublish an item. */
  async setPublished(itemId, published) {
    return graphClient.patch(
      `${listBase(lists.newsActivities)}/items/${itemId}/fields`,
      { IsPublished: published }
    );
  },

  /** Update any fields. */
  async update(itemId, fields) {
    return graphClient.patch(
      `${listBase(lists.newsActivities)}/items/${itemId}/fields`,
      fields
    );
  },

  /** Delete an item. */
  async delete(itemId) {
    return graphClient.delete(`${listBase(lists.newsActivities)}/items/${itemId}`);
  },
};


/* ═══════════════════════════════════════════════════════════════════════
   3. LEADERBOARD SERVICE
   ═══════════════════════════════════════════════════════════════════════
   List:    "JIL Leaderboard"   →   sharepointConfig.lists.leaderboard
   Columns: Title (name) · EmployeeId · Department · Score · Level
            Wins · Losses · Streak · GameId · AvatarEmoji · LastPlayed

   Each employee has ONE row per game. Use upsertScore() to update
   existing entries — it checks by EmployeeId + GameId first.
*/
export const LeaderboardService = {

  /**
   * Top N scores for a game, sorted highest score first.
   * @param {string} gameId   — e.g. "trivia", "quiz", "snake"
   * @param {number} limit    — number of top entries to return (default 10)
   */
  async getTopScores(gameId, limit = 10) {
    const items = await graphClient.getAll(
      itemsUrl(
        lists.leaderboard,
        `$filter=fields/GameId eq '${gameId}'&$orderby=fields/Score desc&$top=${limit}`
      )
    );
    return items.map(toFields);
  },

  /** Full leaderboard across all games, sorted by score. */
  async getAll(limit = 50) {
    const items = await graphClient.getAll(
      itemsUrl(lists.leaderboard, `$orderby=fields/Score desc&$top=${limit}`)
    );
    return items.map(toFields);
  },

  /**
   * Get a single player's record for a specific game.
   * Returns null if no record exists yet.
   */
  async getPlayerRecord(employeeId, gameId) {
    const items = await graphClient.getAll(
      itemsUrl(
        lists.leaderboard,
        `$filter=fields/EmployeeId eq '${encodeURIComponent(employeeId)}' and fields/GameId eq '${gameId}'`
      )
    );
    return items.length > 0 ? toFields(items[0]) : null;
  },

  /**
   * Create or update a player's score after a game session.
   * If a record exists for this employee + game, updates score/wins/losses.
   * If not, creates a new record.
   *
   * @param {{ name, employeeId, department, gameId, score, won, avatarEmoji }} data
   * @returns {Promise<object>}  updated record
   */
  async upsertScore({ name, employeeId, department, gameId, score, won, avatarEmoji = "🎮" }) {
    const existing = await this.getPlayerRecord(employeeId, gameId);

    if (existing) {
      const newScore  = Math.max(existing.Score  || 0, score);
      const newLevel  = Math.floor(newScore / 100) + 1;
      const newWins   = (existing.Wins   || 0) + (won ? 1 : 0);
      const newLosses = (existing.Losses || 0) + (won ? 0 : 1);
      const newStreak = won
        ? (existing.Streak || 0) + 1
        : 0;

      return graphClient.patch(
        `${listBase(lists.leaderboard)}/items/${existing._id}/fields`,
        {
          Score:       newScore,
          Level:       newLevel,
          Wins:        newWins,
          Losses:      newLosses,
          Streak:      newStreak,
          LastPlayed:  new Date().toISOString(),
        }
      );
    }

    // First time playing
    const item = await graphClient.post(`${listBase(lists.leaderboard)}/items`, {
      fields: {
        Title:        name,
        EmployeeId:   employeeId,
        Department:   department   || "",
        Score:        score,
        Level:        Math.floor(score / 100) + 1,
        Wins:         won ? 1 : 0,
        Losses:       won ? 0 : 1,
        Streak:       won ? 1 : 0,
        GameId:       gameId,
        AvatarEmoji:  avatarEmoji,
        LastPlayed:   new Date().toISOString(),
      },
    });
    return toFields(item);
  },

  /** Reset a player's record (admin only). */
  async delete(itemId) {
    return graphClient.delete(`${listBase(lists.leaderboard)}/items/${itemId}`);
  },
};


/* ═══════════════════════════════════════════════════════════════════════
   4. CONTACT ENQUIRIES SERVICE  (OPTIONAL)
   ═══════════════════════════════════════════════════════════════════════
   Only active when sharepointConfig.lists.contactEnquiries is set to a
   real list ID (not "SKIP"). Otherwise Contact.jsx uses email fallback.
   Create the list manually:
     findOrCreateList(siteId, "JIL Contact Enquiries", CONTACT_COLUMNS)
   Columns: Title (name) · Email · Company · Subject · Message
            SubmittedAt · Status · ReferenceCode
*/
const CONTACT_READY = lists.contactEnquiries && lists.contactEnquiries !== "SKIP";

export const ContactEnquiriesService = {

  /** Save a public contact-form submission. Returns the generated reference code. */
  async submit({ name, email, company, subject, message }) {
    if (!CONTACT_READY) throw new Error("[Contact] List not configured — add ID to sharepointConfig.lists.contactEnquiries");
    const ref  = `JIL-${Date.now().toString(36).toUpperCase()}`;
    const item = await graphClient.post(`${listBase(lists.contactEnquiries)}/items`, {
      fields: {
        Title:         name,
        Email:         email,
        Company:       company  || "",
        Subject:       subject,
        Message:       message,
        SubmittedAt:   new Date().toISOString(),
        Status:        "New",
        ReferenceCode: ref,
      },
    });
    return { _id: item.id, ReferenceCode: ref };
  },

  /** All enquiries — employee admin view. */
  async getAll({ status } = {}) {
    if (!CONTACT_READY) return [];
    const filter = status
      ? `$filter=fields/Status eq '${status}'`
      : "$orderby=fields/SubmittedAt desc";
    const items = await graphClient.getAll(itemsUrl(lists.contactEnquiries, filter));
    return items.map(toFields);
  },

  /** Update status: New → Read → Replied → Archived */
  async updateStatus(itemId, status) {
    return graphClient.patch(
      `${listBase(lists.contactEnquiries)}/items/${itemId}/fields`,
      { Status: status }
    );
  },

  async delete(itemId) {
    return graphClient.delete(`${listBase(lists.contactEnquiries)}/items/${itemId}`);
  },
};
