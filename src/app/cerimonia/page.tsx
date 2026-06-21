import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'

export default function Cerimonia() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EBE3' }}>
      {/* Header */}
      <div className="pt-32 pb-12 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            27 de Março de 2027
          </p>
          <h1
            className="text-5xl sm:text-6xl italic"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
          >
            Cerimônia
          </h1>
          <FloralDivider />
        </AnimatedSection>
      </div>

      {/* Info principal */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <AnimatedSection>
          <div
            className="p-10 sm:p-16 text-center"
            style={{ border: '1px solid #D4CBC7' }}
          >
            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mb-10">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
                >
                  Data
                </p>
                <p
                  className="text-2xl"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#4a4540' }}
                >
                  27 de Março de 2027
                </p>
              </div>
              <div
                className="hidden sm:block w-px self-stretch"
                style={{ backgroundColor: '#D4CBC7' }}
              />
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
                >
                  Horário
                </p>
                <p
                  className="text-2xl"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#4a4540' }}
                >
                  16h00
                </p>
              </div>
            </div>

            <FloralDivider />

            <div className="mt-8">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
              >
                Local
              </p>
              <p
                className="text-3xl italic mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#4a4540' }}
              >
                Sonho Dourado
              </p>
              <p
                className="text-sm"
                style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
              >
                Rod. Três Miguel - Graziela, Morro da Fumaça - SC, 88830-000
              </p>

              <a
                href="https://maps.google.com/maps?q=Rod.+Três+Miguel+-+Graziela,+Morro+da+Fumaça+-+SC,+88830-000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-8 py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200"
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontWeight: 400,
                  color: '#F5EBE3',
                  backgroundColor: '#BA908B',
                  border: '1px solid #BA908B',
                }}
              >
                Como chegar
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Mapa */}
        <AnimatedSection delay={200} className="mt-10">
          <div style={{ border: '1px solid #D4CBC7' }}>
            <iframe
              title="Localização Sonho Dourado - Morro da Fumaça SC"
              src="https://maps.google.com/maps?q=Morro+da+Fumaca+SC+88830-000&output=embed&z=13"
              width="100%"
              height="400"
              style={{ display: 'block', border: 'none' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </AnimatedSection>

        {/* Informações gerais */}
        <AnimatedSection delay={300} className="mt-16">
          <div className="text-center mb-8">
            <h2
              className="text-3xl italic"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
            >
              Informações Gerais
            </h2>
            <FloralDivider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { titulo: 'Dress Code', texto: 'Orientações em breve. Fique à vontade para nos consultar.' },
              { titulo: 'Estacionamento', texto: 'O local dispõe de estacionamento amplo e gratuito para os convidados.' },
              { titulo: 'Crianças', texto: 'Crianças são bem-vindas! Por favor, informe o número ao confirmar presença.' },
              { titulo: 'Dúvidas', texto: 'Entre em contato conosco para qualquer informação adicional.' },
            ].map((info) => (
              <div
                key={info.titulo}
                className="p-6"
                style={{ border: '1px solid #D4CBC7' }}
              >
                <h3
                  className="text-lg italic mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#4a4540' }}
                >
                  {info.titulo}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                >
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
