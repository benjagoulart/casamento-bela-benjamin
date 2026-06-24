'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import FloralDecoration from './FloralDecoration'

export default function HeroSection() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const mouseLayerRef = useRef<HTMLDivElement>(null)

  // Scroll parallax — foto de fundo se move mais lento
  const { scrollY } = useScroll()
  const rawPhotoY   = useTransform(scrollY, [0, 600], [0, 120])
  const photoY      = useSpring(rawPhotoY, { stiffness: 60, damping: 20 })

  // Mouse parallax suave
  useEffect(() => {
    const layer = mouseLayerRef.current
    if (!layer) return
    let raf = 0

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const cx = window.innerWidth  / 2
        const cy = window.innerHeight / 2
        const dx = (e.clientX - cx) / cx
        const dy = (e.clientY - cy) / cy
        layer.style.transform = `translate(${dx * -10}px, ${dy * -7}px)`
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#F5EBE3', perspective: '1000px' }}
    >
      {/* ── CAMADA 0: Foto do casal (scroll parallax, z mais distante) ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: photoY }}
      >
        <Image
          src="/images/FOTO CASAL/foto-casal-1.jpeg"
          alt="Débora e Benjamin"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Vinheta para o texto ficar legível */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,235,227,0.55) 0%, rgba(245,235,227,0.7) 40%, rgba(245,235,227,0.88) 75%, #F5EBE3 100%)',
          }}
        />
      </motion.div>

      {/* Noise texture de papel de luxo */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── CAMADA 1: Florais (mouse parallax, z médio) ── */}
      <div
        ref={mouseLayerRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ transition: 'transform 0.12s linear', willChange: 'transform' }}
      >
        <FloralDecoration position="top-left"     size={260} delay={0}   className="top-0 left-0" />
        <FloralDecoration position="top-right"    size={260} delay={0.2} className="top-0 right-0" />
        <FloralDecoration position="bottom-left"  size={220} delay={0.1} className="bottom-0 left-0" />
        <FloralDecoration position="bottom-right" size={220} delay={0.3} className="bottom-0 right-0" />
      </div>

      {/* Borda elegante com cantos decorativos */}
      <div className="absolute pointer-events-none z-[3]" style={{ inset: '2.5rem', border: '1px solid rgba(212,203,199,0.7)' }} />
      {[
        'top-[2.5rem] left-[2.5rem]',
        'top-[2.5rem] right-[2.5rem] rotate-90',
        'bottom-[2.5rem] right-[2.5rem] rotate-180',
        'bottom-[2.5rem] left-[2.5rem] -rotate-90',
      ].map((pos, i) => (
        <div key={i} className={`absolute z-[3] pointer-events-none ${pos}`} style={{ width: 22, height: 22 }}>
          <svg viewBox="0 0 22 22" fill="none">
            <path d="M2 14 L2 2 L14 2" stroke="#BA908B" strokeWidth="0.9" opacity="0.7"/>
          </svg>
        </div>
      ))}

      {/* ── CAMADA 2: Conteúdo de texto (z frontal) ── */}
      <div className="relative z-[4] flex flex-col items-center text-center px-8 py-28 max-w-lg w-full">

        {/* Monograma flutuante */}
        <motion.div
          className="mb-5"
          style={{ mixBlendMode: 'multiply' }}
          animate={{ y: [0, -8, 0], rotateY: [0, 4, 0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/images/monograma.png"
            alt="Monograma B & D"
            width={120}
            height={146}
            className="object-contain"
            priority
            style={{ filter: 'drop-shadow(0 10px 28px rgba(186,144,139,0.22))' }}
          />
        </motion.div>

        {/* Linha rose */}
        <motion.div
          className="mb-4"
          style={{ height: 1, backgroundColor: '#BA908B', opacity: 0.85 }}
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Label shimmer */}
        <motion.p
          className="mb-6 shimmer-text"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.58rem', letterSpacing: '0.55em', textTransform: 'uppercase' }}
        >
          Save the Date
        </motion.p>

        {/* Nomes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontFamily: 'Pinyon Script, cursive', fontSize: 'clamp(3.8rem, 12vw, 6.5rem)', color: '#8E98A1', lineHeight: 0.95, textShadow: '2px 5px 16px rgba(142,152,161,0.25)' }}>
            Débora
          </p>
          <p className="mb-8" style={{ fontFamily: 'Pinyon Script, cursive', fontSize: 'clamp(3.8rem, 12vw, 6.5rem)', color: '#8E98A1', lineHeight: 0.95, textShadow: '2px 5px 16px rgba(142,152,161,0.25)' }}>
            & Benjamin
          </p>
        </motion.div>

        {/* Ornamento ◆ */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="h-px w-12" style={{ backgroundColor: '#D4CBC7' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.8 }} />
          <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: '#BA908B' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.8 }} />
          <div className="h-px w-12" style={{ backgroundColor: '#D4CBC7' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500, fontSize: 'clamp(0.65rem, 2vw, 0.82rem)', letterSpacing: '0.44em', textTransform: 'uppercase', color: '#BA908B' }}>
            27 de Março de 2027
          </p>
          <p className="mt-1.5" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.57rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8E98A1' }}>
            Sonho Dourado · Morro da Fumaça, SC
          </p>
        </motion.div>

        {/* Seta de scroll */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, #D4CBC7)' }} />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="#D4CBC7" strokeWidth="0.8"/>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
