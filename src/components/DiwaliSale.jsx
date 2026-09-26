import { useState, useEffect, useRef, useCallback } from 'react'
import React from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { X, Copy, Check, Flame } from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────
const SALE_END_KEY = 'strike_diwali_end'

const DIWALI_COURSES = [
  {
    name: 'Strike Ultra (4 Years)',
    discount: '25% OFF',
    original: '₹24,999',
    discounted: '₹18,749',
    coupon: 'STRIKE-DIWALI25',
    link: 'https://strikes.in/membership/ultra?duration=4%20Years&price=13499',
  },
  {
    name: 'Strike Plus (4 Years)',
    discount: '20% OFF',
    original: '₹12,499',
    discounted: '₹9,999',
    coupon: 'PLUS-DIWALI20',
    link: 'https://strikes.in/membership/plus?duration=4%20Years&price=12499',
  },
]

// ─── Timer helpers ────────────────────────────────────────────────────────────
function getOrCreateEndTime() {
  const stored = localStorage.getItem(SALE_END_KEY)
  if (stored) {
    const ts = parseInt(stored, 10)
    if (ts > Date.now()) return ts
    return null
  }
  const end = Date.now() + 5 * 24 * 60 * 60 * 1000
  localStorage.setItem(SALE_END_KEY, String(end))
  return end
}

function getTimeLeft(endTs) {
  const diff = endTs - Date.now()
  if (diff <= 0) return null
  return {
    days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins:  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs:  Math.floor((diff % (1000 * 60)) / 1000),
  }
}

// ─── Sparks — static so Math.random() runs ONCE at module load ───────────────
const SPARK_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 1,
  size: Math.random() * 8 + 4,
  xDrift: (Math.random() - 0.5) * 60,
  dur: 1.5 + Math.random(),
  repeatDelay: Math.random() * 2,
}))

function Sparks() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {SPARK_DATA.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-yellow-400"
          style={{ left: `${s.x}%`, bottom: 0, width: s.size, height: s.size }}
          animate={{ y: [-20, -200], opacity: [1, 0], x: [0, s.xDrift] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, repeatDelay: s.repeatDelay }}
        />
      ))}
    </div>
  )
}

// ─── TimeBlock ────────────────────────────────────────────────────────────────
function TimeBlock({ val, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black/50 border border-orange-500/30 rounded-xl w-14 h-14 flex items-center justify-center">
        <span className="text-2xl font-black text-white tabular-nums">
          {String(val).padStart(2, '0')}
        </span>
      </div>
      <span className="text-orange-300/60 text-xs mt-1">{label}</span>
    </div>
  )
}

