import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Chart from "chart.js/auto";
import { AwardsService, NewsActivitiesService, LeaderboardService } from "../../services/listsService";
import { SHAREPOINT_CONFIG } from "../../../azure-app-registration/sharepointConfig";

const SP_READY = SHAREPOINT_CONFIG.siteId !== "REPLACE_WITH_SITE_ID";

const KPI = [
  {
    label: "Total Tasks",
    value: 22,
    change: "+12%",
    positive: true,
    icon: "📋",
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-indigo-500/25",
  },
  {
    label: "Completed",
    value: 15,
    change: "+8%",
    positive: true,
    icon: "✅",
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/25",
  },
  {
    label: "In Progress",
    value: 5,
    change: "Active",
    positive: null,
    icon: "⚡",
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/25",
  },
  {
    label: "Overdue",
    value: 2,
    change: "Needs attention",
    positive: false,
    icon: "⚠️",
    gradient: "from-rose-500 to-red-600",
    shadow: "shadow-rose-500/25",
  },
];

const RECENT = [
  { task: "Q2 Budget Review",   status: "Completed", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",  time: "2h ago"  },
  { task: "Team Standup Notes", status: "In Review",  color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40",       time: "4h ago"  },
  { task: "Onboarding Forms",   status: "Pending",    color: "text-slate-500 bg-slate-100 dark:bg-slate-700",         time: "1d ago"  },
  { task: "Client Presentation",status: "Overdue",    color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40",          time: "2d ago"  },
];

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 20 },
  animate:   { opacity: 1, y: 0  },
  transition:{ delay, duration: 0.45, ease: "easeOut" },
});

