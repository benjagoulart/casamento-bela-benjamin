'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase, type Presente } from '@/lib/supabase'
import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'
import ReservaModal from '@/components/presentes/ReservaModal'

export default function Presentes() {
  const [presentes, setPresentes] = useState<Presente[]>([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState<{ id: string; nome: string } | null>(null)
  const [successId, setSuccessId] = useState<string | null>(null)

  const fetchPresentes = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from('presentes').select('*').order('created_at')
    setPresentes((data as Presente[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchPresentes() }, [])

  const handleSuccess = (id: string) => {
    setModalData(null)
    setSuccessId(id)
    fetchPresentes()
    setTimeout(() => setSuccessId(null), 3000)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EBE3' }}>
      {/* Header */}
      <div className="pt-24 lg:pt-60 pb-12 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Com amor
          </p>
          <h1
            className="text-5xl sm:text-6xl italic"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
          >
            Lista de Presentes
          </h1>
          <FloralDivider />
          <p
            className="max-w-lg mx-auto text-sm leading-relaxed"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Se desejar nos presentear, escolha um item abaixo e reserve seu nome. Cada presente carrega muito carinho para nós.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#8E98A1', fontSize: '1.25rem', fontStyle: 'italic' }}>
              Carregando lista...
            </p>
          </div>
        ) : presentes.length === 0 ? (
          <AnimatedSection className="flex flex-col items-center text-center py-20 gap-6">
            <div className="w-12 h-px" style={{ backgroundColor: '#D4CBC7' }} />
            <p
              className="text-4xl italic"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
            >
              Em breve
            </p>
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
            >
              Nossa lista de presentes estará disponível em breve. Volte depois para escolher o presente perfeito.
            </p>
            <div className="w-12 h-px" style={{ backgroundColor: '#D4CBC7' }} />
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentes.map((presente, i) => (
              <AnimatedSection key={presente.id} delay={i * 80}>
                <div
                  className="flex flex-col h-full"
                  style={{ border: '1px solid #D4CBC7' }}
                >
                  {/* Imagem */}
                  <div
                    className="relative w-full h-48 flex items-center justify-center"
                    style={{ backgroundColor: '#EFDCC3' }}
                  >
                    {presente.imagem_url ? (
                      <Image
                        src={presente.imagem_url}
                        alt={presente.nome}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span style={{ color: '#D4CBC7', fontSize: '2rem' }}>✦</span>
                    )}
                    {presente.reservado && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(186,144,139,0.85)' }}
                      >
                        <span
                          className="text-white text-sm tracking-widest"
                          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
                        >
                          Reservado ♥
                        </span>
                      </div>
                    )}
                    {successId === presente.id && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(128,134,79,0.85)' }}
                      >
                        <span
                          className="text-white text-sm"
                          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
                        >
                          Reservado com sucesso ♥
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h3
                      className="text-xl"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#4a4540' }}
                    >
                      {presente.nome}
                    </h3>
                    {presente.descricao && (
                      <p
                        className="text-sm leading-relaxed flex-1"
                        style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                      >
                        {presente.descricao}
                      </p>
                    )}
                    {presente.preco != null && (
                      <p
                        className="text-sm"
                        style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#BA908B' }}
                      >
                        R$ {presente.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    )}

                    {presente.reservado ? (
                      <div
                        className="py-3 text-center text-xs tracking-[0.2em] uppercase"
                        style={{
                          fontFamily: 'Jost, sans-serif',
                          fontWeight: 300,
                          color: '#BA908B',
                          border: '1px solid #D4CBC7',
                        }}
                      >
                        Reservado ♥
                      </div>
                    ) : (
                      <button
                        onClick={() => setModalData({ id: presente.id, nome: presente.nome })}
                        className="py-3 text-xs tracking-[0.2em] uppercase transition-colors duration-200 mt-auto"
                        style={{
                          fontFamily: 'Jost, sans-serif',
                          fontWeight: 400,
                          color: '#4a4540',
                          border: '1px solid #D4CBC7',
                          backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#BA908B'
                          e.currentTarget.style.color = '#F5EBE3'
                          e.currentTarget.style.borderColor = '#BA908B'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.color = '#4a4540'
                          e.currentTarget.style.borderColor = '#D4CBC7'
                        }}
                      >
                        Reservar
                      </button>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>

      {modalData && (
        <ReservaModal
          presenteId={modalData.id}
          presenteNome={modalData.nome}
          onClose={() => setModalData(null)}
          onSuccess={() => handleSuccess(modalData.id)}
        />
      )}
    </div>
  )
}

