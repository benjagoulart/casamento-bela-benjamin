import Image from 'next/image'
import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'

export default function Cerimonia() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EBE3' }}>

      {/* ── Heading com padding para o header fixo ── */}
      <div className="pt-24 lg:pt-60 pb-10 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BA908B', marginBottom: '10px' }}>
            27 de Março de 2027
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', color: '#4a4540', lineHeight: 1.1 }}>
            Cerimônia
          </h1>
          <FloralDivider />
        </AnimatedSection>
      </div>

      {/* ── Foto da cerimônia ── */}
      <div className="relative h-72 lg:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=85"
          alt="Cerimônia ao ar livre"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(245,235,227,0.1) 0%, rgba(245,235,227,0.6) 100%)' }} />
      </div>

      {/* ── Info principal ── */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <AnimatedSection>
          <div className="p-10 sm:p-16 text-center" style={{ border: '1px solid #D4CBC7' }}>

            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mb-10">
              <div>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BA908B', marginBottom: '8px' }}>
                  Data
                </p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.4rem', color: '#4a4540' }}>
                  27 de Março de 2027
                </p>
              </div>
              <div className="hidden sm:block w-px self-stretch" style={{ backgroundColor: '#D4CBC7' }} />
              <div>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BA908B', marginBottom: '8px' }}>
                  Horário
                </p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.4rem', color: '#4a4540' }}>
                  16h00
                </p>
              </div>
            </div>

            <FloralDivider />

            <div className="mt-8">
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BA908B', marginBottom: '10px' }}>
                Local
              </p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontStyle: 'italic', fontSize: '1.8rem', color: '#4a4540', marginBottom: '8px' }}>
                Sonho Dourado
              </p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.82rem', color: '#8E98A1', marginBottom: '24px' }}>
                Rod. Três Miguel - Graziela, Morro da Fumaça - SC, 88830-000
              </p>

              <a
                href="https://maps.google.com/maps?q=Rod.+Três+Miguel+-+Graziela,+Morro+da+Fumaça+-+SC,+88830-000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rose"
              >
                Como chegar
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Mapa ── */}
        <AnimatedSection delay={150} className="mt-8">
          <div style={{ border: '1px solid #D4CBC7' }}>
            <iframe
              title="Localização Sonho Dourado - Morro da Fumaça SC"
              src="https://maps.google.com/maps?q=Morro+da+Fumaca+SC+88830-000&output=embed&z=13"
              width="100%"
              height="380"
              style={{ display: 'block', border: 'none' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </AnimatedSection>

        {/* ── Informações gerais ── */}
        <AnimatedSection delay={250} className="mt-16">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: '2rem', color: '#4a4540' }}>
              Informações Gerais
            </h2>
            <FloralDivider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { titulo: 'Dress Code',      texto: 'Orientações em breve. Fique à vontade para nos consultar.' },
              { titulo: 'Estacionamento', texto: 'O local dispõe de estacionamento amplo e gratuito para os convidados.' },
              { titulo: 'Crianças',        texto: 'Crianças são bem-vindas! Por favor, informe o número ao confirmar presença.' },
              { titulo: 'Dúvidas',         texto: 'Entre em contato conosco para qualquer informação adicional.' },
            ].map((info) => (
              <div key={info.titulo} className="p-6" style={{ border: '1px solid #D4CBC7' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontStyle: 'italic', fontSize: '1.15rem', color: '#4a4540', marginBottom: '8px' }}>
                  {info.titulo}
                </h3>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.8rem', lineHeight: 1.75, color: '#8E98A1' }}>
                  {info.texto}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
