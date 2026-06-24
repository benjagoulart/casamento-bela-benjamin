import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'
import FloralCorner from '@/components/FloralCorner'
import TiltCard from '@/components/TiltCard'

export default function Galeria() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EBE3' }}>
      {/* Header */}
      <div className="pt-32 pb-12 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Memórias
          </p>
          <h1
            className="text-5xl sm:text-6xl italic"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
          >
            Galeria
          </h1>
          <FloralDivider />
        </AnimatedSection>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <AnimatedSection className="flex flex-col items-center text-center gap-6">
          <div className="relative p-16 sm:p-24 w-full max-w-lg">
            <FloralCorner position="top-left" size={90} className="top-0 left-0" />
            <FloralCorner position="top-right" size={90} className="top-0 right-0" />
            <FloralCorner position="bottom-left" size={70} className="bottom-0 left-0" />
            <FloralCorner position="bottom-right" size={70} className="bottom-0 right-0" />

            <p
              className="text-5xl italic mb-6"
              style={{ fontFamily: 'Great Vibes, cursive', color: '#BA908B' }}
            >
              Em breve
            </p>
            <FloralDivider />
            <p
              className="text-3xl italic mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
            >
              Em breve, nossas fotos ♥
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
            >
              Esta galeria será preenchida com os momentos mais especiais da nossa história — do pedido de casamento ao grande dia.
            </p>
          </div>
        </AnimatedSection>

        {/* Grid masonry placeholder — pronto para receber fotos */}
        <AnimatedSection delay={200} className="mt-16">
          <div
            className="columns-2 sm:columns-3 gap-3"
            style={{ columnGap: '12px' }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <TiltCard
                key={i}
                className="break-inside-avoid mb-3"
                maxTilt={5}
                scale={1.02}
                glare
                data-photo
                style={{ borderRadius: '1px' }}
              >
                <div
                  className="flex items-center justify-center"
                  data-photo
                  style={{
                    backgroundColor: '#EFDCC3',
                    border: '1px dashed #D4CBC7',
                    height: i % 3 === 0 ? '220px' : i % 3 === 1 ? '160px' : '190px',
                  }}
                >
                  <span style={{ color: '#D4CBC7', fontSize: '1.5rem' }}>✦</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
