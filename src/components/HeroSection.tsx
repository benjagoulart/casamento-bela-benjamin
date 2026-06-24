'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import FloralCorner from './FloralCorner'

export default function HeroSection() {
  const layerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onMove = (e: MouseEvent) => {
      if (!layerRef.current) return
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx  // -1 to 1
      const dy = (e.clientY - cy) / cy
      layerRef.current.style.transform = `translate(${dx * -12}px, ${dy * -8}px)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#F5EBE3' }}
    >
      {/* Noise texture overlay — dá textura de papel de luxo */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Gradiente radial central suave */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, #EFDCC3 0%, transparent 70%)',
          opacity: 0.4,
        }}
      />

      {/* Camada de florais — parallax no mouse */}
      <div
        ref={layerRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ transition: 'transform 0.08s linear', willChange: 'transform' }}
      >
        <FloralCorner position="top-left"     className="top-0 left-0"    size={300} />
        <FloralCorner position="top-right"    className="top-0 right-0"   size={300} />
        <FloralCorner position="bottom-left"  className="bottom-0 left-0" size={260} />
        <FloralCorner position="bottom-right" className="bottom-0 right-0" size={260} />
      </div>

      {/* Borda interna elegante com cantos cortados */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          inset: '2.5rem',
          border: '1px solid #D4CBC7',
          opacity: 0.65,
        }}
      />
      {/* Cantos decorativos da borda */}
      {[
        'top-[2.5rem] left-[2.5rem]',
        'top-[2.5rem] right-[2.5rem] rotate-90',
        'bottom-[2.5rem] right-[2.5rem] rotate-180',
        'bottom-[2.5rem] left-[2.5rem] -rotate-90',
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none z-10 ${pos}`}
          style={{ width: 20, height: 20 }}
        >
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M1 12 L1 1 L12 1" stroke="#BA908B" strokeWidth="0.8" opacity="0.6" />
          </svg>
        </div>
      ))}

      {/* Conteúdo central — 3D perspective */}
      <div
        className="relative z-20 flex flex-col items-center text-center px-8 py-28 max-w-lg w-full"
        style={{ perspective: '1200px' }}
      >
        {/* Monograma com efeito 3D flutuante */}
        <div
          className="mb-5"
          style={{
            mixBlendMode: 'multiply',
            animation: mounted ? 'float3d 6s ease-in-out infinite' : 'none',
            filter: 'drop-shadow(0 8px 24px rgba(186,144,139,0.18))',
          }}
        >
          <Image
            src="/images/monograma.png"
            alt="Monograma B & D"
            width={118}
            height={144}
            className="object-contain"
            priority
          />
        </div>

        {/* Linha rose */}
        <div className="w-10 h-px mb-4" style={{ backgroundColor: '#BA908B', opacity: 0.8 }} />

        {/* Label shimmer */}
        <p
          className="mb-6 shimmer-text"
          style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 400,
            fontSize: '0.58rem',
            letterSpacing: '0.55em',
            textTransform: 'uppercase',
            color: '#BA908B',
          }}
        >
          Save the Date
        </p>

        {/* Nomes — Pinyon Script com sombra de profundidade */}
        <div
          style={{
            animation: mounted ? 'fadeSlideUp 1.2s ease-out both' : 'none',
            animationDelay: '0.2s',
          }}
        >
          <p style={{
            fontFamily: 'Pinyon Script, cursive',
            fontSize: 'clamp(3.8rem, 12vw, 6.5rem)',
            color: '#8E98A1',
            lineHeight: 0.95,
            textShadow: '2px 4px 12px rgba(142,152,161,0.2)',
          }}>
            Débora
          </p>
          <p className="mb-8" style={{
            fontFamily: 'Pinyon Script, cursive',
            fontSize: 'clamp(3.8rem, 12vw, 6.5rem)',
            color: '#8E98A1',
            lineHeight: 0.95,
            textShadow: '2px 4px 12px rgba(142,152,161,0.2)',
          }}>
            & Benjamin
          </p>
        </div>

        {/* Ornamento ◆ */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12" style={{ backgroundColor: '#D4CBC7' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.8 }} />
          <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: '#BA908B', opacity: 0.9 }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.8 }} />
          <div className="h-px w-12" style={{ backgroundColor: '#D4CBC7' }} />
        </div>

        {/* Data */}
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 500,
          fontSize: 'clamp(0.65rem, 2vw, 0.82rem)',
          letterSpacing: '0.44em',
          textTransform: 'uppercase',
          color: '#BA908B',
        }}>
          27 de Março de 2027
        </p>

        {/* Local */}
        <p className="mt-1.5" style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 300,
          fontSize: '0.57rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#8E98A1',
        }}>
          Sonho Dourado · Morro da Fumaça, SC
        </p>

        {/* Ornamento inferior */}
        <div className="flex items-center gap-2 mt-5">
          <div className="h-px w-8" style={{ backgroundColor: '#D4CBC7' }} />
          <div className="w-1 h-1 rotate-45" style={{ backgroundColor: '#D4CBC7' }} />
          <div className="h-px w-8" style={{ backgroundColor: '#D4CBC7' }} />
        </div>
      </div>
    </section>
  )
}
