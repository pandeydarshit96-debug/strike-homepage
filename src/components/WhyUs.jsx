import { motion } from 'framer-motion'
import { Brain, FolderGit2, LineChart, Trophy } from 'lucide-react'

const features = [
  {
    icon: <Trophy size={20} className="text-yellow-400" />,
    title: 'Interview Preparation',
    desc: 'Learn faster with hands-on tracks and mentor feedback. 200+ FAANG questions.',
    img: 'https://dolia18uq98lp.cloudfront.net/sale-icons/7ebc7314-dcfe-4e82-a2cb-677df6f9c57e.jpg',
    fallback: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    bg: 'bg-yellow-500/8',
    border: 'border-yellow-500/20',
    glow: 'rgba(234,179,8,0.12)',
    iconBg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: <Brain size={20} className="text-purple-400" />,
    title: 'AI Support',
    desc: 'AI-powered doubt resolution and personalized learning path suggestions.',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    bg: 'bg-purple-500/8',
    border: 'border-purple-500/20',
    glow: 'rgba(168,85,247,0.12)',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: <FolderGit2 size={20} className="text-blue-400" />,
    title: 'Projects Based Learning',
    desc: 'Build real-world projects that directly help you crack multiple interviews.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/20',
    glow: 'rgba(59,130,246,0.12)',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: <LineChart size={20} className="text-green-400" />,
    title: 'Track Your Progress',
    desc: 'Live progress tracking with weekly streaks, milestones and performance analytics.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    bg: 'bg-green-500/8',
    border: 'border-green-500/20',
    glow: 'rgba(34,197,94,0.12)',
    iconBg: 'bg-green-500/10 border-green-500/20',
  },
]

export default function WhyUs() {
  return (
    <section id="why" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Learn Smarter</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Modern tools, guided mentors, and a platform built to help you grow faster — setting a new benchmark for coding excellence.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 20px 50px ${f.glow}` }}
              className={`group rounded-2xl border ${f.border} ${f.bg} flex flex-col overflow-hidden transition-all duration-300 cursor-pointer`}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '140px' }}>
                <motion.img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onError={(e) => { e.target.src = f.fallback }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-900 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${f.iconBg}`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAANG Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-center text-gray-500 text-sm font-medium mb-8 uppercase tracking-widest">
            Get All Premium Questions Asked In FAANG Companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {[
              { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
              { name: 'Meta', src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' },
              { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/donate/thumb/f/fd/Amazon-logo-white.svg/960px-Amazon-logo-white.svg.png' },
              { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
              { name: 'Netflix', src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
              { name: 'Oracle', src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
            ].map((logo) => (
              <img key={logo.name} src={logo.src} alt={logo.name} className="h-7 object-contain brightness-200" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
