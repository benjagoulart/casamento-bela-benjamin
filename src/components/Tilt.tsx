'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  max?: number      // inclinação máxima em graus
  scale?: number    // zoom sutil no hover
  glare?: boolean   // reflexo de luz que acompanha o cursor
}

export default function Tilt({
  children,
  className = '',
  style = {},
  max = 7,
  scale = 1.02,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Só desktop com mouse de verdade, e respeitando reduced-motion
    if (
      window.matchMedia('(max-width: 1024px)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const glareEl = el.querySelector<HTMLDivElement>('.tilt-glare')
    let raf = 0

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5

        el.style.transform =
          `perspective(1100px) rotateX(${(-y * max * 2).toFixed(2)}deg) rotateY(${(x * max * 2).toFixed(2)}deg) scale3d(${scale},${scale},1)`
        el.style.boxShadow =
          `${(-x * 26).toFixed(0)}px ${(14 - y * 22).toFixed(0)}px 44px rgba(74,69,64,0.14)`

        if (glareEl) {
          const angle = Math.atan2(y, x) * (180 / Math.PI) + 90
          glareEl.style.background =
            `linear-gradient(${angle.toFixed(0)}deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 55%)`
          glareEl.style.opacity = String(Math.min(0.9, Math.hypot(x, y) * 1.4 + 0.08))
        }
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
      el.style.boxShadow = ''
      if (glareEl) glareEl.style.opacity = '0'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [max, scale])

  return (
    <div ref={ref} className={`tilt-root ${className}`} style={style}>
      {children}
      {glare && <div className="tilt-glare" aria-hidden />}
    </div>
  )
}
