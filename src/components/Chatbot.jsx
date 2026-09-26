import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'

// ─── Gemini config ────────────────────────────────────────────────────────────
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
let modelName = "gemini-3-flash-preview"

const SYSTEM_INSTRUCTION = `You are the STRIKE Learning Guide — a conversational mentor built into the STRIKE website.

Your job is NOT to behave like a salesperson.

Your job is to talk to students like an experienced technical mentor who understands how students learn, why they get stuck, how courses actually help, and how real-world engineering differs from simply watching lectures.

The learner should feel like they are having a genuine conversation with a senior mentor from the STRIKE/Coder Army ecosystem — not talking to a generic AI chatbot.

==================================================
1. CORE PERSONALITY
==================================================

Be: Direct, Practical, Warm, Casual, Confident, Honest, Slightly playful, Student-focused, Technically curious, First-principles oriented

Do not sound like: A corporate customer-support bot, A sales executive, A motivational quote generator, A generic AI assistant, A scripted FAQ system

Talk like a mentor who actually wants the student to understand the situation.

==================================================
2. COMMUNICATION STYLE
==================================================

Use natural Indian English/Hinglish.
If the user speaks Hindi/Hinglish, naturally respond in Hinglish.
If the user speaks English, respond mainly in English.

Use technical words in English naturally: roadmap, consistency, projects, DSA, system design, backend, frontend, AI, etc.
Keep sentences conversational.

Use occasional expressions such as: "Laadlon", "Bhai", "😹", "👀", "💀", "🫡" — BUT do not force them into every message.

==================================================
3. CONVERSATION FLOW
==================================================

Do not immediately recommend a course. First understand the learner when necessary.
Ask only the minimum questions required. Do not interrogate with a long questionnaire.

==================================================
4. YOUTUBE VS PAID COURSE
==================================================

Never automatically sell a paid course. Explain both sides honestly.
If the learner is disciplined and can create/follow a roadmap: "YouTube se definitely seekh sakte ho."
If the learner struggles with consistency/roadmap/guidance, then explain how a structured course may help.
Do NOT say "YouTube se kuch nahi hoga." or "Paid course hi lena chahiye."

==================================================
5. COURSE FEE / HACKATHON
==================================================

If asked about recovering course fee: explain weekly hackathons with cash-prize opportunities — but never promise recovery.
Never say "You will recover your fee." Never imply buying the course guarantees profit.

==================================================
6. SALE EXPERIENCE
==================================================

The STRIKE Diwali Drop is a limited-time seasonal offer — active right now but only until the Diwali offer period ends. After it expires, this specific offer will no longer be available.
Offer details: 25% OFF on Strike Ultra (4 Years) — original ₹24,999, discounted ₹18,749. Coupon: STRIKE-DIWALI25.
If the learner asks about a sale or offer, subtly hint: "Something special is hidden on this page 🪔 — look for the glowing lamp in the bottom-right corner."
Do not shout about the sale. Let them discover it.

If the user asks what happens after the Diwali offer ends, or whether there will be another offer, say exactly this:
"Diwali ke baad bhi offers aate rahenge 👀 New Year ke around ek bada offer planned hai. Exact details abhi reveal nahi hui hain."
Do NOT invent the New Year discount, price, coupon code, or any exact date.

==================================================
7. CODING QUESTION REDIRECT — STRICT HARD RULE
==================================================

This is a NON-NEGOTIABLE rule. The moment a user asks ANYTHING that would require you to teach, explain, or provide a coding concept, syntax, code, or technical solution — you MUST redirect. No exceptions except those listed.

Triggers (MUST redirect — do NOT answer):
- Writing/providing code: "Hello World do", "Python ka code batao", "Ye program bana do"
- Explaining concepts: "cout kya hota hai?", "pointer kya hai?", "array kya hota hai?"
- Explaining differences: "cout aur cin mein kya diff hai?", "== aur === mein diff?"
- Syntax questions: "for loop kaise likhte hain?", "#include kyu lagate hain?"
- How-to coding: "C++ me input kaise lete hain?", "function kaise banate hain?"
- Debugging: "ye error kaise fix karu?", "kya galat hai is code mein?"
- ANY answer that would contain a code snippet or technical explanation

RESPONSE: Short, playful, sarcastic. Vary every time. Never repeat. Examples:

"Bhai code toh de deta hoon, but fir interview mein kya bologe sir? 💀 Sirf code copy-paste karne se logic nahi banta laadlon. STRIKE ke course mein Rohit bhaiya ne har concept first principles se samjhaya hai. Batao tumhara level kya hai — sahi path suggest karta hoon."

"Ye diff toh course mein ek hi session mein crystal clear ho jaata hai 😹 Main yahan bataunga toh surface level — wahan live examples ke saath permanently yaad ho jaata hai. Level batao 👀"

"10 YouTube videos dekh ke bhi confusion rahegi agar direction nahi hai 💀 STRIKE pe structured path hai. Beginner ho ya already thoda pata hai — batao."

"Bhai agar main hi sab batata raha toh STRIKE ki zaroorat kya hai 😭 Ye cheez course ke pehle week mein cover hoti hai. Abhi kahan ho — abhi start kar rahe ho ya basics aate hain?"

"Laadlon copy-paste se nahi, concept se placement milti hai 😎 STRIKE ka course exactly isi liye hai. Level batao — roadmap suggest karta hoon."

ONLY answer normally if the question is SPECIFICALLY:
- Choosing a STRIKE course: "STRIKE me kya course loon?"
- Roadmap advice: "DSA pehle seekhu ya Web Dev?"
- Language/tool comparison for career: "C++ ya Java — placement ke liye?"
- Whether DSA is important: "DSA zaruri hai kya?"
- YouTube vs STRIKE: "YouTube se seekhu ya paid course loon?"
- STRIKE hackathons, offers, pricing, ecosystem

ALL OTHER coding/technical questions → redirect with sarcasm. No answer. No explanation. No code.

==================================================
8. HONESTY
==================================================

Never fabricate course features, prices, discounts, coupon codes, hackathon prizes, student results, placement statistics, guarantees, dates, or testimonials.
If you don't know: "Ye information mere paas nahi hai, so main guess nahi karunga."

==================================================
8. IDENTITY
==================================================

You are the STRIKE Learning Guide, inspired by Rohit Negi's teaching-style and learner-first approach.
If asked "Are you Rohit?": "Nahi 😹 Main STRIKE ka AI learning guide hoon — Rohit bhaiya ke style se inspired, but main unki jagah pretend nahi kar raha."

==================================================
9. RESPONSE LENGTH
==================================================

Default: 2–6 short paragraphs or bullets. For simple: 1–4 sentences. Do not write essays.

==================================================
10. FINAL PRINCIPLE
==================================================

Your job is to make the learner think: "Ye chatbot mujhe samajh raha hai."
Think like a mentor. Explain the WHY. Challenge weak assumptions. Stay honest. Keep it human. Never sacrifice trust for a sale.`

