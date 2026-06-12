import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsAuthenticated } from "@azure/msal-react";
import { MediaService } from "../../services/mediaService";
import { SHAREPOINT_CONFIG } from "../../../azure-app-registration/sharepointConfig";

const DRIVE_READY =
  !!SHAREPOINT_CONFIG.drive?.driveId &&
  !SHAREPOINT_CONFIG.drive.driveId.includes("REPLACE");

const MEDIA_FOLDERS = [
  { key: "images",     icon: "🖼️", label: "Images",     color: "from-indigo-500 to-blue-600",   desc: "Facility & product photos"       },
  { key: "awards",     icon: "🏆", label: "Awards",     color: "from-solar-500 to-amber-600",   desc: "Award ceremonies & certificates" },
  { key: "events",     icon: "🎉", label: "Events",     color: "from-purple-500 to-violet-600", desc: "Trade shows & exhibitions"       },
  { key: "news",       icon: "📰", label: "News",       color: "from-navy-700 to-navy-500",     desc: "Press coverage & releases"       },
  { key: "videos",     icon: "🎬", label: "Videos",     color: "from-rose-500 to-pink-600",     desc: "Company & product videos"        },
  { key: "activities", icon: "🌿", label: "Activities", color: "from-leaf-500 to-teal-600",     desc: "CSR & celebration moments"       },
];

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );
}

