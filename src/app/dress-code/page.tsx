import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'

const PALETTE = [
  { name: 'Glacial Fog', hex: '#F5EBE3', description: 'Tom principal — suave e delicado' },
  { name: 'Warm Clouds', hex: '#EFDCC3', description: 'Champagne quente — clássico e elegante' },
  { name: 'Granite Ridge', hex: '#8E98A1', description: 'Azul ardósia — sofisticado e neutro' },
  { name: 'Lake Mist', hex: '#D4CBC7', description: 'Névoa rosada — romântico e etéreo' },
  { name: 'Twilight Lupine', hex: '#BA908B', description: 'Rosa mauve — a cor central do casamento' },
  { name: 'Spring Meadows', hex: '#80864F', description: 'Verde sálvia — toque botânico e natural' },
]

export default function DressCode() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EBE3' }}>
      {/* Header */}
      <div className="pt-24 lg:pt-40 pb-12 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Sugestão de vestimenta
          </p>
          <h1
            className="text-5xl sm:text-6xl italic"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
          >
            Dress Code
          </h1>
          <FloralDivider />
          <p
            className="max-w-md mx-auto text-sm leading-relaxed"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Orientações completas em breve. Usaremos esta página para compartilhar nossas sugestões de paleta de cores e estilo para o grande dia.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2
              className="text-3xl italic mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
            >
              Paleta de Cores
            </h2>
            <p
              className="text-sm"
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
            >
              Inspiração de tons para o seu look
            </p>
            <FloralDivider />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {PALETTE.map((color) => (
              <div
                key={color.hex}
                className="flex flex-col items-center gap-3 p-6"
                style={{ border: '1px solid #D4CBC7' }}
              >
                <div
                  className="w-16 h-16 rounded-full border"
                  style={{ backgroundColor: color.hex, borderColor: '#D4CBC7' }}
                />
                <p
                  className="text-sm font-medium text-center"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: '#4a4540' }}
                >
                  {color.name}
                </p>
                <p
                  className="text-xs text-center leading-relaxed"
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                >
                  {color.description}
                </p>
                <p
                  className="text-xs tracking-widest"
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#D4CBC7' }}
                >
                  {color.hex}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200} className="mt-16">
          <div
            className="p-10 text-center"
            style={{ border: '1px solid #D4CBC7', backgroundColor: '#EFDCC3' }}
          >
            <p
              className="text-2xl italic mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
            >
              Orientações em breve
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
            >
              Em breve compartilharemos as orientações completas de vestimenta — incluindo sugestões de estilo, o que evitar e dicas para um look perfeito para o nosso casamento.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}


