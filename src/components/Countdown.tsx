'use client'

import { useEffect, useState } from 'react'

const TARGET = new Date('2027-03-27T16:00:00-03:00')

function calcTime() {
  const totalSeconds = Math.max(0, Math.floor((TARGET.getTime() - Date.now()) / 1000))
  return {
    dias:     Math.floor(totalSeconds / 86400),
    horas:    Math.floor((totalSeconds % 86400) / 3600),
    minutos:  Math.floor((totalSeconds % 3600) / 60),
    segundos: totalSeconds % 60,
  }
}

function Digit({ char }: { char: string }) {
  return (
    <span style={{ display: 'inline-block', perspective: '300px', overflow: 'hidden' }}>
      {/* key força remontagem quando o dígito muda → dispara o flip */}
      <span key={char} className="digit-flip">
        {char}
      </span>
    </span>
  )
}

function Unit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          background: 'linear-gradient(168deg, #F5EBE3 0%, #EFDCC3 100%)',
          border: '1px solid #D4CBC7',
          borderRadius: '8px',
          padding: '18px 22px',
          minWidth: '92px',
          textAlign: 'center',
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.85) inset, 0 -1px 0 rgba(186,144,139,0.12) inset, 0 6px 22px rgba(186,144,139,0.1)',
        }}
      >
        <div
          className="flex justify-center"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(2.6rem, 7vw, 4rem)',
            lineHeight: 1,
            color: '#8E98A1',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {str.split('').map((c, i) => <Digit key={i} char={c} />)}
        </div>
      </div>
      <span
        style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 300,
          fontSize: '0.55rem',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#BA908B',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(calcTime)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(calcTime())
    const id = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(id)
  }, [])

  // Reserva o espaço antes de montar para não haver salto de layout
  if (!mounted) return <div style={{ height: '148px' }} aria-hidden />

  const units = [
    { value: time.dias,     label: 'dias'    },
    { value: time.horas,    label: 'horas'   },
    { value: time.minutos,  label: 'minutos' },
    { value: time.segundos, label: 'segundos' },
  ]

  return (
    <div className="flex flex-wrap items-start justify-center gap-3 sm:gap-5">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-start gap-3 sm:gap-5">
          <Unit value={u.value} label={u.label} />
          {i < units.length - 1 && (
            <span
              className="hidden sm:block"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: '2.6rem',
                color: '#D4CBC7',
                lineHeight: 1,
                paddingTop: '22px',
              }}
            >
              ·
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
