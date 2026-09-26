import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  { name: 'Namita Singh', text: 'I learned everything from beginner to advanced levels and built multiple real-world projects that strengthened my skills and boosted my confidence.' },
  { name: 'Gopal Kumar Jha', text: "Completed Nexus MERN in 8-9 months. Rohit Bhaiya taught not just 'what' but 'why' behind everything. My consistency broke many times, but I finally made it!" },
  { name: 'Adheli Priyanka', text: 'Nexus builds from basics with in-depth explanations. Daily homework, live classes, and project contests with rewards kept me motivated throughout.' },
  { name: 'Aryan Verma', text: 'Best decision I made was joining Nexus. The First Principles teaching helped me understand concepts deeply, not just memorize solutions.' },
  { name: 'Mehul Prajapati', text: 'The way complex topics like System Design and Blockchain are taught in Nexus is unmatched. I built 5+ projects that directly helped me crack multiple interviews.' },
  { name: 'Navlesh Kumar', text: "Rohit Sir's First Principles approach transformed how I build applications. From beginner to advanced, every concept clicked perfectly." },
  { name: 'Sonu', text: 'Nexus gave me everything I needed - MERN Stack, DSA, System Design, all in one place. The community support and regular contests pushed me beyond my limits.' },
  { name: 'Babita Patel', text: 'Nexus gave me a true from-scratch learning experience. The way they simplify core concepts combined with daily assignments and live guidance kept me motivated.' },
]

function ReviewCard({ r }) {
  return (
    <div className="min-w-[280px] max-w-[280px] bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} fill="#a855f7" className="text-purple-500" />
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed flex-1">"{r.text}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-violet-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {r.name[0]}
        </div>
        <div className="font-semibold text-white text-sm">{r.name}</div>
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Reviews</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Trusted by Visionaries</h2>
          <p className="text-gray-400 text-lg">Hear from real users who achieved success with Strike.</p>
        </motion.div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative">
        <div className="flex gap-4 animate-marquee w-max">
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
      </div>
    </section>
  )
}
