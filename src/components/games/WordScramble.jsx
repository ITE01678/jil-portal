import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  { word: "PORTAL",      hint: "Entry point or gateway"              },
  { word: "DASHBOARD",   hint: "Control panel with key metrics"      },
  { word: "COLLABORATE", hint: "Work together with others"           },
  { word: "ANALYTICS",   hint: "Study of data patterns"              },
  { word: "ENTERPRISE",  hint: "A large organisation"                },
  { word: "WORKFLOW",    hint: "Sequence of tasks or steps"          },
  { word: "INTEGRATE",   hint: "Combine into a whole"                },
  { word: "CALENDAR",    hint: "Tool for scheduling events"          },
  { word: "MILESTONE",   hint: "Important project marker"            },
  { word: "FEEDBACK",    hint: "Information about performance"       },
];

function scramble(word) {
  const letters = word.split("");
  let result;
  do {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    result = letters.join("");
  } while (result === word);
  return result;
}

const ROUND_TIME = 30;
const ROUNDS = 5;

/* ── Setup ───────────────────────────────────────────────────────────── */
function Setup({ onStart }) {
  const [mode,  setMode]  = useState(1);
  const [names, setNames] = useState(["Player 1", "Player 2"]);
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
      <div className="icon-box w-16 h-16 text-3xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto shadow-lg">🔤</div>
      <div className="text-center">
        <h3 className="text-xl font-extrabold">Word Scramble</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Unscramble {ROUNDS} words in {ROUND_TIME}s each!</p>
      </div>
      <div className="flex gap-3 w-full">
        {[1, 2].map(n => (
          <button key={n} onClick={() => setMode(n)}
            className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
              mode === n ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400"
                        : "border-slate-200 dark:border-slate-700 text-slate-500"}`}>
            {n === 1 ? "Solo" : "2 Players"}
          </button>
        ))}
      </div>
      {Array.from({ length: mode }).map((_, i) => (
        <input key={i} value={names[i]}
          onChange={e => setNames(n => { const c=[...n]; c[i]=e.target.value; return c; })}
          className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 py-2.5 px-4 text-sm font-medium focus:border-cyan-500 focus:outline-none transition-colors"
          placeholder={`Player ${i + 1} name`}
        />
      ))}
      <button onClick={() => onStart(mode, names.slice(0, mode))} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:opacity-90 transition-opacity">
        Start Game 🔤
      </button>
    </div>
  );
}

/* ── Single-player word rounds ───────────────────────────────────────── */
function WordRound({ playerName, words, onDone }) {
  const [round,    setRound]    = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [input,    setInput]    = useState("");
  const [score,    setScore]    = useState(0);
  const [flash,    setFlash]    = useState(null); // "ok"|"bad"|"skip"
  const [scrambled,setScrambled]= useState(() => scramble(words[0].word));
  const inputRef   = useRef(null);
  const doneRef    = useRef(false);

  useEffect(() => { inputRef.current?.focus(); }, [round]);

  useEffect(() => {
    if (round >= ROUNDS) { if (!doneRef.current) { doneRef.current = true; onDone(score); } return; }
    setTimeLeft(ROUND_TIME);
    setInput("");
    setScrambled(scramble(words[round].word));
  }, [round]); // eslint-disable-line

  useEffect(() => {
    if (round >= ROUNDS) return;
    if (timeLeft <= 0) { nextRound("skip"); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, round]); // eslint-disable-line

  const nextRound = useCallback((type) => {
    setFlash(type);
    setTimeout(() => { setFlash(null); setRound(r => r + 1); }, 500);
  }, []);

  const submit = useCallback(() => {
    if (round >= ROUNDS) return;
    const correct = input.trim().toUpperCase() === words[round].word;
    if (correct) setScore(s => s + 1);
    nextRound(correct ? "ok" : "bad");
  }, [input, round, words, nextRound]);

  if (round >= ROUNDS) return null;

  const pct = (timeLeft / ROUND_TIME) * 100;
  const word = words[round];

  return (
    <div className="flex flex-col items-center gap-5 max-w-sm mx-auto">
      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
        {playerName} — Round {round + 1}/{ROUNDS}
      </div>

      {/* Progress */}
      <div className="w-full">
        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
          <span>Score: {score}</span>
          <span className={timeLeft <= 8 ? "text-rose-500 animate-pulse" : ""}>{timeLeft}s</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${timeLeft > 15 ? "from-cyan-500 to-blue-500" : timeLeft > 8 ? "from-amber-500 to-orange-500" : "from-rose-500 to-red-500"}`}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        </div>
      </div>

      {/* Scrambled word */}
      <AnimatePresence mode="wait">
        <motion.div key={round}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`text-center p-6 rounded-2xl w-full transition-colors duration-200
            ${flash === "ok"   ? "bg-emerald-50 dark:bg-emerald-950/40" :
              flash === "bad"  ? "bg-rose-50 dark:bg-rose-950/40"       :
              flash === "skip" ? "bg-slate-100 dark:bg-slate-800"       :
                                 "bg-slate-100 dark:bg-slate-800"}`}>
          <p className="text-xs text-slate-400 mb-2 uppercase tracking-widest">Unscramble this word</p>
          <p className="text-3xl font-black tracking-[0.25em]">{scrambled}</p>
          <p className="text-xs text-slate-400 mt-3">Hint: {word.hint}</p>
        </motion.div>
      </AnimatePresence>

      {/* Input */}
      <div className="flex gap-2 w-full">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="Type your answer…"
          className="flex-1 text-center uppercase font-bold rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 py-3 px-4 focus:border-cyan-500 focus:outline-none tracking-widest transition-colors"
        />
        <button onClick={submit} className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:opacity-90">→</button>
      </div>
      <button onClick={() => nextRound("skip")} className="text-xs text-slate-400 hover:text-rose-400 transition-colors underline underline-offset-2">
        Skip word
      </button>
    </div>
  );
}

