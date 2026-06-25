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

function Block({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          backgroundColor: '#EFDCC3',
          border: '1px solid #D4CBC7',
          borderRadius: '8px',
          padding: '20px 24px',
          minWidth: '88px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(2.6rem, 7vw, 4rem)',
            lineHeight: 1,
            color: '#8E98A1',
            display: 'block',
          }}
        >
          {str}
        </span>
      </div>
      <span
        style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 300,
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#D4CBC7',
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
    const id = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  const units = [
    { value: time.dias,     label: 'dias'    },
    { value: time.horas,    label: 'horas'   },
    { value: time.minutos,  label: 'minutos' },
    { value: time.segundos, label: 'seg'     },
  ]

  return (
    <div className="flex flex-wrap items-start justify-center gap-3 sm:gap-6">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-start gap-3 sm:gap-6">
          <Block value={u.value} label={u.label} />
          {i < units.length - 1 && (
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                color: '#D4CBC7',
                lineHeight: 1,
                paddingTop: '20px',
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
