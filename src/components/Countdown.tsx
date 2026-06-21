'use client'

import { useEffect, useState } from 'react'

const WEDDING_DATE = new Date('2027-03-27T16:00:00-03:00')

interface TimeLeft {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

function calcTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 }
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>({ dias: 0, horas: 0, minutos: 0, segundos: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(calcTimeLeft())
    const id = setInterval(() => setTime(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  const units: { value: number; label: string }[] = [
    { value: time.dias, label: 'dias' },
    { value: time.horas, label: 'horas' },
    { value: time.minutos, label: 'minutos' },
    { value: time.segundos, label: 'segundos' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center">
            <span
              className="text-6xl sm:text-8xl font-light leading-none text-[#4a4540]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {String(unit.value).padStart(2, '0')}
            </span>
            <span
              className="text-xs tracking-[0.25em] uppercase text-[#8E98A1] mt-2"
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
            >
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className="text-4xl sm:text-6xl font-light text-[#D4CBC7] pb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              ·
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
