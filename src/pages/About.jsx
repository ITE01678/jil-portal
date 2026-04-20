import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

const VALUES = [
  { icon: "🔆", title: "Quality First",     desc: "Every cell manufactured to the highest international standards, certified by TÜV Rheinland, Fraunhofer ISE, and SGS.",     color: "from-solar-500 to-amber-600"   },
  { icon: "💡", title: "Innovation",         desc: "Continuously advancing from conventional cells to Mono PERC technology, and investing in next-generation solar R&D.",     color: "from-indigo-500 to-blue-600"   },
  { icon: "🌱", title: "Sustainability",     desc: "Zero liquid discharge commitment, energy efficiency programmes, and clean supply chain — environmental care at every step.", color: "from-leaf-500 to-teal-600"    },
  { icon: "🛡️", title: "Integrity",         desc: "Transparent governance, ethical business conduct, and unwavering commitment to our customers, employees, and communities.", color: "from-purple-500 to-violet-600"  },
  { icon: "🤝", title: "Partnership",        desc: "Building long-term relationships with EPCs, developers, utilities, and governments to advance India's solar ecosystem.",    color: "from-rose-500 to-pink-600"     },
  { icon: "🌍", title: "Social Impact",      desc: "CSR programmes in education, healthcare, green spaces, and women empowerment for communities surrounding our facilities.",   color: "from-cyan-500 to-blue-500"    },
];

const TEAM = [
  { name: "Kolkata HQ",         role: "Registered Office",            grad: "from-navy-700 to-navy-500",       initials: "HQ", bio: "Unnayanam, 20A Ashutosh Chowdhury Avenue, Kolkata – 700 019, West Bengal, India. Our corporate head office overseeing strategy, operations, and investor relations." },
  { name: "Baddi Facility",     role: "Himachal Pradesh · Operational", grad: "from-solar-500 to-amber-600",   initials: "BD", bio: "Our flagship 0.96 GW Mono PERC manufacturing plant, operational since 2009. TÜV Rheinland and Fraunhofer ISE certified. Expanding by 800 MW." },
  { name: "Bhubaneswar Facility",role: "Odisha · Commissioning 2025",  grad: "from-leaf-500 to-teal-600",     initials: "BH", bio: "Our next-generation 4 GW cell + 2.8 GW module integrated facility — a landmark joint venture that will reshape India's solar manufacturing landscape." },
  { name: "Sales & Marketing",   role: "Pan-India Operations",          grad: "from-indigo-500 to-blue-600",   initials: "SM", bio: "Serving utilities, EPCs, commercial developers, and government bodies across India. Reach us at info@jil-jupiter.com for bulk enquiries." },
];

const MILESTONES = [
  { year: "2009", event: "Founded and commissioned first 30 MW solar cell manufacturing line in Baddi, Himachal Pradesh — the start of India's solar manufacturing revolution." },
  { year: "2015", event: "Expanded capacity to 200 MW. Secured TÜV Rheinland plant certification and SGS quality accreditation, establishing international quality benchmarks." },
  { year: "2017", event: "Recognised by Ministry of New & Renewable Energy as 'Leading RE Manufacturer (Solar Cells)' at REI Expo 2017 — India's largest renewable energy platform." },
  { year: "2019", event: "Adopted Mono PERC technology, crossing 500 MW installed capacity. Received Fraunhofer ISE product certification and second MoNRE recognition at REI Expo 2019." },
  { year: "2023", event: "Reached 0.96 GW operational capacity at Baddi. Announced 800 MW expansion and landmark Bhubaneswar joint venture — a ₹6,500 Crore integrated solar manufacturing project." },
  { year: "2024", event: "Secured ₹300 Crore + ₹500 Crore investments from ValueQuest. Won Renewable Energy Manufacturing Excellence Award at REI Expo 2024 and multiple Green Urja Awards." },
  { year: "2025", event: "Commissioning Bhubaneswar 4 GW cell + 2.8 GW module facility. Swept 3 wins at India Solar Week 2026 — Technology of Year, Project of Year, and Women Leader in Clean Energy." },
];

