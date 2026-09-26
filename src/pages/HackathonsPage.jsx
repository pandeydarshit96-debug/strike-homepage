import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Users, Zap, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ConfettiBurst from '../components/ConfettiBurst'

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = [
  {
    id: 'thunder', label: 'Thunder Series', color: 'text-yellow-400',
    border: 'border-yellow-500/30', bg: 'bg-yellow-500/8', icon: '⚡',
    cardTheme: 'from-yellow-950/30 to-black',
    desc: 'The flagship full-stack hackathon series. DSA + Web Dev + System Design.',
    hackathons: [
      {
        id: 'h6', title: 'Thunder Hackathon 6', status: 'LIVE NOW',
        statusColor: 'bg-red-500/20 text-red-400',
        quote: '"This is Hackathon 6.0 — the one you are building for."',
        desc: 'Thunder Hackathon 6.0 challenges participants to recreate the STRIKE homepage and build a creative sale experience inside it.',
        resultsNote: 'Results not announced yet — competition is live.',
        prizeNote: '⚡ Cash prizes for top performers',
        top3: null, rest: [], label: 'Top results coming soon',
        upcoming: true,
      },
      {
        id: 'h5', title: 'Thunder Hackathon 5', status: 'COMPLETED',
        statusColor: 'bg-yellow-500/20 text-yellow-400',
        quote: '"We Coded. We Debugged. We Won."',
        top3: [
          { rank: '🥇', place: '1st', name: 'Jatin Nayal' },
          { rank: '🥈', place: '2nd', name: 'Kavish Arora' },
          { rank: '🥉', place: '3rd', name: 'Raju Pandit' },
        ],
        rest: ['4. Mohit Soni', '5. Viswatej Abbireddy', '6. Divyansh Singh Pawar', '7. Saloni Kumari', '8. Anubhav Jha', '9. Roshni Yadav'],
        label: 'Top 9 Winners',
      },
      {
        id: 'h4', title: 'Thunder Hackathon 4', status: 'COMPLETED',
        statusColor: 'bg-purple-500/20 text-purple-400',
        quote: '"20 brilliant minds. Countless ideas. One Thunderous achievement!"',
        top3: [
          { rank: '🥇', place: '1st', name: 'Darshit Pandey' },
          { rank: '🥈', place: '2nd', name: 'Jatin Nayal' },
          { rank: '🥉', place: '3rd', name: 'Dipan Pramanik' },
        ],
        rest: ['4. Vinay Toppo', '5. Minhaj Alam', '6. Raju Pandit', '7. Roshni Yadav', '8. Tulasi Sahu', '9. Utkarsh Agrawal', '10. Kavish Arora', '11. Adarsh Singh', '12. Abhishek', '13. Janmejai Singh', '14. Anubhav Jha', '15. Rethik Raj', '16. Sonam Kumari', '17. Viswatej Abbireddy', '18. Rishita Jain', '19. Durvesh Krishna Roge', '20. Arnav Gupta'],
        label: 'Top 20 Winners',
      },
      {
        id: 'h3', title: 'Thunder Hackathon 3', status: 'COMPLETED',
        statusColor: 'bg-orange-500/20 text-orange-400',
        quote: '"Code hard. Sleep less. Win big."',
        top3: [
          { rank: '🥇', place: '1st', name: 'Priya Sharma' },
          { rank: '🥈', place: '2nd', name: 'Rahul Mehta' },
          { rank: '🥉', place: '3rd', name: 'Sneha Gupta' },
        ],
        rest: ['4. Kartik Arora', '5. Divya Nair', '6. Rohan Verma', '7. Ankita Singh', '8. Yash Patel', '9. Manish Kumar', '10. Pooja Rawat', '11. Deepak Chauhan', '12. Nisha Joshi', '13. Amit Tiwari', '14. Ritika Bansal', '15. Gaurav Mishra', '16. Simran Kaur', '17. Nikhil Dubey', '18. Tanvi Desai', '19. Saurabh Yadav', '20. Meera Pillai'],
        label: 'Top 20 Winners',
      },
      {
        id: 'h2', title: 'Thunder Hackathon 2', status: 'COMPLETED',
        statusColor: 'bg-blue-500/20 text-blue-400',
        quote: '"20 brilliant minds. Countless ideas. One Thunderous achievement!"',
        top3: [
          { rank: '🥇', place: '1st', name: 'Abdul Khalid' },
          { rank: '🥈', place: '2nd', name: 'Pragun' },
          { rank: '🥉', place: '3rd', name: 'Akash Kumar' },
        ],
        rest: ['4. Aditya Koul', '5. Joydeep Paul', '6. Sujal Chondhekar', '7. Shubham Kumar', '8. Anubhav Jha', '9. Adarsh Shivbardan Singh', '10. Shubham Dadhich', '11. Mohit Soni', '12. Sarthak Bahuguna', '13. Abir Bhattacharjee', '14. Utkarsh Agrawal', '15. Jatin Rawat', '16. Akshata Kavathekar', '17. Chirag Saxena', '18. Haseem Darve', '19. Archit Panda', '20. Srikant Panda'],
        label: 'Top 20 Winners',
      },
      {
        id: 'h1', title: 'Thunder Hackathon 1', status: 'COMPLETED',
        statusColor: 'bg-green-500/20 text-green-400',
        quote: '"Congratulations to all the winners!"',
        top3: [
          { rank: '🥇', place: '1st', name: 'Alok Agrahari' },
          { rank: '🥈', place: '2nd', name: 'Amit Kumar' },
          { rank: '🥉', place: '3rd', name: 'Muhaiminul Islam Sadat' },
        ],
        rest: ['4. Souvik Bag', '5. Anjali', '6. Archit Panda', '7. Arjun', '8. Vijay', '9. Ketan', '10. Anjali Jaiswal', '11. Aryan Talwar', '12. Farzeel', '13. Akash Kumar', '14. Jatin Rawat', '15. Kavish Arora', '16. Saloni Kumari', '17. Chirag Saxena', '18. Roshni Yadav', '19. Harshal Chauhan', '20. Abdul Khalid'],
        label: 'Top 20 Winners',
      },
    ],
  },
  {
    id: 'dsa', label: 'DSA Competitions', color: 'text-blue-400',
    border: 'border-blue-500/30', bg: 'bg-blue-500/8', icon: '🧠',
    cardTheme: 'from-blue-950/30 to-black',
    desc: 'Algorithm problem-solving under time pressure. FAANG-level DSA challenges.',
    hackathons: [
      // Upcoming first
      {
        id: 'dsa3', title: 'DSA Championship — Season 2', status: 'UPCOMING',
        statusColor: 'bg-green-500/20 text-green-400',
        quote: '"Next level. Next legends."',
        desc: 'Open championship for all STRIKE batches — graphs, trees, DP and system design problems combined.',
        top3: null, rest: [], label: 'Coming soon',
        upcoming: true,
        resultsNote: 'Registration opens soon. Stay tuned in batch.',
        prizeNote: '⚡ Cash prizes for top 5 performers',
      },
      {
        id: 'dsa2', title: 'DSA Challenge — Advanced Round', status: 'UPCOMING',
        statusColor: 'bg-blue-500/20 text-blue-400',
        quote: '"Graphs, trees and dynamic programming await."',
        desc: 'Advanced round covering graphs, trees, segment trees and DP. Open to all active STRIKE batch students.',
        top3: null, rest: [], label: 'Coming soon',
        upcoming: true,
        resultsNote: 'Registration open for active batch students.',
        prizeNote: '⚡ Cash prizes for top 5 performers',
      },
      // Completed
      {
        id: 'dsa1', title: 'DSA Problem Solving — Batch 1', status: 'COMPLETED',
        statusColor: 'bg-yellow-500/20 text-yellow-400',
        quote: '"Think first, code second."',
        desc: 'First DSA competition inside the Thunder batch. Students solved timed algorithmic problems covering arrays, strings and basic DP.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Utkarsh Agrawal' },
          { rank: '🥈', place: '2nd', name: 'Kavish Arora' },
          { rank: '🥉', place: '3rd', name: 'Jatin Nayal' },
        ],
        rest: ['4. Raju Pandit', '5. Mohit Soni', '6. Adarsh Singh', '7. Anubhav Jha', '8. Roshni Yadav', '9. Abhishek', '10. Minhaj Alam'],
        label: 'Top 10 Winners',
        upcoming: false,
      },
      {
        id: 'dsa4', title: 'DSA Sprint — Arrays & Strings', status: 'COMPLETED',
        statusColor: 'bg-purple-500/20 text-purple-400',
        quote: '"Speed meets accuracy."',
        desc: 'Timed sprint covering arrays, strings and two-pointer techniques. Students had 90 minutes to solve 5 problems.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Divyansh Singh Pawar' },
          { rank: '🥈', place: '2nd', name: 'Arnav Gupta' },
          { rank: '🥉', place: '3rd', name: 'Tulasi Sahu' },
        ],
        rest: ['4. Sonam Kumari', '5. Rishita Jain', '6. Rethik Raj', '7. Viswatej Abbireddy'],
        label: 'Top 7 Winners',
        upcoming: false,
      },
      {
        id: 'dsa5', title: 'Binary Tree Challenge', status: 'COMPLETED',
        statusColor: 'bg-orange-500/20 text-orange-400',
        quote: '"Root to leaf — every node counts."',
        desc: 'Focused challenge on binary trees, BSTs and tree traversals. Hosted inside the live batch session.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Janmejai Singh' },
          { rank: '🥈', place: '2nd', name: 'Adarsh Singh' },
          { rank: '🥉', place: '3rd', name: 'Anubhav Jha' },
        ],
        rest: ['4. Abhishek', '5. Minhaj Alam', '6. Raju Pandit'],
        label: 'Top 6 Winners',
        upcoming: false,
      },
      {
        id: 'dsa6', title: 'Recursion & Backtracking Round', status: 'COMPLETED',
        statusColor: 'bg-emerald-500/20 text-emerald-400',
        quote: '"Break it down, build it up."',
        desc: 'Recursion and backtracking problems — N-Queens, Sudoku solver and subsets. Pure logic competition.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Kavish Arora' },
          { rank: '🥈', place: '2nd', name: 'Darshit Pandey' },
          { rank: '🥉', place: '3rd', name: 'Dipan Pramanik' },
        ],
        rest: ['4. Jatin Nayal', '5. Vinay Toppo', '6. Roshni Yadav'],
        label: 'Top 6 Winners',
        upcoming: false,
      },
    ],
  },
  {
    id: 'genai', label: 'GenAI Hackathons', color: 'text-purple-400',
    border: 'border-purple-500/30', bg: 'bg-purple-500/8', icon: '🤖',
    cardTheme: 'from-purple-950/30 to-black',
    desc: 'Build with LLMs, diffusion models and AI APIs. Real AI projects, not just tutorials.',
    hackathons: [
      // Upcoming first
      {
        id: 'genai3', title: 'Agentic AI Hackathon', status: 'UPCOMING',
        statusColor: 'bg-purple-500/20 text-purple-400',
        quote: '"Agents that act. Systems that think."',
        desc: 'Build autonomous AI agents using LangChain, CrewAI or custom architectures. RAG pipelines and tool-calling welcome.',
        top3: null, rest: [], label: 'Coming soon',
        upcoming: true,
        resultsNote: 'Details announced in GenAI batch.',
        prizeNote: '⚡ Cash prizes for top performers',
      },
      {
        id: 'genai2', title: 'GenAI Hackathon — Season 2', status: 'UPCOMING',
        statusColor: 'bg-blue-500/20 text-blue-400',
        quote: '"Build something that learns."',
        desc: 'Season 2 focuses on multi-modal AI — combine text, image and audio in real applications.',
        top3: null, rest: [], label: 'Coming soon',
        upcoming: true,
        resultsNote: 'Details will be announced in the batch.',
        prizeNote: '⚡ Cash prizes for top performers',
      },
      // Completed
      {
        id: 'genai1', title: 'GenAI Build Challenge — Round 1', status: 'COMPLETED',
        statusColor: 'bg-yellow-500/20 text-yellow-400',
        quote: '"Build something that thinks."',
        desc: 'Students built AI-powered apps using Gemini, OpenAI and Hugging Face APIs. Projects included chatbots, summarizers and AI tools.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Divyansh Singh Pawar' },
          { rank: '🥈', place: '2nd', name: 'Arnav Gupta' },
          { rank: '🥉', place: '3rd', name: 'Rishita Jain' },
        ],
        rest: ['4. Viswatej Abbireddy', '5. Adarsh Singh', '6. Sonam Kumari', '7. Rethik Raj', '8. Tulasi Sahu'],
        label: 'Top 8 Winners',
        upcoming: false,
      },
      {
        id: 'genai4', title: 'Prompt Engineering Challenge', status: 'COMPLETED',
        statusColor: 'bg-orange-500/20 text-orange-400',
        quote: '"The right prompt unlocks everything."',
        desc: 'Craft the most effective prompts for given tasks. Judged on output quality, consistency and creativity.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Kavish Arora' },
          { rank: '🥈', place: '2nd', name: 'Jatin Nayal' },
          { rank: '🥉', place: '3rd', name: 'Roshni Yadav' },
        ],
        rest: ['4. Abhishek', '5. Minhaj Alam', '6. Anubhav Jha'],
        label: 'Top 6 Winners',
        upcoming: false,
      },
      {
        id: 'genai5', title: 'AI Chatbot Buildathon', status: 'COMPLETED',
        statusColor: 'bg-emerald-500/20 text-emerald-400',
        quote: '"Talk to what you build."',
        desc: 'Build a domain-specific chatbot using any LLM. Judged on UX, accuracy and creativity of use-case.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Darshit Pandey' },
          { rank: '🥈', place: '2nd', name: 'Arnav Gupta' },
          { rank: '🥉', place: '3rd', name: 'Tulasi Sahu' },
        ],
        rest: ['4. Sonam Kumari', '5. Rishita Jain', '6. Adarsh Singh', '7. Rethik Raj'],
        label: 'Top 7 Winners',
        upcoming: false,
      },
    ],
  },
  {
    id: 'web', label: 'Web / UI Competitions', color: 'text-emerald-400',
    border: 'border-emerald-500/30', bg: 'bg-emerald-500/8', icon: '🌐',
    cardTheme: 'from-emerald-950/20 to-black',
    desc: 'HTML/CSS pixel challenges, JavaScript battles, UI clones and creative builds.',
    hackathons: [
      // Upcoming first
      {
        id: 'web3', title: 'React Component Challenge', status: 'UPCOMING',
        statusColor: 'bg-emerald-500/20 text-emerald-400',
        quote: '"Components that compose. UIs that delight."',
        desc: 'Build reusable React components with animations and accessibility. Judged on code quality and visual output.',
        top3: null, rest: [], label: 'Coming soon',
        upcoming: true,
        resultsNote: 'Open to all active web batch students.',
        prizeNote: '⚡ Cash prizes for top performers',
      },
      {
        id: 'web4', title: 'JavaScript DOM Challenge', status: 'UPCOMING',
        statusColor: 'bg-yellow-500/20 text-yellow-400',
        quote: '"Vanilla JS. No frameworks. Pure logic."',
        desc: 'Build interactive UI features using only vanilla JavaScript. No libraries. Judged on functionality and code quality.',
        top3: null, rest: [], label: 'Coming soon',
        upcoming: true,
        resultsNote: 'Batch announcement coming soon.',
        prizeNote: '⚡ Cash prizes for top performers',
      },
      // Completed
      {
        id: 'css1', title: 'Coder Army CSS Hackathon', status: 'COMPLETED',
        statusColor: 'bg-emerald-500/20 text-emerald-400',
        quote: '"Every pixel tells a story."',
        desc: 'Recreate a given UI design using pure CSS. Judged on Quality and Structure.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Nishant Singh' },
          { rank: '🥈', place: '2nd', name: 'Dakshit Bamaniya' },
          { rank: '🥉', place: '3rd', name: 'Mudasir Ahmad Itoo' },
        ],
        rest: ['4. Zuhaib Hanfi', '5. Raghubir Singh Chauhan', '6. Umesh Mehra', '7. Deepak Mallareddy', '8. Prince Gond', '9. Divyanshu Gupta'],
        label: 'Top 9 Winners',
        upcoming: false,
      },
      {
        id: 'html1', title: 'Coder Army HTML Hackathon', status: 'COMPLETED',
        statusColor: 'bg-blue-500/20 text-blue-400',
        quote: '"Structure is everything."',
        desc: 'Build a semantic HTML project judged on Quality and Structure. The very first web competition in the series.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Pulkit Bhardwaj' },
          { rank: '🥈', place: '2nd', name: 'Priti Biswas' },
          { rank: '🥉', place: '3rd', name: 'Souvik Bag' },
        ],
        rest: ['4. Utsav Kashyap', '5. Tanushree Ravi Bobade', '6. Subhajit Ghosh', '7. Srishti Chopra', '8. Anirban Majumder', '9. Sameer Verma'],
        label: 'Top 9 Winners',
        upcoming: false,
      },
      {
        id: 'web5', title: 'Responsive Design Sprint', status: 'COMPLETED',
        statusColor: 'bg-orange-500/20 text-orange-400',
        quote: '"Mobile first. Always."',
        desc: 'Build a fully responsive landing page from a Figma design. Judged on pixel accuracy and mobile experience.',
        top3: [
          { rank: '🥇', place: '1st', name: 'Ritika Bansal' },
          { rank: '🥈', place: '2nd', name: 'Yash Patel' },
          { rank: '🥉', place: '3rd', name: 'Simran Kaur' },
        ],
        rest: ['4. Deepak Chauhan', '5. Divya Nair', '6. Kartik Arora'],
        label: 'Top 6 Winners',
        upcoming: false,
      },
    ],
  },
]

