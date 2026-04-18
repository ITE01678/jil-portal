import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJI_POOL = ["🚀","⭐","🎯","💡","🏆","🎮","💎","🌟","🦋","🌈","🎸","🍕"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCards(count = 8) {
  const emojis = EMOJI_POOL.slice(0, count);
  return shuffle([...emojis, ...emojis]).map((emoji, i) => ({
    id: i, emoji, flipped: false, matched: false,
  }));
}

/* ── Setup ───────────────────────────────────────────────────────────── */
function Setup({ onStart }) {
  const [mode,  setMode]  = useState(1);
  const [names, setNames] = useState(["Player 1", "Player 2"]);
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
      <div className="icon-box w-16 h-16 text-3xl bg-gradient-to-br from-purple-500 to-pink-600 mx-auto shadow-lg">🃏</div>
      <div className="text-center">
        <h3 className="text-xl font-extrabold">Memory Match</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Find all matching pairs to win!</p>
      </div>
      <div className="flex gap-3 w-full">
        {[1, 2].map(n => (
          <button key={n} onClick={() => setMode(n)}
            className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
              mode === n ? "border-purple-500 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400"
                        : "border-slate-200 dark:border-slate-700 text-slate-500"}`}>
            {n === 1 ? "Solo" : "2 Players"}
          </button>
        ))}
      </div>
      {Array.from({ length: mode }).map((_, i) => (
        <input key={i} value={names[i]}
          onChange={e => setNames(n => { const c=[...n]; c[i]=e.target.value; return c; })}
          className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 py-2.5 px-4 text-sm font-medium focus:border-purple-500 focus:outline-none transition-colors"
          placeholder={`Player ${i + 1} name`}
        />
      ))}
      <button onClick={() => onStart(mode, names.slice(0, mode))} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold hover:opacity-90 transition-opacity">
        Start Game 🃏
      </button>
    </div>
  );
}

/* ── Game board ──────────────────────────────────────────────────────── */
function Board({ mode, players, onDone }) {
  const [cards,   setCards]   = useState(() => makeCards(8));
  const [flipped, setFlipped] = useState([]);
  const [scores,  setScores]  = useState([0, 0]);
  const [turn,    setTurn]    = useState(0);
  const [locked,  setLocked]  = useState(false);
  const [elapsed, setElapsed] = useState(0); // solo timer

  const matchedCount = cards.filter(c => c.matched).length;
  const total = cards.length / 2;

  // Solo timer
  useEffect(() => {
    if (mode !== 1) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [mode]);

  // Check completion
  useEffect(() => {
    if (matchedCount === total) {
      setTimeout(() => onDone(scores, elapsed), 600);
    }
  }, [matchedCount]); // eslint-disable-line

  const flip = (id) => {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    const newFlipped = [...flipped, id];
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      const [a, b] = newFlipped.map(fid => newCards.find(c => c.id === fid));
      if (a.emoji === b.emoji) {
        // Match!
        setTimeout(() => {
          setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c));
          setScores(prev => { const s=[...prev]; s[turn]++; return s; });
          setFlipped([]);
          setLocked(false);
          // keep same player's turn on match
        }, 400);
      } else {
        // No match — flip back after delay
        setTimeout(() => {
          setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlipped([]);
          setLocked(false);
          if (mode === 2) setTurn(t => 1 - t);
        }, 900);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Scoreboard */}
      <div className="flex gap-4 w-full max-w-sm">
        {players.map((p, i) => (
          <div key={i} className={`flex-1 text-center py-3 rounded-xl border-2 transition-all ${
            mode === 2 && turn === i ? "border-purple-500 bg-purple-50 dark:bg-purple-950/50" : "border-slate-200 dark:border-slate-700"}`}>
            <p className="text-xs font-bold text-slate-500 truncate px-1">{p}{mode === 2 && turn === i ? " 🎯" : ""}</p>
            <p className="text-2xl font-extrabold gradient-text">{scores[i]}</p>
          </div>
        ))}
        {mode === 1 && (
          <div className="flex-1 text-center py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700">
            <p className="text-xs font-bold text-slate-500">Time</p>
            <p className="text-2xl font-extrabold gradient-text">{elapsed}s</p>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        {cards.map(card => (
          <motion.button
            key={card.id}
            onClick={() => flip(card.id)}
            whileTap={!card.matched && !card.flipped ? { scale: 0.92 } : {}}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl text-2xl flex items-center justify-center transition-all duration-300 font-bold select-none
              ${card.matched ? "bg-emerald-100 dark:bg-emerald-950/40 cursor-default ring-2 ring-emerald-400" :
                card.flipped ? "bg-indigo-100 dark:bg-indigo-950/40 cursor-default"
                             : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"}`}
          >
            <AnimatePresence mode="wait">
              {(card.flipped || card.matched) ? (
                <motion.span key="emoji" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {card.emoji}
                </motion.span>
              ) : (
                <motion.span key="back" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-slate-400 dark:text-slate-500 text-lg">
                  ?
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-slate-400">{matchedCount}/{total} pairs found</p>
    </div>
  );
}

/* ── Results ─────────────────────────────────────────────────────────── */
function Results({ scores, players, elapsed, mode, onRestart }) {
  const winner = mode === 2
    ? (scores[0] > scores[1] ? 0 : scores[1] > scores[0] ? 1 : -1)
    : 0;
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto text-center">
      <div className="text-5xl">{mode === 1 ? "⭐" : winner === -1 ? "🤝" : "🏆"}</div>
      <h3 className="text-2xl font-extrabold">
        {mode === 1 ? `Done in ${elapsed}s!` : winner === -1 ? "It's a Tie!" : `${players[winner]} Wins!`}
      </h3>
      <div className="w-full space-y-3">
        {players.map((p, i) => (
          <div key={i} className={`flex items-center justify-between px-5 py-4 rounded-2xl ${i === winner ? "bg-purple-50 dark:bg-purple-950/50 border-2 border-purple-400" : "bg-slate-100 dark:bg-slate-800"}`}>
            <span className="font-semibold text-sm">{p}</span>
            <span className="text-2xl font-extrabold gradient-text">{scores[i]} pairs</span>
          </div>
        ))}
      </div>
      <button onClick={onRestart} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold hover:opacity-90 transition-opacity">
        Play Again
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function MemoryMatch() {
  const [phase,   setPhase]   = useState("setup");
  const [mode,    setMode]    = useState(1);
  const [players, setPlayers] = useState([]);
  const [scores,  setScores]  = useState([0, 0]);
  const [elapsed, setElapsed] = useState(0);

  const start  = (m, names)          => { setMode(m); setPlayers(names); setPhase("playing"); };
  const finish = (sc, el)            => { setScores(sc); setElapsed(el); setPhase("results"); };

  return (
    <div className="py-6 px-4">
      {phase === "setup"   && <Setup onStart={start} />}
      {phase === "playing" && <Board key={Date.now()} mode={mode} players={players} onDone={finish} />}
      {phase === "results" && <Results scores={scores} players={players} elapsed={elapsed} mode={mode} onRestart={() => setPhase("setup")} />}
    </div>
  );
}
