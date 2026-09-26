import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, ArrowRight } from 'lucide-react'

const courses = [
  {
    title: 'Thunder: 100 Days of Code',
    tag: 'POPULAR',
    desc: 'Intensive 100-day program covering DSA, Web Dev & System Design with daily challenges.',
    fullDesc: 'Complete LIVE course covering Web development, System Design, React & DevOps. JavaScript Mastery, Backend with Node.js, Express & MongoDB, Advanced System Design.',
    duration: '100 Days',
    students: '5K+',
    link: 'https://strikes.in/course/thunder-web',
    img: '/thunder.png',
    fallbackImg: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80',
    tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    border: 'border-orange-500/30',
    glow: 'rgba(249,115,22,0.35)',
    backBg: 'from-orange-950/80 to-black',
    highlights: ['Live DSA Classes', 'System Design', 'React + Node.js', 'DevOps', 'Capstone Projects'],
  },
  {
    title: 'DSA + GenAI Combo',
    tag: 'TRENDING',
    desc: '200+ problems from FAANG archives. Build AI-powered apps alongside mastering algorithms.',
    fullDesc: 'Complete LIVE course covering DSA, Gen AI with industry-grade projects. Live classes, 200+ problems, AI with LLMs, RAG pipelines and real-world AI applications.',
    duration: '6–8 Months',
    students: '3K+',
    link: 'https://strikes.in/course/combo',
    img: 'https://dolia18uq98lp.cloudfront.net/course/61baa760-861e-4fbc-bce4-557dc37bd941.png',
    fallbackImg: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    border: 'border-purple-500/30',
    glow: 'rgba(168,85,247,0.35)',
    backBg: 'from-purple-950/80 to-black',
    highlights: ['Live DSA Classes', 'Generative AI & LLMs', 'AI Applications', 'Resume & Interview Prep', '200+ Problems'],
  },
  {
    title: 'Data Structures & Algorithms',
    tag: 'CORE',
    desc: 'Master DSA from basics to advanced. First-principles approach. Interview-ready.',
    fullDesc: 'Master Data Structures and Algorithms with focus on problem-solving and top product-based company interviews. 450+ curated coding problems.',
    duration: '4–6 Months',
    students: '8K+',
    link: 'https://strikes.in/course/689ecf2b6793e719cdee9efc',
    img: 'https://dolia18uq98lp.cloudfront.net/course/caa46009-ca64-4dce-94d7-7357e6bdc251.png',
    fallbackImg: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    border: 'border-blue-500/30',
    glow: 'rgba(59,130,246,0.35)',
    backBg: 'from-blue-950/80 to-black',
    highlights: ['Fundamental to Advanced DS', 'Graphs & DP Mastery', '450+ Curated Problems', 'Mock Interviews', 'Time & Space Optimization'],
  },
  {
    title: 'Generative AI',
    tag: 'NEW',
    desc: 'Build chatbots, code generators, and AI-powered applications using modern LLM frameworks.',
    fullDesc: 'Project-based LIVE course covering LLMs, RAG, Fine-tuning, and building scalable AI agents. Deep dive into Transformers, Advanced Prompt Engineering.',
    duration: '3–4 Months',
    students: '2K+',
    link: 'https://strikes.in/course/689ee05f1d8fc292bd27df7c',
    img: 'https://dolia18uq98lp.cloudfront.net/course/e5d4d382-6966-4928-bd0b-955b56fdbf14.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    border: 'border-emerald-500/30',
    glow: 'rgba(16,185,129,0.35)',
    backBg: 'from-emerald-950/80 to-black',
    highlights: ['Transformers & LLMs', 'Advanced Prompt Engineering', 'RAG Pipelines', 'Model Fine-tuning', 'Real-world AI Apps'],
  },
  {
    title: 'DevOps: Foundations to Production',
    tag: 'IN DEMAND',
    desc: 'CI/CD, Docker, Kubernetes, Cloud. Go from zero to production-ready DevOps engineer.',
    fullDesc: 'Complete LIVE course covering DevOps tools, CI/CD pipelines, containerization, cloud infrastructure, and more. Taught by Aditya Tandon.',
    duration: '3 Months',
    students: '1.5K+',
    link: 'https://strikes.in/course/devops',
    img: 'https://dolia18uq98lp.cloudfront.net/course/3047d244-fa7e-4a7b-8dc4-4169948a9742.png',
    fallbackImg: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
    tagColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    border: 'border-yellow-500/30',
    glow: 'rgba(234,179,8,0.35)',
    backBg: 'from-yellow-950/80 to-black',
    highlights: ['CI/CD Pipelines', 'Docker & Kubernetes', 'Cloud Infrastructure (AWS/GCP)', 'Monitoring & Logging', 'Live Classes: Wed & Sat 9PM'],
  },
]

function CourseCard({ c, i }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="relative"
      style={{ perspective: '1200px', height: '320px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 rounded-2xl border ${c.border} bg-zinc-900/80 flex flex-col overflow-hidden`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Thumbnail */}
          <div className="relative overflow-hidden" style={{ height: '160px', flexShrink: 0 }}>
            <img
              src={c.img}
              alt={c.title}
              className="w-full h-full object-cover"
              onError={e => { e.target.src = c.fallbackImg }}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-900 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${c.tagColor}`}>{c.tag}</span>
            </div>
          </div>
          {/* Info */}
          <div className="p-4 flex flex-col gap-2 flex-1">
            <h3 className="text-white font-bold text-sm leading-snug">{c.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed flex-1 line-clamp-2">{c.desc}</p>
            <div className="flex items-center gap-4 pt-2 border-t border-white/8">
              <div className="flex items-center gap-1 text-gray-500 text-xs"><Clock size={11} />{c.duration}</div>
              <div className="flex items-center gap-1 text-gray-500 text-xs"><Users size={11} />{c.students} enrolled</div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 rounded-2xl border ${c.border} bg-gradient-to-b ${c.backBg} flex flex-col justify-between p-5`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: `0 0 40px ${c.glow}`,
          }}
        >
          <div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.tagColor} mb-3 inline-block`}>{c.tag}</span>
            <h3 className="text-white font-black text-base mb-2">{c.title}</h3>
            <p className="text-gray-300 text-xs leading-relaxed mb-4">{c.fullDesc}</p>
            <ul className="space-y-1.5">
              {c.highlights.map(h => (
                <li key={h} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.glow.replace('0.35', '1') }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={c.link}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-2.5 rounded-xl transition-all mt-3"
          >
            Start Building <ArrowRight size={14} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Courses() {
  return (
    <section id="courses" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Comprehensive Courses</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Designed to elevate your skills and get you placed at top companies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ overflow: 'visible' }}>
          {courses.map((c, i) => (
            <CourseCard key={c.title} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
