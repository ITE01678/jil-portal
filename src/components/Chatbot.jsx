import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Knowledge Base ─────────────────────────────────────────────────────
   Covers all public site content. Questions are matched by keyword scoring.
─────────────────────────────────────────────────────────────────────── */
const KB = [
  {
    patterns: ["who are you","what is jupiter","about company","jupiter international","jil","company overview","what do you do"],
    answer: "Jupiter International Limited (JIL) is a pure-play solar cell manufacturer headquartered in Kolkata, India. With 16+ years of experience, we have grown from 30 MW capacity in 2009 to 0.96 GW today, manufacturing M10 and M10R Mono PERC solar cells."
  },
  {
    patterns: ["capacity","gw","gigawatt","megawatt","production capacity","installed capacity","how much produce"],
    answer: "Our current installed capacity is 0.96 GW at our Baddi, Himachal Pradesh facility. An 800 MW expansion is underway. Our upcoming Bhubaneswar facility will add 4 GW solar cells + 2.8 GW solar modules."
  },
  {
    patterns: ["solar cell","m10","perc","mono perc","product","cell type","technology","passivated"],
    answer: "Our flagship product is the M10 Mono-PERC Solar Cell (Passivated Emitter and Rear Cell). It features optimised cell design, lower sealing damage, minimal potential induced degradation (PID), robust packaging, colour-sorting, and single-cell traceability."
  },
  {
    patterns: ["solar solution","epc","engineering","procurement","construction","project","rooftop","ground mounted"],
    answer: "We provide complete EPC (Engineering, Procurement & Construction) solutions for solar projects. We have executed 11.80 MW of solar projects across India including rooftop and ground-mounted installations."
  },
  {
    patterns: ["solar module","module","upcoming","new product","2025"],
    answer: "Solar Modules are our upcoming product line, being developed at our new integrated manufacturing facility in Bhubaneswar, Odisha — planned for commissioning in 2025 with 2.8 GW module capacity."
  },
  {
    patterns: ["manufacturing","factory","plant","facility","baddi","himachal","production"],
    answer: "Our main manufacturing facility is in Baddi, Himachal Pradesh — operational for 16+ years with 0.96 GW capacity. It features cleanroom operations, lean manufacturing, and is certified by TÜV Rheinland, Fraunhofer, and SGS."
  },
  {
    patterns: ["bhubaneswar","odisha","new facility","expansion","joint venture","2025","4gw"],
    answer: "Our Bhubaneswar, Odisha facility is in advanced development, scheduled for commissioning in 2025. Planned capacity: 4 GW solar cells + 2.8 GW solar modules. One unit is a Joint Venture with a prominent Indian renewable energy service provider."
  },
  {
    patterns: ["certification","certified","tuv","fraunhofer","sgs","quality","standard","iso","compliance"],
    answer: "Jupiter holds certifications from TÜV Rheinland (plant), Fraunhofer ISE, and SGS. Our manufacturing follows strict compliance to quality, safety, and environmental standards."
  },
  {
    patterns: ["mission","vision","goal","purpose","tagline","green future","planet"],
    answer: "Our mission: 'Towards a Green Future — Empowering the Planet Through Agility & Vision.' We believe a green future starts with a green cell. We are committed to advancing solar technology for a sustainable world."
  },
  {
    patterns: ["values","ethos","culture","principles","believe"],
    answer: "Our core values centre on innovation, sustainability, integrity, collaboration, and excellence. We foster growth & development, safety-first operations, strong leadership, employee loyalty, and an inclusive environment."
  },
  {
    patterns: ["leadership","team","ceo","management","founder","director"],
    answer: "Jupiter International Limited is led by an experienced management team with deep expertise in solar manufacturing, renewable energy, and corporate governance. Visit our About Us page for full leadership profiles."
  },
  {
    patterns: ["history","founded","when","started","years","milestones","2009","journey"],
    answer: "Jupiter was founded in 2009 with an initial capacity of 30 MW. Over 16+ years we expanded to 0.96 GW. Key milestones include our PERC technology adoption, TÜV certification, and the upcoming 4 GW Bhubaneswar facility."
  },
  {
    patterns: ["esg","environment","sustainability","green","carbon","waste","liquid discharge","eco"],
    answer: "Our ESG commitments: zero liquid discharge from manufacturing plants, real-time waste/effluent monitoring, energy efficiency improvements, advanced pollution control, and responsible treatment of waste by-products. We practise clean and ethical sourcing throughout our supply chain."
  },
  {
    patterns: ["csr","corporate social responsibility","community","social","beyond profit","society"],
    answer: "Under 'Beyond Profit,' we invest in community development, employee wellbeing, diversity & inclusion, and human rights across our operations. We integrate social responsibility into every level of our business strategy."
  },
  {
    patterns: ["career","jobs","hiring","openings","work","join","vacancy","employment"],
    answer: "We are hiring across Finance, Process Engineering, Electrical Engineering, Export/Import, and Maintenance roles in Kolkata, Baddi, and Bhubaneswar. Apply at career@jil-jupiter.com or visit our Careers page."
  },
  {
    patterns: ["life at jupiter","employee","benefits","work culture","team","growth","training"],
    answer: "Jupiter offers: continuous learning & hands-on training, safety-first workplace, inspirational leadership, fair career advancement structures, and an inclusive environment that celebrates diversity."
  },
  {
    patterns: ["contact","phone","email","address","office","location","headquarters","kolkata"],
    answer: "Registered Office: Unnayanam, 20A Ashutosh Chowdhury Avenue, Kolkata – 700019, West Bengal, India.\n📞 +91 33 4015 9000\n✉ info@jil-jupiter.com\n✉ enquiry@jil-jupiter.com (sales)\n✉ career@jil-jupiter.com (careers)"
  },
  {
    patterns: ["investor","shares","stock","listed","bse","nse","ipo","financial"],
    answer: "Jupiter International Limited is publicly listed. For investor relations, financial results, and shareholding information, please contact us at info@jil-jupiter.com or visit the Investor Relations section."
  },
  {
    patterns: ["award","recognition","achievement","accolade","honour"],
    answer: "Jupiter has received multiple industry recognitions for manufacturing excellence, quality, and sustainability. Visit our Media section (Awards & Recognitions) for a complete list."
  },
  {
    patterns: ["price","cost","quote","enquiry","buy","purchase","order"],
    answer: "For pricing and purchase enquiries, please contact our sales team at enquiry@jil-jupiter.com or call +91 33 4015 9000. We will be happy to provide a customised quote for your requirements."
  },
  {
    patterns: ["solar energy","renewable","clean energy","photovoltaic","pv","sun","sunlight"],
    answer: "Solar photovoltaic (PV) cells convert sunlight into electricity. PERC (Passivated Emitter and Rear Cell) technology improves efficiency by reducing electron recombination. Jupiter's M10 Mono-PERC cells are among the most efficient in their class."
  },
];

