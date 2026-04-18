import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OPS = ["+", "−", "×"];

function genQuestion() {
  const op = OPS[Math.floor(Math.random() * 3)];
  let a, b, answer;
  if (op === "+") { a = rand(5, 50);  b = rand(5, 50);  answer = a + b; }
  if (op === "−") { a = rand(15, 99); b = rand(1, a-1); answer = a - b; }
  if (op === "×") { a = rand(2, 12);  b = rand(2, 12);  answer = a * b; }
  return { display: `${a}  ${op}  ${b}  =  ?`, answer };
}

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/* ── Single-player game round ──────────────────────────────────────── */
function GameRound({ playerName, onDone }) {
  const DURATION = 60;
  const [timeLeft, setTimeLeft]   = useState(DURATION);
  const [score, setScore]         = useState(0);
  const [question, setQuestion]   = useState(genQuestion);
  const [input, setInput]         = useState("");
  const [flash, setFlash]         = useState(null); // "ok" | "bad"
  const inputRef = useRef(null);
  const doneRef  = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          if (!doneRef.current) { doneRef.current = true; }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Call onDone once when timer hits 0
  useEffect(() => {
    if (timeLeft === 0) onDone(score);
  }, [timeLeft]); // eslint-disable-line

  const submit = useCallback(() => {
    if (timeLeft === 0) return;
    const val = parseInt(input, 10);
    if (isNaN(val)) return;
    const correct = val === question.answer;
    setFlash(correct ? "ok" : "bad");
    setTimeout(() => setFlash(null), 350);
    if (correct) setScore(s => s + 1);
    setInput("");
    setQuestion(genQuestion());
    inputRef.current?.focus();
  }, [input, question, timeLeft]);

  const pct = (timeLeft / DURATION) * 100;
  const barColor = timeLeft > 20 ? "from-indigo-500 to-purple-600"
                 : timeLeft > 10 ? "from-amber-500 to-orange-500"
                 :                 "from-rose-500 to-red-600";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Player label */}
      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
        {playerName}'s Turn
      </div>

      {/* Timer bar */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
          <span>Time left</span>
          <span className={timeLeft <= 10 ? "text-rose-500 animate-pulse" : ""}>{timeLeft}s</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Score</p>
        <p className="text-5xl font-black gradient-text leading-none">{score}</p>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.display}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.18 }}
          className={`text-3xl font-extrabold tracking-tight rounded-2xl px-8 py-5 transition-colors duration-200
            ${flash === "ok"  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600" :
              flash === "bad" ? "bg-rose-50 dark:bg-rose-950/40 text-rose-500" :
                                "bg-slate-100 dark:bg-slate-800"}`}
        >
          {question.display}
        </motion.div>
      </AnimatePresence>

      {/* Input */}
      <div className="flex gap-3 w-full max-w-xs">
        <input
          ref={inputRef}
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="Your answer…"
          className="flex-1 text-center text-xl font-bold rounded-xl border-2
                     border-slate-200 dark:border-slate-600
                     bg-white dark:bg-slate-800
                     text-slate-900 dark:text-slate-100
                     focus:border-indigo-500 focus:outline-none
                     py-3 px-4 transition-colors"
        />
        <button onClick={submit} className="btn-primary px-5 py-3 text-base">→</button>
      </div>
      <p className="text-xs text-slate-400">Press Enter or → to submit</p>
    </div>
  );
}

/* ── Setup screen ────────────────────────────────────────────────────── */
function Setup({ onStart }) {
  const [mode, setMode]     = useState(1);
  const [names, setNames]   = useState(["Player 1", "Player 2"]);

  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
      <div className="icon-box w-16 h-16 text-3xl bg-gradient-to-br from-amber-500 to-orange-600 mx-auto shadow-lg">⚡</div>
      <div className="text-center">
        <h3 className="text-xl font-extrabold">Math Lightning</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Answer as many in 60 seconds as you can!</p>
      </div>

      {/* Mode */}
      <div className="flex gap-3 w-full">
        {[1, 2].map(n => (
          <button key={n} onClick={() => setMode(n)}
            className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
              mode === n ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                        : "border-slate-200 dark:border-slate-700 text-slate-500"}`}>
            {n === 1 ? "Solo" : "2 Players"}
          </button>
        ))}
      </div>

      {/* Names */}
      {Array.from({ length: mode }).map((_, i) => (
        <input key={i} value={names[i]}
          onChange={e => setNames(n => { const c=[...n]; c[i]=e.target.value; return c; })}
          className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 py-2.5 px-4 text-sm font-medium focus:border-indigo-500 focus:outline-none transition-colors"
          placeholder={`Player ${i + 1} name`}
        />
      ))}

      <button onClick={() => onStart(mode, names.slice(0, mode))} className="btn-primary w-full justify-center py-3.5">
        Start Game ⚡
      </button>
    </div>
  );
}

/* ── Results ─────────────────────────────────────────────────────────── */
function Results({ scores, players, onRestart }) {
  const winner = scores[0] > (scores[1] ?? -1) ? 0 : scores[1] > scores[0] ? 1 : -1;
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto text-center">
      <div className="text-5xl">{winner === -1 ? "🤝" : "🏆"}</div>
      <h3 className="text-2xl font-extrabold">
        {winner === -1 ? "It's a Tie!" : `${players[winner]} Wins!`}
      </h3>
      <div className="w-full space-y-3">
        {players.map((p, i) => (
          <div key={i} className={`flex items-center justify-between px-5 py-4 rounded-2xl ${i === winner ? "bg-indigo-50 dark:bg-indigo-950/50 border-2 border-indigo-400" : "bg-slate-100 dark:bg-slate-800"}`}>
            <span className="font-semibold text-sm">{p}</span>
            <span className="text-2xl font-extrabold gradient-text">{scores[i]}</span>
          </div>
        ))}
      </div>
      <button onClick={onRestart} className="btn-primary w-full justify-center py-3">Play Again</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function MathLightning() {
  const [phase,   setPhase]   = useState("setup");
  const [mode,    setMode]    = useState(1);
  const [players, setPlayers] = useState([]);
  const [scores,  setScores]  = useState([]);

  const start = (m, names) => { setMode(m); setPlayers(names); setScores([]); setPhase("p1"); };

  const p1Done = s => {
    setScores([s]);
    setPhase(mode === 2 ? "p2" : "results");
  };
  const p2Done = s => { setScores(prev => [...prev, s]); setPhase("results"); };

  return (
    <div className="py-6 px-4">
      {phase === "setup"   && <Setup onStart={start} />}
      {phase === "p1"      && <GameRound key="p1" playerName={players[0]} onDone={p1Done} />}
      {phase === "p2"      && <GameRound key="p2" playerName={players[1]} onDone={p2Done} />}
      {phase === "results" && <Results scores={scores} players={players} onRestart={() => setPhase("setup")} />}
    </div>
  );
}
