import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

const PRODUCTS = [
  {
    icon: "🔆",
    title: "M10 Mono PERC Solar Cells",
    tagline: "Industry-leading photovoltaic efficiency",
    desc: "Our flagship product — M10 and M10R format Mono PERC cells featuring a 6-stage precision manufacturing process. Designed for utility, commercial, and residential solar installations requiring consistent high performance.",
    features: [
      "M10 (182mm) & M10R format availability",
      "Passivated Emitter Rear Cell technology",
      "Superior low-light performance",
      "Cleanroom manufactured, zero-defect process",
      "TÜV Rheinland & Fraunhofer ISE certified",
    ],
    gradient: "from-solar-500 to-amber-600",
    badge: "Flagship",
    badgeColor: "bg-solar-100 text-solar-700 dark:bg-solar-900/30 dark:text-solar-400",
  },
  {
    icon: "🏗️",
    title: "Solar EPC Solutions",
    tagline: "End-to-end solar project delivery",
    desc: "Complete Engineering, Procurement, and Construction services for rooftop and ground-mounted solar plants. We handle site assessment, design, installation, and commissioning for industrial, commercial, and institutional clients.",
    features: [
      "Rooftop & ground-mounted installations",
      "Site assessment and feasibility studies",
      "Custom system design and engineering",
      "Full project management and commissioning",
      "Post-installation O&M support",
    ],
    gradient: "from-leaf-500 to-teal-600",
    badge: "Services",
    badgeColor: "bg-leaf-100 text-leaf-700 dark:bg-leaf-900/30 dark:text-leaf-400",
  },
  {
    icon: "🪟",
    title: "Solar Modules",
    tagline: "Integrated module manufacturing",
    desc: "High-performance solar modules engineered at our upcoming Bhubaneswar facility with 2.8 GW capacity. Precision-built using our own PERC cells for optimal efficiency and durability across India's diverse climate conditions.",
    features: [
      "2.8 GW module manufacturing capacity",
      "Integrated cell-to-module production",
      "High module conversion efficiency",
      "Optimised for Indian climate conditions",
      "Available from Bhubaneswar facility (2025)",
    ],
    gradient: "from-indigo-500 to-blue-600",
    badge: "Upcoming",
    badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  {
    icon: "🏢",
    title: "Solar for Business",
    tagline: "Commercial & industrial solar solutions",
    desc: "Tailored solar solutions for factories, warehouses, commercial buildings, and industrial complexes. Reduce energy costs, achieve sustainability targets, and improve energy independence with proven Jupiter technology.",
    features: [
      "Energy audit and savings analysis",
      "Net metering and grid-tie solutions",
      "Corporate sustainability reporting",
      "Scalable installations from 10 kW to MW+",
      "Financing and subsidy advisory",
    ],
    gradient: "from-purple-500 to-violet-600",
    badge: "Commercial",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    icon: "⚙️",
    title: "Operations & Maintenance",
    tagline: "Maximise plant uptime and yield",
    desc: "Comprehensive O&M services to keep your solar assets performing at peak efficiency throughout their operational life. Remote monitoring, preventive maintenance, and rapid-response field teams across our service regions.",
    features: [
      "24/7 remote plant monitoring",
      "Preventive & corrective maintenance",
      "Performance ratio analysis",
      "Cell and module replacement services",
      "Annual performance guarantee",
    ],
    gradient: "from-cyan-500 to-blue-600",
    badge: "Support",
    badgeColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
  {
    icon: "🌐",
    title: "Bulk Cell Supply",
    tagline: "OEM & module manufacturer supply",
    desc: "Direct cell supply programmes for solar module manufacturers, EPCs, and system integrators. Consistent quality, competitive pricing, and reliable supply chain backed by our 0.96 GW production capacity.",
    features: [
      "High-volume OEM supply agreements",
      "Consistent bin-sorted cell batches",
      "Full quality documentation & test reports",
      "Flexible logistics — ex-works or delivered",
      "Long-term supply partnership frameworks",
    ],
    gradient: "from-rose-500 to-red-600",
    badge: "OEM",
    badgeColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  },
];

const CELL_SPECS = [
  { label: "Cell Type",           value: "Mono PERC (M10 / M10R)" },
  { label: "Dimensions",          value: "182 × 182 mm (±0.5 mm)" },
  { label: "Efficiency Range",    value: "21.0% – 23.5%" },
  { label: "Open Circuit Voltage", value: "0.700 – 0.720 V" },
  { label: "Short Circuit Current", value: "11.5 – 12.5 A" },
  { label: "Maximum Power",       value: "8.0 – 9.8 W" },
  { label: "Temperature Coeff.",  value: "-0.34% / °C (Pmax)" },
  { label: "Sorting Bins",        value: "By efficiency & colour" },
];

export default function Products() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-bg solar-pattern min-h-[60vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-solar-400/15 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-leaf-400/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-solar-400 animate-pulse-slow" />
              Solar Products &amp; Solutions
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 text-balance">
              Built for<br />
              <span className="solar-text drop-shadow-lg">Maximum Yield.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              From high-efficiency Mono PERC cells to complete EPC services — every Jupiter product is engineered to deliver superior performance and long-term reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Product cards ─────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Products &amp; Services</span>
            <h2 className="section-title">Our Solar <span className="solar-text">Offerings</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Comprehensive solar solutions from cell manufacturing to full project delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="card p-0 overflow-hidden flex flex-col">
                <div className={`h-24 bg-gradient-to-br ${p.gradient} flex items-center px-6 gap-4 relative overflow-hidden`}>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                  <span className="text-4xl">{p.icon}</span>
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                    <h3 className="text-white font-extrabold text-base mt-0.5 leading-snug">{p.title}</h3>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-solar-600 dark:text-solar-400 mb-2">{p.tagline}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{p.desc}</p>
                  <ul className="space-y-1.5 mt-auto">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="w-4 h-4 rounded-full bg-solar-100 dark:bg-solar-900/30 text-solar-600 dark:text-solar-400 flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cell specs table ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">Specifications</span>
            <h2 className="section-title">M10 Mono PERC <span className="leaf-text">Cell Specs</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Indicative specification ranges — contact our sales team for full datasheet and bin availability.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="card p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-solar-500 to-amber-600 px-6 py-4">
              <h3 className="text-white font-extrabold text-lg flex items-center gap-2">🔆 M10 / M10R Mono PERC · STC Conditions (1000 W/m², 25°C, AM 1.5)</h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {CELL_SPECS.map((spec, i) => (
                <motion.div key={i} {...fadeUp(i * 0.04)} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{spec.label}</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{spec.value}</span>
                </motion.div>
              ))}
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/30 px-6 py-3 text-xs text-slate-400">
              * Specifications are indicative. Download full datasheet or contact sales for certified test reports.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-navy-600 dark:text-navy-200 bg-navy-50 dark:bg-navy-900/30 px-3 py-1 rounded-full mb-4">Quality Assurance</span>
            <h2 className="section-title">Certified for <span className="solar-text">Global Standards</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "TÜV Rheinland",  scope: "Plant Certification",   icon: "🛡️" },
              { name: "Fraunhofer ISE", scope: "Product Certification", icon: "🔬" },
              { name: "SGS",            scope: "Quality & Safety",      icon: "✅" },
              { name: "ISO 9001",       scope: "Quality Management",    icon: "📋" },
              { name: "ISO 14001",      scope: "Environmental Mgmt",    icon: "🌱" },
              { name: "Zero Liquid",    scope: "Discharge Commitment",  icon: "💧" },
            ].map((c, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="card text-center py-6">
                <span className="text-3xl block mb-3">{c.icon}</span>
                <p className="font-extrabold text-sm mb-0.5">{c.name}</p>
                <p className="text-xs text-slate-400">{c.scope}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-navy-900 via-navy-700 to-solar-900 shadow-2xl">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-solar-400/10 blur-2xl" />
            <h2 className="text-4xl font-extrabold mb-4 text-balance">Interested in our products?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Contact our sales team for datasheets, samples, bulk pricing, and project consultations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="inline-block bg-solar-500 hover:bg-solar-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-glow-solar hover:-translate-y-0.5">
                Enquire Now →
              </Link>
              <Link to="/manufacturing" className="inline-block border border-white/30 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-white/10 transition-all">
                See How We Make Them
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