const CLIENT_ROW_1 = [
  { name: "Waaree Energies",          emoji: "☀️" },
  { name: "Premier Energies",         emoji: "⚡" },
  { name: "Vikram Solar",             emoji: "🌞" },
  { name: "Adani Solar",              emoji: "🏭" },
  { name: "Tata Power Solar",         emoji: "🔆" },
  { name: "Sterling & Wilson Solar",  emoji: "🌱" },
  { name: "Jakson Group",             emoji: "💡" },
  { name: "Rays Power Experts",       emoji: "🌤️" },
  { name: "Avaada Energy",            emoji: "♻️" },
];

const CLIENT_ROW_2 = [
  { name: "SECI",                     emoji: "🏛️" },
  { name: "NTPC Renewable Energy",    emoji: "⚙️" },
  { name: "Hero Future Energies",     emoji: "🦾" },
  { name: "ReNew Power",              emoji: "🔋" },
  { name: "Azure Power",              emoji: "☁️" },
  { name: "CleanMax Solar",           emoji: "🌿" },
  { name: "Greenko Group",            emoji: "🍃" },
  { name: "Fourth Partner Energy",    emoji: "🤝" },
  { name: "Amp Energy",               emoji: "⚡" },
];

function ClientChip({ label, emoji }) {
  return (
    <span className="inline-flex items-center gap-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 px-5 py-3 rounded-xl shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap flex-shrink-0 select-none">
      <span className="text-base leading-none">{emoji}</span>
      {label}
    </span>
  );
}

