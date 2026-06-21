'use client'

import { useState } from 'react'
import { supabase, type RSVP } from '@/lib/supabase'
import FloralDivider from '@/components/FloralDivider'
import AnimatedSection from '@/components/AnimatedSection'
import FloralCorner from '@/components/FloralCorner'

const initialForm: RSVP = {
  nome: '',
  email: '',
  telefone: '',
  adultos: 1,
  criancas: 0,
  mensagem: '',
}

export default function Confirmar() {
  const [form, setForm] = useState<RSVP>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'adultos' || name === 'criancas' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome.trim()) return
    setStatus('loading')

    if (!supabase) {
      setStatus('error')
      return
    }

    const { error } = await supabase.from('rsvp').insert([form])
    if (error) {
      setStatus('error')
      return
    }
    setStatus('success')
    setForm(initialForm)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5EBE3' }}>
      {/* Header */}
      <div className="pt-32 pb-12 px-6 text-center" style={{ backgroundColor: '#EFDCC3' }}>
        <AnimatedSection>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Débora & Benjamin
          </p>
          <h1
            className="text-5xl sm:text-6xl italic"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
          >
            Confirmar Presença
          </h1>
          <FloralDivider />
          <p
            className="max-w-md mx-auto text-sm leading-relaxed"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
          >
            Por favor, confirme sua presença até <strong>27 de Janeiro de 2027</strong>.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-xl mx-auto px-6 py-16">
        {status === 'success' ? (
          <AnimatedSection className="text-center py-12">
            <div
              className="relative p-12"
              style={{ border: '1px solid #D4CBC7' }}
            >
              <FloralCorner position="top-left" size={80} className="top-0 left-0" />
              <FloralCorner position="top-right" size={80} className="top-0 right-0" />
              <FloralCorner position="bottom-left" size={60} className="bottom-0 left-0" />
              <FloralCorner position="bottom-right" size={60} className="bottom-0 right-0" />
              <p
                className="text-4xl italic mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
              >
                Obrigado! ♥
              </p>
              <FloralDivider />
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
              >
                Sua presença foi confirmada com sucesso. Mal podemos esperar para celebrar este dia incrível ao seu lado!
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-8 px-6 py-2 text-xs tracking-[0.2em] uppercase"
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontWeight: 300,
                  color: '#8E98A1',
                  border: '1px solid #D4CBC7',
                }}
              >
                Confirmar outro convidado
              </button>
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection>
            <div
              className="relative p-8 sm:p-12"
              style={{ border: '1px solid #D4CBC7' }}
            >
              <FloralCorner position="top-left" size={70} className="top-0 left-0" />
              <FloralCorner position="top-right" size={70} className="top-0 right-0" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                  >
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                    className="form-input"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="form-input"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                  >
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(48) 99999-9999"
                    className="form-input"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 flex-1">
                    <label
                      className="text-xs tracking-[0.2em] uppercase"
                      style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                    >
                      Adultos
                    </label>
                    <input
                      type="number"
                      name="adultos"
                      value={form.adultos}
                      onChange={handleChange}
                      min={1}
                      max={20}
                      className="form-input"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label
                      className="text-xs tracking-[0.2em] uppercase"
                      style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                    >
                      Crianças
                    </label>
                    <input
                      type="number"
                      name="criancas"
                      value={form.criancas}
                      onChange={handleChange}
                      min={0}
                      max={20}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
                  >
                    Mensagem para o casal (opcional)
                  </label>
                  <textarea
                    name="mensagem"
                    value={form.mensagem}
                    onChange={handleChange}
                    placeholder="Deixe um recadinho especial..."
                    rows={4}
                    className="form-input resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p
                    className="text-sm"
                    style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
                  >
                    Ocorreu um erro ao enviar. Por favor, tente novamente.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="py-4 text-xs tracking-[0.3em] uppercase transition-opacity duration-200 disabled:opacity-50"
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontWeight: 400,
                    color: '#F5EBE3',
                    backgroundColor: '#BA908B',
                  }}
                >
                  {status === 'loading' ? 'Enviando...' : 'Confirmar Presença'}
                </button>
              </form>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}
