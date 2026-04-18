import { useState } from "react";
import { motion } from "framer-motion";
import MathLightning from "../../components/games/MathLightning";
import MemoryMatch   from "../../components/games/MemoryMatch";
import WordScramble  from "../../components/games/WordScramble";
import TriviaQuiz    from "../../components/games/TriviaQuiz";

const GAMES = [
  {
    id: "math",
    icon: "⚡",
    label: "Math Lightning",
    desc: "Answer rapid mental-math questions before the clock runs out.",
    gradient: "from-amber-500 to-orange-600",
    Component: MathLightning,
  },
  {
    id: "memory",
    icon: "🃏",
    label: "Memory Match",
    desc: "Flip cards and find all matching emoji pairs.",
    gradient: "from-purple-500 to-pink-600",
    Component: MemoryMatch,
  },
  {
    id: "word",
    icon: "🔤",
    label: "Word Scramble",
    desc: "Unscramble workplace words against the clock.",
    gradient: "from-cyan-500 to-blue-600",
    Component: WordScramble,
  },
  {
    id: "trivia",
    icon: "🧠",
    label: "Brain Trivia",
    desc: "Test your general knowledge with multiple-choice questions.",
    gradient: "from-emerald-500 to-teal-600",
    Component: TriviaQuiz,
  },
];

export default function FunZone() {
  const [activeId, setActiveId] = useState(null);
  const activeGame = GAMES.find(g => g.id === activeId);

  return (
    <div className="space-y-8 page-content">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Fun Zone</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Brain-testing games with local multiplayer. Take a break and challenge a colleague!
          </p>
        </div>
        {activeId && (
          <button
            onClick={() => setActiveId(null)}
            className="btn-ghost text-sm border border-slate-200 dark:border-slate-700"
          >
            ← Back to Games
          </button>
        )}
      </motion.div>

      {/* Game picker */}
      {!activeId && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GAMES.map((game, i) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              onClick={() => setActiveId(game.id)}
              className="card text-left p-0 overflow-hidden hover:scale-[1.03] hover:shadow-card-hover cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {/* Picture area */}
              <div className={`h-28 bg-gradient-to-br ${game.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {game.icon}
                </span>
              </div>
              {/* Body */}
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1.5">{game.label}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{game.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-indigo-500 dark:text-indigo-400 text-xs font-semibold group-hover:gap-2 transition-all duration-200">
                  Play now <span>→</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Active game */}
      {activeId && activeGame && (
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="card min-h-[500px] flex flex-col"
        >
          {/* Game header strip */}
          <div className={`-m-6 mb-6 px-6 py-4 bg-gradient-to-r ${activeGame.gradient} rounded-t-2xl flex items-center gap-4`}>
            <span className="text-3xl">{activeGame.icon}</span>
            <div>
              <h2 className="text-white font-extrabold text-lg">{activeGame.label}</h2>
              <p className="text-white/70 text-xs">Solo or 2-player local multiplayer</p>
            </div>
          </div>

          <activeGame.Component />
        </motion.div>
      )}

    </div>
  );
}
