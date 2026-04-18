/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 *  MEDIA SERVICE  —  SharePoint Drive (Document Library)
 *  ─────────────────────────────────────────────────────────────────────
 *  Reads, uploads, and deletes files in the JIL-Media document library.
 *  Files are read DIRECTLY from Drive — no separate metadata list needed.
 *
 *  Drive folder → UI section mapping:
 *    images/     →  Infrastructure gallery (/media)
 *    news/       →  Cover images for press-release cards
 *    events/     →  Events gallery (/media)
 *    awards/     →  Award photos (/media)
 *    videos/     →  Video gallery
 *    activities/ →  CSR / celebrations gallery
 *
 *  USAGE:
 *    import { MediaService } from "../services/mediaService";
 *
 *    // List all files in a folder (returns array ready for <img src>)
 *    const photos = await MediaService.listFolder("events");
 *
 *    // Upload a file from an <input type="file">
 *    const saved = await MediaService.upload(file, "events", pct => setProgress(pct));
 *
 *    // Refresh an expired download URL (URLs expire after ~1 hour)
 *    const url = await MediaService.getDownloadUrl(driveItemId);
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import { graphClient } from "./graphClient.js";
import { SHAREPOINT_CONFIG } from "../../azure-app-registration/sharepointConfig.js";

const { siteId, drive } = SHAREPOINT_CONFIG;

/* ── Path helpers ───────────────────────────────────────────────────── */

const folderPath = (key) =>
  `/sites/${siteId}/drives/${drive.driveId}/root:/${drive.folders[key] ?? key}:`;

const filePath = (key, name) =>
  `/sites/${siteId}/drives/${drive.driveId}/root:/${drive.folders[key] ?? key}/${name}:`;

const itemById = (id) =>
  `/sites/${siteId}/drives/${drive.driveId}/items/${id}`;

/* ── Response normaliser ────────────────────────────────────────────── */

function normalise(item) {
  return {
    id:          item.id,
    name:        item.name,
    size:        item.size ?? 0,
    mimeType:    item.file?.mimeType ?? "",
    downloadUrl: item["@microsoft.graph.downloadUrl"] ?? "",
    webUrl:      item.webUrl ?? "",
    thumbnailSm: item.thumbnails?.[0]?.small?.url  ?? "",
    thumbnailMd: item.thumbnails?.[0]?.medium?.url ?? "",
    thumbnailLg: item.thumbnails?.[0]?.large?.url  ?? "",
    createdAt:   item.createdDateTime,
    modifiedAt:  item.lastModifiedDateTime,
    createdBy:   item.createdBy?.user?.displayName ?? "",
  };
}

/* ══════════════════════════════════════════════════════════════════════
   MediaService
   ══════════════════════════════════════════════════════════════════════ */
