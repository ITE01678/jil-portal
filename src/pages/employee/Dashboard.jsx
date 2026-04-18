import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Chart from "chart.js/auto";

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
    </div>
  );
}
