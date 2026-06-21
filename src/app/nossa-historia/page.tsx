import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'

// ── Edite aqui os textos de cada marco ──
const MARCOS = [
  {
    data: '28/09/2024',
    titulo: 'Primeira conversa',
    texto: 'Tudo começou com uma mensagem — simples, inesperada e cheia de possibilidades. Nenhum dos dois imaginava que aquele momento mudaria suas vidas para sempre.',
    destaque: false,
  },
  {
    data: '03/10/2024',
    titulo: 'Primeiro encontro',
    texto: 'Quando finalmente se viram pessoalmente, a conversa fluiu como se já se conhecessem há anos. O tempo passou rápido demais, e foi difícil dizer até logo.',
    destaque: false,
  },
  {
    data: '15/10/2024',
    titulo: 'Primeiro beijo',
    texto: 'Um momento que ficará guardado para sempre — um beijo que selou o início de algo muito especial entre dois corações.',
    destaque: false,
  },
  {
    data: '04/01/2025',
    titulo: 'Pedido de namoro',
    texto: 'E assim começou a história oficial de Bela e Benjamin. Um "sim" simples, com o coração acelerado, que marcou o início de um novo capítulo.',
    destaque: false,
  },
  {
    data: '01/03/2026',
    titulo: 'Pedido de casamento',
    texto: 'Com um anel, olhos nos olhos e um amor que só cresceu, Benjamin pediu Débora em casamento. E ela disse sim — de novo.',
    destaque: false,
  },
  {
    data: '27/03/2027',
    titulo: 'O grande dia',
    texto: 'Em breve, escreveremos o capítulo mais bonito desta história. Venha celebrar conosco.',
    destaque: true,
  },
]

export default function NossaHistoria() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EBE3' }}>

      {/* ── Header da página ── */}
      <div className="pt-32 pb-16 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection className="flex flex-col items-center gap-4">
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#BA908B' }}>
            Débora & Benjamin
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: '#4a4540' }}>
            Nossa História
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-12" style={{ backgroundColor: '#D4CBC7' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.7 }} />
            <div className="h-px w-12" style={{ backgroundColor: '#D4CBC7' }} />
          </div>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.8rem', color: '#8E98A1', maxWidth: '28rem', lineHeight: 1.8 }}>
            Cada história de amor tem seus momentos únicos. Aqui estão os nossos.
          </p>
        </AnimatedSection>
      </div>

      {/* ── Timeline ── */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="relative">

          {/* Linha central (desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, #EFDCC3, #D4CBC7, #BA908B, #D4CBC7, #EFDCC3)' }} />

          {/* Linha lateral (mobile) */}
          <div className="absolute left-5 top-0 bottom-0 w-px sm:hidden"
            style={{ background: 'linear-gradient(to bottom, #D4CBC7, #BA908B, #D4CBC7)' }} />

          <div className="flex flex-col gap-16">
            {MARCOS.map((marco, i) => {
              const isLeft = i % 2 === 0
              return (
                <AnimatedSection key={marco.data} delay={i * 120}>
                  <div className={`relative flex items-start ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>

                    {/* Conteúdo */}
                    <div className={`flex-1 pl-14 sm:pl-0 ${isLeft ? 'sm:pr-14 sm:text-right' : 'sm:pl-14'}`}>
                      <div
                        className="inline-block p-7 sm:p-9 w-full sm:w-auto"
                        style={{
                          border: `1px solid ${marco.destaque ? '#BA908B' : '#D4CBC7'}`,
                          backgroundColor: marco.destaque ? 'rgba(186,144,139,0.06)' : 'transparent',
                        }}
                      >
                        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BA908B', marginBottom: '6px' }}>
                          {marco.data}
                        </p>
                        <h3 style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                          color: marco.destaque ? '#BA908B' : '#4a4540',
                          marginBottom: '10px',
                        }}>
                          {marco.titulo}
                        </h3>
                        <div className={`w-8 h-px mb-4 ${!isLeft ? '' : 'sm:ml-auto'}`}
                          style={{ backgroundColor: '#D4CBC7' }} />
                        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.8rem', lineHeight: 1.8, color: '#8E98A1' }}>
                          {marco.texto}
                        </p>
                        {/* Placeholder foto */}
                        <div className="mt-5 flex items-center justify-center"
                          style={{ height: '140px', backgroundColor: '#EFDCC3', border: '1px dashed #D4CBC7' }}>
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-px" style={{ backgroundColor: '#D4CBC7' }} />
                            <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4CBC7' }}>
                              foto em breve
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Marcador na linha */}
                    <div className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 top-8 z-10 flex items-center justify-center"
                      style={{
                        width: '18px', height: '18px', borderRadius: '50%',
                        border: `1.5px solid ${marco.destaque ? '#BA908B' : '#D4CBC7'}`,
                        backgroundColor: marco.destaque ? '#BA908B' : '#F5EBE3',
                      }}>
                      {marco.destaque && <span style={{ color: '#F5EBE3', fontSize: '8px' }}>♥</span>}
                    </div>

                    {/* Espaço oposto (desktop) */}
                    <div className="flex-1 hidden sm:block" />
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