export const MediaService = {

  /* ── List files ─────────────────────────────────────────────────── */

  /**
   * List all files in a Drive folder.
   *
   * @param {"images"|"news"|"events"|"awards"|"videos"|"activities"} folderKey
   * @param {boolean} withThumbnails  — include thumbnail URLs (default true)
   * @returns {Promise<Array>}
   *
   * @example
   *   const photos = await MediaService.listFolder("events", true);
   *   // Each item: { id, name, downloadUrl, thumbnailMd, webUrl, ... }
   */
  async listFolder(folderKey, withThumbnails = true) {
    const expand = withThumbnails ? "?expand=thumbnails" : "";
    const items  = await graphClient.getAll(
      `${folderPath(folderKey)}/children${expand}`
    );
    return items.filter(i => i.file).map(normalise);
  },

  /**
   * List ALL files across ALL folders.
   * Returns flat array; each item has a `folder` property.
   * Useful for admin media browsers.
   */
  async listAll() {
    const results = await Promise.allSettled(
      Object.keys(drive.folders).map(key =>
        this.listFolder(key, true).then(files =>
          files.map(f => ({ ...f, folder: key }))
        )
      )
    );
    return results
      .filter(r => r.status === "fulfilled")
      .flatMap(r => r.value);
  },

  /* ── Upload ─────────────────────────────────────────────────────── */

  /**
   * Upload a file ≤ 4 MB (images, PDFs).
   *
   * @param {File}     file        — from <input type="file">
   * @param {string}   folderKey   — destination folder
   * @param {Function} [onProgress]— (pct: number) => void
   * @returns {Promise<object>}    normalised file metadata
   */
  async upload(file, folderKey, onProgress) {
    if (!file) throw new Error("[MediaService] No file provided.");
    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const item     = await graphClient.upload(`${filePath(folderKey, safeName)}/content`, file);
    if (onProgress) onProgress(100);
    return normalise(item);
  },

  /**
   * Upload large files > 4 MB (videos) using a resumable session.
   * Sends in 5 MB chunks; calls onProgress with 0–100.
   *
   * @param {File}     file
   * @param {string}   folderKey
   * @param {Function} [onProgress]
   * @returns {Promise<object>}
   */
  async uploadLarge(file, folderKey, onProgress) {
    const safeName   = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const session    = await graphClient.post(
      `${filePath(folderKey, safeName)}/createUploadSession`,
      { item: { "@microsoft.graph.conflictBehavior": "rename" } }
    );

    const chunkSize = 5 * 1024 * 1024;
    let   offset    = 0;
    let   lastItem;

    while (offset < file.size) {
      const end   = Math.min(offset + chunkSize - 1, file.size - 1);
      const chunk = file.slice(offset, offset + chunkSize);
      const res   = await fetch(session.uploadUrl, {
        method:  "PUT",
        headers: {
          "Content-Length": String(chunk.size),
          "Content-Range":  `bytes ${offset}-${end}/${file.size}`,
        },
        body: chunk,
      });
      if (!res.ok) throw new Error(`[MediaService] Chunk upload failed at byte ${offset}`);
      offset += chunkSize;
      if (onProgress) onProgress(Math.min(99, Math.round((offset / file.size) * 100)));
      if (offset >= file.size) { lastItem = await res.json(); if (onProgress) onProgress(100); }
    }
    return normalise(lastItem);
  },

  /* ── Read single file ───────────────────────────────────────────── */

  /**
   * Get metadata + a FRESH download URL for a specific file.
   * Call this when a stored downloadUrl has expired (~1 hour TTL).
   */
  async getItem(driveItemId) {
    const item = await graphClient.get(
      `${itemById(driveItemId)}?select=id,name,size,file,webUrl,` +
      `@microsoft.graph.downloadUrl,createdDateTime,lastModifiedDateTime,createdBy`
    );
    return normalise(item);
  },

  async getDownloadUrl(driveItemId) {
    return (await this.getItem(driveItemId)).downloadUrl;
  },

  async getThumbnails(driveItemId) {
    const result = await graphClient.get(`${itemById(driveItemId)}/thumbnails`);
    return result?.value?.[0] ?? {};
  },

  /* ── Share & delete ─────────────────────────────────────────────── */

  /**
   * Create a shareable link.
   * @param {"organization"|"anonymous"} scope
   * @param {"view"|"edit"} type
   */
  async createShareLink(driveItemId, scope = "organization", type = "view") {
    const result = await graphClient.post(
      `${itemById(driveItemId)}/createLink`,
      { type, scope }
    );
    return result.link?.webUrl ?? "";
  },

  async delete(driveItemId) {
    return graphClient.delete(itemById(driveItemId));
  },

  /* ── Folder utils ───────────────────────────────────────────────── */

  async folderExists(folderKey) {
    try { await graphClient.get(folderPath(folderKey)); return true; }
    catch { return false; }
  },

  async createSubFolder(parentKey, folderName) {
    return graphClient.post(
      `/sites/${siteId}/drives/${drive.driveId}/root:/${drive.folders[parentKey] ?? parentKey}:/children`,
      { name: folderName, folder: {}, "@microsoft.graph.conflictBehavior": "fail" }
    );
  },
};
