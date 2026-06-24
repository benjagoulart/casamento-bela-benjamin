'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WEDDING = new Date('2027-03-27T16:00:00-03:00')

function calcTime() {
  const diff = WEDDING.getTime() - Date.now()
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 }
  return {
    dias:     Math.floor(diff / 86400000),
    horas:    Math.floor((diff / 3600000) % 24),
    minutos:  Math.floor((diff / 60000)  % 60),
    segundos: Math.floor((diff / 1000)   % 60),
  }
}

function FlipDigit({ digit }: { digit: string }) {
  return (
    <div style={{ overflow: 'hidden', height: '1.05em', perspective: '400px', display: 'inline-block' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={digit}
          initial={{ rotateX: 90, opacity: 0, y: '-10%' }}
          animate={{ rotateX: 0, opacity: 1, y: '0%' }}
          exit={{ rotateX: -90, opacity: 0, y: '10%' }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          style={{
            display: 'block',
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
            lineHeight: 1,
            color: '#4a4540',
          }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function DigitCard({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, '0')
  const [d1, d2] = str.split('')

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          background: 'linear-gradient(160deg, #EFDCC3 0%, #F5EBE3 60%, #EAE0D4 100%)',
          border: '1px solid #D4CBC7',
          borderRadius: '3px',
          padding: '12px 20px',
          boxShadow: '0 4px 20px rgba(186,144,139,0.12), 0 1px 0 rgba(255,255,255,0.8) inset, 0 -1px 0 rgba(186,144,139,0.1) inset',
          minWidth: '90px',
          textAlign: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Linha decorativa topo */}
        <div className="flex justify-center mb-2">
          <div style={{ width: 20, height: 1, backgroundColor: '#D4CBC7' }} />
        </div>

        {/* Dígitos com flip individual */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1px', lineHeight: 1 }}>
          <FlipDigit digit={d1} />
          <FlipDigit digit={d2} />
        </div>

        {/* Linha separadora */}
        <div style={{ height: 1, backgroundColor: '#D4CBC7', margin: '8px 0 6px', opacity: 0.6 }} />

        {/* Label */}
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 300,
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#8E98A1',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(calcTime())
    const id = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  const units = [
    { value: time.dias,     label: 'dias'     },
    { value: time.horas,    label: 'horas'    },
    { value: time.minutos,  label: 'minutos'  },
    { value: time.segundos, label: 'segundos' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3 sm:gap-5">
          <DigitCard value={u.value} label={u.label} />
          {i < units.length - 1 && (
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              color: '#D4CBC7',
              lineHeight: 1,
              marginBottom: '1.4rem',
            }}>
              ·
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
