import Image from 'next/image'
import Link from 'next/link'
import FloralDivider from './FloralDivider'

export default function HeroSection() {
  return (
    <section
      className="hero-parallax relative min-h-screen flex items-center justify-center"
    >
      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(245,235,227,0.55) 0%, rgba(245,235,227,0.72) 60%, rgba(245,235,227,0.90) 100%)',
        }}
      />

      {/* Borda interna elegante */}
      <div
        className="absolute pointer-events-none"
        style={{ inset: '2.5rem', border: '1px solid rgba(212,203,199,0.6)' }}
      />
      {/* Cantos decorativos */}
      {[
        { cls: 'top-10 left-10' },
        { cls: 'top-10 right-10',    rot: 'rotate-90' },
        { cls: 'bottom-10 right-10', rot: 'rotate-180' },
        { cls: 'bottom-10 left-10',  rot: '-rotate-90' },
      ].map(({ cls, rot = '' }, i) => (
        <div key={i} className={`absolute pointer-events-none ${cls} ${rot}`} style={{ width: 20, height: 20 }}>
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M2 13 L2 2 L13 2" stroke="#BA908B" strokeWidth="0.8" opacity="0.65"/>
          </svg>
        </div>
      ))}

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-20">
        {/* Monograma */}
        <div className="mb-6" style={{ mixBlendMode: 'multiply' }}>
          <Image
            src="/images/monograma.png"
            alt="Monograma B & D"
            width={110}
            height={134}
            className="object-contain"
            priority
          />
        </div>

        {/* Linha decorativa */}
        <div className="w-10 h-px mb-6" style={{ backgroundColor: '#BA908B' }} />

        {/* Label */}
        <p
          className="mb-8"
          style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 300,
            fontSize: '0.58rem',
            letterSpacing: '0.55em',
            textTransform: 'uppercase',
            color: '#BA908B',
          }}
        >
          Save the Date
        </p>

        {/* Nomes */}
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            color: '#8E98A1',
            lineHeight: 1.05,
            letterSpacing: '0.01em',
          }}
        >
          Débora &amp; Benjamin
        </h1>

        <FloralDivider />

        {/* Data */}
        <p
          className="mt-2"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 400,
            fontSize: 'clamp(0.7rem, 2vw, 0.95rem)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: '#BA908B',
          }}
        >
          27 de Março de 2027
        </p>
        <p
          className="mt-2 mb-10"
          style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 300,
            fontSize: '0.58rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#8E98A1',
          }}
        >
          Sonho Dourado · Morro da Fumaça, SC
        </p>

        {/* CTA */}
        <Link href="/confirmar" className="btn-rose">
          Confirmar Presença
        </Link>

        {/* Seta scroll */}
        <div className="mt-14 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, #D4CBC7)' }} />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="#D4CBC7" strokeWidth="0.8"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
