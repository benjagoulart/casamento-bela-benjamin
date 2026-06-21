import Image from 'next/image'
import Link from 'next/link'
import FloralCorner from '@/components/FloralCorner'
import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'
import Countdown from '@/components/Countdown'

const previewCards = [
  { href: '/nossa-historia', title: 'Nossa História', description: 'De uma primeira conversa ao grande dia — conheça nossa jornada.' },
  { href: '/cerimonia', title: 'Cerimônia', description: '27 de Março de 2027, às 16h · Sonho Dourado, Morro da Fumaça - SC.' },
  { href: '/presentes', title: 'Lista de Presentes', description: 'Escolha um presente especial para celebrar conosco.' },
  { href: '/confirmar', title: 'Confirmar Presença', description: 'Confirme sua presença e nos ajude a planejar este dia.' },
  { href: '/galeria', title: 'Galeria', description: 'Em breve, fotos e memórias deste momento único.' },
  { href: '/hospedagem', title: 'Hospedagem', description: 'Sugestões de hospedagem próximas ao local do evento.' },
]

export default function Home() {
  return (
    <>
      {/* ── HERO — fiel ao Save the Date ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#F5EBE3' }}
      >
        {/* Florais nos cantos — estilo botânico denso */}
        <FloralCorner position="top-left"    className="top-0 left-0"     size={260} />
        <FloralCorner position="top-right"   className="top-0 right-0"    size={260} />
        <FloralCorner position="bottom-left" className="bottom-0 left-0"  size={220} />
        <FloralCorner position="bottom-right"className="bottom-0 right-0" size={220} />

        {/* Borda retangular interna — como no Save the Date */}
        <div
          className="absolute inset-8 sm:inset-14 pointer-events-none"
          style={{ border: '1px solid #D4CBC7', opacity: 0.6 }}
        />

        {/* Conteúdo central */}
        <div className="relative z-10 flex flex-col items-center text-center px-12 py-20 gap-0">

          {/* Monograma com oval — usando a imagem oficial */}
          <div className="mb-5">
            <Image
              src="/monograma-bela_benjamin-01.png"
              alt="Monograma BD"
              width={110}
              height={130}
              className="object-contain"
              priority
            />
          </div>

          {/* Separador rose */}
          <FloralDivider variant="simple" color="#BA908B" className="py-2" />

          {/* Label "SAVE THE DATE" */}
          <p
            className="tracking-[0.45em] uppercase text-xs mt-1 mb-6"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, color: '#BA908B', letterSpacing: '0.45em' }}
          >
            Save the Date
          </p>

          {/* Nomes em script — Pinyon Script igual ao convite */}
          <p
            className="leading-none"
            style={{
              fontFamily: 'Pinyon Script, cursive',
              fontSize: 'clamp(3rem, 10vw, 5.5rem)',
              color: '#8E98A1',
              lineHeight: 1.05,
            }}
          >
            Débora
          </p>
          <p
            className="leading-none mb-8"
            style={{
              fontFamily: 'Pinyon Script, cursive',
              fontSize: 'clamp(3rem, 10vw, 5.5rem)',
              color: '#8E98A1',
              lineHeight: 1.05,
            }}
          >
            & Benjamin
          </p>

          {/* Ornamento diamante */}
          <FloralDivider variant="diamond" color="#BA908B" className="py-1 w-48" />

          {/* Data */}
          <p
            className="tracking-[0.35em] uppercase font-medium mt-2"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
              color: '#BA908B',
              fontWeight: 500,
            }}
          >
            27 de Março de 2027
          </p>

          {/* Local */}
          <p
            className="tracking-[0.25em] uppercase mt-1"
            style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.65rem',
              color: '#8E98A1',
              letterSpacing: '0.25em',
            }}
          >
            Sonho Dourado · Morro da Fumaça, SC
          </p>

          {/* Ornamento diamante inferior */}
          <FloralDivider variant="diamond" color="#BA908B" className="py-1 mt-2 w-36" />
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection className="flex flex-col items-center gap-10">
          <p
            className="italic tracking-wide text-center"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#8E98A1', fontSize: '1.4rem' }}
          >
            faltam apenas...
          </p>
          <Countdown />
          <p
            className="tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1', fontSize: '0.7rem' }}
          >
            para o nosso grande dia
          </p>
        </AnimatedSection>
      </section>

      {/* ── PREVIEW CARDS ── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F5EBE3' }}>
        <AnimatedSection className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="italic mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540', fontSize: '2.5rem' }}
            >
              Explore o nosso site
            </p>
            <FloralDivider variant="floral" />
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ backgroundColor: '#D4CBC7' }}
          >
            {previewCards.map((card, i) => (
              <AnimatedSection key={card.href} delay={i * 80}>
                <Link href={card.href}>
                  <div
                    className="home-card group p-10 flex flex-col items-center text-center gap-4 transition-colors duration-300 h-full"
                    style={{ backgroundColor: '#F5EBE3' }}
                  >
                    <div className="w-6 h-px" style={{ backgroundColor: '#BA908B' }} />
                    <h3
                      className="text-xl"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#4a4540' }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                    >
                      {card.description}
                    </p>
                    <span
                      className="text-xs tracking-widest mt-auto"
                      style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
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
    </>
  )
}
