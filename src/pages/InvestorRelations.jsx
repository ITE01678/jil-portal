import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

const ANNUAL_RETURNS = [
  { fy: "FY 2024–25", doc: "MGT-7 Annual Return", status: "Available", color: "from-solar-500 to-amber-600" },
  { fy: "FY 2023–24", doc: "Annual Return",        status: "Available", color: "from-leaf-500 to-teal-600"   },
  { fy: "FY 2022–23", doc: "Annual Return",        status: "Available", color: "from-indigo-500 to-blue-600" },
  { fy: "FY 2021–22", doc: "Annual Return",        status: "Available", color: "from-purple-500 to-violet-600"},
  { fy: "FY 2020–21", doc: "Annual Return",        status: "Available", color: "from-cyan-500 to-blue-600"   },
];

const POLICIES = [
  { title: "Corporate Social Responsibility Policy",        icon: "🌱", desc: "Governs JIL's CSR commitments, budget allocation, and community development activities." },
  { title: "Nomination & Remuneration Policy",              icon: "👥", desc: "Framework for appointment and remuneration of directors, key managerial personnel, and senior management." },
  { title: "Whistle Blower Policy",                         icon: "🛡️", desc: "Provides a mechanism for employees and directors to report genuine concerns or grievances." },
  { title: "Terms of Appointment of Independent Director", icon: "📋", desc: "Defines roles, responsibilities, tenure, and remuneration of Independent Directors on the Board." },
];