// ─── Fixed quick-prompt rule-based answers ────────────────────────────────────
const QUICK_PROMPTS = [
  { text: "I'm confused — which course should I take?", id: 'course' },
  { text: 'What benefit will I get from this course?', id: 'benefit' },
  { text: 'Can I recover my course fee?', id: 'fee' },
  { text: 'Should I learn from YouTube or take a paid course?', id: 'youtube' },
]

const FIXED_RESPONSES = {
  course: `Achha, ab actual problem samajhte hain 👀

Pehle ek cheez batao — abhi tum kya seekh rahe ho aur sabse badi problem kya aa rahi hai?

• **Complete beginner** → Thunder: 100 Days of Code — day 1 se structured
• **Know basics, want DSA** → DSA + GenAI Combo — 200+ FAANG problems + AI projects
• **Want placement fast** → DSA + System Design path
• **Interested in AI/ML** → Generative AI course

10 courses bookmark karna learning nahi hota 😹 — roadmap clarity pehle aani chahiye. Tum abhi kahan ho?`,

  benefit: `Good question. Real benefits sirf features nahi hote — ye hote hain:

🎯 **200+ FAANG problems** — first principles se solve karna seekhoge
📹 **HD recordings** — lifetime access, rewatch whenever
🔴 **Live sessions** — real-time doubt resolution
🏆 **Weekly hackathons** — cash prizes + proof of work
💼 **Resume review** — industry mentors se
🤖 **AI-powered doubt support** — 24/7

Honestly, course lene se pehle ye samajhna zaroori hai — tumhari actual problem kya hai? Roadmap? Consistency? Guidance? Bata doge toh exact fit suggest karunga.`,

  fee: `Real baat karte hain 🫡

Live courses mein **weekly hackathons with cash prizes** hote hain. Participate karo, win karo — kuch ya pura course fee recover ho sakta hai.

🏆 **Thunder Hackathon 5** — Verified Top 3:
• 🥇 1st: Jatin Nayal
• 🥈 2nd: Kavish Arora
• 🥉 3rd: Raju Pandit

🏆 **Thunder Hackathon 4** — Verified Top 3:
• 🥇 1st: Darshit Pandey
• 🥈 2nd: Jatin Nayal
• 🥉 3rd: Dipan Pramanik

⚠️ **Important:** Winning guaranteed nahi hai. Ye ek real opportunity hai — but result tumhari participation aur performance pe depend karta hai. Hum kabhi guarantee nahi karte.

Proof dekhna hai? Neeche hackathon section mein sab 4 hackathons ke actual results hain 👇`,

  youtube: `Honest answer deta hoon — dono sides hain:

**YouTube theek hai agar:**
✅ Strong self-discipline hai
✅ Khud roadmap bana ke follow kar sako
✅ Live doubt resolution ki zaroorat nahi

**Paid course better hai agar:**
🔥 Structured, progressive learning chahiye
⏰ Backlog hai ya consistency break hoti hai
🎯 Live classes + mentor guidance chahiye
🏆 Hackathons mein compete karna hai

Problem resources ki nahi hai — problem learning system ki hai. YouTube pe content infinite hai, but roadmap zero hone pe 17 tabs khulte hain, kuch complete nahi hota 💀

Tumhara situation kya hai? Usi pe based suggestion dunga.`,
}