/* ── Scoring & retrieval ───────────────────────────────────────────── */
function findAnswer(query) {
  const lq = query.toLowerCase().replace(/[^a-z0-9 ]/g, " ");
  const words = lq.split(/\s+/).filter(w => w.length > 2);

  let best = { score: 0, answer: null };

  for (const entry of KB) {
    let score = 0;
    for (const pattern of entry.patterns) {
      if (lq.includes(pattern)) { score += 3; continue; }
      const pWords = pattern.split(" ");
      for (const pw of pWords) {
        if (pw.length > 2 && words.includes(pw)) score += 1;
      }
    }
    if (score > best.score) { best.score = score; best.answer = entry.answer; }
  }

  return best.score >= 1 ? best.answer : null;
}

const SUGGESTIONS = [
  "What does Jupiter manufacture?",
  "What is the production capacity?",
  "Tell me about PERC technology",
  "Where are your factories?",
  "How can I apply for a job?",
  "What is your ESG policy?",
];

/* ── UI ─────────────────────────────────────────────────────────────── */
export default function Chatbot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm JupiterAI 🌞\nAsk me anything about Jupiter International Limited — our products, manufacturing, careers, or sustainability.",
      time: new Date(),
    }
  ]);
  const [input,    setInput]    = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const sendMessage = (text) => {
    const query = (text || input).trim();
    if (!query) return;
    setInput("");

    const userMsg = { role: "user", text: query, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      const answer = findAnswer(query);
      let botText;

      if (answer) {
        botText = answer;
      } else {
        botText = `I don't have specific information about "${query}" in my knowledge base. Let me help you search the web for this!`;
      }

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: botText,
          webSearch: !answer,
          query,
          time: new Date(),
        }
      ]);
    }, 700 + Math.random() * 600);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const fmt = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* ── Floating button ─────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Open chat"
        className="fixed bottom-6 right-14 z-50 w-14 h-14 rounded-full shadow-glow-solar flex items-center justify-center
                   bg-gradient-to-br from-solar-500 to-amber-600 text-white text-2xl
                   ring-4 ring-solar-300/30"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>✕</motion.span>
          ) : (
            <motion.span key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>☀️</motion.span>
          )}
        </AnimatePresence>
        {/* Ping indicator */}
        {!open && (
          <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-leaf-400 ring-2 ring-white" />
        )}
      </motion.button>

      {/* ── Chat panel ──────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)]
                       bg-white dark:bg-slate-900
                       rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700
                       flex flex-col overflow-hidden"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-navy-900 to-navy-700 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-solar-400 to-amber-500 flex items-center justify-center text-lg shadow-glow-solar">
                ☀️
              </div>
              <div className="flex-1">
                <p className="text-white font-extrabold text-sm">JupiterAI</p>
                <p className="text-white/60 text-[10px]">Solar Cell Knowledge Assistant</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-leaf-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-leaf-400 animate-pulse-slow" />
                Online
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-solar-400 to-amber-500 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      ☀️
                    </div>
                  )}
                  <div className={`max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-navy-600 to-navy-800 text-white rounded-tr-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm"
                    }`}>
                      {msg.text}
                    </div>
                    {msg.webSearch && (
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent("Jupiter International Limited solar " + msg.query)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-solar-600 dark:text-solar-400 hover:underline px-1"
                      >
                        🔍 Search the web for this →
                      </a>
                    )}
                    <span className="text-[10px] text-slate-400 px-1">{fmt(msg.time)}</span>
                  </div>
                </motion.div>
              ))}

              {/* Thinking indicator */}
              {thinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-solar-400 to-amber-500 flex items-center justify-center text-sm">☀️</div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map(j => (
                      <span key={j} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${j * 0.15}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
                {SUGGESTIONS.slice(0, 3).map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s)}
                    className="whitespace-nowrap text-[11px] font-medium px-3 py-1.5 rounded-full bg-solar-50 dark:bg-solar-900/20 text-solar-700 dark:text-solar-400 border border-solar-200 dark:border-solar-800 hover:bg-solar-100 dark:hover:bg-solar-900/40 transition-colors flex-shrink-0">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-100 dark:border-slate-700 flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about Jupiter…"
                className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-solar-400"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || thinking}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-solar-500 to-amber-600 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p className="text-center text-[9px] text-slate-300 dark:text-slate-600 pb-2">Powered by JupiterAI · Jupiter International Limited</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