function MediaModal({
  folder, files, loading,
  lightboxImages, lightboxIdx, setLightboxIdx,
  onClose, canUpload, onUpload, uploadProgress,
  onDelete, confirmDeleteId, setConfirmDeleteId,
}) {
  if (!folder) return null;

  return (
    <>
      {/* ── Full-screen browser — z-[100] sits above the z-50 header ── */}
      <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: "rgba(5,10,20,0.97)" }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 bg-slate-900 border-b border-slate-700/60 flex-shrink-0">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${folder.color} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}>
            {folder.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold text-base leading-tight">{folder.label}</h2>
            <p className="text-slate-400 text-xs truncate">{folder.desc}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {canUpload && (
              <button
                onClick={onUpload}
                disabled={uploadProgress !== null}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors whitespace-nowrap"
              >
                {uploadProgress !== null ? `Uploading ${uploadProgress}%` : "+ Add Media"}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/60 flex items-center justify-center text-white text-sm transition-colors"
              aria-label="Close"
            >✕</button>
          </div>
        </div>

        {uploadProgress !== null && (
          <div className="h-0.5 bg-slate-800 flex-shrink-0">
            <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        )}

        {/* File grid */}
        <div className="flex-1 overflow-y-auto p-5" onClick={() => setConfirmDeleteId(null)}>
          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-slate-800/60 animate-pulse" />
              ))}
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[55vh] gap-5 text-center">
              <span className="text-7xl select-none" style={{ opacity: 0.15 }}>{folder.icon}</span>
              <div>
                <p className="text-white/50 font-semibold text-lg">No files yet</p>
                <p className="text-slate-500 text-sm mt-2 max-w-xs leading-relaxed">
                  {!DRIVE_READY
                    ? "Configure SharePoint Drive in sharepointConfig.js to enable the media library."
                    : 'Click "+ Add Media" above to upload the first file.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {files.map((file, idx) => {
                const isImage = file.mimeType?.startsWith("image/");
                const isVideo = file.mimeType?.startsWith("video/");
                const thumb   = file.thumbnailMd || file.thumbnailSm;
                const imgIdx  = isImage ? lightboxImages.findIndex(f => f.id === file.id) : -1;
                const isConfirming = confirmDeleteId === file.id;

                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(idx * 0.015, 0.4) }}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-800"
                  >
                    {/* Clickable media area */}
                    <button
                      onClick={() => imgIdx !== -1
                        ? setLightboxIdx(imgIdx)
                        : window.open(file.webUrl || file.downloadUrl, "_blank")}
                      className="w-full h-full focus:outline-none"
                      title={file.name}
                    >
                      {isImage && thumb ? (
                        <img src={thumb} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      ) : isVideo ? (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 relative">
                          {thumb && <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
                          <div className="relative z-10 w-12 h-12 rounded-full bg-black/70 backdrop-blur flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl pl-0.5">▶</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-slate-500 px-2">
                          <span className="text-3xl">📄</span>
                          <span className="text-[9px] text-center truncate w-full">{file.name}</span>
                        </div>
                      )}
                    </button>

                    {/* Hover overlay: filename + delete */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent py-2 px-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between gap-1">
                      <p className="text-white text-[9px] truncate flex-1">{file.name}</p>
                      {canUpload && !isConfirming && (
                        <button
                          onClick={e => { e.stopPropagation(); setConfirmDeleteId(file.id); }}
                          className="flex-shrink-0 w-6 h-6 rounded bg-white/10 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
                          title="Delete file"
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>

                    {/* Delete confirmation overlay */}
                    {isConfirming && (
                      <div
                        className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 p-2"
                        onClick={e => e.stopPropagation()}
                      >
                        <p className="text-white text-[10px] font-semibold text-center leading-tight">Delete this file?</p>
                        <div className="flex gap-1.5">
                          <button
                            onClick={e => { e.stopPropagation(); onDelete(file.id); }}
                            className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold transition-colors"
                          >Delete</button>
                          <button
                            onClick={e => { e.stopPropagation(); setConfirmDeleteId(null); }}
                            className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold transition-colors"
                          >Cancel</button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox — z-[110] sits above the modal ── */}
      <AnimatePresence>
        {lightboxIdx !== null && lightboxImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/97 flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            {lightboxImages.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + lightboxImages.length) % lightboxImages.length); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl font-light transition-colors z-10"
              >‹</button>
            )}
            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.18 }}
              src={lightboxImages[lightboxIdx]?.downloadUrl || lightboxImages[lightboxIdx]?.thumbnailLg}
              alt={lightboxImages[lightboxIdx]?.name}
              className="max-w-[88vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            {lightboxImages.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % lightboxImages.length); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl font-light transition-colors z-10"
              >›</button>
            )}
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-red-500/60 text-white flex items-center justify-center transition-colors z-10"
            >✕</button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
              <p className="text-white/50 text-[11px] max-w-[60vw] truncate text-center">{lightboxImages[lightboxIdx]?.name}</p>
              <p className="text-white/30 text-[10px]">{lightboxIdx + 1} / {lightboxImages.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function EmployeeMedia() {
  const isAuthenticated = useIsAuthenticated();

  const [activeFolderKey,  setActiveFolderKey]  = useState(null);
  const [folderFiles,      setFolderFiles]      = useState([]);
  const [folderLoading,    setFolderLoading]    = useState(false);
  const [lightboxIdx,      setLightboxIdx]      = useState(null);
  const [uploadProgress,   setUploadProgress]   = useState(null);
  const [confirmDeleteId,  setConfirmDeleteId]  = useState(null);
  const uploadInputRef = useRef(null);

  const activeFolder   = MEDIA_FOLDERS.find(f => f.key === activeFolderKey) ?? null;
  const lightboxImages = folderFiles.filter(f => f.mimeType?.startsWith("image/"));
  const canUpload      = isAuthenticated && DRIVE_READY;

  const openFolder = useCallback(async (key) => {
    setActiveFolderKey(key);
    setFolderFiles([]);
    setLightboxIdx(null);
    setConfirmDeleteId(null);
    if (!DRIVE_READY) { setFolderLoading(false); return; }
    setFolderLoading(true);
    try {
      const files = await MediaService.listFolder(key, true);
      setFolderFiles(files);
    } catch { }
    finally { setFolderLoading(false); }
  }, []);

  const closeFolder = useCallback(() => {
    setActiveFolderKey(null);
    setFolderFiles([]);
    setLightboxIdx(null);
    setUploadProgress(null);
    setConfirmDeleteId(null);
  }, []);

  const triggerUpload = useCallback(() => uploadInputRef.current?.click(), []);

  const handleUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file || !activeFolderKey) return;
    e.target.value = "";
    setUploadProgress(0);
    try {
      const uploader = file.size > 4 * 1024 * 1024
        ? (f, k, cb) => MediaService.uploadLarge(f, k, cb)
        : (f, k, cb) => MediaService.upload(f, k, cb);
      await uploader(file, activeFolderKey, setUploadProgress);
      const files = await MediaService.listFolder(activeFolderKey, true);
      setFolderFiles(files);
    } catch { }
    finally { setUploadProgress(null); }
  }, [activeFolderKey]);

  const handleDelete = useCallback(async (fileId) => {
    setConfirmDeleteId(null);
    try {
      await MediaService.delete(fileId);
      setFolderFiles(prev => prev.filter(f => f.id !== fileId));
    } catch { }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (lightboxIdx !== null) {
        if (e.key === "ArrowRight") setLightboxIdx(i => (i + 1) % lightboxImages.length);
        if (e.key === "ArrowLeft")  setLightboxIdx(i => (i - 1 + lightboxImages.length) % lightboxImages.length);
        if (e.key === "Escape")     setLightboxIdx(null);
      } else if (activeFolderKey) {
        if (e.key === "Escape") closeFolder();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, lightboxImages.length, activeFolderKey, closeFolder]);

  return (
    <div className="page-content">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Media Library
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Upload, browse, and manage company media — photos, videos, and documents.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {MEDIA_FOLDERS.map((folder, i) => (
          <motion.button
            key={folder.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => openFolder(folder.key)}
            className="group card p-0 overflow-hidden text-center hover:scale-[1.04] hover:shadow-card-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
            <div className={`h-24 bg-gradient-to-br ${folder.color} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-lg select-none">
                {folder.icon}
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm mb-0.5">{folder.label}</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{folder.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {!DRIVE_READY && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 text-sm text-amber-700 dark:text-amber-400">
          SharePoint Drive not configured. Set <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">drive.driveId</code> in <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">sharepointConfig.js</code> to enable file browsing.
        </div>
      )}

      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*,video/*,application/pdf"
        className="hidden"
        onChange={handleUpload}
      />

      <AnimatePresence>
        {activeFolderKey && (
          <MediaModal
            folder={activeFolder}
            files={folderFiles}
            loading={folderLoading}
            lightboxImages={lightboxImages}
            lightboxIdx={lightboxIdx}
            setLightboxIdx={setLightboxIdx}
            onClose={closeFolder}
            canUpload={canUpload}
            onUpload={triggerUpload}
            uploadProgress={uploadProgress}
            onDelete={handleDelete}
            confirmDeleteId={confirmDeleteId}
            setConfirmDeleteId={setConfirmDeleteId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
