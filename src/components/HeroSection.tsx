'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const photoRef   = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Parallax em camadas: foto acompanha o mouse/scroll, conteúdo reage ao contrário.
  useEffect(() => {
    if (
      window.matchMedia('(max-width: 1024px)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const photo = photoRef.current
    const content = contentRef.current
    if (!photo || !content) return

    let mx = 0, my = 0, sy = 0
    let raf = 0

    const render = () => {
      photo.style.transform   = `translate3d(${mx * 16}px, ${my * 12 + sy * 0.14}px, 0)`
      content.style.transform = `translate3d(${mx * -8}px, ${my * -6 + sy * -0.05}px, 0)`
    }
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
      schedule()
    }
    const onScroll = () => {
      sy = Math.min(window.scrollY, window.innerHeight)
      schedule()
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#F5EBE3' }}
    >
      {/* ── Camada 1 · foto do casal com Ken Burns ── */}
      <div ref={photoRef} className="absolute will-change-transform" style={{ inset: '-4%' }}>
        <div className="hero-photo absolute inset-0">
          <Image
            src="/images/FOTO CASAL/foto-casal-1.jpeg"
            alt="Débora e Benjamin"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* ── Véu de luz ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,235,227,0.5) 0%, rgba(245,235,227,0.62) 45%, rgba(245,235,227,0.82) 78%, #F5EBE3 100%)',
          animation: 'heroVeilIn 1.4s ease both',
        }}
      />

      {/* ── Grão de papel ── */}
      <div className="grain" />

      {/* ── Moldura de convite ── */}
      <div
        className="absolute pointer-events-none z-[2]"
        style={{ inset: 'clamp(1.25rem, 3.5vw, 2.75rem)', border: '1px solid rgba(212,203,199,0.65)' }}
      />
      {[
        'top-[clamp(1.25rem,3.5vw,2.75rem)] left-[clamp(1.25rem,3.5vw,2.75rem)]',
        'top-[clamp(1.25rem,3.5vw,2.75rem)] right-[clamp(1.25rem,3.5vw,2.75rem)] rotate-90',
        'bottom-[clamp(1.25rem,3.5vw,2.75rem)] right-[clamp(1.25rem,3.5vw,2.75rem)] rotate-180',
        'bottom-[clamp(1.25rem,3.5vw,2.75rem)] left-[clamp(1.25rem,3.5vw,2.75rem)] -rotate-90',
      ].map((pos, i) => (
        <div key={i} className={`absolute z-[2] pointer-events-none ${pos}`} style={{ width: 22, height: 22 }}>
          <svg viewBox="0 0 22 22" fill="none">
            <path d="M2 14 L2 2 L14 2" stroke="#BA908B" strokeWidth="0.9" opacity="0.7" />
          </svg>
        </div>
      ))}

      {/* ── Camada 2 · conteúdo ── */}
      <div
        ref={contentRef}
        className="relative z-[3] flex flex-col items-center text-center px-8 py-32 will-change-transform"
      >
        {/* Monograma flutuante */}
        <div className="hero-rise" style={{ animationDelay: '0.1s' }}>
          <div className="float-soft" style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/images/monograma.png"
              alt="Monograma B & D"
              width={104}
              height={127}
              className="object-contain"
              priority
              style={{ filter: 'drop-shadow(0 12px 26px rgba(142,152,161,0.28))' }}
            />
          </div>
        </div>

        {/* Linha que cresce */}
        <div className="hero-line mt-6 mb-5" style={{ width: 44, height: 1, backgroundColor: '#BA908B' }} />

        <p
          className="hero-rise mb-7"
          style={{
            animationDelay: '0.35s',
            fontFamily: 'Jost, sans-serif',
            fontWeight: 300,
            fontSize: '0.58rem',
            letterSpacing: '0.6em',
            textTransform: 'uppercase',
            color: '#BA908B',
          }}
        >
          Save the Date
        </p>

        {/* Nomes */}
        <h1
          className="hero-rise"
          style={{
            animationDelay: '0.5s',
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(3rem, 9vw, 6.5rem)',
            color: '#8E98A1',
            lineHeight: 1.04,
            textShadow: '0 3px 24px rgba(245,235,227,0.9)',
          }}
        >
          Débora{' '}
          <span style={{ color: '#BA908B', fontSize: '0.72em' }}>&amp;</span>{' '}
          Benjamin
        </h1>

        {/* Ornamento */}
        <div className="hero-rise flex items-center gap-3 mt-9 mb-5" style={{ animationDelay: '0.7s' }}>
          <div className="h-px w-14" style={{ backgroundColor: '#D4CBC7' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.75 }} />
          <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: '#BA908B' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.75 }} />
          <div className="h-px w-14" style={{ backgroundColor: '#D4CBC7' }} />
        </div>

        <div className="hero-rise" style={{ animationDelay: '0.82s' }}>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 400,
              fontSize: 'clamp(0.72rem, 2vw, 0.95rem)',
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: '#BA908B',
            }}
          >
            27 de Março de 2027
          </p>
          <p
            className="mt-2"
            style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#8E98A1',
            }}
          >
            Sonho Dourado · Morro da Fumaça, SC
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-rise flex flex-wrap items-center justify-center gap-3 mt-10" style={{ animationDelay: '0.95s' }}>
          <Link href="/nossa-historia" className="btn-rose">Nossa História</Link>
          <Link href="/cerimonia" className="btn-ghost">A Cerimônia</Link>
        </div>

        {/* Fio de scroll */}
        <div className="hero-rise mt-14 flex flex-col items-center gap-2" style={{ animationDelay: '1.2s' }}>
          <div className="float-soft flex flex-col items-center gap-2">
            <div className="w-px h-9" style={{ background: 'linear-gradient(to bottom, transparent, #BA908B)' }} />
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#BA908B" strokeWidth="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
