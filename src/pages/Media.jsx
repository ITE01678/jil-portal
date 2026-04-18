import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AwardsService, NewsActivitiesService } from "../services/listsService";
import { isGraphReady } from "../services/graphClient";
import { SHAREPOINT_CONFIG } from "../../azure-app-registration/sharepointConfig";

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-80px" },
  transition:  { delay, duration: 0.55, ease: "easeOut" },
});

/* SharePoint is live when the site ID has been configured */
const SHAREPOINT_READY = SHAREPOINT_CONFIG.siteId !== "REPLACE_WITH_SITE_ID";

/* ── Field mappers: SharePoint List item → component shape ───────────── */

const mapNews = (item) => ({
  _id:      item._id,
  date:     item.PublishDate
              ? new Date(item.PublishDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
              : "",
  year:     item.Year
              || (item.PublishDate ? new Date(item.PublishDate).getFullYear() : new Date().getFullYear()),
  title:    item.Title    || "",
  excerpt:  item.Excerpt  || "",
  tag:      item.Tag      || "News",
  tagColor: item.TagColor || "bg-solar-100 text-solar-700 dark:bg-solar-900/30 dark:text-solar-400",
  grad:     item.GradientClass || "from-solar-500 to-amber-600",
});

const mapEvent = (item) => ({
  _id:      item._id,
  name:     item.Title    || "",
  date:     item.PublishDate
              ? new Date(item.PublishDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
              : "",
  icon:     item.Icon         || "🎪",
  desc:     item.Excerpt      || "",
  grad:     item.GradientClass || "from-solar-500 to-amber-600",
  category: item.Category     || "Trade Show",
  imageUrl: item.ImageUrl     || "",
});

const mapUpcomingEvent = (item) => ({
  _id:   item._id,
  name:  item.Title    || "",
  date:  item.EventDate
           ? new Date(item.EventDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
           : "",
  venue: item.Venue       || "",
  stall: item.StallNumber || "",
  desc:  item.Description || "",
  grad:  item.GradientClass || "from-solar-500 to-amber-600",
});

const mapAward = (item) => ({
  _id:  item._id,
  icon: item.Icon         || "🏆",
  title: item.Title       || "",
  org:  item.Organization || "",
  desc: item.Description  || "",
  grad: item.GradientClass || "from-solar-500 to-amber-600",
});

/* ── Fallback static data (shown until SharePoint is configured) ─────── */

const FALLBACK_PRESS_RELEASES = [
  {
    date: "Aug 21, 2025", year: 2025,
    title: "Jupiter International signs MoU with Maharashtra Government for integrated solar manufacturing facility",
    excerpt: "Jupiter International Limited has signed a Memorandum of Understanding with the Government of Maharashtra to establish a state-of-the-art integrated solar manufacturing facility, marking a significant expansion of its manufacturing footprint.",
    tag: "Expansion", tagColor: "bg-leaf-100 text-leaf-700 dark:bg-leaf-900/30 dark:text-leaf-400", grad: "from-leaf-500 to-teal-600",
  },
  {
    date: "Apr 14, 2025", year: 2025,
    title: "Jupiter International Limited secures ₹500 Crore investment from ValueQuest SCALE Fund",
    excerpt: "Jupiter International Limited announced the successful closure of a ₹500 Crore funding round led by ValueQuest SCALE Fund, accelerating its capacity expansion plans and Bhubaneswar facility development.",
    tag: "Investment", tagColor: "bg-solar-100 text-solar-700 dark:bg-solar-900/30 dark:text-solar-400", grad: "from-solar-500 to-amber-600",
  },
  {
    date: "Jan 21, 2025", year: 2025,
    title: "Jupiter International secures rooftop solar project in West Bengal",
    excerpt: "The company announced securing a significant rooftop solar EPC project in West Bengal, further expanding its on-ground solar installations across eastern India.",
    tag: "Project Win", tagColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400", grad: "from-indigo-500 to-blue-600",
  },
  {
    date: "Jan 09, 2025", year: 2025,
    title: "Jupiter International to invest ₹6,500 Crores in capacity expansion",
    excerpt: "Jupiter International Limited unveiled an ambitious ₹6,500 Crore investment plan for capacity expansion, including the Bhubaneswar joint venture facility targeting 4 GW of solar cell and 2.8 GW of module production.",
    tag: "Announcement", tagColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", grad: "from-purple-500 to-violet-600",
  },
  {
    date: "Jul 16, 2024", year: 2024,
    title: "Jupiter International Secures INR 300 Crore Investment from ValueQuest to Expand Solar Cell Manufacturing",
    excerpt: "Jupiter International Limited secured an INR 300 Crore strategic investment from ValueQuest, setting the foundation for its major capacity expansion programme and next-generation solar manufacturing roadmap.",
    tag: "Investment", tagColor: "bg-solar-100 text-solar-700 dark:bg-solar-900/30 dark:text-solar-400", grad: "from-solar-500 to-amber-600",
  },
];

const FALLBACK_AWARDS = [
  { icon: "🏆", title: "Project of the Year – Fast-Track Execution",       org: "India Solar Week 2026",                        desc: "Unit III commissioning recognised for exceptional speed and quality of delivery.", grad: "from-solar-500 to-amber-600" },
  { icon: "⚡", title: "Technology of the Year – Advanced Solar Cell Mfg", org: "India Solar Week 2026",                        desc: "Recognised for the Advanced Solar Cell Manufacturing Platform at our Baddi facility.", grad: "from-indigo-500 to-blue-600" },
  { icon: "👩", title: "Woman Leader in Clean Energy",                       org: "India Solar Week 2026",                        desc: "Kasturi Roy Choudhury, CHRO, honoured for outstanding leadership in the clean energy sector.", grad: "from-purple-500 to-violet-600" },
  { icon: "🌿", title: "Green Crusader Award",                               org: "IGBC",                                         desc: "Awarded by the Indian Green Building Council for environmental excellence in manufacturing.", grad: "from-leaf-500 to-teal-600" },
  { icon: "🌟", title: "Company of the Year – Energy Efficiency",            org: "Sustainable Manufacturing 2025",               desc: "Recognised for industry-leading energy efficiency and sustainability practices.", grad: "from-cyan-500 to-blue-500" },
  { icon: "🏅", title: "6th Green Urja Award – Excellence in Manufacturing", org: "Green Urja Awards",                           desc: "For excellence in manufacturing green energy technologies in the solar cell category.", grad: "from-emerald-500 to-green-600" },
  { icon: "🥇", title: "Green Urja Award – Solar Cell Manufacturing",        org: "Green Urja Awards",                           desc: "Repeated recognition for excellence and innovation in solar cell production.", grad: "from-leaf-500 to-teal-600" },
  { icon: "🔋", title: "Renewable Energy Manufacturing Excellence Award",    org: "REI Expo 2024",                               desc: "Presented at Renewable Energy India Expo for manufacturing quality and output.", grad: "from-solar-500 to-amber-600" },
  { icon: "☀️", title: "Leading RE Manufacturer (Solar Cells)",              org: "Ministry of New & Renewable Energy, REI 2017", desc: "National recognition by MoNRE for being a leading manufacturer of renewable energy products.", grad: "from-amber-500 to-orange-500" },
  { icon: "🌐", title: "Leading RE Manufacturer (Others)",                   org: "Ministry of New & Renewable Energy, REI 2019", desc: "Recognised again for leadership in the broader renewable energy manufacturing space.", grad: "from-navy-700 to-navy-500" },
];

const FALLBACK_PAST_EVENTS = [
  { name: "RE+ EXPO 2025",          date: "Oct 2025",  icon: "☀️", desc: "Jupiter exhibited its latest M10 Mono PERC cells at Asia's premier renewable energy trade show in Greater Noida.", grad: "from-solar-500 to-amber-600",   category: "Trade Show" },
  { name: "Diwali Celebration 2024", date: "Nov 2024", icon: "🪔", desc: "Our Baddi facility celebrated Diwali with employees and their families — lighting up the community spirit.", grad: "from-amber-500 to-orange-500",   category: "Employee" },
  { name: "RE+ Expo 2024",           date: "Sep 2024", icon: "🔆", desc: "Jupiter showcased at RE+ Expo 2024, presenting Mono PERC technology advances and the upcoming Bhubaneswar JV.", grad: "from-indigo-500 to-blue-600",   category: "Trade Show" },
  { name: "46th Foundation Day",     date: "2024",     icon: "🏆", desc: "Celebrated 46 years of the parent group's founding with a special ceremony recognising employee milestones.", grad: "from-navy-700 to-navy-500",     category: "Anniversary" },
  { name: "REI Expo 2024",           date: "Sep 2024", icon: "🌏", desc: "Renewable Energy India Expo — Jupiter received the RE Manufacturing Excellence Award on the main stage.", grad: "from-leaf-500 to-teal-600",     category: "Trade Show" },
  { name: "Blood Donation Drive",    date: "Aug 2024", icon: "💉", desc: "Our quarterly CSR blood donation camp at Baddi in association with local health authorities — 80+ units donated.", grad: "from-rose-500 to-pink-600",    category: "CSR" },
  { name: "Christmas Celebration",   date: "Dec 2024", icon: "🎄", desc: "Season's greetings — a joyful celebration with our entire workforce across facilities, embracing diversity.", grad: "from-emerald-500 to-teal-600", category: "Employee" },
  { name: "Sports Day 2024",         date: "Jan 2024", icon: "🏅", desc: "Annual inter-department sports tournament at Baddi promoting employee wellness and team camaraderie.", grad: "from-cyan-500 to-blue-500",     category: "Employee" },
  { name: "Women's Day 2024",        date: "Mar 2024", icon: "💐", desc: "Celebrated International Women's Day with recognition of our women leaders and community awareness programmes.", grad: "from-purple-500 to-violet-600", category: "CSR" },
];

const FALLBACK_UPCOMING_EVENTS = [
  {
    name: "REI Expo 2025", date: "Oct 3–5, 2025",
    venue: "India Expo Center, Greater Noida", stall: "R1042",
    desc: "Asia's largest renewable energy exhibition. Visit our stall to see the latest M10 Mono PERC technology and speak with our engineering team.",
    grad: "from-solar-500 to-amber-600",
  },
];

/* ── Infrastructure photos — static until Drive is configured ────────── */
const INFRA_PHOTOS = [
  { src: "https://jil-jupiter.com/wp-content/uploads/2024/09/if1.jpg",          caption: "Baddi Plant — Cell Production Line" },
  { src: "https://jil-jupiter.com/wp-content/uploads/2024/09/if2.jpg",          caption: "Baddi Plant — Cleanroom Facility" },
  { src: "https://jil-jupiter.com/wp-content/uploads/2024/09/if3.jpg",          caption: "Baddi Plant — Quality Testing Lab" },
  { src: "https://jil-jupiter.com/wp-content/uploads/2024/09/1I2A5071-1-1.jpg", caption: "Baddi Plant — Solar Cell Array" },
  { src: "https://jil-jupiter.com/wp-content/uploads/2024/09/1I2A5716-1.jpg",   caption: "Baddi Plant — Aerial View" },
  { src: "https://jil-jupiter.com/wp-content/uploads/2024/09/1I2A5259-1.jpg",   caption: "Baddi Plant — Manufacturing Floor" },
];

const CATEGORY_COLORS = {
  "Trade Show": "bg-solar-100 text-solar-700 dark:bg-solar-900/30 dark:text-solar-400",
  "Employee":   "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "CSR":        "bg-leaf-100 text-leaf-700 dark:bg-leaf-900/30 dark:text-leaf-400",
  "Anniversary":"bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-200",
};

/* ═══════════════════════════════════════════════════════════════════════ */
export default function Media() {
  const [activeYear,     setActiveYear]     = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  /* ── Live data state — initialised with static fallbacks ─────────── */
  const [pressReleases,  setPressReleases]  = useState(FALLBACK_PRESS_RELEASES);
  const [pastEvents,     setPastEvents]     = useState(FALLBACK_PAST_EVENTS);
  const [upcomingEvents]                    = useState(FALLBACK_UPCOMING_EVENTS);
  const [awards,         setAwards]         = useState(FALLBACK_AWARDS);
  const [isLiveData,     setIsLiveData]     = useState(false);

  /* ── Fetch from SharePoint when configured + authenticated ────────── */
  useEffect(() => {
    if (!SHAREPOINT_READY || !isGraphReady()) return;

    Promise.allSettled([
      NewsActivitiesService.getNews(),
      NewsActivitiesService.getActivities(),
      AwardsService.getAll(),
    ]).then(([newsRes, activitiesRes, awardsRes]) => {
      if (newsRes.status === "fulfilled" && newsRes.value.length > 0)
        setPressReleases(newsRes.value.map(mapNews));
      if (activitiesRes.status === "fulfilled" && activitiesRes.value.length > 0)
        setPastEvents(activitiesRes.value.map(mapEvent));
      if (awardsRes.status === "fulfilled" && awardsRes.value.length > 0)
        setAwards(awardsRes.value.map(mapAward));
      setIsLiveData(true);
    }).catch(() => {/* silently keep fallback data */});
  }, []);

  /* ── Derived filter data ─────────────────────────────────────────── */
  const uniqueYears = [...new Set(pressReleases.map(p => String(p.year)).filter(Boolean))]
    .sort((a, b) => Number(b) - Number(a));
  const years      = ["All", ...uniqueYears];
  const categories = ["All", "Trade Show", "Employee", "CSR", "Anniversary"];

  const filteredPress  = activeYear === "All"
    ? pressReleases
    : pressReleases.filter(p => String(p.year) === activeYear);

  const filteredEvents = activeCategory === "All"
    ? pastEvents
    : pastEvents.filter(e => e.category === activeCategory);

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-bg solar-pattern min-h-[55vh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 right-10 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-solar-400/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-solar-400 animate-pulse-slow" />
              Media &amp; Press
              {isLiveData && (
                <span className="ml-1 px-1.5 py-0.5 bg-leaf-500/20 border border-leaf-400/40 text-leaf-300 text-[10px] font-bold rounded-full uppercase tracking-wide">Live</span>
              )}
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 text-balance">
              In the <span className="solar-text drop-shadow-lg">Spotlight.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              News, press releases, industry recognitions, events gallery, facility photos — everything you need to know about Jupiter International.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Upcoming</span>
            <h2 className="section-title">Upcoming <span className="solar-text">Events</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((ev, i) => (
              <motion.div key={ev._id ?? ev.name} {...fadeUp(i * 0.1)} className="card p-0 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${ev.grad}`} />
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="icon-box w-12 h-12 text-xl bg-gradient-to-br from-solar-500 to-amber-600 shadow-lg flex-shrink-0">🎪</div>
                    <div>
                      <h3 className="font-extrabold text-base">{ev.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{ev.date}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
                    {ev.venue && <p className="flex items-start gap-2"><span>📍</span>{ev.venue}</p>}
                    {ev.stall && <p className="flex items-start gap-2"><span>🎟️</span>Stall {ev.stall}</p>}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ev.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Media enquiries */}
            <motion.div {...fadeUp(0.1)} className="card bg-gradient-to-br from-navy-900 to-navy-700 text-white">
              <span className="text-3xl block mb-3">📰</span>
              <h3 className="font-extrabold text-base mb-2">Media Enquiries</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                For press releases, interviews, photography, and media accreditation at our events.
              </p>
              <a href="mailto:press@jil-jupiter.com" className="inline-block bg-solar-500 hover:bg-solar-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-all">
                press@jil-jupiter.com →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Events Gallery (past) ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full mb-4">Gallery</span>
            <h2 className="section-title">Events <span className="gradient-text">Gallery</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              Trade shows, CSR drives, celebrations, and community events — a year in pictures at Jupiter International.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border border-slate-200 dark:border-slate-700"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((ev, i) => (
              <motion.div key={ev._id ?? ev.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="card p-0 overflow-hidden group">
                {ev.imageUrl ? (
                  <div className="h-36 overflow-hidden">
                    <img src={ev.imageUrl} alt={ev.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => { e.target.style.display = "none"; }} />
                  </div>
                ) : (
                  <div className={`h-36 bg-gradient-to-br ${ev.grad} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 solar-pattern opacity-20" />
                    <span className="relative z-10 text-6xl drop-shadow-lg">{ev.icon}</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[ev.category] ?? "bg-slate-100 text-slate-600"}`}>{ev.category}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{ev.date}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1.5 leading-snug">{ev.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Infrastructure Gallery ─────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-leaf-600 dark:text-leaf-400 bg-leaf-50 dark:bg-leaf-900/20 px-3 py-1 rounded-full mb-4">Infrastructure</span>
            <h2 className="section-title">Our <span className="leaf-text">Facilities</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              A look inside our state-of-the-art Baddi facility — where precision meets scale in solar cell manufacturing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INFRA_PHOTOS.map((photo, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden bg-navy-900">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.classList.add("flex", "items-center", "justify-center");
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/90 to-transparent px-4 py-3">
                  <p className="text-white text-xs font-semibold">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.3)} className="text-center mt-10">
            <Link to="/manufacturing" className="inline-flex items-center gap-2 border-2 border-leaf-500 text-leaf-600 dark:text-leaf-400 font-bold px-7 py-3 rounded-xl hover:bg-leaf-50 dark:hover:bg-leaf-900/20 transition-all">
              Explore Manufacturing →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Awards & Recognitions ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200/80 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-solar-600 dark:text-solar-400 bg-solar-50 dark:bg-solar-900/20 px-3 py-1 rounded-full mb-4">Recognition</span>
            <h2 className="section-title">Awards &amp; <span className="solar-text">Recognitions</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-sm">
              A decade of industry recognition for manufacturing excellence, sustainability, and innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {awards.map((award, i) => (
              <motion.div key={award._id ?? award.title} {...fadeUp(i * 0.05)} className="card p-0 overflow-hidden flex flex-col">
                <div className={`h-2 bg-gradient-to-r ${award.grad}`} />
                <div className="p-5 flex flex-col flex-1">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${award.grad} flex items-center justify-center text-xl mb-3 shadow-md flex-shrink-0`}>
                    {award.icon}
                  </div>
                  <h3 className="font-bold text-xs mb-1 leading-snug">{award.title}</h3>
                  <p className="text-[10px] font-bold text-solar-600 dark:text-solar-400 uppercase tracking-wide mb-1.5">{award.org}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-auto">{award.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Award highlights summary bar */}
          <motion.div {...fadeUp(0.2)} className="card bg-gradient-to-r from-navy-900 to-navy-800 text-white flex flex-wrap gap-6 justify-around py-6 px-8">
            {[
              { val: "10+", label: "Industry Awards" },
              { val: "3",   label: "India Solar Week Wins" },
              { val: "2",   label: "Green Urja Awards" },
              { val: "2",   label: "MoNRE Recognitions" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold solar-text leading-none mb-0.5">{s.val}</p>
                <p className="text-xs text-white/60 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Press Releases ─────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-navy-600 dark:text-navy-200 bg-navy-50 dark:bg-navy-900/30 px-3 py-1 rounded-full mb-4">Press</span>
            <h2 className="section-title">Press <span className="solar-text">Releases</span></h2>
          </motion.div>

          {/* Year filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {years.map(y => (
              <button key={y} onClick={() => setActiveYear(y)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeYear === y
                    ? "bg-solar-500 text-white shadow-glow-solar"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-solar-50 dark:hover:bg-solar-900/20 border border-slate-200 dark:border-slate-700"
                }`}>
                {y}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredPress.map((pr, i) => (
              <motion.div key={pr._id ?? pr.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="card p-0 overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${pr.grad}`} />
                <div className="p-6 flex flex-col sm:flex-row gap-5">
                  <div className="flex-shrink-0 sm:w-28 text-sm">
                    <p className="font-bold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wide">{pr.date}</p>
                    <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${pr.tagColor}`}>{pr.tag}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-base mb-2 leading-snug text-slate-900 dark:text-white">{pr.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{pr.excerpt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400">
              For press enquiries contact:{" "}
              <a href="mailto:press@jil-jupiter.com" className="text-solar-600 dark:text-solar-400 font-semibold hover:underline">press@jil-jupiter.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl p-12 text-white bg-gradient-to-br from-navy-900 via-navy-700 to-solar-900 shadow-2xl">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-solar-400/10 blur-2xl" />
            <h2 className="text-4xl font-extrabold mb-4">Stay Updated</h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              For the latest on Jupiter International's expansion, technology, and sustainability milestones.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="inline-block bg-solar-500 hover:bg-solar-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-glow-solar hover:-translate-y-0.5">
                Contact Us →
              </Link>
              <Link to="/investor-relations" className="inline-block border border-white/30 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-white/10 transition-all">
                Investor Relations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
