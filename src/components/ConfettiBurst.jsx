import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLORS = [
  '#f59e0b', '#eab308', '#a855f7', '#8b5cf6',
  '#3b82f6', '#06b6d4', '#10b981', '#ef4444',
  '#f97316', '#ec4899', '#ffffff', '#fbbf24',
]

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function generatePieces(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),       // % from left
    side: i % 2 === 0 ? 'left' : 'right',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: randomBetween(6, 14),
    delay: randomBetween(0, 0.6),
    duration: randomBetween(1.8, 3.2),
    rotate: randomBetween(0, 360),
    rotateEnd: randomBetween(360, 1080),
    xDrift: randomBetween(-80, 80),
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
  }))
}

export default function ConfettiBurst({ active }) {
  const [pieces] = useState(() => generatePieces(90))

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: p.side === 'left' ? '0%' : '0%',
                width: p.shape === 'rect' ? p.size : p.size,
                height: p.shape === 'rect' ? p.size * 0.4 : p.size,
                backgroundColor: p.color,
                borderRadius: p.shape === 'circle' ? '50%' : '2px',
              }}
              initial={{
                y: -20,
                x: p.side === 'left' ? -60 : 60,
                opacity: 1,
                rotate: p.rotate,
                scale: 0,
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [
                  p.side === 'left' ? -60 : 60,
                  p.xDrift,
                  p.xDrift * 0.5,
                ],
                opacity: [0, 1, 1, 1, 0],
                rotate: [p.rotate, p.rotateEnd],
                scale: [0, 1, 1, 0.8],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'easeIn',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
