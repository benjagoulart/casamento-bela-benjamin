import Image from 'next/image'
import Link from 'next/link'
import FloralCorner from '@/components/FloralCorner'
import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'
import Countdown from '@/components/Countdown'

const previewCards = [
  {
    href: '/nossa-historia',
    title: 'Nossa História',
    description: 'De uma primeira conversa ao grande dia — conheça nossa jornada.',
  },
  {
    href: '/cerimonia',
    title: 'Cerimônia',
    description: '27 de Março de 2027, às 16h · Sonho Dourado, Morro da Fumaça - SC.',
  },
  {
    href: '/presentes',
    title: 'Lista de Presentes',
    description: 'Escolha um presente especial para celebrar conosco.',
  },
  {
    href: '/confirmar',
    title: 'Confirmar Presença',
    description: 'Confirme sua presença e nos ajude a planejar este dia.',
  },
  {
    href: '/galeria',
    title: 'Galeria',
    description: 'Em breve, fotos e memórias deste momento único.',
  },
  {
    href: '/hospedagem',
    title: 'Hospedagem',
    description: 'Sugestões de hospedagem próximas ao local do evento.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6"
        style={{ backgroundColor: '#F5EBE3' }}
      >
        <FloralCorner position="top-left" className="top-6 left-6" size={140} />
        <FloralCorner position="top-right" className="top-6 right-6" size={140} />
        <FloralCorner position="bottom-left" className="bottom-6 left-6" size={100} />
        <FloralCorner position="bottom-right" className="bottom-6 right-6" size={100} />

        <div className="flex flex-col items-center gap-6 relative z-10 text-center">
          <Image
            src="/monograma-bela_benjamin-01.png"
            alt="Monograma Bela & Benjamin"
            width={160}
            height={160}
            className="object-contain"
            priority
          />

          <FloralDivider className="w-full max-w-xs" />

          <p
            className="text-6xl sm:text-8xl"
            style={{ fontFamily: 'Great Vibes, cursive', color: '#4a4540' }}
          >
            Débora & Benjamin
          </p>

          <p
            className="text-sm sm:text-base tracking-[0.4em] uppercase"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#8E98A1' }}
          >
            27 de Março de 2027
          </p>

          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
          >
            Sonho Dourado · Morro da Fumaça - SC
          </p>

          <FloralDivider className="w-full max-w-xs" />
        </div>
      </section>

      {/* Countdown */}
      <section className="py-20 px-6" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection className="flex flex-col items-center gap-10">
          <p
            className="text-2xl italic tracking-wide text-center"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#8E98A1' }}
          >
            faltam apenas...
          </p>
          <Countdown />
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            para o nosso grande dia
          </p>
        </AnimatedSection>
      </section>

      {/* Preview cards */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F5EBE3' }}>
        <AnimatedSection className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-4xl italic mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
            >
              Explore o nosso site
            </p>
            <FloralDivider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: '#D4CBC7' }}>
            {previewCards.map((card) => (
              <Link href={card.href} key={card.href}>
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
            ))}
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
