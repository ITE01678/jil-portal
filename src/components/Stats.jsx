import { motion } from "framer-motion";

const STATS = [
  {
    label: "Employees",
    value: "250+",
    icon: "👥",
    gradient: "from-indigo-500 to-blue-600",
    glow: "shadow-indigo-500/30",
    change: "+12 this month",
    positive: true,
  },
  {
    label: "Active Projects",
    value: "120+",
    icon: "📁",
    gradient: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/30",
    change: "+8 this quarter",
    positive: true,
  },
  {
    label: "Happy Clients",
    value: "80+",
    icon: "🤝",
    gradient: "from-cyan-500 to-teal-600",
    glow: "shadow-cyan-500/30",
    change: "+5 this year",
    positive: true,
  },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {STATS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
          className="card flex items-center gap-5"
        >
          {/* Icon box */}
          <div className={`
            icon-box w-14 h-14 text-2xl flex-shrink-0
            bg-gradient-to-br ${s.gradient}
            shadow-lg ${s.glow}
          `}>
            {s.icon}
          </div>

          {/* Text */}
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
            <p className="text-3xl font-extrabold gradient-text leading-none mt-0.5">{s.value}</p>
            <p className="text-xs text-emerald-500 font-semibold mt-1">{s.change}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