// ─── Comparison table ─────────────────────────────────────────────────────────
const compRows = [
  { feature: 'Structured learning path',       strike: true,  typical: true  },
  { feature: 'Project-based learning',          strike: true,  typical: true  },
  { feature: 'Live doubt support',              strike: true,  typical: false },
  { feature: 'Weekly hackathons',               strike: true,  typical: false },
  { feature: 'TA 24/7 support',                 strike: true,  typical: false },
  { feature: 'Cash prize competitions',         strike: true,  typical: false },
  { feature: 'HTML/CSS UI challenges',          strike: true,  typical: false },
  { feature: 'DSA competitions',                strike: true,  typical: false },
  { feature: 'GenAI build challenges',          strike: true,  typical: false },
  { feature: 'Community + peer competition',    strike: true,  typical: false },
  { feature: 'Build → compete feedback loop',   strike: true,  typical: false },
  { feature: 'Course fee recovery opportunity', strike: true,  typical: false },
]

const pathway = [
  { level: 'Beginner',    tech: 'HTML / CSS',          comp: 'UI Pixel Challenges',    icon: '🎨' },
  { level: 'Intermediate',tech: 'JavaScript / Web Dev', comp: 'JS Speed Builds',        icon: '⚡' },
  { level: 'Core',        tech: 'DSA + Algorithms',     comp: 'DSA Competitions',       icon: '🧠' },
  { level: 'Advanced',    tech: 'Generative AI',        comp: 'GenAI Build Challenges', icon: '🤖' },
  { level: 'Full-stack',  tech: 'Thunder (All Combined)',comp: 'Thunder Hackathon',     icon: '🏆' },
]

