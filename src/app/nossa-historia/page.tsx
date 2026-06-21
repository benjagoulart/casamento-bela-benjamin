import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'

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
      {/* Header da página */}
      <div className="pt-32 pb-12 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
          >
            Débora & Benjamin
          </p>
          <h1
            className="text-5xl sm:text-6xl italic"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
          >
            Nossa História
          </h1>
          <FloralDivider variant="diamond" color="#BA908B" className="w-48 mx-auto" />
          <p
            className="max-w-lg mx-auto text-base leading-relaxed"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Cada história de amor tem seus momentos únicos. Aqui estão os nossos.
          </p>
        </AnimatedSection>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="relative">
          {/* Linha central */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, #D4CBC7, #BA908B, #D4CBC7)' }}
          />

          {/* Linha mobile (esquerda) */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px sm:hidden"
            style={{ background: 'linear-gradient(to bottom, #D4CBC7, #BA908B, #D4CBC7)' }}
          />

          <div className="flex flex-col gap-16">
            {MARCOS.map((marco, i) => {
              const isLeft = i % 2 === 0

              return (
                <AnimatedSection key={marco.data} delay={i * 150}>
                  <div className={`relative flex items-start gap-6 sm:gap-0 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    {/* Conteúdo */}
                    <div className={`flex-1 pl-16 sm:pl-0 ${isLeft ? 'sm:pr-16 sm:text-right' : 'sm:pl-16 sm:text-left'}`}>
                      <div
                        className={`inline-block p-6 sm:p-8 ${marco.destaque ? 'ring-1' : ''}`}
                        style={{
                          border: `1px solid ${marco.destaque ? '#BA908B' : '#D4CBC7'}`,
                          backgroundColor: marco.destaque ? 'rgba(186,144,139,0.08)' : 'transparent',
                        }}
                      >
                        <p
                          className="text-xs tracking-[0.25em] mb-2"
                          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
                        >
                          {marco.data}
                        </p>
                        <h3
                          className={`text-2xl sm:text-3xl italic mb-3 ${marco.destaque ? 'animate-pulse' : ''}`}
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontWeight: 400,
                            color: marco.destaque ? '#BA908B' : '#4a4540',
                          }}
                        >
                          {marco.titulo}
                        </h3>
                        <div
                          className={`w-8 h-px mb-3 ${isLeft ? 'sm:ml-auto' : ''}`}
                          style={{ backgroundColor: '#D4CBC7' }}
                        />
                        <p
                          className="text-sm leading-relaxed"
                          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                        >
                          {marco.texto}
                        </p>
                        {/* Placeholder de foto */}
                        <div
                          className="mt-4 w-full h-32 flex items-center justify-center"
                          style={{ backgroundColor: '#EFDCC3', border: '1px dashed #D4CBC7' }}
                        >
                          <span style={{ color: '#D4CBC7', fontSize: '1.5rem' }}>✦</span>
                        </div>
                      </div>
                    </div>

                    {/* Marcador central */}
                    <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-6 flex flex-col items-center z-10">
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: marco.destaque ? '#BA908B' : '#D4CBC7',
                          backgroundColor: marco.destaque ? '#BA908B' : '#F5EBE3',
                        }}
                      >
                        {marco.destaque && (
                          <span className="text-white text-xs">♥</span>
                        )}
                      </div>
                    </div>

                    {/* Espaço vazio do outro lado (desktop) */}
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
