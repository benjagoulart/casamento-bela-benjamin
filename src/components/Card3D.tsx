'use client'

import { useRef } from 'react'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  intensity?: number
}

export default function Card3D({ children, className = '', style = {}, intensity = 12 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5
    const y = (e.clientY - top)  / height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * (intensity * 0.7)}deg) translateZ(10px)`
    el.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(142,152,161,0.15), 0 8px 32px rgba(142,152,161,0.08)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)'
    el.style.boxShadow = ''
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out', transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