export default function About() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-bg solar-pattern min-h-[60vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-solar-400/15 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-leaf-400/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-solar-400 animate-pulse-slow" />
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 text-balance">
              Powering India's<br />
              <span className="solar-text drop-shadow-lg">Solar Future.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              We are a pure-play company manufacturing solar cells in Baddi, Himachal Pradesh, India. Grown from 30.00 MW in 2009 to 0.96 GW — empowering the planet through agility &amp; vision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Purpose</span>
            <h2 className="section-title">What Drives <span className="solar-text">Everything We Do</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0.1)} className="card p-8">
              <div className="icon-box w-12 h-12 text-xl bg-gradient-to-br from-solar-500 to-amber-600 mb-5 shadow-lg">🎯</div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                To be India's most trusted solar cell manufacturer — delivering cutting-edge Mono PERC technology, maintaining the highest quality standards, and accelerating the country's transition to clean, renewable energy.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="card p-8">
              <div className="icon-box w-12 h-12 text-xl bg-gradient-to-br from-leaf-500 to-teal-600 mb-5 shadow-lg">🔭</div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                A world powered by clean, renewable solar energy — where Jupiter International's cells shine from rooftops and solar parks across India and beyond, contributing to a greener, more sustainable planet for future generations.
              </p>
              <ul className="space-y-2">
                {[
                  "Become India's #1 pure-play solar cell manufacturer by 2026",
                  "Achieve 4.96 GW combined national capacity (Baddi + Bhubaneswar)",
                  "Lead adoption of next-generation TOPCon & HJT cell technology",
                  "Expand export footprint to South-East Asia, Middle East & Africa",
                ].map((v, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="text-leaf-500 flex-shrink-0 mt-0.5">→</span>
                    {v}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">Values</span>
            <h2 className="section-title">The Principles We <span className="leaf-text">Live By</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="card">
                <div className={`icon-box w-12 h-12 text-xl bg-gradient-to-br ${v.color} mb-4 shadow-lg`}>{v.icon}</div>
                <h3 className="font-bold text-base mb-2">{v.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ethos ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Ethos</span>
            <h2 className="section-title">The Jupiter <span className="solar-text">Ethos</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              The principles that underpin every decision, from the factory floor to the boardroom.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeUp(0.1)}>
              <div className="space-y-6">
                {[
                  { num: "01", title: "Pure-Play Focus",      desc: "We do one thing and we do it exceptionally well — solar cell manufacturing. Our singular focus lets us invest fully in process excellence, technology leadership, and product quality without distraction." },
                  { num: "02", title: "India-First Manufacturing", desc: "We are proud to be entirely Made in India. From sourcing raw silicon wafers to delivering finished cells, our supply chain is rooted in India — strengthening national energy independence." },
                  { num: "03", title: "Long-Term Thinking",   desc: "We build relationships, not transactions. From 16-year partnerships with customers to multi-decade environmental commitments, we prioritise the long term over short-term gains." },
                  { num: "04", title: "Continuous Improvement", desc: "Kaizen — relentless, incremental improvement — is embedded in our manufacturing DNA. Every year, we raise efficiency targets, tighten tolerances, and pursue the next generation of cell technology." },
                ].map((e, i) => (
                  <motion.div key={i} {...fadeUp(i * 0.08)} className="flex gap-5">
                    <span className="text-3xl font-extrabold solar-text flex-shrink-0 leading-none w-10">{e.num}</span>
                    <div>
                      <h3 className="font-bold text-base mb-1">{e.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 p-10 shadow-2xl text-white">
              <div className="absolute inset-0 solar-pattern opacity-25" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-solar-500 to-amber-600 flex items-center justify-center text-3xl mb-6 shadow-lg">🌞</div>
                <blockquote className="text-lg font-semibold leading-relaxed text-white/90 mb-6 italic">
                  "We don't just manufacture solar cells — we manufacture the future. Every cell that leaves our facility is our commitment to a planet that runs on clean energy."
                </blockquote>
                <p className="text-white/50 text-xs uppercase tracking-widest font-medium">— Jupiter International Philosophy</p>
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  {[
                    { val: "30 MW",    label: "Started in 2009" },
                    { val: "0.96 GW", label: "Today's Capacity" },
                    { val: "4.96 GW", label: "2025 Target"      },
                    { val: "100%",    label: "Made in India"     },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/10 rounded-xl py-3 px-2">
                      <p className="text-xl font-extrabold solar-text leading-none mb-0.5">{s.val}</p>
                      <p className="text-[11px] text-white/50">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Journey ───────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">History</span>
            <h2 className="section-title">Our <span className="solar-text">Journey</span></h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-solar-500 via-amber-500 to-leaf-500 rounded-full hidden sm:block" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-solar-500 to-amber-600 flex items-center justify-center z-10 shadow-md hidden sm:flex">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="card flex-1 py-5 px-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 block mb-1.5">{m.year}</span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Offices & Presence ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-navy-600 dark:text-navy-200 bg-navy-50 dark:bg-navy-900/30 px-3 py-1 rounded-full mb-4">Presence</span>
            <h2 className="section-title">Our Locations &amp; <span className="solar-text">Operations</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Headquartered in Kolkata with manufacturing across two states and a growing national footprint.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="card text-center py-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.grad} flex items-center justify-center text-white text-xl font-extrabold mx-auto mb-5 shadow-lg`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-sm mb-0.5 leading-snug">{member.name}</h3>
                <p className="text-xs text-solar-600 dark:text-solar-400 font-semibold mb-3">{member.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-navy-600 dark:text-navy-200 bg-navy-50 dark:bg-navy-900/30 px-3 py-1 rounded-full mb-4">Leadership</span>
            <h2 className="section-title">The Team Behind <span className="solar-text">Every Cell</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Industry veterans and specialists who have scaled Jupiter from a 30 MW startup to India's leading solar cell manufacturer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                name: "Founder &amp; Managing Director",
                role: "Executive Leadership",
                grad: "from-navy-700 to-navy-500",
                bio: "Visionary founder who built Jupiter International from a 30 MW startup in 2009 to India's largest pure-play solar cell manufacturer at 0.96 GW.",
              },
              {
                name: "Kasturi Roy Choudhury",
                role: "Chief Human Resources Officer",
                grad: "from-purple-600 to-violet-600",
                bio: "CHRO and India Solar Week 2026 Women Leader in Clean Energy. Champion of inclusive workplace culture across all Jupiter facilities.",
              },
              {
                name: "VP — Manufacturing",
                role: "Head of Operations",
                grad: "from-solar-500 to-amber-600",
                bio: "Head of our Baddi flagship facility. Led every major technology upgrade from conventional cells to Mono PERC since the plant's inception.",
              },
              {
                name: "Chief Technology Officer",
                role: "R&amp;D &amp; Technology",
                grad: "from-leaf-500 to-teal-600",
                bio: "Pioneer in Mono PERC adoption in India. Leading our next-generation R&amp;D agenda including TOPCon and the Bhubaneswar facility technology stack.",
              },
            ].map((m, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="card text-center py-8 flex flex-col items-center">
                {/* Circular photo-style avatar */}
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${m.grad} flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden flex-shrink-0`}>
                  <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
                    <circle cx="40" cy="28" r="15" fill="rgba(255,255,255,0.75)" />
                    <path d="M10 80 Q10 52 40 52 Q70 52 70 80 Z" fill="rgba(255,255,255,0.75)" />
                  </svg>
                </div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full mb-2 leading-none">
                  {m.role}
                </span>
                <h3 className="font-bold text-sm mb-2 leading-snug px-1">{m.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{m.bio}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.2)} className="card bg-gradient-to-r from-navy-900 to-navy-800 text-white text-center py-8 px-6">
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl mx-auto">
              Our leadership team is backed by a 500+ strong workforce across Kolkata, Baddi, and Bhubaneswar — engineers, scientists, quality specialists, and sustainability experts dedicated to powering India's solar future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Key Stats ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "0.96 GW", label: "Installed Capacity",   icon: "⚡", grad: "from-solar-500 to-amber-600"   },
              { value: "16+",     label: "Years of Operations",   icon: "🏆", grad: "from-navy-700 to-navy-500"     },
              { value: "3",       label: "Manufacturing Facilities", icon: "🏭", grad: "from-leaf-500 to-teal-600" },
              { value: "4.96 GW", label: "Target by 2025",       icon: "🌟", grad: "from-indigo-500 to-blue-600"  },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="card text-center py-8">
                <div className={`icon-box w-12 h-12 text-xl bg-gradient-to-br ${s.grad} mx-auto mb-4 shadow-lg`}>{s.icon}</div>
                <p className="text-4xl font-extrabold solar-text leading-none mb-1">{s.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clientele ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">Clientele</span>
            <h2 className="section-title">Trusted by India's <span className="leaf-text">Solar Leaders</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Our cells power the projects of India's largest module manufacturers, EPCs, and government utilities.
            </p>
          </motion.div>

          {/* ── Scrolling marquee rows ──────────────────────────────── */}
          <div className="space-y-4 mb-14">
            {/* Row 1 — scrolls left */}
            <div className="relative overflow-hidden">
              <div className="flex gap-4 animate-marquee w-max">
                {[...CLIENT_ROW_1, ...CLIENT_ROW_1].map((c, i) => (
                  <ClientChip key={i} label={c.name} emoji={c.emoji} />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 dark:from-slate-800/30 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 dark:from-slate-800/30 to-transparent z-10" />
            </div>
            {/* Row 2 — scrolls right */}
            <div className="relative overflow-hidden">
              <div className="flex gap-4 animate-marquee-rev w-max">
                {[...CLIENT_ROW_2, ...CLIENT_ROW_2].map((c, i) => (
                  <ClientChip key={i} label={c.name} emoji={c.emoji} />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 dark:from-slate-800/30 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 dark:from-slate-800/30 to-transparent z-10" />
            </div>
          </div>

          {/* Testimonial */}
          <motion.div {...fadeUp(0.05)} className="card max-w-3xl mx-auto mb-12 text-center p-8">
            <div className="text-4xl mb-4">⭐</div>
            <blockquote className="text-base text-slate-700 dark:text-slate-200 italic leading-relaxed mb-4">
              "Jupiter International's Mono PERC cells consistently deliver above-rated performance. Their quality consistency and on-time delivery make them our preferred cell supplier."
            </blockquote>
            <p className="text-sm font-bold text-solar-600 dark:text-solar-400">Waaree Energies Ltd.</p>
            <p className="text-xs text-slate-400">India's Leading Solar Module Manufacturer</p>
          </motion.div>

          <motion.div {...fadeUp(0.3)} className="text-center mt-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Want to become a Jupiter International partner?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-solar-500 hover:bg-solar-600 text-white font-bold px-7 py-3 rounded-xl transition-all hover:shadow-glow-solar">
              Contact Our Sales Team →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-navy-900 via-navy-700 to-solar-900 shadow-2xl">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-solar-400/10 blur-2xl" />
            <h2 className="text-4xl font-extrabold mb-4 text-balance">Be Part of the Solar Story</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Explore career opportunities or get in touch to learn how Jupiter International can power your renewable energy projects.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/careers" className="inline-block bg-solar-500 hover:bg-solar-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-glow-solar hover:-translate-y-0.5">
                View Careers →
              </Link>
              <Link to="/contact" className="inline-block border border-white/30 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-white/10 transition-all">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
