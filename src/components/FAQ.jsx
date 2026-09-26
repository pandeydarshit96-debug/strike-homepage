import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What programming languages can I learn on the platform?',
    a: 'Strike offers comprehensive courses in JavaScript, Python, Java, C++, React, Node.js, and many more. We also provide courses on Data Structures, Algorithms, System Design, and Full-Stack Development with hands-on projects.',
  },
  {
    q: 'What will I learn in the DSA + Gen AI course?',
    a: "This course covers Data Structures & Algorithms from basics to advanced level, along with Generative AI fundamentals. You'll learn arrays, trees, graphs, dynamic programming, and how to build AI-powered applications using modern frameworks. The course includes 200+ problems, live doubt sessions, and real-world AI projects.",
  },
  {
    q: 'Do I need prior coding experience to join DSA + Gen AI course?',
    a: "Basic programming knowledge in any language (C++, Java, or Python) is recommended. If you're completely new, we suggest starting with our beginner programming course first.",
  },
  {
    q: 'Will this course help me crack product-based company interviews?',
    a: "Absolutely! The course is specifically designed for interview preparation. You'll solve 200+ problems from FAANG interview archives, learn First Principles problem-solving approach, and get weekly mock interviews. Our students have cracked interviews at Google, Microsoft, Amazon, and top startups.",
  },
  {
    q: 'Can I recover my course fee through hackathons?',
    a: 'Live courses include weekly hackathons with cash prizes. By participating and winning, learners have an opportunity to recover some or potentially all of their course fee. Results are not guaranteed — it depends on participation and performance.',
  },
  {
    q: 'How long does it take to complete the DSA + Gen AI course?',
    a: 'The course is designed to be completed in 6-8 months with consistent daily practice. However, you get lifetime access to all course materials, so you can learn at your own pace.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-black text-white mb-4">Your Questions, Answered</h2>
          <p className="text-gray-400">Get instant answers to the most common questions about Strike.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-white/3 hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
                {open === i ? (
                  <Minus size={16} className="text-purple-400 flex-shrink-0" />
                ) : (
                  <Plus size={16} className="text-gray-500 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