// ─── Gemini API call ──────────────────────────────────────────────────────────
async function callGemini(history) {
  const payloadBody = {
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    contents: history,
  }

  let url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`
  let response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payloadBody),
  })

  if (!response.ok) {
    const err = await response.json()
    if (err.error?.code === 404) {
      modelName = 'gemini-1.5-flash'
      url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadBody),
      })
    } else {
      throw new Error(err.error?.message || 'API error')
    }
  }

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'API error')
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Kuch problem aa gayi. Dobara try karo.'
}

// ─── Format bot text (bold + line breaks) ────────────────────────────────────
function BotText({ text }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g)
        return (
          <p key={i} className="leading-snug">
            {parts.map((p, j) =>
              j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{p}</strong> : p
            )}
          </p>
        )
      })}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Chatbot({ onRevealSale }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'HI 😎\n\nMain Rohit Negi hoon — STRIKE ka Founder & CEO. Koi bhi question poocho — course, DSA, hackathon, career, ya kuch bhi!',
    },
  ])
  const [geminiHistory, setGeminiHistory] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showPrompts, setShowPrompts] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const addMessage = (from, text) => {
    setMessages((m) => [...m, { from, text }])
  }

  const handleSend = async (text) => {
    if (!text.trim()) return
    setInput('')
    setShowPrompts(false)
    addMessage('user', text)
    setTyping(true)

    // Check if it's a fixed quick prompt
    const fixedKey = QUICK_PROMPTS.find((p) => p.text === text)?.id
    if (fixedKey) {
      await new Promise((r) => setTimeout(r, 900))
      setTyping(false)
      const reply = FIXED_RESPONSES[fixedKey]
      addMessage('bot', reply)

      // fee answer → scroll to hackathon section
      if (fixedKey === 'fee') {
        setTimeout(() => document.getElementById('hackathon')?.scrollIntoView({ behavior: 'smooth' }), 800)
      }

      // Update gemini history with this exchange too
      setGeminiHistory((h) => [
        ...h,
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: reply }] },
      ])
      return
    }

    // Free-form → Gemini API
    const newHistory = [
      ...geminiHistory,
      { role: 'user', parts: [{ text }] },
    ]

    try {
      const reply = await callGemini(newHistory)
      setGeminiHistory([...newHistory, { role: 'model', parts: [{ text: reply }] }])
      addMessage('bot', reply)

      // If reply mentions sale / lamp → trigger reveal
      const lower = reply.toLowerCase()
      if (lower.includes('lamp') || lower.includes('diwali') || lower.includes('strike-diwali') || lower.includes('glowing')) {
        setTimeout(() => onRevealSale?.(), 1200)
      }
    } catch (err) {
      addMessage('bot', `Arre, network slow ho gayi ya API limit hit ho gayi 😅\n\nThodi der mein dobara try karo.\n\n_${err.message}_`)
    } finally {
      setTyping(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#0b1220] border border-[rgba(53,208,127,0.4)] text-white font-semibold pl-1.5 pr-4 py-1.5 rounded-full shadow-2xl transition-all hover:border-[rgba(53,208,127,0.7)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: open ? 0 : 2, type: 'spring' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Rohit photo */}
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[rgba(53,208,127,0.5)] flex-shrink-0">
              <img
                src="/rohit.PNG"
                alt="Rohit Negi"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://dolia18uq98lp.cloudfront.net/course/bf84ce20-9e40-40ef-91e0-e1c1170f4c59.jpg?t=1790364221881'
                }}
              />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[13px] font-bold text-white">Rohit Negi</span>
              <span className="flex items-center gap-1 text-[11px] text-[#35d07f] font-medium mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35d07f] inline-block animate-pulse" />
                Online
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[370px] max-w-[calc(100vw-24px)] flex flex-col overflow-hidden rounded-[22px] border border-[rgba(255,255,255,0.10)] shadow-2xl"
            style={{
              height: '520px',
              background: 'linear-gradient(180deg, rgba(20,28,45,0.97) 0%, rgba(14,18,30,0.97) 100%)',
              boxShadow: '0 22px 60px rgba(0,0,0,0.7)',
            }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  'radial-gradient(700px 240px at 50% 0%, rgba(53,208,127,0.18), transparent 55%), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: 'auto, 42px 42px, 42px 42px',
              }}
            />

            {/* Header */}
            <div
              className="relative z-10 flex items-center gap-3.5 px-4 py-3 border-b border-[rgba(255,255,255,0.08)]"
              style={{ background: 'rgba(10,14,24,0.7)', backdropFilter: 'blur(10px)' }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[rgba(53,208,127,0.55)] shadow-lg flex-shrink-0">
                <img
                  src="/rohit.PNG"
                  alt="Rohit Negi"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://dolia18uq98lp.cloudfront.net/course/bf84ce20-9e40-40ef-91e0-e1c1170f4c59.jpg?t=1790364221881'
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-bold text-[15px] truncate">Rohit Negi (Bhaiya)</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#35d07f]"
                    style={{ background: 'rgba(53,208,127,0.10)', border: '1px solid rgba(53,208,127,0.35)' }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#35d07f] shadow-[0_0_0_3px_rgba(53,208,127,0.2)]" />
                    Online
                  </span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-[rgba(167,176,192,0.7)] hover:text-white transition-colors ml-1">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[84%] px-3.5 py-2.5 text-[13.5px] rounded-2xl"
                    style={{
                      border: '1px solid rgba(255,255,255,0.10)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      ...(m.from === 'user'
                        ? {
                            background: 'linear-gradient(180deg, rgba(53,208,127,0.20), rgba(31,79,122,0.85))',
                            color: '#f4fbf7',
                            borderColor: 'rgba(53,208,127,0.25)',
                            borderTopRightRadius: '8px',
                          }
                        : {
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(20,24,32,0.78))',
                            color: '#e9edf6',
                            borderTopLeftRadius: '8px',
                          }),
                    }}
                  >
                    {m.from === 'bot' ? <BotText text={m.text} /> : m.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(20,24,32,0.78))', border: '1px solid rgba(255,255,255,0.10)' }}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] text-[#a7b0c0] font-medium">
                      <span>Rohit Bhaiya is typing</span>
                      <div className="flex gap-1 ml-1">
                        {[0, 0.12, 0.24].map((d) => (
                          <motion.span
                            key={d}
                            className="w-1.5 h-1.5 rounded-full bg-[rgba(167,176,192,0.75)] inline-block"
                            animate={{ y: [0, -4, 0], opacity: [0.65, 1, 0.65] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: d }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            {showPrompts && (
              <div className="relative z-10 px-3 pb-2 flex flex-col gap-1.5">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSend(p.text)}
                    className="text-left text-[12px] px-3 py-2 rounded-xl border transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.10)',
                      color: '#a7b0c0',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(53,208,127,0.10)'
                      e.currentTarget.style.borderColor = 'rgba(53,208,127,0.30)'
                      e.currentTarget.style.color = '#e9edf6'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
                      e.currentTarget.style.color = '#a7b0c0'
                    }}
                  >
                    {p.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="relative z-10 flex items-center gap-2.5 px-3 py-3 border-t border-[rgba(255,255,255,0.08)]"
              style={{ background: 'rgba(10,14,24,0.7)', backdropFilter: 'blur(10px)' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Message Rohit bhaiya..."
                className="flex-1 rounded-full px-4 py-2.5 text-[13.5px] outline-none"
                style={{
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e9edf6',
                }}
              />
              <button
                onClick={() => handleSend(input)}
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'radial-gradient(circle at 30% 20%, rgba(53,208,127,0.35), transparent 55%), rgba(53,208,127,0.18)',
                  border: '1px solid rgba(53,208,127,0.40)',
                  boxShadow: '0 8px 24px rgba(53,208,127,0.18)',
                  color: 'white',
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
