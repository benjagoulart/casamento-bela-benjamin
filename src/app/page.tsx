import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import Countdown from '@/components/Countdown'
import HeroSection from '@/components/HeroSection'
import FloralDivider from '@/components/FloralDivider'
import Tilt from '@/components/Tilt'

const previewCards = [
  { href: '/nossa-historia', title: 'Nossa História',     description: 'De uma primeira conversa ao grande dia — conheça a nossa jornada.' },
  { href: '/cerimonia',      title: 'Cerimônia',          description: '27 de Março de 2027 · 16h · Sonho Dourado, Morro da Fumaça - SC.' },
  { href: '/presentes',      title: 'Lista de Presentes', description: 'Escolha um presente especial para celebrar conosco.' },
  { href: '/dress-code',     title: 'Dress Code',         description: 'Orientações de traje para acompanhar a elegância da ocasião.' },
  { href: '/galeria',        title: 'Galeria',            description: 'Em breve, fotos e memórias deste momento único.' },
  { href: '/hospedagem',     title: 'Hospedagem',         description: 'Sugestões de hospedagem próximas ao local do evento.' },
]

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI']

export default function Home() {
  return (
    <>
      {/* ══ HERO ══ */}
      <HeroSection />

      {/* ══ COUNTDOWN ══ */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: '#EFDCC3' }}>
        <div className="grain" />
        <AnimatedSection className="relative flex flex-col items-center gap-10 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-3">
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
              A contagem começou
            </p>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                color: '#4a4540',
              }}
            >
              faltam apenas...
            </p>
          </div>

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

      {/* ══ EDITORIAL — foto do casal + nossa história ══ */}
      <section className="py-28 px-6 overflow-hidden" style={{ backgroundColor: '#F5EBE3' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Foto com moldura dupla + tilt 3D */}
          <AnimatedSection>
            <div className="frame-offset">
              <Tilt max={5} scale={1.015}>
                <div
                  className="relative overflow-hidden"
                  style={{ height: '540px', border: '1px solid #D4CBC7' }}
                >
                  <Image
                    src="/images/FOTO CASAL/foto-casal-2.jpeg"
                    alt="Débora e Benjamin"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Tilt>
            </div>
          </AnimatedSection>

          {/* Texto */}
          <AnimatedSection delay={120}>
            <div className="flex flex-col gap-6">
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
                Nossa História
              </p>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                  color: '#4a4540',
                  lineHeight: 1.15,
                }}
              >
                Uma história de amor que merece ser contada
              </h2>
              <div className="w-10 h-px" style={{ backgroundColor: '#BA908B', opacity: 0.6 }} />
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.88rem',
                  lineHeight: 1.95,
                  color: '#8E98A1',
                }}
              >
                Tudo começou com uma mensagem — simples, inesperada e cheia de possibilidades.
                De lá para cá, cada capítulo nos trouxe até aqui: o dia em que diremos sim,
                cercados pelas pessoas que mais amamos.
              </p>
              <div className="flex items-center gap-6 mt-2">
                <Link href="/nossa-historia" className="btn-rose">Ler a história</Link>
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic',
                    fontSize: '0.95rem',
                    color: '#D4CBC7',
                  }}
                >
                  desde 2024
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ BANDA PARALLAX — paisagem + frase ══ */}
      <section className="parallax-band relative py-36 px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(245,235,227,0.72), rgba(245,235,227,0.55) 50%, rgba(245,235,227,0.72))',
          }}
        />
        <AnimatedSection className="relative max-w-2xl mx-auto text-center flex flex-col items-center">
          <FloralDivider />
          <p
            className="my-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.5rem, 4.5vw, 2.4rem)',
              color: '#4a4540',
              lineHeight: 1.65,
              textShadow: '0 2px 18px rgba(245,235,227,0.9)',
            }}
          >
            &ldquo;Toda história de amor merece ser contada.
            <br />
            A nossa começa aqui.&rdquo;
          </p>
          <FloralDivider />
        </AnimatedSection>
      </section>

      {/* ══ EXPLORE — cards com tilt 3D ══ */}
      <section className="py-28 px-6" style={{ backgroundColor: '#F5EBE3' }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="flex flex-col items-center mb-16 gap-4">
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
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {previewCards.map((card, i) => (
              <AnimatedSection key={card.href} delay={i * 70}>
                <Tilt max={6} scale={1.02} className="h-full">
                  <Link href={card.href} className="block h-full">
                    <div className="nav-card flex flex-col items-center text-center gap-4 p-9 h-full">
                      <span
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontWeight: 400,
                          fontSize: '0.85rem',
                          letterSpacing: '0.35em',
                          color: '#D4CBC7',
                        }}
                      >
                        {romanNumerals[i]}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          fontSize: '1.35rem',
                          color: '#4a4540',
                        }}
                      >
                        {card.title}
                      </h3>
                      <div className="w-5 h-px" style={{ backgroundColor: '#BA908B', opacity: 0.5 }} />
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
                </Tilt>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ENCERRAMENTO ══ */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: '#EFDCC3' }}>
        <div className="grain" />
        <AnimatedSection className="relative flex flex-col items-center gap-5">
          <FloralDivider />
          <div className="float-soft" style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/images/monograma.png"
              alt="Monograma B & D"
              width={76}
              height={93}
              className="object-contain opacity-60"
            />
          </div>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '2.1rem',
              color: '#8E98A1',
            }}
          >
            Débora <span style={{ color: '#BA908B', fontSize: '0.75em' }}>&amp;</span> Benjamin
          </p>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#BA908B',
            }}
          >
            27 · 03 · 2027
          </p>
        </AnimatedSection>
      </section>
    </>
  )
}
