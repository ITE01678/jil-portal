import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

const STATS = [
  { value: "0.96 GW",  label: "Installed Capacity",  icon: "⚡", grad: "from-solar-500 to-amber-600"   },
  { value: "16+",      label: "Years of Excellence",  icon: "🏆", grad: "from-navy-700 to-navy-500"     },
  { value: "3",        label: "Manufacturing Units",  icon: "🏭", grad: "from-leaf-500 to-teal-600"    },
  { value: "4.96 GW",  label: "Target Capacity 2025", icon: "🌟", grad: "from-indigo-500 to-blue-600"  },
];

const PRODUCTS = [
  {
    icon: "🔆",
    title: "M10 Mono PERC Solar Cells",
    tagline: "Industry-leading efficiency",
    desc: "Our flagship M10 and M10R format Mono PERC cells deliver best-in-class efficiency and reliability for utility, commercial, and residential applications.",
    gradient: "from-solar-500 to-amber-600",
    badge: "Flagship",
    badgeColor: "bg-solar-100 text-solar-700 dark:bg-solar-900/30 dark:text-solar-400",
  },
  {
    icon: "🏗️",
    title: "Solar EPC Solutions",
    tagline: "End-to-end project delivery",
    desc: "Full engineering, procurement, and construction services for rooftop and ground-mounted solar installations across industrial and commercial sectors.",
    gradient: "from-leaf-500 to-teal-600",
    badge: "Services",
    badgeColor: "bg-leaf-100 text-leaf-700 dark:bg-leaf-900/30 dark:text-leaf-400",
  },
  {
    icon: "🪟",
    title: "Solar Modules",
    tagline: "Integrated module manufacturing",
    desc: "High-performance solar modules engineered at our Bhubaneswar facility — precision-built for durability in India's diverse climate conditions.",
    gradient: "from-indigo-500 to-blue-600",
    badge: "Upcoming",
    badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
];

const WHY = [
  { icon: "🛡️", title: "Certified Quality",      desc: "TÜV Rheinland, Fraunhofer ISE, and SGS certified manufacturing, ensuring global-standard solar cells." },
  { icon: "🌱", title: "Sustainable Production", desc: "Zero liquid discharge commitment across all facilities. Environmental stewardship built into every process." },
  { icon: "⚙️", title: "Precision Engineering",  desc: "Cleanroom manufacturing with 6-stage Mono PERC process delivering consistently high conversion efficiency." },
  { icon: "🤝", title: "Trusted Partner",         desc: "16+ years serving India's solar ecosystem — from utilities and EPCs to government and commercial clients." },
];

export default function Home() {
  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero-bg solar-pattern min-h-[92vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-solar-400/15 blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-leaf-400/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-7">
                <span className="w-2 h-2 rounded-full bg-solar-400 animate-pulse-slow" />
                India's Solar Cell Pioneer · Est. 2009
              </span>

              <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 text-balance">
                Towards a<br />
                <span className="solar-text drop-shadow-lg">Green Future.</span>
              </h1>

              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
                Empowering the Planet Through Agility &amp; Vision
              </p>
              <p className="text-lg text-white/75 mb-10 max-w-lg leading-relaxed">
                We are a pure-play solar cell manufacturer — growing from 30 MW in 2009 to 0.96 GW today. Every cell we make powers a cleaner, greener world.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="inline-flex items-center gap-2 bg-solar-500 hover:bg-solar-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:shadow-glow-solar">
                  Explore Products →
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all">
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            {/* Floating stat badges */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                  className="card-glass px-5 py-5 text-center">
                  <div className={`icon-box w-10 h-10 text-lg bg-gradient-to-br ${s.grad} mx-auto mb-3 shadow-lg`}>{s.icon}</div>
                  <p className="text-2xl font-extrabold text-white leading-none mb-1">{s.value}</p>
                  <p className="text-xs text-white/60 font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip (mobile) ─────────────────────────────────────── */}
      <section className="py-14 px-6 lg:hidden bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)} className="card text-center py-6">
              <div className={`icon-box w-10 h-10 text-lg bg-gradient-to-br ${s.grad} mx-auto mb-3 shadow-lg`}>{s.icon}</div>
              <p className="text-2xl font-extrabold solar-text leading-none mb-1">{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3D Solar Cell GIF ───────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <motion.div {...fadeUp()}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Innovation</span>
              <h2 className="section-title mb-4">
                A Green Future Starts<br />
                <span className="solar-text">With a Green Cell.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm">
                Our Mono PERC solar cells represent the pinnacle of photovoltaic engineering — delivering superior light absorption, minimised recombination losses, and industry-leading conversion efficiency. Precision-engineered for maximum energy yield across India's diverse climatic conditions.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["High Conversion Efficiency", "Mono PERC Technology", "M10 / M10R Format", "Multi-Busbar Design", "Passivated Rear Surface"].map(tag => (
                  <span key={tag} className="inline-block bg-solar-50 dark:bg-solar-900/20 text-solar-700 dark:text-solar-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-solar-200 dark:border-solar-700/50">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 bg-solar-500 hover:bg-solar-600 text-white font-bold px-6 py-3 rounded-xl transition-all hover:shadow-glow-solar">
                Cell Specifications →
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-solar-400/15 blur-3xl rounded-full scale-110 animate-pulse-slow" />
                <img
                  src="https://jil-jupiter.com/wp-content/uploads/2024/09/3DCell_Alpha-ezgif.com-optimize.gif"
                  alt="Jupiter International 3D Solar Cell"
                  className="relative z-10 w-full max-w-[420px] drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Our Products</span>
            <h2 className="section-title">Solar Solutions Built to <span className="solar-text">Last</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              From high-efficiency cells to complete EPC services — engineered for India's renewable energy future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="card p-0 overflow-hidden flex flex-col">
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
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.3)} className="text-center mt-10">
            <Link to="/products" className="inline-flex items-center gap-2 bg-solar-500 hover:bg-solar-600 text-white font-bold px-7 py-3 rounded-xl transition-all hover:shadow-glow-solar">
              View All Products →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Manufacturing teaser ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp()}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">Manufacturing</span>
              <h2 className="section-title mb-4">Precision Built.<br /><span className="leaf-text">Solar Powered.</span></h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm">
                Our Baddi facility in Himachal Pradesh has been operational since 2009, growing from 30 MW to nearly 1 GW. The upcoming Bhubaneswar joint venture will add 4 GW of cell and 2.8 GW of module capacity — making us one of India's largest solar cell manufacturers.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Baddi, HP",        val: "0.96 GW Cells",   icon: "🏭" },
                  { label: "Bhubaneswar, OD",  val: "4 GW Cells",      icon: "🔧" },
                  { label: "TÜV Certified",    val: "Plant & Product",  icon: "🛡️" },
                  { label: "Zero Liquid",      val: "Discharge Target", icon: "💧" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/manufacturing" className="inline-flex items-center gap-2 border-2 border-leaf-500 text-leaf-600 dark:text-leaf-400 font-bold px-6 py-3 rounded-xl hover:bg-leaf-50 dark:hover:bg-leaf-900/20 transition-all">
                Explore Facilities →
              </Link>
            </motion.div>

            {/* Visual cell grid */}
            <motion.div {...fadeUp(0.2)} className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 p-8 shadow-2xl">
              <div className="absolute inset-0 solar-pattern opacity-20" />
              <div className="grid grid-cols-6 gap-2 relative z-10">
                {Array.from({ length: 36 }).map((_, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: Math.random() > 0.3 ? 1 : 0.3 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02, duration: 0.4 }}
                    className="aspect-square rounded border border-solar-400/30 bg-solar-400/10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-solar-400/50" />
                  </motion.div>
                ))}
              </div>
              <div className="relative z-10 mt-6 text-center">
                <p className="text-white/50 text-xs font-medium uppercase tracking-widest">Mono PERC Cell Array</p>
                <p className="solar-text font-extrabold text-2xl mt-1">M10 · M10R Format</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Jupiter ─────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="section-title">Why Choose <span className="solar-text">Jupiter?</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="card">
                <span className="text-3xl block mb-4">{w.icon}</span>
                <h3 className="font-bold text-base mb-1.5">{w.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sustainability teaser ────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeUp()} className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌱", val: "Zero",    label: "Liquid Discharge", color: "from-leaf-500 to-teal-600" },
                { icon: "🌳", val: "50,000+", label: "Trees Planted",    color: "from-emerald-500 to-green-600" },
                { icon: "☀️", val: "200+",    label: "Solar for Schools", color: "from-solar-500 to-amber-600"  },
                { icon: "💧", val: "12,000+", label: "Medical Aided",    color: "from-blue-500 to-cyan-600"    },
              ].map((s, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className="card text-center py-6">
                  <div className={`icon-box w-12 h-12 text-xl bg-gradient-to-br ${s.color} mx-auto mb-3 shadow-lg`}>{s.icon}</div>
                  <p className="text-2xl font-extrabold solar-text leading-none mb-0.5">{s.val}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div {...fadeUp(0.15)}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">ESG &amp; CSR</span>
              <h2 className="section-title mb-4">Beyond <span className="leaf-text">Profit.</span></h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                At Jupiter, doing business well means doing good. We embed environmental stewardship, social responsibility, and ethical governance at the heart of every decision — from zero liquid discharge to community solar installations and rural healthcare.
              </p>
              <Link to="/beyond-profit" className="inline-flex items-center gap-2 border-2 border-leaf-500 text-leaf-600 dark:text-leaf-400 font-bold px-6 py-3 rounded-xl hover:bg-leaf-50 dark:hover:bg-leaf-900/20 transition-all">
                Our ESG Story →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-navy-900 via-navy-700 to-solar-900 shadow-2xl">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-solar-400/10 blur-2xl" />
            <h2 className="text-4xl font-extrabold mb-4 text-balance">Power the Green Revolution</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Partner with India's leading solar cell manufacturer. Contact our team for product enquiries, bulk pricing, and project consultations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="inline-block bg-solar-500 hover:bg-solar-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-glow-solar hover:-translate-y-0.5">
                Contact Sales →
              </Link>
              <Link to="/careers" className="inline-block border border-white/30 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-white/10 transition-all">
                Join Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
