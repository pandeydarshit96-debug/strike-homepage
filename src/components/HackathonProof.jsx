import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Users, Calendar, ArrowRight, Medal, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const hackathons = [
  {
    id: 'h6',
    title: 'Thunder Hackathon 6',
    status: 'LIVE NOW',
    statusColor: 'bg-red-500/20 text-red-400 border-red-500/40',
    theme: 'from-purple-950/40 via-zinc-900/60 to-black border-purple-500/30',
    quote: '"This is Hackathon 6.0 — the one you are building for."',
    desc: 'Thunder Hackathon 6.0 challenges participants to recreate the STRIKE homepage and build a creative sale experience inside it.',
    resultsNote: 'Results not announced yet — competition is live.',
    prizeNote: '⚡ Cash prizes for top performers',
    top3: null,
    rest: [],
    label: 'Top results coming soon',
    participants: 'Live now',
    upcoming: true,
  },
  {
    id: 'h5',
    title: 'Thunder Hackathon 5',
    status: 'COMPLETED',
    statusColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    theme: 'from-yellow-950/30 to-black border-yellow-500/20',
    quote: '"We Coded. We Debugged. We Won."',
    top3: [
      { rank: '🥇', place: '1st', name: 'Jatin Nayal' },
      { rank: '🥈', place: '2nd', name: 'Kavish Arora' },
      { rank: '🥉', place: '3rd', name: 'Raju Pandit' },
    ],
    rest: ['4. Mohit Soni', '5. Viswatej Abbireddy', '6. Divyansh Singh Pawar', '7. Saloni Kumari', '8. Anubhav Jha', '9. Roshni Yadav'],
    label: 'Top 9 Winners',
    participants: '500+',
  },
  {
    id: 'h4',
    title: 'Thunder Hackathon 4',
    status: 'COMPLETED',
    statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    theme: 'from-blue-950/30 to-black border-blue-500/20',
    quote: '"20 brilliant minds. Countless ideas. One Thunderous achievement!"',
    top3: [
      { rank: '🥇', place: '1st', name: 'Darshit Pandey' },
      { rank: '🥈', place: '2nd', name: 'Jatin Nayal' },
      { rank: '🥉', place: '3rd', name: 'Dipan Pramanik' },
    ],
    rest: ['4. Vinay Toppo', '5. Minhaj Alam', '6. Raju Pandit', '7. Roshni Yadav', '8. Tulasi Sahu', '9. Utkarsh Agrawal', '10. Kavish Arora', '11. Adarsh Singh', '12. Abhishek', '13. Janmejai Singh', '14. Anubhav Jha', '15. Rethik Raj', '16. Sonam Kumari', '17. Viswatej Abbireddy', '18. Rishita Jain', '19. Durvesh Krishna Roge', '20. Arnav Gupta'],
    label: 'Top 20 Winners',
    participants: '500+',
  },
]

const stats = [
  { icon: <Trophy size={20} className="text-yellow-400" />, val: '6', label: 'Hackathons Done' },
  { icon: <Users size={20} className="text-purple-400" />, val: '500+', label: 'Participants Each' },
  { icon: <Calendar size={20} className="text-blue-400" />, val: 'Regular', label: 'Frequency' },
  { icon: <Medal size={20} className="text-green-400" />, val: '100+', label: 'Total Winners' },
]

function HackathonCard({ h }) {
  const [showAll, setShowAll] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        y: -6,
        boxShadow: '0 20px 60px rgba(168,85,247,0.3), 0 8px 24px rgba(0,0,0,0.7)',
        borderColor: 'rgba(168,85,247,0.5)',
        zIndex: 10,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className={`bg-gradient-to-br ${h.theme} border rounded-2xl p-5 flex flex-col gap-4 relative cursor-pointer`}
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.4)', position: 'relative' }}
    >
      {/* Upcoming glow effect */}
      {h.upcoming && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 30px rgba(168,85,247,0.25)', '0 0 0px rgba(168,85,247,0)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-purple-400/60 text-xs font-semibold uppercase tracking-wider mb-0.5">STRIKE × Coder Army</p>
          <h3 className="text-white font-black text-lg leading-tight">{h.title}</h3>
          <p className="text-gray-500 text-xs italic mt-0.5">{h.quote}</p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0 flex items-center gap-1.5 ${h.statusColor}`}>
          {h.upcoming && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />}
          {h.status}
        </span>
      </div>

      {/* Content */}
      {h.upcoming ? (
        <div className="flex flex-col gap-3">
          {/* Brand line */}
          <p className="text-purple-400/70 text-xs font-semibold uppercase tracking-wider">STRIKE × Coder Army</p>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{h.desc}</p>

          {/* Results note */}
          <p className="text-gray-500 text-xs italic">{h.resultsNote}</p>

          {/* Prize note */}
          <p className="text-yellow-400/80 text-xs font-semibold">{h.prizeNote}</p>
        </div>
      ) : (
        <>
          {/* Top 3 */}
          <div className="grid grid-cols-3 gap-2">
            {h.top3.map((w, i) => (
              <motion.div
                key={w.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-white/5 border border-white/10 rounded-xl p-3 text-center ${i === 0 ? 'ring-1 ring-yellow-500/40' : ''}`}
              >
                <div className="text-xl mb-0.5">{w.rank}</div>
                <div className="text-gray-400 text-xs">{w.place}</div>
                <div className="text-white text-xs font-bold mt-0.5 leading-tight">{w.name}</div>
              </motion.div>
            ))}
          </div>

          {/* Rest expandable */}
          {h.rest.length > 0 && (
            <>
              <AnimatePresence>
                {showAll && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-1.5">
                      {h.rest.map((name, i) => (
                        <div key={i} className="bg-white/3 border border-white/8 rounded-lg px-2.5 py-1.5 text-gray-400 text-xs">{name}</div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setShowAll(s => !s)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"
              >
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

export default function HackathonProof() {
  const navigate = useNavigate()

  return (
    <section id="hackathon" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-yellow-500 text-sm font-semibold uppercase tracking-widest mb-3">
            <Zap size={13} className="inline mr-1" />Current Hackathon Series
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Learn. Build. <span className="text-yellow-400">Compete. Win.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real students. Real projects. Real cash prizes. Every hackathon, new legends are made.
          </p>
        </motion.div>

        {/* Grid of cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10" style={{ overflow: 'visible' }}>
          {hackathons.map(h => (
            <HackathonCard key={h.id} h={h} />
          ))}
        </div>

        {/* Fee recovery note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-purple-950/30 border border-purple-500/20 rounded-2xl p-5 text-center mb-8"
        >
          <p className="text-gray-300 text-sm leading-relaxed">
            💡 <strong className="text-white">Can you recover your course fee?</strong>
            {' '}Live courses include weekly hackathons with cash prizes. By participating and winning,
            learners have an opportunity to recover some or potentially all of their course fee.
          </p>
          <p className="text-gray-600 text-xs mt-1.5">
            *Results not guaranteed. Names above are verified from actual Thunder Hackathon result announcements.
          </p>
        </motion.div>

        {/* Show More */}
        <div className="flex justify-center">
          <motion.button
            onClick={() => navigate('/hackathons')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-yellow-900/30"
          >
            <span>See All Hackathons & Competitions</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>

      </div>
    </section>
  )
}
