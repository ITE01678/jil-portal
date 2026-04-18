import { motion } from "framer-motion";

const QUICK_TIPS = [
  { icon: "📞", tip: "Start a video call directly from any channel." },
  { icon: "📁", tip: "Drag and drop files to share instantly in chat." },
  { icon: "📅", tip: "Use @meet to schedule a meeting with attendees." },
  { icon: "🔔", tip: "Set quiet hours to focus without interruptions." },
  { icon: "🔍", tip: "Search across messages, files, and people." },
];

const CHANNELS = [
  { name: "# general",        members: 48, icon: "💬" },
  { name: "# announcements",  members: 48, icon: "📢" },
  { name: "# dev-team",       members: 12, icon: "💻" },
  { name: "# hr-updates",     members: 31, icon: "👥" },
];

export default function TeamsChat() {
  return (
    <div className="space-y-8 page-content">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight">Teams Chat</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Connect and collaborate in real time with your team.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main launch card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-2 card flex flex-col items-center justify-center py-16 text-center
                     bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="
              icon-box w-24 h-24 text-5xl
              bg-gradient-to-br from-purple-500 to-indigo-600
              shadow-glow-purple mx-auto mb-7
            "
          >
            💬
          </motion.div>

          <h2 className="text-2xl font-extrabold mb-3">Microsoft Teams</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md leading-relaxed">
            Collaborate in real time — share files, join meetings, and message teammates without ever leaving your browser.
          </p>

          <a
            href="https://teams.microsoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-3.5"
          >
            Open Microsoft Teams →
          </a>

          <p className="text-xs text-slate-400 mt-4">Opens in a new tab</p>
        </motion.div>

        {/* Right column: tips + channels */}
        <div className="flex flex-col gap-6">

          {/* Popular channels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="card"
          >
            <h3 className="font-bold text-base mb-4">Popular Channels</h3>
            <div className="space-y-2.5">
              {CHANNELS.map((c, i) => (
                <div key={i}
                     className="flex items-center justify-between py-2 px-3 rounded-xl
                                hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer
                                transition-colors duration-150">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{c.icon}</span>
                    <span className="text-sm font-medium">{c.name}</span>
                  </div>
                  <span className="text-xs text-slate-400">{c.members} members</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className="card flex-1"
          >
            <h3 className="font-bold text-base mb-4">Quick Tips</h3>
            <div className="space-y-3">
              {QUICK_TIPS.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{t.icon}</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{t.tip}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
