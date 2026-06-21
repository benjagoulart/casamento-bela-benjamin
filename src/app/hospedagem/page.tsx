import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'

const HOSPEDAGENS = [
  {
    nome: 'Hotel Palermitano',
    cidade: 'Criciúma - SC',
    distancia: '~15 km do local',
    descricao: 'Hotel bem localizado no centro de Criciúma, com boa estrutura e conforto para os convidados.',
    maps: 'https://maps.google.com/maps?q=Hotel+Palermitano+Criciuma+SC',
  },
  {
    nome: 'Motel & Hotel Maronezi',
    cidade: 'Criciúma - SC',
    distancia: '~14 km do local',
    descricao: 'Opção confortável e bem avaliada, ideal para hospedagem durante o fim de semana do casamento.',
    maps: 'https://maps.google.com/maps?q=Hotel+Maronezi+Criciuma+SC',
  },
  {
    nome: 'Lages Palace Hotel',
    cidade: 'Morro da Fumaça - SC',
    distancia: '~5 km do local',
    descricao: 'Hospedagem próxima ao espaço do casamento, uma boa opção para quem prefere estar perto do local.',
    maps: 'https://maps.google.com/maps?q=Hotel+Morro+da+Fumaca+SC',
  },
  {
    nome: 'Airbnb / Temporada',
    cidade: 'Região',
    distancia: 'Varia conforme o imóvel',
    descricao: 'Diversas opções de aluguel por temporada disponíveis na região. Recomendamos reservar com antecedência.',
    maps: 'https://maps.google.com/maps?q=Morro+da+Fumaca+SC',
  },
]

export default function Hospedagem() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EBE3' }}>
      {/* Header */}
      <div className="pt-32 pb-12 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Morro da Fumaça - SC
          </p>
          <h1
            className="text-5xl sm:text-6xl italic"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
          >
            Hospedagem
          </h1>
          <FloralDivider />
          <p
            className="max-w-md mx-auto text-sm leading-relaxed"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Para quem vem de longe, reunimos algumas sugestões de hospedagem próximas ao local do nosso casamento.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {HOSPEDAGENS.map((h, i) => (
            <AnimatedSection key={h.nome} delay={i * 100}>
              <div
                className="p-8 flex flex-col gap-4 h-full"
                style={{ border: '1px solid #D4CBC7' }}
              >
                <div>
                  <h3
                    className="text-2xl italic"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#4a4540' }}
                  >
                    {h.nome}
                  </h3>
                  <p
                    className="text-xs tracking-[0.2em] uppercase mt-1"
                    style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
                  >
                    {h.cidade} · {h.distancia}
                  </p>
                </div>
                <div className="w-8 h-px" style={{ backgroundColor: '#D4CBC7' }} />
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                >
                  {h.descricao}
                </p>
                <a
                  href={h.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hospedagem-link inline-block py-2 px-6 text-xs tracking-[0.2em] uppercase text-center mt-auto"
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontWeight: 400,
                    color: '#4a4540',
                    border: '1px solid #D4CBC7',
                    transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
                  }}
                >
                  Ver no Maps
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400} className="mt-12">
          <div
            className="p-8 text-center"
            style={{ border: '1px solid #D4CBC7', backgroundColor: '#EFDCC3' }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
            >
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: '#4a4540' }}>
                Dica:{' '}
              </span>
              Recomendamos reservar sua hospedagem com bastante antecedência, especialmente para o período de Março de 2027.
              Qualquer dúvida, entre em contato conosco.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
