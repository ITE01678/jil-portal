import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FORMS } from "../../../azure-app-registration/azureConfig";

/* ── Form modal with iframe ──────────────────────────────────────────── */
function FormModal({ form, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={e => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: "90vh" }}
        >
          {/* Modal header */}
          <div className={`bg-gradient-to-r ${form.gradient} px-6 py-4 flex items-center gap-4 flex-shrink-0`}>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              {form.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-lg leading-tight">{form.title}</h2>
              <p className="text-white/70 text-xs truncate">{form.description}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors flex-shrink-0"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* iframe area */}
          <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-800/50 p-4 min-h-0">
            {form.iframeSrc ? (
              <iframe
                src={form.iframeSrc}
                title={form.title}
                className="w-full h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white"
                style={{ minHeight: "60vh" }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[55vh] gap-5 text-center">
                <div className={`icon-box w-16 h-16 text-3xl bg-gradient-to-br ${form.gradient} shadow-lg`}>
                  {form.icon}
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">{form.title}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                    The form URL hasn't been configured yet. Add the Microsoft Forms link to{" "}
                    <code className="text-indigo-500 font-mono text-xs bg-indigo-50 dark:bg-indigo-950/50 px-1 py-0.5 rounded">
                      iframeSrc
                    </code>{" "}
                    in <code className="text-indigo-500 font-mono text-xs bg-indigo-50 dark:bg-indigo-950/50 px-1 py-0.5 rounded">FormsHub.jsx</code>.
                  </p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${form.badgeColor}`}>{form.badge}</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function FormsHub() {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="space-y-8 page-content">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight">Forms Hub</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Submit and track all company forms in one place. Click a card to open the form.
        </p>
      </motion.div>

      {/* 10 Form cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {FORMS.map((form, i) => (
          <motion.button
            key={form.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            onClick={() => setActiveForm(form)}
            className="card text-left p-0 overflow-hidden hover:scale-[1.02] hover:shadow-card-hover cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {/* Card picture — gradient header */}
            <div className={`h-28 bg-gradient-to-br ${form.gradient} flex items-center justify-center relative overflow-hidden`}>
              {/* Background orb */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                {form.icon}
              </span>
            </div>

            {/* Card body */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-sm leading-snug">{form.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${form.badgeColor}`}>
                  {form.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {form.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-indigo-500 dark:text-indigo-400 text-xs font-semibold group-hover:gap-2 transition-all duration-200">
                Open form <span>→</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal */}
      {activeForm && <FormModal form={activeForm} onClose={() => setActiveForm(null)} />}
    </div>
  );
}
