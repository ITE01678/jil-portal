import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_QUESTIONS = [
  { q: "What does HTML stand for?",                          options: ["HyperText Markup Language","High Tech Modern Language","HyperText Modern Layout","High Transfer Markup Language"], answer: 0 },
  { q: "Which planet is known as the Red Planet?",           options: ["Venus","Jupiter","Mars","Saturn"],                                                                              answer: 2 },
  { q: "How many bits are in a byte?",                       options: ["4","8","16","32"],                                                                                             answer: 1 },
  { q: "Who painted the Mona Lisa?",                         options: ["Michelangelo","Raphael","Leonardo da Vinci","Donatello"],                                                       answer: 2 },
  { q: "What is the capital of Japan?",                      options: ["Seoul","Tokyo","Beijing","Bangkok"],                                                                           answer: 1 },
  { q: "Which element has the symbol 'O'?",                  options: ["Gold","Oxygen","Osmium","Oganesson"],                                                                          answer: 1 },
  { q: "What year did the World Wide Web go public?",        options: ["1985","1989","1991","1995"],                                                                                   answer: 2 },
  { q: "How many sides does a hexagon have?",                options: ["5","6","7","8"],                                                                                              answer: 1 },
  { q: "Who wrote '1984'?",                                  options: ["Aldous Huxley","H.G. Wells","George Orwell","Ray Bradbury"],                                                   answer: 2 },
  { q: "What is the largest ocean on Earth?",                options: ["Atlantic","Indian","Arctic","Pacific"],                                                                        answer: 3 },
  { q: "Which language runs in the browser natively?",       options: ["Python","Java","JavaScript","C#"],                                                                             answer: 2 },
  { q: "What does CPU stand for?",                           options: ["Central Processing Unit","Computer Power Unit","Core Processing Utility","Central Program Uplink"],            answer: 0 },
  { q: "How many colors are in a rainbow?",                  options: ["5","6","7","8"],                                                                                              answer: 2 },
  { q: "Which country has the most natural lakes?",          options: ["Russia","USA","Brazil","Canada"],                                                                              answer: 3 },
  { q: "What is the fastest land animal?",                   options: ["Lion","Cheetah","Falcon","Horse"],                                                                             answer: 1 },
  { q: "In what decade was the internet invented?",          options: ["1950s","1960s","1970s","1980s"],                                                                               answer: 1 },
  { q: "Which company made the first iPhone?",               options: ["Samsung","Nokia","Apple","Motorola"],                                                                          answer: 2 },
  { q: "What is 12 × 12?",                                   options: ["132","144","148","156"],                                                                                       answer: 1 },
  { q: "Which gas do plants absorb from the air?",           options: ["Oxygen","Nitrogen","CO₂","Hydrogen"],                                                                         answer: 2 },
  { q: "What does SQL stand for?",                           options: ["Structured Query Language","System Quick Language","Sorted Queue Logic","Simple Query List"],                  answer: 0 },
];

const PER_PLAYER = 10;
const Q_TIME     = 15;

function pickQuestions(offset = 0) {
  return ALL_QUESTIONS.slice(offset, offset + PER_PLAYER);
}

