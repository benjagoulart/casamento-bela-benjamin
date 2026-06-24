'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos]         = useState({ x: -100, y: -100 })
  const [hoverLink, setHover] = useState(false)
  const [hoverPhoto, setPhoto] = useState(false)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Só desktop
    if (window.matchMedia('(max-width: 1024px)').matches) return

    document.body.style.cursor = 'none'
    setVisible(true)

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }))
    }

    const checkTarget = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHover(!!t.closest('a, button, [role="button"]'))
      setPhoto(!!t.closest('[data-photo]'))
    }

    window.addEventListener('mousemove', move,        { passive: true })
    window.addEventListener('mouseover', checkTarget, { passive: true })
    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', checkTarget)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Ponto central */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{ top: 0, left: 0, x: pos.x - 5, y: pos.y - 5, width: 10, height: 10 }}
        animate={{ scale: hoverLink ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        aria-hidden
      >
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: '#BA908B' }}
        />
      </motion.div>

      {/* Anel externo */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border"
        style={{ top: 0, left: 0 }}
        animate={{
          x: pos.x - (hoverLink ? 20 : 12),
          y: pos.y - (hoverLink ? 20 : 12),
          width:  hoverLink ? 40  : 24,
          height: hoverLink ? 40  : 24,
          borderColor: hoverPhoto ? '#80864F' : '#BA908B',
          backgroundColor: hoverLink ? 'rgba(186,144,139,0.08)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        aria-hidden
      />

      {/* Ícone florzinha em fotos */}
      {hoverPhoto && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{ top: 0, left: 0, x: pos.x + 14, y: pos.y - 22 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2.5" fill="#80864F"/>
            <ellipse cx="8"   cy="3"  rx="2" ry="3" fill="#80864F" opacity="0.6"/>
            <ellipse cx="8"   cy="13" rx="2" ry="3" fill="#80864F" opacity="0.6"/>
            <ellipse cx="3"   cy="8"  rx="3" ry="2" fill="#80864F" opacity="0.6"/>
            <ellipse cx="13"  cy="8"  rx="3" ry="2" fill="#80864F" opacity="0.6"/>
          </svg>
        </motion.div>
      )}
    </>
  )
}
