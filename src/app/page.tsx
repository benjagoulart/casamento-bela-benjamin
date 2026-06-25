import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import Countdown from '@/components/Countdown'
import HeroSection from '@/components/HeroSection'
import FloralDivider from '@/components/FloralDivider'

const previewCards = [
  { href: '/nossa-historia', title: 'Nossa História',     description: 'De uma primeira conversa ao grande dia — conheça a nossa jornada.' },
  { href: '/cerimonia',      title: 'Cerimônia',          description: '27 de Março de 2027 · 16h · Sonho Dourado, Morro da Fumaça - SC.' },
  { href: '/presentes',      title: 'Lista de Presentes', description: 'Escolha um presente especial para celebrar conosco.' },
  { href: '/confirmar',      title: 'Confirmar Presença', description: 'Confirme sua presença e nos ajude a planejar este dia.' },
  { href: '/galeria',        title: 'Galeria',            description: 'Em breve, fotos e memórias deste momento único.' },
  { href: '/hospedagem',     title: 'Hospedagem',         description: 'Sugestões de hospedagem próximas ao local do evento.' },
]

export default function Home() {
  return (
    <>
      {/* ══ HERO ══ */}
      <HeroSection />

      {/* ══ COUNTDOWN ══ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection className="flex flex-col items-center gap-10 max-w-3xl mx-auto">
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '1.5rem',
              color: '#8E98A1',
            }}
          >
            faltam apenas...
          </p>
          <Countdown />
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#8E98A1',
            }}
          >
            para o nosso grande dia
          </p>
        </AnimatedSection>
      </section>

      {/* ══ FOTO + FRASE ══ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F5EBE3' }}>
        <AnimatedSection className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Foto */}
          <div className="relative h-[480px] overflow-hidden" style={{ border: '1px solid #D4CBC7' }}>
            <Image
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=85"
              alt="Nossa história"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Texto */}
          <div className="flex flex-col gap-6">
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                fontSize: '0.6rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: '#BA908B',
              }}
            >
              Nossa História
            </p>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: '#4a4540',
                lineHeight: 1.2,
              }}
            >
              Uma história de amor<br />que merece ser contada
            </h2>
            <div className="w-8 h-px" style={{ backgroundColor: '#D4CBC7' }} />
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                fontSize: '0.85rem',
                lineHeight: 1.85,
                color: '#8E98A1',
              }}
            >
              Tudo começou com uma mensagem, e desde então não paramos mais. Conheça cada capítulo desta jornada que nos trouxe até este grande dia.
            </p>
            <Link
              href="/nossa-historia"
              className="btn-rose self-start"
            >
              Nossa História
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* ══ FRASE ROMÂNTICA ══ */}
      <section className="py-20 px-6" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection className="max-w-xl mx-auto text-center">
          <FloralDivider />
          <p
            className="my-8"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.3rem, 4vw, 2rem)',
              color: '#4a4540',
              lineHeight: 1.75,
            }}
          >
            &ldquo;Toda história de amor merece ser contada.<br />A nossa começa aqui.&rdquo;
          </p>
          <FloralDivider />
        </AnimatedSection>
      </section>

      {/* ══ CARDS ══ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F5EBE3' }}>
        <AnimatedSection className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-14 gap-4">
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                fontSize: '0.58rem',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: '#BA908B',
              }}
            >
              Explore
            </p>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: '#4a4540',
              }}
            >
              O nosso site
            </h2>
            <FloralDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {previewCards.map((card, i) => (
              <AnimatedSection key={card.href} delay={i * 80}>
                <Link href={card.href} className="block h-full">
                  <div className="nav-card flex flex-col items-center text-center gap-4 p-8 h-full">
                    <div style={{ color: '#D4CBC7', fontSize: '0.7rem', letterSpacing: '0.3em' }}>
                      ✦ ✦ ✦
                    </div>
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontWeight: 400,
                        fontSize: '1.2rem',
                        color: '#4a4540',
                      }}
                    >
                      {card.title}
                    </h3>
                    <div className="w-5 h-px" style={{ backgroundColor: '#D4CBC7' }} />
                    <p
                      className="flex-1"
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.78rem',
                        lineHeight: 1.9,
                        color: '#8E98A1',
                      }}
                    >
                      {card.description}
                    </p>
                    <span
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.58rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: '#BA908B',
                      }}
                    >
                      ver →
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ══ ENCERRAMENTO ══ */}
      <section className="py-20 px-6" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection className="flex flex-col items-center gap-5">
          <FloralDivider />
          <div style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/images/monograma.png"
              alt="Monograma B & D"
              width={72}
              height={88}
              className="object-contain opacity-55"
            />
          </div>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '2rem',
              color: '#8E98A1',
            }}
          >
            Débora &amp; Benjamin
          </p>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#D4CBC7',
            }}
          >
            27 · 03 · 2027
          </p>
        </AnimatedSection>
      </section>
    </>
  )
}
