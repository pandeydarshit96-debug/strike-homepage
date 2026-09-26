import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const mentors = [
  {
    name: 'Rohit Negi',
    role: 'Founder & Lead Instructor',
    roleColor: 'text-purple-400',
    img: 'https://dolia18uq98lp.cloudfront.net/course/bf84ce20-9e40-40ef-91e0-e1c1170f4c59.jpg?t=1790436452446',
    bio: 'Heartfelt Problem Solver, Instructor, and Visionary Leader. Got Highest Placement in India of 2 Cr+.',
    backBio: 'Post Graduate from IIT Guwahati. GATE-CSE\'20 AIR 202. Former SDE at Uber. Founded Coder Army & STRIKE to make world-class engineering education accessible.',
    badges: ['IIT Graduate', 'GATE-CSE\'20 AIR 202', '₹2Cr+ Package', 'Ex-Uber'],
    linkedin: 'https://www.linkedin.com/in/rohit-negi9/',
    bgFront: 'from-purple-950/40 to-zinc-900',
    bgBack: 'from-purple-900/60 to-purple-950',
    borderFront: 'border-purple-500/20',
    borderBack: 'border-purple-400/40',
    glowColor: 'rgba(168,85,247,0.4)',
  },
  {
    name: 'Aditya Tandon',
    role: 'Co-Founder & Senior Instructor',
    roleColor: 'text-blue-400',
    img: 'https://dolia18uq98lp.cloudfront.net/course/82819fa0-24a9-4ee0-aae1-74e6923f3f9d.jpg?t=1790436452446',
    bio: 'Senior Software Engineer passionate about scalable systems and elegant algorithms. Dedicated mentor.',
    backBio: 'IIT Guwahati graduate. Former SDE at Ola. Currently at Oxyzo. Committed to teaching, learning, and inspiring future developers with first-principles thinking.',
    badges: ['IIT Guwahati', 'Ex-Ola', 'Currently @Oxyzo'],
    linkedin: 'https://www.linkedin.com/in/adityatandon2/',
    bgFront: 'from-blue-950/40 to-zinc-900',
    bgBack: 'from-blue-900/60 to-blue-950',
    borderFront: 'border-blue-500/20',
    borderBack: 'border-blue-400/40',
    glowColor: 'rgba(59,130,246,0.4)',
  },
]

function MentorCard({ m }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '1200px', height: '380px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* ── FRONT ── */}
        <div
          className={`absolute inset-0 rounded-2xl border ${m.borderFront} bg-gradient-to-b ${m.bgFront} flex flex-col items-center justify-center gap-4 p-8 text-center`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Photo */}
          <div className="relative">
            <img
              src={m.img}
              alt={m.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: `0 0 0 3px ${m.glowColor}` }}
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">{m.name}</h3>
            <p className={`text-sm font-semibold mt-1 ${m.roleColor}`}>{m.role}</p>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{m.bio}</p>

          <a
            href={m.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${m.roleColor} hover:opacity-80`}
          >
            View Profile <ExternalLink size={13} />
          </a>

          {/* Hover hint */}
          <p className="text-gray-600 text-xs mt-1">Hover to see more →</p>
        </div>

        {/* ── BACK ── */}
        <div
          className={`absolute inset-0 rounded-2xl border ${m.borderBack} bg-gradient-to-b ${m.bgBack} flex flex-col items-center justify-center gap-5 p-8 text-center`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: `0 0 40px ${m.glowColor}`,
          }}
        >
          <img
            src={m.img}
            alt={m.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
          />

          <div>
            <h3 className="text-lg font-black text-white">{m.name}</h3>
            <p className={`text-xs font-semibold mt-0.5 ${m.roleColor}`}>{m.role}</p>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{m.backBio}</p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {m.badges.map((b) => (
              <span
                key={b}
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{
                  background: `${m.glowColor.replace('0.4', '0.15')}`,
                  borderColor: `${m.glowColor.replace('0.4', '0.4')}`,
                  color: 'white',
                }}
              >
                {b}
              </span>
            ))}
          </div>

          <a
            href={m.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all"
          >
            LinkedIn <ExternalLink size={13} />
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default function Mentors() {
  return (
    <section id="mentors" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Meet The Team</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Meet Our Mentors</h2>
          <p className="text-gray-400 text-lg">IIT graduates who've been there, cracked it, and teach you exactly how.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mentors.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <MentorCard m={m} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
