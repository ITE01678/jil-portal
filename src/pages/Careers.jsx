import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

const CULTURE_PILLARS = [
  { icon: "📈", title: "Growth & Development", desc: "Continuous learning through hands-on experience, structured training programmes, and mentorship from industry veterans.", gradient: "from-solar-500 to-amber-600"   },
  { icon: "🛡️", title: "Safety & Health",      desc: "A Safety First culture prioritising physical safety, mental wellbeing, and a healthy work-life balance for every team member.", gradient: "from-emerald-500 to-teal-600" },
  { icon: "🌟", title: "Strong Leadership",     desc: "Inspirational leaders who drive innovation, provide clear direction, and empower every employee to make meaningful contributions.", gradient: "from-indigo-500 to-blue-600"  },
  { icon: "🤝", title: "Employee Loyalty",      desc: "Fair, transparent structures that reward dedication and enable long-term career advancement within the organisation.", gradient: "from-purple-500 to-violet-600" },
  { icon: "🌍", title: "Inclusive Environment", desc: "We celebrate diversity, recognise contributions across all backgrounds, and foster an environment where every voice matters.", gradient: "from-rose-500 to-pink-600"    },
];

const OPENINGS = [
  { title: "Finance",                  dept: "Finance",     location: "Kolkata, West Bengal",     type: "Full-Time", grad: "from-indigo-500 to-blue-600"   },
  { title: "Finance & Taxation",       dept: "Finance",     location: "Kolkata, West Bengal",     type: "Full-Time", grad: "from-purple-500 to-indigo-600" },
  { title: "Process",                  dept: "Engineering", location: "Bhubaneswar, Odisha",      type: "Full-Time", grad: "from-leaf-500 to-teal-600"    },
  { title: "Electrical Site Engineer", dept: "Engineering", location: "Kolkata, West Bengal",     type: "Full-Time", grad: "from-solar-500 to-amber-600"  },
  { title: "Exim",                     dept: "Operations",  location: "Kolkata, West Bengal",     type: "Full-Time", grad: "from-cyan-500 to-blue-600"    },
  { title: "Maintenance",              dept: "Operations",  location: "Baddi, Himachal Pradesh",  type: "Full-Time", grad: "from-rose-500 to-red-600"     },
  { title: "Maintenance",              dept: "Operations",  location: "Bhubaneswar, Odisha",      type: "Full-Time", grad: "from-amber-500 to-orange-600" },
];

const BENEFITS = [
  { icon: "💰", label: "Competitive Salary",      desc: "Market-aligned compensation with performance-linked incentives." },
  { icon: "🏥", label: "Health Insurance",         desc: "Comprehensive medical cover for employee and family." },
  { icon: "📚", label: "Learning Budget",          desc: "Annual training allowance for courses, certifications, and conferences." },
  { icon: "🌿", label: "Sustainability Perks",     desc: "Subsidised solar panel installation for employee homes." },
  { icon: "⏱️",  label: "Flexible Working",        desc: "Hybrid and flexible arrangements for eligible roles." },
  { icon: "🎯", label: "Career Progression",       desc: "Structured growth paths with regular appraisals and promotions." },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applied,     setApplied]     = useState(new Set());
  const [filter,      setFilter]      = useState("All");

  const depts = ["All", ...new Set(OPENINGS.map(o => o.dept))];
  const filtered = filter === "All" ? OPENINGS : OPENINGS.filter(o => o.dept === filter);

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-bg solar-pattern min-h-[60vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 right-10 w-80 h-80 rounded-full bg-solar-400/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-leaf-400/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-solar-400 animate-pulse-slow" />
              {OPENINGS.length} Open Positions
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 text-balance">
              Power the<br /><span className="solar-text drop-shadow-lg">Green Revolution.</span>
            </h1>
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
              Empowering People to Power the World
            </p>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              Join Jupiter International Limited and help manufacture the solar cells that power a cleaner, greener planet. Build a career that matters.
            </p>
            <a href="#openings" className="mt-8 inline-flex items-center gap-2 bg-solar-500 hover:bg-solar-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:shadow-glow-solar">
              View Open Roles ↓
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Culture pillars ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Life at Jupiter</span>
            <h2 className="section-title">Why People <span className="solar-text">Love Working Here</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CULTURE_PILLARS.map((p, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className={`card ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div className={`icon-box w-12 h-12 text-xl bg-gradient-to-br ${p.gradient} mb-4 shadow-lg`}>{p.icon}</div>
                <h3 className="font-bold text-base mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="section-title">Benefits &amp; <span className="leaf-text">Perks</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="flex items-start gap-4 card">
                <span className="text-3xl flex-shrink-0">{b.icon}</span>
                <div>
                  <p className="font-bold text-sm mb-0.5">{b.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job Openings ──────────────────────────────────────────────── */}
      <section id="openings" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">Now Hiring</span>
            <h2 className="section-title">Current <span className="leaf-text">Openings</span></h2>
          </motion.div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {depts.map(d => (
              <button key={d} onClick={() => setFilter(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  filter === d ? "bg-solar-500 text-white shadow-glow-solar" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-solar-50 dark:hover:bg-solar-900/20"
                }`}>
                {d}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((job, i) => (
              <motion.div key={job.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="card p-0 overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-card-hover transition-all"
                onClick={() => setSelectedJob(job)}>
                <div className={`h-2 bg-gradient-to-r ${job.grad}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-sm leading-snug">{job.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex-shrink-0">{job.type}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">📍 {job.location}</p>
                  <p className="text-xs text-slate-400 mb-4">🏷️ {job.dept}</p>
                  <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-solar-50 dark:hover:bg-solar-900/20 transition-colors">
                    View & Apply →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job Apply Modal ───────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setSelectedJob(null)}>
            <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              className="card max-w-md w-full p-0 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${selectedJob.grad}`} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-extrabold text-xl">{selectedJob.title}</h3>
                    <p className="text-slate-500 text-sm mt-0.5">{selectedJob.dept} · {selectedJob.location}</p>
                  </div>
                  <button onClick={() => setSelectedJob(null)} className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-colors">✕</button>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Join our growing team at Jupiter International Limited. This role plays a critical part in our mission to power a green future through world-class solar cell manufacturing.
                </p>
                {applied.has(selectedJob.title) ? (
                  <div className="text-center py-4">
                    <span className="text-2xl block mb-2">✅</span>
                    <p className="font-bold text-leaf-600 dark:text-leaf-400">Application Submitted!</p>
                    <p className="text-xs text-slate-400 mt-1">We'll reach out to you at career@jil-jupiter.com</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <a href="mailto:career@jil-jupiter.com?subject=Application: " className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-solar-500 to-amber-600 text-white font-bold hover:opacity-90 transition-opacity">
                      Apply via Email →
                    </a>
                    <button onClick={() => { setApplied(s => new Set(s).add(selectedJob.title)); }}
                      className="block w-full text-center py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-solar-400 transition-colors">
                      Mark as Interested
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-navy-900 via-navy-700 to-solar-900 shadow-2xl">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-solar-400/10 blur-2xl" />
            <h2 className="text-4xl font-extrabold mb-4 text-balance">Don't see your role?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              We're always looking for talented people. Send your CV to career@jil-jupiter.com and we'll keep you in mind.
            </p>
            <a href="mailto:career@jil-jupiter.com" className="inline-block bg-solar-500 hover:bg-solar-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-glow-solar hover:-translate-y-0.5">
              Send Your CV →
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