const MEETINGS = [
  { type: "EGM",  title: "Extra Ordinary General Meeting",              year: "2025", month: "2025",          badge: "Latest", badgeColor: "bg-solar-100 text-solar-700 dark:bg-solar-900/30 dark:text-solar-400" },
  { type: "AGM",  title: "Forty Sixth Annual General Meeting",          year: "2025", month: "Sep 30, 2025",  badge: "46th",   badgeColor: "bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-200"    },
  { type: "EGM",  title: "Extra Ordinary General Meeting",              year: "2025", month: "2025",          badge: "EGM",    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { type: "AGM",  title: "Forty Fifth Annual General Meeting",          year: "2024", month: "2024",          badge: "45th",   badgeColor: "bg-leaf-100 text-leaf-700 dark:bg-leaf-900/30 dark:text-leaf-400"   },
  { type: "EGM",  title: "Extra Ordinary General Meeting",              year: "2024", month: "2024",          badge: "EGM",    badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
];

const COMPANY_INFO = [
  { label: "Company Name",          value: "Jupiter International Limited"                },
  { label: "Registered Office",     value: "Unnayanam, 20A Ashutosh Chowdhury Avenue, Kolkata – 700 019, West Bengal, India" },
  { label: "Phone",                 value: "+91 33 4015 9000"                            },
  { label: "Email",                 value: "info@jil-jupiter.com"                        },
  { label: "Stock Exchange",        value: "BSE Limited (Bombay Stock Exchange)"         },
  { label: "Registrar & TA",       value: "Please refer to latest Annual Report"        },
  { label: "46th AGM",             value: "September 30, 2025"                          },
  { label: "Auditors",             value: "Please refer to latest Annual Report"        },
];

export default function InvestorRelations() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-bg solar-pattern min-h-[55vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 right-10 w-80 h-80 rounded-full bg-solar-400/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-indigo-400/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-solar-400 animate-pulse-slow" />
              Investor Relations
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 text-balance">
              Transparent &amp;<br /><span className="solar-text drop-shadow-lg">Accountable.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              Jupiter International Limited is committed to the highest standards of corporate governance, transparency, and shareholder value creation in India's renewable energy sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Company Info ──────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Company Information</span>
            <h2 className="section-title">Corporate <span className="solar-text">Overview</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div {...fadeUp(0.1)} className="card p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-navy-800 to-navy-600 px-6 py-4">
                <h3 className="text-white font-extrabold text-lg flex items-center gap-2">🏛️ Corporate Details</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {COMPANY_INFO.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium flex-shrink-0 w-36">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="space-y-5">
              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3 flex items-center gap-2">📈 Investment Highlights</h3>
                <ul className="space-y-2.5">
                  {[
                    "0.96 GW operational solar cell capacity (as of June 30, 2025)",
                    "16+ years of manufacturing excellence — founded as a public company ~1979",
                    "Expanded from 30 MW (2009) to 0.96 GW — over 30× capacity growth",
                    "₹500 Crore investment from ValueQuest SCALE Fund (April 2025)",
                    "INR 300 Crore investment from ValueQuest (July 2024)",
                    "₹6,500 Crore capacity expansion investment announced (January 2025)",
                    "MoU signed with Maharashtra Government for new integrated facility",
                    "Joint venture at Bhubaneswar — 4 GW cells + 2.8 GW modules",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-solar-100 dark:bg-solar-900/30 text-solar-600 dark:text-solar-400 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="font-extrabold text-base mb-3">📬 Investor Contact</h3>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p className="flex items-start gap-2"><span className="text-solar-500">✉</span> info@jil-jupiter.com</p>
                  <p className="flex items-start gap-2"><span className="text-solar-500">📞</span> +91 33 4015 9000</p>
                  <p className="flex items-start gap-2"><span className="text-solar-500">📍</span> Unnayanam, 20A Ashutosh Chowdhury Avenue, Kolkata – 700 019, WB</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Annual Returns ────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">Filings</span>
            <h2 className="section-title">Annual <span className="leaf-text">Returns</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Annual returns filed with the Registrar of Companies (MGT-7) as required under the Companies Act.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ANNUAL_RETURNS.map((ar, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="card p-0 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${ar.color}`} />
                <div className="p-5">
                  <p className="font-extrabold text-sm mb-1">{ar.fy}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{ar.doc}</p>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-solar-50 dark:hover:bg-solar-900/20 hover:text-solar-600 dark:hover:text-solar-400 transition-colors"
                  >
                    ⬇ Download PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">PDF downloads require login to the BSE filing system. Contact IR team for direct access.</p>
        </div>
      </section>

      {/* ── Corporate Policies ────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full mb-4">Governance</span>
            <h2 className="section-title">Corporate <span className="gradient-text">Policies</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {POLICIES.map((p, i) => (
              <motion.div key={i} {...fadeUp(i * 0.09)} className="card flex items-start gap-5">
                <span className="text-3xl flex-shrink-0">{p.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1.5">{p.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{p.desc}</p>
                  <a href="#" onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1 text-xs font-bold text-solar-600 dark:text-solar-400 hover:underline">
                    ⬇ Download Policy
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── General Meeting Notices ───────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-3 py-1 rounded-full mb-4">Meetings</span>
            <h2 className="section-title">General Meeting <span className="gradient-text">Notices</span></h2>
          </motion.div>

          <div className="space-y-4">
            {MEETINGS.map((m, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="card flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 flex flex-col items-center justify-center flex-shrink-0">
                  <p className="text-white font-extrabold text-sm leading-none">{m.type}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{m.year}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm">{m.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.badgeColor}`}>{m.badge}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{m.month}</p>
                </div>
                <a href="#" onClick={(e) => e.preventDefault()}
                  className="flex-shrink-0 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-solar-50 dark:hover:bg-solar-900/20 hover:text-solar-600 transition-colors">
                  Notice PDF
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">
            For older meeting notices and resolutions, please write to info@jil-jupiter.com
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-navy-900 via-navy-700 to-solar-900 shadow-2xl">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-solar-400/10 blur-2xl" />
            <h2 className="text-4xl font-extrabold mb-4">Have an Investor Query?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Contact our investor relations team directly at info@jil-jupiter.com or call us at +91 33 4015 9000.
            </p>
            <Link to="/contact" className="inline-block bg-solar-500 hover:bg-solar-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-glow-solar hover:-translate-y-0.5">
              Contact IR Team →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