/* ── Transition screen between players ──────────────────────────────── */
function Handoff({ nextPlayer, onReady }) {
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto text-center py-8">
      <div className="text-5xl">🔄</div>
      <h3 className="text-xl font-extrabold">Hand off to {nextPlayer}!</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">Pass the device and press ready when set.</p>
      <button onClick={onReady} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:opacity-90 transition-opacity">
        I'm Ready →
      </button>
    </div>
  );
}

/* ── Results ─────────────────────────────────────────────────────────── */
function Results({ scores, players, onRestart }) {
  const winner = scores[0] > (scores[1] ?? -1) ? 0 : (scores[1] ?? -1) > scores[0] ? 1 : -1;
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto text-center">
      <div className="text-5xl">{winner === -1 ? "🤝" : "🏆"}</div>
      <h3 className="text-2xl font-extrabold">
        {winner === -1 ? "It's a Tie!" : `${players[winner]} Wins!`}
      </h3>
      <div className="w-full space-y-3">
        {players.map((p, i) => (
          <div key={i} className={`flex items-center justify-between px-5 py-4 rounded-2xl ${i === winner ? "bg-cyan-50 dark:bg-cyan-950/50 border-2 border-cyan-400" : "bg-slate-100 dark:bg-slate-800"}`}>
            <span className="font-semibold text-sm">{p}</span>
            <span className="text-2xl font-extrabold gradient-text">{scores[i]}/{ROUNDS}</span>
          </div>
        ))}
      </div>
      <button onClick={onRestart} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:opacity-90 transition-opacity">
        Play Again
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function WordScramble() {
  const [phase,   setPhase]   = useState("setup");
  const [mode,    setMode]    = useState(1);
  const [players, setPlayers] = useState([]);
  const [scores,  setScores]  = useState([]);
  // Pick a random selection of ROUNDS words and keep same set for both players
  const wordSet = useRef([]);

  const start = (m, names) => {
    setMode(m); setPlayers(names); setScores([]);
    wordSet.current = [...WORDS].sort(() => Math.random() - 0.5).slice(0, ROUNDS);
    setPhase("p1");
  };

  const p1Done = s => { setScores([s]); setPhase(mode === 2 ? "handoff" : "results"); };
  const p2Done = s => { setScores(prev => [...prev, s]); setPhase("results"); };

  return (
    <div className="py-6 px-4">
      {phase === "setup"   && <Setup onStart={start} />}
      {phase === "p1"      && <WordRound key="p1" playerName={players[0]} words={wordSet.current} onDone={p1Done} />}
      {phase === "handoff" && <Handoff nextPlayer={players[1]} onReady={() => setPhase("p2")} />}
      {phase === "p2"      && <WordRound key="p2" playerName={players[1]} words={wordSet.current} onDone={p2Done} />}
      {phase === "results" && <Results scores={scores} players={players} onRestart={() => setPhase("setup")} />}
    </div>
  );
}
