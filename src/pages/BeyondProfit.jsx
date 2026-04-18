import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

const ESG_PILLARS = [
  {
    icon: "🌱",
    title: "Environmental",
    gradient: "from-leaf-500 to-teal-600",
    items: [
      { label: "Zero Liquid Discharge",   desc: "Manufacturing plants committed to zero liquid discharge, protecting local water bodies." },
      { label: "Waste Monitoring",         desc: "Real-time tracking of waste and effluent management systems for full regulatory compliance." },
      { label: "Energy Efficiency",        desc: "Continuous improvement of energy efficiency across all production lines." },
      { label: "Pollution Control",        desc: "Advanced pollution control technologies installed at every manufacturing unit." },
      { label: "Material Reuse",           desc: "Maximising reuse of materials and responsible treatment of all waste by-products." },
      { label: "Clean Supply Chain",       desc: "Commitment to clean and ethical sourcing throughout our entire supply chain." },
    ],
  },
  {
    icon: "👥",
    title: "Social",
    gradient: "from-blue-500 to-indigo-600",
    items: [
      { label: "Workforce Development",   desc: "Continuous skill-building, hands-on training, and career advancement programmes for all employees." },
      { label: "Safety First",             desc: "Rigorous safety protocols and mental health initiatives ensure wellbeing at every facility." },
      { label: "Diversity & Inclusion",    desc: "Active promotion of diverse hiring and an inclusive workplace culture." },
      { label: "Human Rights",             desc: "Unwavering protection of human rights throughout our operations and supply chain." },
      { label: "Community Engagement",     desc: "Local community development programmes in the regions where we operate." },
      { label: "Employee Recognition",     desc: "Regular recognition of employee contributions through structured reward programmes." },
    ],
  },
  {
    icon: "🏛️",
    title: "Governance",
    gradient: "from-purple-500 to-violet-700",
    items: [
      { label: "Transparent Reporting",   desc: "Annual sustainability reports with verified metrics and third-party audits." },
      { label: "Board Accountability",     desc: "Independent board oversight ensuring ethical business conduct." },
      { label: "Anti-Corruption",          desc: "Zero-tolerance policy on bribery and corruption across all business activities." },
      { label: "Data Privacy",             desc: "Rigorous data protection protocols safeguarding employee and customer information." },
      { label: "Regulatory Compliance",    desc: "Proactive compliance with all applicable environmental, safety, and labour laws." },
      { label: "Stakeholder Engagement",   desc: "Regular dialogue with investors, customers, employees, and local communities." },
    ],
  },
];

const CSR_INITIATIVES = [
  { icon: "📚", title: "Education & Skills",      desc: "Funding vocational training centres near our Baddi facility, equipping local youth with technical skills for the solar industry.",              color: "from-amber-500 to-orange-600"   },
  { icon: "🏥", title: "Healthcare Access",        desc: "Mobile health clinics and subsidised medical camps for communities in Himachal Pradesh and Odisha.",                                           color: "from-rose-500 to-red-600"       },
  { icon: "🌳", title: "Green Spaces",             desc: "Plantation drives and urban greening projects contributing thousands of trees annually across manufacturing locations.",                        color: "from-leaf-500 to-teal-600"     },
  { icon: "💧", title: "Water Conservation",       desc: "Rainwater harvesting systems and groundwater recharge programmes benefiting thousands of households.",                                         color: "from-blue-500 to-cyan-600"      },
  { icon: "⚡", title: "Solar for Communities",    desc: "Free solar installations for government schools, primary health centres, and rural community halls.",                                          color: "from-solar-500 to-amber-600"   },
  { icon: "🤝", title: "Women Empowerment",        desc: "Self-help group support and microfinance access for women entrepreneurs in rural communities near our plants.",                               color: "from-pink-500 to-fuchsia-600"  },
];

const IMPACT_STATS = [
  { value: "5,000+", label: "Students Supported",    icon: "📚", color: "from-amber-500 to-orange-500" },
  { value: "12,000+",label: "Medical Beneficiaries", icon: "🏥", color: "from-rose-500 to-red-500"     },
  { value: "50,000+",label: "Trees Planted",         icon: "🌳", color: "from-leaf-500 to-teal-500"   },
  { value: "200+",   label: "Solar Installations",   icon: "☀️", color: "from-solar-500 to-amber-500" },
];

export default function BeyondProfit() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-bg solar-pattern min-h-[60vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-leaf-400/15 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-solar-400/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-leaf-400 animate-pulse-slow" />
              ESG &amp; CSR
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 text-balance">
              Beyond <span className="leaf-text drop-shadow-lg">Profit.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              At Jupiter, doing business well means doing good. We embed environmental stewardship, social responsibility, and ethical governance at the heart of every decision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ESG Pillars ───────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">ESG Framework</span>
            <h2 className="section-title">Environmental, Social &amp; <span className="leaf-text">Governance</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ESG_PILLARS.map((pillar, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="card p-0 overflow-hidden">
                <div className={`bg-gradient-to-r ${pillar.gradient} px-6 py-5 flex items-center gap-4`}>
                  <span className="text-4xl">{pillar.icon}</span>
                  <h3 className="text-white font-extrabold text-xl">{pillar.title}</h3>
                </div>
                <div className="p-5 space-y-4">
                  {pillar.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-leaf-600 dark:text-leaf-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                      <div>
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Stats ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="section-title">Our <span className="solar-text">Impact</span> in Numbers</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="card text-center py-8">
                <div className={`icon-box w-14 h-14 text-2xl bg-gradient-to-br ${s.color} mx-auto mb-4 shadow-lg`}>{s.icon}</div>
                <p className="text-4xl font-extrabold solar-text leading-none mb-1">{s.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CSR Initiatives ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full mb-4">CSR</span>
            <h2 className="section-title">Corporate Social <span className="gradient-text">Responsibility</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Beyond our products, we invest in the communities that surround our operations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CSR_INITIATIVES.map((c, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="card">
                <div className={`icon-box w-12 h-12 text-xl bg-gradient-to-br ${c.color} mb-4 shadow-lg`}>{c.icon}</div>
                <h3 className="font-bold text-base mb-2">{c.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-leaf-900 via-leaf-700 to-navy-800 shadow-2xl">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-leaf-400/10 blur-2xl" />
            <h2 className="text-4xl font-extrabold mb-4">Partner in a Greener Future</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Learn about our sustainability programmes or explore partnership opportunities in clean energy.
            </p>
            <Link to="/contact" className="inline-block bg-solar-500 hover:bg-solar-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-glow-solar hover:-translate-y-0.5">
              Get in Touch →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
