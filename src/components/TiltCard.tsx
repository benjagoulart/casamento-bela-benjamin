'use client'

import { useEffect, useRef } from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number
  scale?: number
  glare?: boolean
}

export default function TiltCard({
  children,
  className = '',
  style = {},
  maxTilt = 8,
  scale = 1.03,
  glare = true,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Desabilita em mobile / telas menores
    if (window.matchMedia('(max-width: 1024px)').matches) return

    let animFrame: number

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(animFrame)
      animFrame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width  - 0.5  // -0.5 to 0.5
        const y = (e.clientY - rect.top)  / rect.height - 0.5

        const tiltX = -y * maxTilt * 2
        const tiltY =  x * maxTilt * 2

        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale},${scale},${scale})`
        el.style.boxShadow = `${-x * 24}px ${-y * 24}px 40px rgba(142,152,161,0.18), 0 8px 30px rgba(0,0,0,0.08)`

        if (glare) {
          const glareEl = el.querySelector<HTMLDivElement>('.tilt-glare')
          if (glareEl) {
            const angle = Math.atan2(y, x) * (180 / Math.PI) + 180
            glareEl.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`
            glareEl.style.opacity = String(Math.max(0, (x + y) * 0.4 + 0.05))
          }
        }
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(animFrame)
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
      el.style.boxShadow = ''
      const glareEl = el.querySelector<HTMLDivElement>('.tilt-glare')
      if (glareEl) glareEl.style.opacity = '0'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(animFrame)
    }
  }, [maxTilt, scale, glare])

  return (
    <div
      ref={ref}
      className={className}
      {...rest}
      style={{
        ...style,
        transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
      {glare && (
        <div
          className="tilt-glare pointer-events-none absolute inset-0 opacity-0 rounded-[inherit]"
          style={{ transition: 'opacity 0.2s', zIndex: 2 }}
        />
      )}
    </div>
  )
}
