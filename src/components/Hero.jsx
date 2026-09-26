import { motion } from 'framer-motion'
import { ArrowRight, Trophy, FolderGit2, Users, Volume2, VolumeX } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const journey = [
  { icon: '📖', label: 'Learn',   sub: 'DSA · System Design · AI',   color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/8' },
  { icon: '🛠️', label: 'Build',   sub: 'Real projects · Portfolio',  color: 'text-blue-400',   border: 'border-blue-500/30',   bg: 'bg-blue-500/8'   },
  { icon: '🏆', label: 'Compete', sub: 'Hackathons · Cash Prizes',   color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/8' },
]

const highlights = [
  { icon: <Trophy    size={14} className="text-yellow-400" />, title: 'Weekly Hackathons',   sub: 'Cash Prizes'       },
  { icon: <FolderGit2 size={14} className="text-blue-400"  />, title: 'Build Real Projects', sub: 'Learn by doing'    },
  { icon: <Users     size={14} className="text-purple-400" />, title: 'Guidance & Community',sub: 'IIT mentors + peers'},
]

export default function Hero() {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)

  // Autoplay muted
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const play = () => v.play().catch(() => {})
    if (v.readyState >= 3) { play() }
    else { v.addEventListener('canplay', play, { once: true }) }
    return () => v.removeEventListener('canplay', play)
  }, [])

  // Pause when hero scrolls out of view
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        if (!v) return
        if (entry.isIntersecting) {
          v.play().catch(() => {})
          setPlaying(true)
        } else {
          v.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play().catch(() => {}); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── LEFT — existing hero content ── */}
          <div className="flex-1 min-w-0 text-center lg:text-left">

            {/* Hackathon badge */}
            <motion.button
              onClick={() => document.getElementById('hackathon')?.scrollIntoView({ behavior: 'smooth' })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(234,179,8,0.4)' }}
              className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 cursor-pointer transition-all"
            >
              <span className="text-sm">🏆</span>
              <span className="text-yellow-300 text-sm font-semibold">Weekly Hackathons</span>
              <span className="text-yellow-600 text-sm">•</span>
              <span className="text-yellow-400/80 text-sm font-medium">Cash Prizes</span>
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-yellow-400 ml-1"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
            </motion.button>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5"
            >
              Take control of your
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600 bg-clip-text text-transparent">
                Future With Strike
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-7 leading-relaxed"
            >
              Master DSA, System Design &amp; AI. Build real projects.
              Compete in hackathons with IIT mentors by your side.
            </motion.p>

            {/* Learn → Build → Compete */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-6 flex-wrap"
            >
              {journey.map((j, i) => (
                <div key={j.label} className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.06, y: -2 }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${j.border} ${j.bg} backdrop-blur-sm`}
                  >
                    <span className="text-lg">{j.icon}</span>
                    <div className="text-left">
                      <div className={`text-sm font-bold ${j.color}`}>{j.label}</div>
                      <div className="text-gray-500 text-xs leading-none mt-0.5">{j.sub}</div>
                    </div>
                  </motion.div>
                  {i < journey.length - 1 && (
                    <ArrowRight size={14} className="text-gray-600 flex-shrink-0" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Highlight pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-8"
            >
              {highlights.map((h) => (
                <motion.div
                  key={h.title}
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center gap-2.5 bg-white/4 border border-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5"
                >
                  {h.icon}
                  <div className="text-left">
                    <div className="text-white text-xs font-semibold leading-none">{h.title}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{h.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="https://strikes.in"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105 active:scale-95"
              >
                Join Us <ArrowRight size={18} />
              </a>
              <a
                href="#courses"
                onClick={e => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="flex items-center gap-2 border border-white/20 hover:border-purple-500/50 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:bg-white/5"
              >
                Explore Courses
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT — video ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="w-full lg:w-[42%] flex-shrink-0 hidden sm:flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full rounded-2xl overflow-hidden cursor-default"
              style={{
                boxShadow: `
                  0 0 0 1px rgba(139,92,246,0.25),
                  0 0 30px rgba(139,92,246,0.18),
                  0 0 60px rgba(139,92,246,0.08),
                  0 20px 60px rgba(0,0,0,0.6)
                `,
                border: '1px solid rgba(139,92,246,0.3)',
              }}
            >
              {/* Subtle top glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)' }}
              />

              {/* Video */}
              <video
                ref={videoRef}
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-auto block rounded-2xl"
                style={{ display: 'block', maxHeight: '420px', objectFit: 'cover' }}
              />

              {/* Bottom row — label + controls */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span
                  className="text-white/60 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  Build. Compete. Repeat.
                </span>

                <div className="flex items-center gap-2">
                  {/* Play / Pause */}
                  <motion.button
                    onClick={togglePlay}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-7 h-7 rounded-full transition-all"
                    style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
                    title={playing ? 'Pause' : 'Play'}
                  >
                    {playing
                      ? <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor"><rect x="1" y="0" width="3.5" height="11" rx="1"/><rect x="6.5" y="0" width="3.5" height="11" rx="1"/></svg>
                      : <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor"><polygon points="0,0 11,5.5 0,11"/></svg>
                    }
                  </motion.button>

                  {/* Mute / Unmute */}
                  <motion.button
                    onClick={toggleMute}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                    style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)', color: muted ? 'rgba(255,255,255,0.5)' : '#a78bfa' }}
                    title={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted
                      ? <><VolumeX size={13} /><span>Unmute</span></>
                      : <><Volume2 size={13} /><span>Mute</span></>
                    }
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-purple-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
