import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

const PILLARS = [
  {
    icon: "☁️",
    title: "Azure Cloud",
    desc: "Fully hosted on Microsoft Azure with multi-region redundancy across Southeast Asia and West Europe.",
    gradient: "from-blue-500 to-cyan-600",
    stats: [{ label: "Regions", value: "3" }, { label: "Availability Zones", value: "9" }],
  },
  {
    icon: "🛡️",
    title: "Security & Compliance",
    desc: "ISO 27001 certified. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). SOC 2 Type II audit passed.",
    gradient: "from-emerald-500 to-teal-600",
    stats: [{ label: "Encryption", value: "AES-256" }, { label: "Compliance", value: "ISO 27001" }],
  },
  {
    icon: "⚡",
    title: "Performance",
    desc: "Sub-100ms API response times with global CDN delivery. Auto-scaling ensures zero degradation during peak load.",
    gradient: "from-amber-500 to-orange-600",
    stats: [{ label: "Avg. Latency", value: "<100ms" }, { label: "CDN PoPs", value: "60+" }],
  },
  {
    icon: "🔄",
    title: "CI/CD Pipeline",
    desc: "Automated deployments via Azure DevOps with blue-green deployments, zero-downtime rollouts, and instant rollbacks.",
    gradient: "from-purple-500 to-indigo-600",
    stats: [{ label: "Deploy Freq.", value: "Daily" }, { label: "Rollback Time", value: "<2min" }],
  },
  {
    icon: "📡",
    title: "Monitoring",
    desc: "End-to-end observability with Azure Monitor, Application Insights, and 24/7 on-call SRE team.",
    gradient: "from-cyan-500 to-blue-600",
    stats: [{ label: "Uptime SLA", value: "99.9%" }, { label: "Alerts", value: "Real-time" }],
  },
  {
    icon: "💾",
    title: "Data & Backup",
    desc: "Geo-redundant storage with daily automated backups, point-in-time restore, and 30-day retention.",
    gradient: "from-rose-500 to-red-600",
    stats: [{ label: "Retention", value: "30 days" }, { label: "RPO", value: "<1 hr" }],
  },
];

const SYSTEM_STATUS = [
  { service: "Web Portal",          status: "Operational", uptime: "99.98%", dot: "bg-emerald-400" },
  { service: "Authentication (Entra ID)", status: "Operational", uptime: "99.99%", dot: "bg-emerald-400" },
  { service: "Forms Service",       status: "Operational", uptime: "99.97%", dot: "bg-emerald-400" },
  { service: "Analytics Engine",    status: "Operational", uptime: "99.95%", dot: "bg-emerald-400" },
  { service: "File Storage",        status: "Operational", uptime: "99.99%", dot: "bg-emerald-400" },
  { service: "API Gateway",         status: "Operational", uptime: "99.96%", dot: "bg-emerald-400" },
];

const TECH_STACK = [
  { name: "React 18",          icon: "⚛️",  cat: "Frontend"   },
  { name: "Microsoft Azure",   icon: "☁️",  cat: "Cloud"      },
  { name: "Azure AD / Entra",  icon: "🔐",  cat: "Auth"       },
  { name: "Microsoft Graph",   icon: "🔗",  cat: "API"        },
  { name: "Azure DevOps",      icon: "🔄",  cat: "CI/CD"      },
  { name: "Azure Monitor",     icon: "📡",  cat: "Observability"},
  { name: "Azure Blob Storage",icon: "💾",  cat: "Storage"    },
  { name: "Azure CDN",         icon: "⚡",  cat: "Performance" },
];

export default function Infrastructure() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-bg min-h-[60vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-purple-500/15 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
              All systems operational
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 text-balance">
              Enterprise-Grade<br />
              <span className="text-yellow-300 drop-shadow-lg">Infrastructure</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed max-w-lg">
              Built on Microsoft Azure with security-first architecture, global redundancy,
              and the reliability your business demands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Infrastructure pillars ─────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 px-3 py-1 rounded-full mb-4">
              Architecture
            </span>
            <h2 className="section-title">
              Built on a <span className="gradient-text">Rock-Solid Foundation</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="card">
                <div className={`icon-box w-12 h-12 text-xl bg-gradient-to-br ${p.gradient} mb-4 shadow-lg`}>
                  {p.icon}
                </div>
                <h3 className="font-bold text-base mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{p.desc}</p>
                <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                  {p.stats.map((s, j) => (
                    <div key={j} className="flex-1 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl py-2">
                      <p className="text-base font-extrabold gradient-text">{s.value}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── System status ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-100/70 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full mb-4">
              Live Status
            </span>
            <h2 className="section-title">
              System <span className="gradient-text">Status</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">All systems operational</span>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="card p-0 overflow-hidden">
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {SYSTEM_STATUS.map((s, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${s.dot} animate-pulse-slow`} />
                    <span className="text-sm font-medium">{s.service}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-slate-400 font-medium hidden sm:block">{s.uptime} uptime</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tech stack ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-3 py-1 rounded-full mb-4">
              Stack
            </span>
            <h2 className="section-title">
              Technology We <span className="gradient-text">Trust</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TECH_STACK.map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="card text-center py-6">
                <span className="text-3xl block mb-3">{t.icon}</span>
                <p className="font-bold text-sm mb-0.5">{t.name}</p>
                <p className="text-xs text-slate-400">{t.cat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance badges ──────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-slate-100/70 dark:bg-slate-800/30 border-t border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Certifications & Compliance</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {["ISO 27001", "SOC 2 Type II", "GDPR Ready", "HIPAA Ready", "PCI DSS", "Azure Certified"].map((c, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 shadow-sm">
                  🛡️ {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-cyan-600 via-indigo-600 to-purple-600 shadow-2xl shadow-indigo-500/30">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <h2 className="text-4xl font-extrabold mb-4 text-balance">Have infrastructure questions?</h2>
            <p className="text-white/75 text-lg mb-8 max-w-md mx-auto">
              Our solutions team is happy to walk you through our architecture and security posture.
            </p>
            <Link to="/contact" className="inline-block bg-white text-indigo-700 font-bold px-8 py-4 rounded-2xl text-base hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              Talk to an Expert →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