/* ── Setup ───────────────────────────────────────────────────────────── */
function Setup({ onStart }) {
  const [mode,  setMode]  = useState(1);
  const [names, setNames] = useState(["Player 1", "Player 2"]);
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
      <div className="icon-box w-16 h-16 text-3xl bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto shadow-lg">🧠</div>
      <div className="text-center">
        <h3 className="text-xl font-extrabold">Brain Trivia</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Answer {PER_PLAYER} questions in {Q_TIME}s each!</p>
      </div>
      <div className="flex gap-3 w-full">
        {[1, 2].map(n => (
          <button key={n} onClick={() => setMode(n)}
            className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
              mode === n ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                        : "border-slate-200 dark:border-slate-700 text-slate-500"}`}>
            {n === 1 ? "Solo" : "2 Players"}
          </button>
        ))}
      </div>
      {Array.from({ length: mode }).map((_, i) => (
        <input key={i} value={names[i]}
          onChange={e => setNames(n => { const c=[...n]; c[i]=e.target.value; return c; })}
          className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 py-2.5 px-4 text-sm font-medium focus:border-emerald-500 focus:outline-none transition-colors"
          placeholder={`Player ${i + 1} name`}
        />
      ))}
      <button onClick={() => onStart(mode, names.slice(0, mode))} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:opacity-90 transition-opacity">
        Start Quiz 🧠
      </button>
    </div>
  );
}

/* ── Quiz round for one player ──────────────────────────────────────── */
function QuizRound({ playerName, questions, onDone }) {
  const [qIdx,     setQIdx]     = useState(0);
  const [score,    setScore]    = useState(0);
  const [timeLeft, setTimeLeft] = useState(Q_TIME);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const advanceRef = useRef(false);

  const question = questions[qIdx];

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(Q_TIME);
    setSelected(null);
    setRevealed(false);
    advanceRef.current = false;
  }, [qIdx]);

  // Countdown
  useEffect(() => {
    if (revealed) return;
    if (timeLeft <= 0) { advance(null); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, revealed]); // eslint-disable-line

  const advance = (choiceIdx) => {
    if (advanceRef.current) return;
    advanceRef.current = true;
    setSelected(choiceIdx);
    setRevealed(true);
    const correct = choiceIdx === question.answer;
    const newScore = score + (correct ? 1 : 0);
    if (correct) setScore(newScore);

    setTimeout(() => {
      if (qIdx + 1 >= questions.length) {
        onDone(newScore);
      } else {
        setQIdx(i => i + 1);
      }
    }, 1000);
  };

  const pct = (timeLeft / Q_TIME) * 100;
  const OPTION_LABELS = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col gap-5 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{playerName}</span>
        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Q {qIdx + 1}/{questions.length}  •  Score: {score}</span>
      </div>

      {/* Timer */}
      <div>
        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
          <span>Time</span>
          <span className={timeLeft <= 5 ? "text-rose-500 animate-pulse" : ""}>{timeLeft}s</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${timeLeft > 10 ? "from-emerald-500 to-teal-500" : timeLeft > 5 ? "from-amber-500 to-orange-500" : "from-rose-500 to-red-500"}`}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
          className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">Question {qIdx + 1}</p>
          <p className="font-bold text-base leading-snug">{question.q}</p>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          let cls = "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30";
          if (revealed) {
            if (i === question.answer)      cls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300";
            else if (i === selected)         cls = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600";
            else                             cls = "border-slate-200 dark:border-slate-700 opacity-40";
          }
          return (
            <button key={i} onClick={() => !revealed && advance(i)}
              disabled={revealed}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-sm font-semibold text-left transition-all duration-200 ${cls}`}>
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0
                ${revealed && i === question.answer ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500"}`}>
                {OPTION_LABELS[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Handoff screen ──────────────────────────────────────────────────── */
function Handoff({ nextPlayer, onReady }) {
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto text-center py-8">
      <div className="text-5xl">🔄</div>
      <h3 className="text-xl font-extrabold">Hand off to {nextPlayer}!</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">Pass the device and press ready.</p>
      <button onClick={onReady} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:opacity-90 transition-opacity">
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
          <div key={i} className={`flex items-center justify-between px-5 py-4 rounded-2xl ${i === winner ? "bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-400" : "bg-slate-100 dark:bg-slate-800"}`}>
            <span className="font-semibold text-sm">{p}</span>
            <span className="text-2xl font-extrabold gradient-text">{scores[i]}/{PER_PLAYER}</span>
          </div>
        ))}
      </div>
      <button onClick={onRestart} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:opacity-90 transition-opacity">
        Play Again
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function TriviaQuiz() {
  const [phase,   setPhase]   = useState("setup");
  const [mode,    setMode]    = useState(1);
  const [players, setPlayers] = useState([]);
  const [scores,  setScores]  = useState([]);
  const p1Qs = useRef([]);
  const p2Qs = useRef([]);

  const start = (m, names) => {
    setMode(m); setPlayers(names); setScores([]);
    // Give P1 first 10 questions, P2 next 10 (different questions, no memory advantage)
    p1Qs.current = pickQuestions(0);
    p2Qs.current = pickQuestions(10);
    setPhase("p1");
  };

  const p1Done = s => { setScores([s]); setPhase(mode === 2 ? "handoff" : "results"); };
  const p2Done = s => { setScores(prev => [...prev, s]); setPhase("results"); };

  return (
    <div className="py-6 px-4">
      {phase === "setup"   && <Setup onStart={start} />}
      {phase === "p1"      && <QuizRound key="p1" playerName={players[0]} questions={p1Qs.current} onDone={p1Done} />}
      {phase === "handoff" && <Handoff nextPlayer={players[1]} onReady={() => setPhase("p2")} />}
      {phase === "p2"      && <QuizRound key="p2" playerName={players[1]} questions={p2Qs.current} onDone={p2Done} />}
      {phase === "results" && <Results scores={scores} players={players} onRestart={() => setPhase("setup")} />}
    </div>
  );
}
