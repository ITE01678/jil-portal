import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

const FACILITIES = [
  {
    name: "Baddi, Himachal Pradesh",
    flag: "🏭",
    status: "Operational",
    statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    capacity: "0.96 GW",
    experience: "16+ Years",
    highlights: [
      "M10 & M10R Mono PERC solar cell production",
      "Cleanroom manufacturing environment",
      "Lean operations for cost-effectiveness",
      "800 MW capacity expansion underway",
      "TÜV Rheinland, Fraunhofer & SGS certified",
      "Zero liquid discharge initiative",
    ],
    gradient: "from-navy-800 to-navy-600",
    img: "from-navy-700 to-navy-900",
  },
  {
    name: "Bhubaneswar, Odisha",
    flag: "🔧",
    status: "Commissioning 2025",
    statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    capacity: "4 GW Cells · 2.8 GW Modules",
    experience: "Joint Venture",
    highlights: [
      "Integrated solar cell & module manufacturing",
      "Joint Venture with leading renewable energy provider",
      "Latest generation solar technology",
      "Technological and operational excellence",
      "Largest single-site capacity in our portfolio",
      "Advanced automation and smart manufacturing",
    ],
    gradient: "from-leaf-700 to-leaf-900",
    img: "from-leaf-600 to-leaf-900",
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Wafer Inspection",    desc: "High-precision laser and optical inspection of incoming silicon wafers for quality and dimension.",         icon: "🔬" },
  { step: "02", title: "Texturisation",        desc: "Chemical etching creates a pyramidal surface structure to improve light absorption efficiency.",              icon: "⚗️" },
  { step: "03", title: "Diffusion",            desc: "Phosphorus diffusion forms the p-n junction — the core of the photovoltaic conversion process.",             icon: "🌡️" },
  { step: "04", title: "PERC Deposition",      desc: "Aluminium oxide and silicon nitride layers are deposited on the rear cell, passivating surface defects.",     icon: "🧬" },
  { step: "05", title: "Metallisation",        desc: "Silver paste is screen-printed on front and rear surfaces to create electrical contacts.",                   icon: "✨" },
  { step: "06", title: "Firing & Testing",     desc: "Cells are fired at peak temperature, then tested for efficiency, colour-sorted, and packaged.",              icon: "🏆" },
];

const CERTS = [
  { name: "TÜV Rheinland",   scope: "Plant Certification",     icon: "🛡️" },
  { name: "Fraunhofer ISE",  scope: "Product Certification",   icon: "🔬" },
  { name: "SGS",             scope: "Quality & Safety",        icon: "✅" },
  { name: "ISO 9001",        scope: "Quality Management",      icon: "📋" },
  { name: "ISO 14001",       scope: "Environmental Mgmt",      icon: "🌱" },
  { name: "Zero Liquid",     scope: "Discharge Commitment",    icon: "💧" },
];

export default function Manufacturing() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-bg solar-pattern min-h-[60vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-solar-500/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-leaf-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-solar-400 animate-pulse-slow" />
              World-Class Manufacturing
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 text-balance">
              Precision Built.<br />
              <span className="solar-text drop-shadow-lg">Solar Powered.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              16+ years of manufacturing excellence. From a 30 MW start in 2009 to nearly 1 GW today — every cell engineered to power a greener tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Facilities ────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Facilities</span>
            <h2 className="section-title">Our Manufacturing <span className="solar-text">Facilities</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {FACILITIES.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.15)} className="card p-0 overflow-hidden">
                {/* Facility image placeholder */}
                <div className={`h-48 bg-gradient-to-br ${f.img} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 solar-pattern opacity-30" />
                  {/* Solar cell grid art */}
                  <div className="grid grid-cols-5 gap-2 opacity-30">
                    {Array.from({ length: 15 }).map((_, j) => (
                      <div key={j} className="w-10 h-10 rounded border border-solar-400/40 bg-solar-400/10" />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl mb-2">{f.flag}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${f.statusColor}`}>{f.status}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-extrabold text-xl mb-0.5">{f.name}</h3>
                      <p className="text-solar-600 dark:text-solar-400 font-bold text-sm">{f.capacity}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-slate-400">Experience</p>
                      <p className="font-extrabold text-lg gradient-text">{f.experience}</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {f.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="w-4 h-4 rounded-full bg-solar-100 dark:bg-solar-900/30 text-solar-600 dark:text-solar-400 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manufacturing Process ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">Process</span>
            <h2 className="section-title">How We Make <span className="leaf-text">Every Cell</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Six precision stages transform raw silicon wafers into high-efficiency Mono PERC solar cells.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="card relative overflow-hidden">
                <span className="absolute top-4 right-4 text-6xl font-black text-slate-100 dark:text-slate-800/60 leading-none select-none">{s.step}</span>
                <span className="text-3xl block mb-3 relative z-10">{s.icon}</span>
                <h3 className="font-bold text-base mb-2 relative z-10">{s.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-navy-600 dark:text-navy-200 bg-navy-50 dark:bg-navy-900/30 px-3 py-1 rounded-full mb-4">Certifications</span>
            <h2 className="section-title">Certified for <span className="solar-text">Excellence</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CERTS.map((c, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="card text-center py-6">
                <span className="text-3xl block mb-3">{c.icon}</span>
                <p className="font-extrabold text-sm mb-0.5">{c.name}</p>
                <p className="text-xs text-slate-400">{c.scope}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capacity Timeline ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="section-title">Capacity <span className="solar-text">Growth</span></h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { year: "2009", cap: "30 MW",    label: "Founded & commissioned",   w: "5%"  },
              { year: "2015", cap: "200 MW",   label: "First major expansion",    w: "20%" },
              { year: "2019", cap: "500 MW",   label: "PERC technology adoption", w: "45%" },
              { year: "2023", cap: "0.96 GW",  label: "Current installed capacity",w: "75%" },
              { year: "2025", cap: "4.96 GW",  label: "Post-Bhubaneswar target",  w: "100%"},
            ].map((row, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 w-10 flex-shrink-0">{row.year}</span>
                <div className="flex-1 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: row.w }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-solar-500 to-amber-400 rounded-xl flex items-center px-3"
                  >
                    <span className="text-xs font-extrabold text-white whitespace-nowrap">{row.cap}</span>
                  </motion.div>
                </div>
                <span className="text-xs text-slate-500 hidden sm:block w-44 flex-shrink-0">{row.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-navy-900 via-navy-700 to-leaf-900 shadow-2xl">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-solar-400/10 blur-2xl" />
            <h2 className="text-4xl font-extrabold mb-4">Interested in our cells?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">Contact our sales team for product specifications, datasheets, and bulk pricing.</p>
            <Link to="/contact" className="inline-block bg-solar-500 hover:bg-solar-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-200 hover:shadow-glow-solar hover:-translate-y-0.5">
              Enquire Now →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
