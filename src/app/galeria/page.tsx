import Image from 'next/image'
import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc3e?w=1200&q=85', alt: 'Flores silvestres', height: '280px' },
  { src: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1200&q=85', alt: 'Campo florido',     height: '200px' },
  { src: 'https://images.unsplash.com/photo-1525183480399-5e4f8e91e3f6?w=1200&q=85', alt: 'Flores rosas',      height: '240px' },
]

export default function Galeria() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EBE3' }}>

      {/* ── Header ── */}
      <div className="pt-24 lg:pt-60 pb-12 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#8E98A1', marginBottom: '12px' }}>
            Memórias
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: '#4a4540' }}>
            Galeria
          </h1>
          <FloralDivider />
        </AnimatedSection>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Mensagem */}
        <AnimatedSection className="text-center mb-16">
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#4a4540' }}>
            Em breve, nossas fotos
          </p>
          <FloralDivider />
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.85, color: '#8E98A1', maxWidth: '420px', margin: '0 auto' }}>
            Esta galeria será preenchida com os momentos mais especiais da nossa história — do pedido de casamento ao grande dia.
          </p>
        </AnimatedSection>

        {/* Grid com fotos Unsplash */}
        <AnimatedSection delay={150}>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-4 overflow-hidden"
                style={{ border: '1px solid #D4CBC7', position: 'relative', height: photo.height }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
            {/* Placeholders para fotos futuras */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`ph-${i}`}
                className="break-inside-avoid mb-4 flex items-center justify-center"
                style={{
                  backgroundColor: '#EFDCC3',
                  border: '1px dashed #D4CBC7',
                  height: i % 3 === 0 ? '220px' : i % 3 === 1 ? '160px' : '190px',
                }}
              >
                <span style={{ color: '#D4CBC7', fontSize: '1.2rem' }}>✦</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
