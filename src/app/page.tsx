import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import Countdown from '@/components/Countdown'
import Card3D from '@/components/Card3D'
import HeroSection from '@/components/HeroSection'

const previewCards = [
  { href: '/nossa-historia', title: 'Nossa História',     emoji: '✦', description: 'De uma primeira conversa ao grande dia — conheça nossa jornada.' },
  { href: '/cerimonia',      title: 'Cerimônia',          emoji: '✦', description: '27 de Março de 2027 · 16h · Sonho Dourado, Morro da Fumaça - SC.' },
  { href: '/presentes',      title: 'Lista de Presentes', emoji: '✦', description: 'Escolha um presente especial para celebrar conosco.' },
  { href: '/confirmar',      title: 'Confirmar Presença', emoji: '✦', description: 'Confirme sua presença e nos ajude a planejar este dia.' },
  { href: '/galeria',        title: 'Galeria',            emoji: '✦', description: 'Em breve, fotos e memórias deste momento único.' },
  { href: '/hospedagem',     title: 'Hospedagem',         emoji: '✦', description: 'Sugestões de hospedagem próximas ao local do evento.' },
]

export default function Home() {
  return (
    <>
      {/* ══ HERO — parallax + 3D flutuante ══ */}
      <HeroSection />

      {/* ══ COUNTDOWN — cards 3D com profundidade ══ */}
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{ backgroundColor: '#EFDCC3' }}
      >
        {/* Decoração sage nas extremidades */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10">
          <svg width="60" height="200" viewBox="0 0 60 200" fill="none">
            <path d="M50 10 C20 50, 10 80, 30 100 C50 120, 60 150, 40 190" stroke="#80864F" strokeWidth="1.5" fill="none"/>
            <ellipse cx="25" cy="55" rx="12" ry="20" transform="rotate(-30 25 55)" stroke="#80864F" strokeWidth="1" fill="none"/>
            <ellipse cx="42" cy="130" rx="10" ry="18" transform="rotate(20 42 130)" stroke="#80864F" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 scale-x-[-1]">
          <svg width="60" height="200" viewBox="0 0 60 200" fill="none">
            <path d="M50 10 C20 50, 10 80, 30 100 C50 120, 60 150, 40 190" stroke="#80864F" strokeWidth="1.5" fill="none"/>
            <ellipse cx="25" cy="55" rx="12" ry="20" transform="rotate(-30 25 55)" stroke="#80864F" strokeWidth="1" fill="none"/>
            <ellipse cx="42" cy="130" rx="10" ry="18" transform="rotate(20 42 130)" stroke="#80864F" strokeWidth="1" fill="none"/>
          </svg>
        </div>

        <AnimatedSection className="flex flex-col items-center gap-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-px" style={{ backgroundColor: '#BA908B' }} />
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '1.6rem',
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
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#8E98A1',
            }}>
              para o nosso grande dia
            </p>
            <div className="w-8 h-px" style={{ backgroundColor: '#D4CBC7' }} />
          </div>
        </AnimatedSection>
      </section>

      {/* ══ FRASE ROMÂNTICA ══ */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F5EBE3' }}>
        <AnimatedSection className="max-w-xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px" style={{ backgroundColor: '#D4CBC7' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.5 }} />
            <div className="flex-1 h-px" style={{ backgroundColor: '#D4CBC7' }} />
          </div>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.3rem, 4vw, 1.9rem)',
            color: '#4a4540',
            lineHeight: 1.75,
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

      {/* ══ CARDS DE NAVEGAÇÃO — 3D hover tilt ══ */}
      <section className="py-28 px-6" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection className="max-w-5xl mx-auto">

          {/* Header da seção */}
          <div className="flex flex-col items-center mb-16 gap-4">
            <p style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.5em',
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
            <div className="flex items-center gap-3">
              <div className="h-px w-14" style={{ backgroundColor: '#D4CBC7' }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.7 }} />
              <div className="h-px w-14" style={{ backgroundColor: '#D4CBC7' }} />
            </div>
          </div>

          {/* Grid 3D */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {previewCards.map((card, i) => (
              <AnimatedSection key={card.href} delay={i * 90}>
                <Card3D
                  className="h-full"
                  style={{ borderRadius: '2px' }}
                  intensity={10}
                >
                  <Link href={card.href} className="block h-full">
                    <div
                      className="home-card flex flex-col items-center text-center gap-4 p-10 h-full cursor-pointer"
                      style={{
                        backgroundColor: '#F5EBE3',
                        border: '1px solid #D4CBC7',
                        borderRadius: '2px',
                      }}
                    >
                      {/* Ícone sage */}
                      <div style={{ color: '#80864F', fontSize: '0.7rem', letterSpacing: '0.3em' }}>
                        ✦ ✦ ✦
                      </div>
                      <h3 style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontWeight: 400,
                        fontSize: '1.25rem',
                        color: '#4a4540',
                      }}>
                        {card.title}
                      </h3>
                      <div className="w-5 h-px" style={{ backgroundColor: '#D4CBC7' }} />
                      <p className="flex-1" style={{
                        fontFamily: 'Jost, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.78rem',
                        lineHeight: 1.9,
                        color: '#8E98A1',
                      }}>
                        {card.description}
                      </p>
                      <span style={{
                        fontFamily: 'Jost, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.58rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: '#BA908B',
                      }}>
                        ver →
                      </span>
                    </div>
                  </Link>
                </Card3D>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ══ ENCERRAMENTO ══ */}
      <section
        className="py-20 px-6 flex flex-col items-center gap-5"
        style={{ backgroundColor: '#F5EBE3' }}
      >
        <AnimatedSection className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="h-px w-10" style={{ backgroundColor: '#D4CBC7' }} />
            <div className="w-1 h-1 rotate-45" style={{ backgroundColor: '#D4CBC7' }} />
            <div className="h-px w-10" style={{ backgroundColor: '#D4CBC7' }} />
          </div>
          <div style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/images/monograma.png"
              alt="Monograma B & D"
              width={72}
              height={88}
              className="object-contain opacity-55"
            />
          </div>
          <p style={{
            fontFamily: 'Pinyon Script, cursive',
            fontSize: '1.9rem',
            color: '#8E98A1',
          }}>
            Débora & Benjamin
          </p>
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 300,
            fontSize: '0.58rem',
            letterSpacing: '0.4em',
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
