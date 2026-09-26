import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

const durations = ['2 Years', '3 Years', '4 Years']

const plans = [
  {
    name: 'Strike Plus',
    tag: 'MEMBERSHIP PLAN',
    banner: 'https://res.cloudinary.com/dru7bietp/image/upload/v1788610875/iikstqkfdc2drmlzo2b1.png',
    prices: { '2 Years': '₹9,999', '3 Years': '₹11,999', '4 Years': '₹12,499' },
    discounts: { '2 Years': '50% OFF', '3 Years': '40% OFF', '4 Years': '38% OFF' },
    link: 'https://strikes.in/membership/plus?duration=4%20Years&price=12499',
    features: [
      'All current courses included',
      'HD recordings',
      'Live class access during plan',
      'Notes & Certificates',
      'Resume Review',
      'System Design Platform',
      'DSA Platform',
      'Coder Arena Platform',
    ],
    popular: false,
    // Silver theme
    cardBg: 'from-[#1a1a2e] via-[#16213e]/80 to-black',
    cardBorder: 'border-slate-500/40',
    tagColor: 'text-slate-400',
    discountBg: 'bg-slate-400/20 text-slate-300',
    checkBg: 'bg-slate-500/20',
    checkColor: 'text-slate-400',
    btnClass: 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-500/40',
    glowColor: 'rgba(148,163,184,0.15)',
  },
  {
    name: 'Strike Ultra',
    tag: 'BEST VALUE',
    banner: 'https://res.cloudinary.com/dru7bietp/image/upload/v1788610989/fhtbd6batqlquhm9giio.png',
    prices: { '2 Years': '₹11,999', '3 Years': '₹12,999', '4 Years': '₹13,499' },
    discounts: { '2 Years': '52% OFF', '3 Years': '48% OFF', '4 Years': '46% OFF' },
    link: 'https://strikes.in/membership/ultra?duration=4%20Years&price=13499',
    features: [
      'Everything in Strike Plus',
      'Upcoming batches included',
      'Coder Arena Platform',
      'Certificates',
      'Resume Review',
      'Notes',
      'System Design Platform',
      'DSA Platform',
    ],
    popular: true,
    // Golden theme
    cardBg: 'from-[#2a1f00] via-[#1a1200]/80 to-black',
    cardBorder: 'border-yellow-600/50',
    tagColor: 'text-yellow-400',
    discountBg: 'bg-yellow-500/20 text-yellow-400',
    checkBg: 'bg-yellow-500/20',
    checkColor: 'text-yellow-400',
    btnClass: 'bg-yellow-500 hover:bg-yellow-400 text-black font-black',
    glowColor: 'rgba(234,179,8,0.15)',
  },
]

export default function Membership() {
  const [activeDuration, setActiveDuration] = useState('4 Years')

  return (
    <section id="membership" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">THE STRIKE MEMBERSHIP</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Membership Plans</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            One focused investment in your engineering career.<br />
            Every course. Present and future. Pay once, learn forever.
          </p>
        </motion.div>

        {/* Duration tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 border border-white/10 rounded-xl p-1">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDuration(d)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeDuration === d
                    ? 'bg-yellow-500 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                y: -6,
                boxShadow: `0 24px 60px ${plan.glowColor}`,
              }}
              className={`relative rounded-2xl border ${plan.cardBorder} bg-gradient-to-b ${plan.cardBg} flex flex-col overflow-hidden cursor-pointer transition-all duration-300`}
            >
              {/* Best value badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Star size={10} fill="black" /> BEST VALUE
                  </span>
                </div>
              )}

              {/* Banner image — full width, proper height */}
              <motion.div
                className="relative w-full overflow-hidden"
                style={{ height: '200px' }}
                whileHover={{ scale: 1.0 }}
              >
                <motion.img
                  src={plan.banner}
                  alt={plan.name}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                {/* Gradient overlay bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
              </motion.div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${plan.tagColor}`}>{plan.tag}</p>
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {plan.popular
                      ? 'This plan includes all existing courses, plus upcoming courses for your selected duration.'
                      : 'All existing Strike courses with access for your selected duration.'}
                  </p>
                </div>

                {/* Duration selector inside card */}
                <div className="mb-4">
                  <p className="text-gray-600 text-xs uppercase tracking-wider mb-2">Select Duration</p>
                  <div className="flex gap-2">
                    {durations.map((d) => (
                      <button
                        key={d}
                        onClick={() => setActiveDuration(d)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          activeDuration === d
                            ? plan.popular
                              ? 'bg-yellow-500 text-black border-yellow-500'
                              : 'bg-white text-black border-white'
                            : 'text-gray-400 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {d} {d === '4 Years' ? <span className="opacity-60">Popular</span> : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-4xl font-black text-white">{plan.prices[activeDuration]}</span>
                    {plan.discounts[activeDuration] && (
                      <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${plan.discountBg}`}>
                        {plan.discounts[activeDuration]}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{activeDuration} · one-time · no renewals</p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.checkBg}`}>
                        <Check size={11} className={plan.checkColor} />
                      </div>
                      <span className="text-gray-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href={plan.link}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${plan.btnClass}`}
                >
                  Get {plan.name} →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-sm mt-6">Prices inclusive of GST · One-time payment · No renewals</p>
      </div>
    </section>
  )
}