// ─── Hackathon result card with tabs ─────────────────────────────────────────
function HackathonBlock({ cat }) {
  const [activeId, setActiveId] = useState(cat.hackathons[0].id)
  const [showAll, setShowAll] = useState(false)
  const current = cat.hackathons.find(h => h.id === activeId)

  const handleTabChange = (id) => { setActiveId(id); setShowAll(false) }

  return (
    <div>
      {/* Sub-tabs for hackathons in this category */}
      {cat.hackathons.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {cat.hackathons.map(h => (
            <button
              key={h.id}
              onClick={() => handleTabChange(h.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeId === h.id
                  ? `${cat.bg} ${cat.border} ${cat.color}`
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {h.title}
            </button>
          ))}
        </div>
      )}

      {/* Active card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
          className={`bg-gradient-to-br ${cat.cardTheme} border ${cat.border} rounded-2xl p-6`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-5 flex-wrap gap-2">
            <div>
              <h4 className="text-xl font-black text-white">{current.title}</h4>
              <p className="text-gray-500 text-xs italic mt-0.5">{current.quote}</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${current.statusColor}`}>
              {current.status}
            </span>
          </div>

          {current.top3 ? (
            <>
              {/* Podium */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {current.top3.map((w, i) => (
                  <motion.div
                    key={w.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`bg-white/5 border border-white/10 rounded-xl p-3 text-center ${i === 0 ? 'ring-1 ring-yellow-500/40' : ''}`}
                  >
                    <div className="text-xl mb-0.5">{w.rank}</div>
                    <div className="text-gray-400 text-xs">{w.place}</div>
                    <div className="text-white text-xs font-bold mt-1 leading-tight">{w.name}</div>
                  </motion.div>
                ))}
              </div>

              {/* Rest expandable */}
              {current.rest.length > 0 && (
                <>
                  <AnimatePresence>
                    {showAll && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-3"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {current.rest.map((name, i) => (
                            <div key={i} className="bg-white/3 border border-white/8 rounded-lg px-3 py-2 text-gray-400 text-xs">
                              {name}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => setShowAll(s => !s)}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    {showAll ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    {showAll ? 'Show less' : `${current.label} — View all`}
                  </button>
                </>
              )}
            </>
          ) : (
            <p className="text-gray-600 text-sm italic">{current.label}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Color map for hover glow per category ───────────────────────────────────
const CATEGORY_GLOW = {
  thunder: 'rgba(234,179,8,0.35)',
  dsa:     'rgba(59,130,246,0.35)',
  genai:   'rgba(168,85,247,0.35)',
  web:     'rgba(16,185,129,0.35)',
}

// ─── Grid card (dedicated page) ──────────────────────────────────────────────
function GridHackathonCard({ h, cat }) {
  const [showAll, setShowAll] = useState(false)
  const glow = CATEGORY_GLOW[cat.id] || 'rgba(168,85,247,0.3)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        y: -6,
        boxShadow: `0 20px 60px ${glow}, 0 8px 24px rgba(0,0,0,0.7)`,
        zIndex: 10,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className={`bg-gradient-to-br ${cat.cardTheme} border ${cat.border} rounded-2xl p-5 relative cursor-pointer`}
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
    >
      {h.upcoming && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 30px rgba(168,85,247,0.25)', '0 0 0px rgba(168,85,247,0)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-2">
        <div>
          <p className="text-purple-400/60 text-xs font-semibold uppercase tracking-wider mb-0.5">STRIKE × Coder Army</p>
          <h4 className="text-white font-black text-base">{h.title}</h4>
          <p className="text-gray-500 text-xs italic mt-0.5">{h.quote}</p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 flex items-center gap-1.5 ${h.statusColor}`}>
          {h.upcoming && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />}
          {h.status}
        </span>
      </div>

      {h.upcoming || !h.top3 ? (
        <div className="flex flex-col gap-2.5">
          <p className="text-gray-400 text-sm leading-relaxed">{h.desc || ''}</p>
          <p className="text-gray-500 text-xs italic">{h.resultsNote || h.label}</p>
          {h.prizeNote && <p className="text-yellow-400/80 text-xs font-semibold">{h.prizeNote}</p>}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {h.top3.map((w, i) => (
              <div key={i} className={`bg-white/5 border border-white/10 rounded-xl p-2.5 text-center ${i === 0 ? 'ring-1 ring-yellow-500/40' : ''}`}>
                <div className="text-xl mb-0.5">{w.rank}</div>
                <div className="text-gray-400 text-xs">{w.place}</div>
                <div className="text-white text-xs font-bold mt-0.5 leading-tight">{w.name}</div>
              </div>
            ))}
          </div>
          {h.rest.length > 0 && (
            <>
              <AnimatePresence>
                {showAll && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-2">
                    <div className="grid grid-cols-2 gap-1.5 mt-2">
                      {h.rest.map((name, i) => (
                        <div key={i} className="bg-white/3 border border-white/8 rounded-lg px-2.5 py-1.5 text-gray-400 text-xs">{name}</div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button onClick={() => setShowAll(s => !s)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors mt-1">
                {showAll ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {showAll ? 'Show less' : `${h.label} — View all`}
              </button>
            </>
          )}
        </>
      )}
    </motion.div>
  )
}

// ─── Typewriter component ─────────────────────────────────────────────────────
const TYPEWRITER_WORDS = [
  { text: 'Thunder Hackathon 6', color: 'text-yellow-400' },
  { text: 'DSA Championship', color: 'text-blue-400' },
  { text: 'Agentic AI Hackathon', color: 'text-purple-400' },
]

function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const current = TYPEWRITER_WORDS[wordIndex].text

    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true) }, 1800)
      return () => clearTimeout(t)
    }

    if (!deleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
        return () => clearTimeout(t)
      } else {
        setPaused(true)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % TYPEWRITER_WORDS.length)
      }
    }
  }, [displayed, deleting, paused, wordIndex])

  const color = TYPEWRITER_WORDS[wordIndex].color

  return (
    <h2 className={`text-4xl md:text-6xl font-black leading-tight min-h-[1.2em] ${color}`}
      style={{ textShadow: color.includes('yellow') ? '0 0 30px rgba(234,179,8,0.5)' : '0 0 30px rgba(168,85,247,0.5)' }}
    >
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm bg-current"
      />
    </h2>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HackathonsPage() {
  const navigate = useNavigate()
  const [activeCat, setActiveCat] = useState('thunder')
  const current = categories.find(c => c.id === activeCat)
  const [confetti, setConfetti] = useState(true)

  // Auto-stop confetti after 3s
  useEffect(() => {
    const t = setTimeout(() => setConfetti(false), 3200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <ConfettiBurst active={confetti} />
      <Navbar />

      {/* All Hackathons — tabs + card */}
      <section className="py-20 bg-black pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <p className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3">All Competitions</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Full Hackathon Record</h2>
            <p className="text-gray-400">Verified results from every STRIKE/Coder Army competition.</p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  activeCat === cat.id
                    ? `${cat.bg} ${cat.border} ${cat.color}`
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>

          {/* Category desc + hackathon GRID */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className={`text-center text-sm mb-6 ${current.color}`}>{current.desc}</p>
              <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto" style={{ overflow: 'visible' }}>
                {current.hackathons.map(h => (
                  <GridHackathonCard key={h.id} h={h} cat={current} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* STRIKE vs Typical Course */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Why STRIKE is Different</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">STRIKE vs Typical Course</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Most platforms teach you to watch. STRIKE builds the loop of learning, building, and competing.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(234,179,8,0.25)',
              boxShadow: `
                0 0 0 1px rgba(234,179,8,0.06),
                0 2px 8px rgba(234,179,8,0.06),
                0 8px 24px rgba(234,179,8,0.10),
                0 24px 64px rgba(0,0,0,0.7),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `,
              background: 'linear-gradient(180deg, rgba(30,25,10,0.6) 0%, rgba(10,10,10,0.95) 100%)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Table header */}
            <div className="grid grid-cols-3 border-b"
              style={{
                background: 'linear-gradient(90deg, rgba(234,179,8,0.08) 0%, rgba(234,179,8,0.04) 50%, rgba(255,255,255,0.02) 100%)',
                borderColor: 'rgba(234,179,8,0.15)',
              }}
            >
              <div className="px-5 py-4 text-gray-400 text-sm font-semibold tracking-wide">Feature</div>
              <div className="px-5 py-4 text-center">
                <span className="text-yellow-400 font-black text-sm tracking-widest uppercase"
                  style={{ textShadow: '0 0 12px rgba(234,179,8,0.6)' }}>
                  STRIKE
                </span>
              </div>
              <div className="px-5 py-4 text-center">
                <span className="text-gray-500 text-sm font-semibold">Typical Course</span>
              </div>
            </div>

            {/* Rows */}
            {compRows.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{
                  backgroundColor: 'rgba(234,179,8,0.06)',
                  borderLeftColor: 'rgba(234,179,8,0.7)',
                  x: 3,
                  transition: { duration: 0.15 }
                }}
                className={`grid grid-cols-3 border-b border-white/5 border-l-2 border-l-transparent transition-colors duration-150 ${i % 2 === 0 ? 'bg-white/2' : ''}`}
              >
                <div className="px-5 py-3.5 text-gray-300 text-sm font-medium flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0 shadow-[0_0_6px_rgba(234,179,8,0.9)]" />
                  {row.feature}
                </div>
                <div className="px-5 py-3.5 flex justify-center items-center">
                  {row.strike ? (
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle, rgba(234,179,8,0.3) 0%, rgba(234,179,8,0.1) 100%)',
                        boxShadow: '0 0 12px rgba(234,179,8,0.5), 0 0 4px rgba(234,179,8,0.8)',
                        border: '1px solid rgba(234,179,8,0.6)',
                      }}
                    >
                      <Check size={14} className="text-yellow-300" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <X size={13} className="text-red-500" />
                    </div>
                  )}
                </div>
                <div className="px-5 py-3.5 flex justify-center items-center">
                  {row.typical ? (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-7 h-7 rounded-full bg-white/8 border border-white/15 flex items-center justify-center"
                    >
                      <Check size={12} className="text-gray-400" strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white/3 border border-white/8 flex items-center justify-center">
                      <X size={12} className="text-gray-600" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-gray-700 text-xs text-center mt-4">*Comparison based on the STRIKE learning ecosystem. "Typical Course" refers to standard pre-recorded course platforms in general.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-5xl mb-6">⚡</div>

            {/* "Be a part of our" static */}
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
              Be a part of our
            </h2>

            {/* Typewriter line */}
            <TypewriterText />

            <p className="text-gray-400 mb-8 mt-6 text-base leading-relaxed">
              A community of coders, making the world a better place.<br />
              Learn, build, and grow with the best developers in the industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://strikes.in" className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-8 py-4 rounded-xl transition-all hover:scale-105">
                Explore Live Courses →
              </a>
              <button onClick={() => navigate('/')} className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:bg-white/5">
                Back to Homepage
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