export default function Dashboard() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  const [leaderboard, setLeaderboard] = useState([]);
  const [awards,      setAwards]      = useState([]);
  const [newsItems,   setNewsItems]   = useState([]);
  const [spLoading,   setSpLoading]   = useState(SP_READY);

  useEffect(() => {
    if (!SP_READY) return;
    Promise.all([
      LeaderboardService.getAll(10),
      AwardsService.getAll(),
      NewsActivitiesService.getAll(),
    ]).then(([lb, aw, ni]) => {
      setLeaderboard(lb);
      setAwards(aw.slice(0, 6));
      setNewsItems(ni.slice(0, 6));
    }).catch(err => {
      console.warn("[Dashboard] SharePoint fetch failed:", err);
    }).finally(() => setSpLoading(false));
  }, []);

  useEffect(() => {
    if (chartRef.current) { chartRef.current.destroy(); }

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Tasks Completed",
            data: [5, 10, 7, 14, 11, 16],
            backgroundColor: [
              "rgba(99,102,241,0.75)",
              "rgba(124,58,237,0.75)",
              "rgba(6,182,212,0.75)",
              "rgba(99,102,241,0.75)",
              "rgba(124,58,237,0.75)",
              "rgba(6,182,212,0.75)",
            ],
            borderRadius: 10,
            borderSkipped: false,
          },
          {
            label: "Tasks Added",
            data: [7, 12, 9, 16, 13, 18],
            backgroundColor: "rgba(100,116,139,0.18)",
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#94a3b8",
              boxRadius: 6,
              padding: 16,
              font: { size: 12 },
            },
          },
          tooltip: {
            backgroundColor: "#1e293b",
            titleColor: "#e2e8f0",
            bodyColor: "#94a3b8",
            padding: 12,
            cornerRadius: 10,
            boxPadding: 6,
          },
        },
        scales: {
          y: {
            grid:   { color: "rgba(100,116,139,0.12)" },
            border: { display: false },
            ticks:  { color: "#94a3b8", font: { size: 11 } },
          },
          x: {
            grid:   { display: false },
            border: { display: false },
            ticks:  { color: "#94a3b8", font: { size: 11 } },
          },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div className="space-y-8 page-content">

      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Here's your workspace overview.
        </p>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI.map((k, i) => (
          <motion.div key={i} {...fadeUp(0.05 + i * 0.08)} className="card">
            <div className={`icon-box w-11 h-11 text-lg mb-4 bg-gradient-to-br ${k.gradient} shadow-lg ${k.shadow}`}>
              {k.icon}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide">
              {k.label}
            </p>
            <p className="text-4xl font-extrabold mt-1 leading-none">{k.value}</p>
            <p className={`text-xs mt-2 font-semibold ${
              k.positive === true  ? "text-emerald-500" :
              k.positive === false ? "text-rose-500"    :
                                     "text-amber-500"
            }`}>
              {k.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart */}
        <motion.div {...fadeUp(0.35)} className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold">Task Overview</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Last 6 months</p>
            </div>
            <span className="stat-badge text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400">
              +18% vs last period
            </span>
          </div>
          <canvas ref={canvasRef} height="110" />
        </motion.div>

        {/* Recent activity */}
        <motion.div {...fadeUp(0.4)} className="card">
          <h2 className="text-lg font-bold mb-5">Recent Activity</h2>
          <div className="space-y-3">
            {RECENT.map((r, i) => (
              <div key={i} className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.task}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{r.time}</p>
                </div>
                <span className={`stat-badge flex-shrink-0 font-semibold ${r.color}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── SharePoint Live Data ─────────────────────────────────────── */}
      {SP_READY && (
        <div className="space-y-6">
          <motion.div {...fadeUp(0.45)}>
            <h2 className="text-xl font-bold tracking-tight">Live Portal Data</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Read from SharePoint — view only</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── JIL Leaderboard ──────────────────────────────────── */}
            <motion.div {...fadeUp(0.5)} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base flex items-center gap-2">🏆 JIL Leaderboard</h3>
                <span className="stat-badge text-amber-600 bg-amber-50 dark:bg-amber-950/30">Top 10</span>
              </div>
              {spLoading ? (
                <SpinnerRows />
              ) : leaderboard.length === 0 ? (
                <EmptyState label="No scores yet" />
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((row, i) => (
                    <div key={row._id ?? i} className="flex items-center gap-3 py-1.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 ${
                        i === 0 ? "bg-amber-400 text-white" :
                        i === 1 ? "bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200" :
                        i === 2 ? "bg-amber-700 text-white" :
                                  "bg-slate-100 dark:bg-slate-700 text-slate-500"
                      }`}>{i + 1}</span>
                      <span className="flex-1 text-sm font-medium truncate">{row.Title ?? row.name}</span>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{row.Score ?? 0} pts</p>
                        <p className="text-[10px] text-slate-400">Lv {row.Level ?? 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── JIL Awards ───────────────────────────────────────── */}
            <motion.div {...fadeUp(0.55)} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base flex items-center gap-2">🎖️ JIL Awards</h3>
                <span className="stat-badge text-solar-600 bg-solar-50 dark:bg-solar-950/30">Recent</span>
              </div>
              {spLoading ? (
                <SpinnerRows />
              ) : awards.length === 0 ? (
                <EmptyState label="No awards added yet" />
              ) : (
                <div className="space-y-3">
                  {awards.map((a, i) => (
                    <div key={a._id ?? i} className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0 leading-none mt-0.5">{a.Icon ?? "🏆"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate leading-snug">{a.Title}</p>
                        <p className="text-[11px] text-slate-400 truncate">{a.Organization} · {a.Year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── JIL News & Activities ────────────────────────────── */}
            <motion.div {...fadeUp(0.6)} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base flex items-center gap-2">📰 News &amp; Activities</h3>
                <span className="stat-badge text-leaf-600 bg-leaf-50 dark:bg-leaf-950/30">Latest</span>
              </div>
              {spLoading ? (
                <SpinnerRows />
              ) : newsItems.length === 0 ? (
                <EmptyState label="No items added yet" />
              ) : (
                <div className="space-y-3">
                  {newsItems.map((item, i) => (
                    <div key={item._id ?? i} className="flex items-start gap-3 py-1">
                      <span className="text-lg flex-shrink-0 leading-none mt-0.5">{item.Icon ?? (item.jType === "Activity" ? "🎉" : "📰")}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate leading-snug">{item.Title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{item.jType}</span>
                          {item.PublishDate && (
                            <span className="text-[10px] text-slate-400">
                              {new Date(item.PublishDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

          </div>
        </div>
      )}
    </div>
  );
}

function SpinnerRows() {
  return (
    <div className="space-y-2.5 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-7 rounded-lg bg-slate-100 dark:bg-slate-700/50" />
      ))}
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <p className="text-sm text-slate-400 text-center py-6">{label}</p>
  );
}
