'use client'

import { useEffect, useState } from 'react'

const PETALS = [
  { id: 0,  x: '8%',  delay: '0s',   duration: '12s', size: 18, rot: 20 },
  { id: 1,  x: '18%', delay: '3s',   duration: '9s',  size: 14, rot: -15 },
  { id: 2,  x: '32%', delay: '6s',   duration: '14s', size: 20, rot: 35 },
  { id: 3,  x: '47%', delay: '1.5s', duration: '11s', size: 12, rot: -25 },
  { id: 4,  x: '61%', delay: '8s',   duration: '10s', size: 16, rot: 10 },
  { id: 5,  x: '74%', delay: '4s',   duration: '13s', size: 22, rot: -40 },
  { id: 6,  x: '85%', delay: '2s',   duration: '8s',  size: 15, rot: 50 },
  { id: 7,  x: '93%', delay: '7s',   duration: '15s', size: 11, rot: -10 },
]

function PetalSvg({ size, rot }: { size: number; rot: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 20 30" fill="none" style={{ transform: `rotate(${rot}deg)` }}>
      <path
        d="M10 2 C6 8, 2 14, 4 20 C6 26, 14 26, 16 20 C18 14, 14 8, 10 2Z"
        fill="#BA908B"
        opacity="0.45"
      />
      <path d="M10 2 C10 10, 10 18, 10 26" stroke="#F5EBE3" strokeWidth="0.5" opacity="0.5"/>
    </svg>
  )
}

export default function PetalParticles() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = window.matchMedia('(max-width: 768px)')
    if (!mq.matches && !mobile.matches) setShow(true)
  }, [])

  if (!show) return null

  return (
    <>
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(-40px) translateX(0px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.5; }
          80%  { opacity: 0.35; }
          100% { transform: translateY(100vh) translateX(40px) rotate(180deg); opacity: 0; }
        }
        @keyframes petalSway {
          0%, 100% { margin-left: 0; }
          50%       { margin-left: 18px; }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-30" aria-hidden>
        {PETALS.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              top: '-40px',
              left: p.x,
              animation: `petalFall ${p.duration} ${p.delay} linear infinite, petalSway ${parseFloat(p.duration) * 0.6}s ${p.delay} ease-in-out infinite`,
            }}
          >
            <PetalSvg size={p.size} rot={p.rot} />
          </div>
        ))}
      </div>
    </>
  )
}
