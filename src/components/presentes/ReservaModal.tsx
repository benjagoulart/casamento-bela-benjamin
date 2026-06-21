'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface ReservaModalProps {
  presenteId: string
  presenteNome: string
  onClose: () => void
  onSuccess: () => void
}

export default function ReservaModal({ presenteId, presenteNome, onClose, onSuccess }: ReservaModalProps) {
  const [nome, setNome] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleReservar = async () => {
    if (!nome.trim()) {
      setError('Por favor, informe seu nome.')
      return
    }
    if (!supabase) {
      setError('Serviço indisponível no momento.')
      return
    }
    setLoading(true)
    setError('')
    const { error: dbError } = await supabase
      .from('presentes')
      .update({ reservado: true, reservado_por: nome.trim() })
      .eq('id', presenteId)

    setLoading(false)
    if (dbError) {
      setError('Ocorreu um erro. Tente novamente.')
      return
    }
    onSuccess()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(74, 69, 64, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-10 relative"
        style={{ backgroundColor: '#F5EBE3', border: '1px solid #D4CBC7' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl leading-none"
          style={{ color: '#8E98A1' }}
          aria-label="Fechar"
        >
          ×
        </button>

        <p
          className="text-xs tracking-[0.3em] uppercase mb-2"
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#BA908B' }}
        >
          Reservar presente
        </p>
        <h3
          className="text-2xl italic mb-6"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#4a4540' }}
        >
          {presenteNome}
        </h3>

        <p
          className="text-sm mb-6 leading-relaxed"
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
        >
          Informe seu nome para reservar este presente. Ele será marcado como reservado e seu carinho ficará registrado para o casal.
        </p>

        <input
          type="text"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleReservar()}
          className="form-input mb-4"
          autoFocus
        />

        {error && (
          <p className="text-sm mb-4" style={{ color: '#BA908B', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
            {error}
          </p>
        )}

        <button
          onClick={handleReservar}
          disabled={loading}
          className="w-full py-3 text-xs tracking-[0.25em] uppercase transition-opacity duration-200 disabled:opacity-50"
          style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 400,
            color: '#F5EBE3',
            backgroundColor: '#BA908B',
          }}
        >
          {loading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>
      </div>
    </div>
  )
}