// ─── Countdown — isolated so only this re-renders every second ───────────────
const Countdown = React.memo(function Countdown({ endTs }) {
  const [timeLeft, setTimeLeft] = useState(() => endTs ? getTimeLeft(endTs) : null)

  useEffect(() => {
    if (!endTs) return
    const id = setInterval(() => {
      const tl = getTimeLeft(endTs)
      setTimeLeft(tl)
      if (!tl) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [endTs])

  if (!timeLeft) {
    return (
      <div className="text-center">
        <p className="text-red-400 font-bold text-lg">⏰ Offer Expired</p>
        <p className="text-gray-500 text-sm mt-1">This coupon is no longer valid.</p>
      </div>
    )
  }
  return (
    <>
      <p className="text-center text-orange-300 text-xs font-semibold mb-3 uppercase tracking-wider">Offer ends in</p>
      <div className="flex items-center justify-center gap-3">
        <TimeBlock val={timeLeft.days}  label="days" />
        <span className="text-orange-400 font-black text-xl mb-4">:</span>
        <TimeBlock val={timeLeft.hours} label="hrs"  />
        <span className="text-orange-400 font-black text-xl mb-4">:</span>
        <TimeBlock val={timeLeft.mins}  label="min"  />
        <span className="text-orange-400 font-black text-xl mb-4">:</span>
        <TimeBlock val={timeLeft.secs}  label="sec"  />
      </div>
    </>
  )
})

// ─── Main component ───────────────────────────────────────────────────────────
export default function DiwaliSale({ show, onClose }) {
  const [divaPhase, setDivaPhase] = useState('idle')
  const [offerOpen, setOfferOpen] = useState(false)
  const [endTs,     setEndTs]     = useState(null)
  const [copied,    setCopied]    = useState(false)
  const [courseIdx, setCourseIdx] = useState(0)
  const controls     = useAnimation()
  const hasAnimated  = useRef(false)

  const activeCourse = DIWALI_COURSES[courseIdx]
  const isExpired    = !endTs || endTs <= Date.now()

  // Init endTs once
  useEffect(() => {
    setEndTs(getOrCreateEndTime())
  }, [])

  // Diya attention animation — runs once 2s after mount
  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    const run = async () => {
      await new Promise(r => setTimeout(r, 2000))
      setDivaPhase('grow')
      await new Promise(r => setTimeout(r, 600))
      setDivaPhase('shake')
      await controls.start({
        rotate: [0, -12, 12, -10, 10, -6, 6, -3, 3, 0],
        transition: { duration: 0.7, ease: 'easeInOut' },
      })
      setDivaPhase('shrink')
      await new Promise(r => setTimeout(r, 500))
      setDivaPhase('settled')
    }
    run()
  }, [controls])

  // External trigger (chatbot)
  useEffect(() => {
    setOfferOpen(show)
  }, [show])

  const handleDiyaClick = useCallback(() => setOfferOpen(true), [])
  const handleClose = useCallback(() => {
    setOfferOpen(false)
    onClose?.()
  }, [onClose])

  const copyCoupon = useCallback(() => {
    navigator.clipboard.writeText(activeCourse.coupon).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }, [activeCourse.coupon])

  const divaVariants = {
    idle:    { scale: 1, x: 0, y: 0, zIndex: 40, filter: 'drop-shadow(0 0 8px rgba(251,146,60,0.5))' },
    grow:    { scale: 7, x: 0, y: 0, zIndex: 60, filter: 'drop-shadow(0 0 40px rgba(251,146,60,0.9))', transition: { type: 'spring', stiffness: 200, damping: 18 } },
    shake:   { scale: 7, x: 0, y: 0, zIndex: 60, filter: 'drop-shadow(0 0 50px rgba(251,146,60,1))' },
    shrink:  { scale: 1, x: 0, y: 0, zIndex: 40, filter: 'drop-shadow(0 0 12px rgba(251,146,60,0.7))', transition: { type: 'spring', stiffness: 180, damping: 22 } },
    settled: { scale: 1, x: 0, y: 0, zIndex: 40, filter: 'drop-shadow(0 0 12px rgba(251,146,60,0.7))' },
  }

  const isLarge = divaPhase === 'grow' || divaPhase === 'shake'

  return (
    <>
      {/* Backdrop when diya is large */}
      <AnimatePresence>
        {isLarge && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* THE DIYA */}
      <motion.button
        onClick={handleDiyaClick}
        className="fixed bottom-24 right-6 flex flex-col items-center gap-1 origin-bottom-right"
        style={{ zIndex: isLarge ? 60 : 40 }}
        variants={divaVariants}
        animate={divaPhase}
        initial="idle"
        title="STRIKE Diwali Drop 🪔"
        aria-label="Open Diwali offer"
      >
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={isLarge
            ? { boxShadow: ['0 0 30px 10px rgba(251,146,60,0.6)', '0 0 60px 20px rgba(251,146,60,0.3)', '0 0 30px 10px rgba(251,146,60,0.6)'] }
            : { boxShadow: ['0 0 8px 2px rgba(251,146,60,0.3)', '0 0 18px 6px rgba(251,146,60,0.15)', '0 0 8px 2px rgba(251,146,60,0.3)'] }
          }
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <motion.div
          animate={controls}
          className={`rounded-full flex items-center justify-center transition-colors duration-300 ${
            isLarge ? 'w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500'
            : divaPhase === 'settled' ? 'w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 shadow-[0_0_20px_rgba(251,146,60,0.8)]'
            : 'w-12 h-12 bg-white/10 hover:bg-white/15'
          }`}
        >
          <span className="text-2xl select-none">🪔</span>
        </motion.div>

        <AnimatePresence>
          {(divaPhase === 'settled' || divaPhase === 'idle') && (
            <motion.span
              key="label"
              className="text-orange-400 text-xs font-semibold"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
            >
              tap me
            </motion.span>
          )}
        </AnimatePresence>

        {(divaPhase === 'settled' || divaPhase === 'idle') && (
          <motion.div
            className="absolute inset-0 rounded-full bg-orange-400/20 pointer-events-none"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
      </motion.button>

      {/* OFFER MODAL */}
      <AnimatePresence>
        {offerOpen && (
          <motion.div
            key="offer-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-gradient-to-b from-orange-950 to-zinc-900 border border-orange-500/40 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
            >
              <Sparks />

              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all"
                aria-label="Close offer"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="relative z-10 text-center pt-8 pb-4 px-6">
                <div className="text-5xl mb-3">🪔</div>
                <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-3 py-1 mb-3">
                  <Flame size={12} className="text-orange-400" />
                  <span className="text-orange-300 text-xs font-bold uppercase tracking-widest">STRIKE DIWALI DROP</span>
                </div>
                <h2 className="text-3xl font-black text-white">
                  <span className="shimmer-text">{activeCourse.discount}</span>
                </h2>

                {/* Course switcher */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                    onClick={() => { setCourseIdx(i => (i - 1 + DIWALI_COURSES.length) % DIWALI_COURSES.length); setCopied(false) }}
                    className="w-6 h-6 rounded-full bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 flex items-center justify-center text-xs transition-all"
                    aria-label="Previous course"
                  >‹</button>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={courseIdx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 text-sm px-1"
                    >
                      {activeCourse.name}
                    </motion.p>
                  </AnimatePresence>
                  <button
                    onClick={() => { setCourseIdx(i => (i + 1) % DIWALI_COURSES.length); setCopied(false) }}
                    className="w-6 h-6 rounded-full bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 flex items-center justify-center text-xs transition-all"
                    aria-label="Next course"
                  >›</button>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {DIWALI_COURSES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCourseIdx(i); setCopied(false) }}
                      className={`rounded-full transition-all ${i === courseIdx ? 'w-4 h-1.5 bg-orange-400' : 'w-1.5 h-1.5 bg-orange-500/30'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="relative z-10 flex items-center justify-center gap-4 pb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`price-${courseIdx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-gray-600 line-through text-lg">{activeCourse.original}</span>
                    <span className="text-3xl font-black text-white">{activeCourse.discounted}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Countdown — isolated component, only it re-renders every second */}
              <div className="relative z-10 bg-black/30 mx-4 rounded-2xl px-4 py-4 mb-4">
                <Countdown endTs={endTs} />
              </div>

              {/* Coupon */}
              {!isExpired && (
                <div className="relative z-10 mx-4 mb-4">
                  <div className="border-2 border-dashed border-orange-500/50 rounded-xl p-4 flex items-center justify-between bg-orange-950/30">
                    <div>
                      <p className="text-orange-400 text-xs font-semibold mb-0.5">COUPON CODE</p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`coupon-${courseIdx}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="text-white font-black text-lg tracking-widest"
                        >
                          {activeCourse.coupon}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    <motion.button
                      onClick={copyCoupon}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                        copied ? 'bg-green-600 text-white' : 'bg-orange-500 hover:bg-orange-400 text-white'
                      }`}
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="relative z-10 px-4 pb-6">
                {!isExpired ? (
                  <a
                    href={activeCourse.link}
                    className="block w-full text-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-black font-black py-4 rounded-2xl text-base transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/40"
                  >
                    🎇 Claim Diwali Offer Now
                  </a>
                ) : (
                  <button disabled className="block w-full text-center bg-gray-800 text-gray-600 font-black py-4 rounded-2xl text-base cursor-not-allowed">
                    Offer Expired
                  </button>
                )}
                <p className="text-gray-600 text-xs text-center mt-3">
                  Prices inclusive of GST · One-time payment
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
