import Image from 'next/image'
import Link from 'next/link'
import FloralCorner from '@/components/FloralCorner'
import AnimatedSection from '@/components/AnimatedSection'
import Countdown from '@/components/Countdown'

const previewCards = [
  { href: '/nossa-historia', title: 'Nossa História',     description: 'De uma primeira conversa ao grande dia — conheça nossa jornada.' },
  { href: '/cerimonia',      title: 'Cerimônia',          description: '27 de Março de 2027 · 16h · Sonho Dourado, Morro da Fumaça - SC.' },
  { href: '/presentes',      title: 'Lista de Presentes', description: 'Escolha um presente especial para celebrar conosco.' },
  { href: '/confirmar',      title: 'Confirmar Presença', description: 'Confirme sua presença e nos ajude a planejar este dia.' },
  { href: '/galeria',        title: 'Galeria',            description: 'Em breve, fotos e memórias deste momento único.' },
  { href: '/hospedagem',     title: 'Hospedagem',         description: 'Sugestões de hospedagem próximas ao local do evento.' },
]

// Ornamento de linha+diamante reutilizável
function Ornament({ width = 48 }: { width?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px" style={{ width, backgroundColor: '#D4CBC7' }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.7 }} />
      <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: '#BA908B', opacity: 0.8 }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.7 }} />
      <div className="h-px" style={{ width, backgroundColor: '#D4CBC7' }} />
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO — fullscreen, estilo Save the Date
      ══════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#F5EBE3' }}
      >
        {/* Florais botânicos nos quatro cantos */}
        <FloralCorner position="top-left"     className="top-0 left-0"    size={280} />
        <FloralCorner position="top-right"    className="top-0 right-0"   size={280} />
        <FloralCorner position="bottom-left"  className="bottom-0 left-0" size={240} />
        <FloralCorner position="bottom-right" className="bottom-0 right-0" size={240} />

        {/* Borda interna fina — igual ao Save the Date */}
        <div
          className="absolute pointer-events-none"
          style={{ inset: '3rem', border: '1px solid #D4CBC7', opacity: 0.7 }}
        />

        {/* Conteúdo central */}
        <div className="relative z-10 flex flex-col items-center text-center px-8 py-24 gap-0 max-w-lg w-full">

          {/* Monograma — mix-blend-mode:multiply remove o fundo branco */}
          <div className="mb-4" style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/images/monograma.png"
              alt="Monograma B & D"
              width={120}
              height={146}
              className="object-contain"
              priority
            />
          </div>

          {/* Traço rose */}
          <div className="w-10 h-px mb-4" style={{ backgroundColor: '#BA908B' }} />

          {/* Label */}
          <p
            className="mb-6"
            style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#BA908B',
            }}
          >
            Save the Date
          </p>

          {/* Nomes — Pinyon Script (mesma fonte do convite) */}
          <p style={{
            fontFamily: 'Pinyon Script, cursive',
            fontSize: 'clamp(3.5rem, 11vw, 6rem)',
            color: '#8E98A1',
            lineHeight: 1.0,
          }}>
            Débora
          </p>
          <p className="mb-8" style={{
            fontFamily: 'Pinyon Script, cursive',
            fontSize: 'clamp(3.5rem, 11vw, 6rem)',
            color: '#8E98A1',
            lineHeight: 1.0,
          }}>
            & Benjamin
          </p>

          {/* Ornamento ◆ */}
          <Ornament width={44} />

          {/* Data */}
          <p
            className="mt-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 500,
              fontSize: 'clamp(0.65rem, 2vw, 0.82rem)',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: '#BA908B',
            }}
          >
            27 de Março de 2027
          </p>

          {/* Local */}
          <p
            className="mt-1.5"
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

          {/* Ornamento inferior simples */}
          <div className="flex items-center gap-2 mt-5">
            <div className="h-px w-8" style={{ backgroundColor: '#D4CBC7' }} />
            <div className="w-1 h-1 rotate-45" style={{ backgroundColor: '#D4CBC7' }} />
            <div className="h-px w-8" style={{ backgroundColor: '#D4CBC7' }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COUNTDOWN — fundo creme
      ══════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection className="flex flex-col items-center gap-10 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-px" style={{ backgroundColor: '#BA908B' }} />
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '1.5rem',
              color: '#8E98A1',
            }}>
              faltam apenas...
            </p>
          </div>

          <Countdown />

          <div className="flex flex-col items-center gap-3">
            <p style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.62rem',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: '#8E98A1',
            }}>
              para o nosso grande dia
            </p>
            <div className="w-8 h-px" style={{ backgroundColor: '#D4CBC7' }} />
          </div>
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════
          FRASE — fundo principal
      ══════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F5EBE3' }}>
        <AnimatedSection className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px" style={{ backgroundColor: '#D4CBC7' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.5 }} />
            <div className="flex-1 h-px" style={{ backgroundColor: '#D4CBC7' }} />
          </div>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            color: '#4a4540',
            lineHeight: 1.7,
          }}>
            "Toda história de amor merece ser contada.<br />A nossa começa aqui."
          </p>
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px" style={{ backgroundColor: '#D4CBC7' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.5 }} />
            <div className="flex-1 h-px" style={{ backgroundColor: '#D4CBC7' }} />
          </div>
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════
          CARDS DE NAVEGAÇÃO — fundo creme
      ══════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection className="max-w-5xl mx-auto">

          {/* Cabeçalho da seção */}
          <div className="flex flex-col items-center mb-14 gap-4">
            <p style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.48em',
              textTransform: 'uppercase',
              color: '#BA908B',
            }}>
              Explore
            </p>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#4a4540',
            }}>
              O nosso site
            </p>
            <Ornament width={56} />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewCards.map((card, i) => (
              <AnimatedSection key={card.href} delay={i * 80}>
                <Link href={card.href} className="block group h-full">
                  <div
                    className="home-card flex flex-col items-center text-center gap-4 p-10 h-full transition-all duration-300"
                    style={{ backgroundColor: '#F5EBE3', border: '1px solid #D4CBC7' }}
                  >
                    <div className="w-5 h-px" style={{ backgroundColor: '#BA908B' }} />
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontWeight: 400,
                      fontSize: '1.25rem',
                      color: '#4a4540',
                    }}>
                      {card.title}
                    </h3>
                    <p className="flex-1" style={{
                      fontFamily: 'Jost, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.78rem',
                      lineHeight: 1.85,
                      color: '#8E98A1',
                    }}>
                      {card.description}
                    </p>
                    <span style={{
                      fontFamily: 'Jost, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.6rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#BA908B',
                    }}>
                      ver →
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════
          ENCERRAMENTO — monograma + nomes
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 flex flex-col items-center gap-5" style={{ backgroundColor: '#F5EBE3' }}>
        <AnimatedSection className="flex flex-col items-center gap-4">
          <div style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/images/monograma.png"
              alt="Monograma B & D"
              width={80}
              height={97}
              className="object-contain opacity-60"
            />
          </div>
          <p style={{
            fontFamily: 'Pinyon Script, cursive',
            fontSize: '2rem',
            color: '#8E98A1',
          }}>
            Débora & Benjamin
          </p>
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: '#D4CBC7',
          }}>
            27 · 03 · 2027
          </p>
        </AnimatedSection>
      </section>
    </>
  )
}
