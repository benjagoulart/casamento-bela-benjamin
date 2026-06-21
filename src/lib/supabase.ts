import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type RSVP = {
  id?: string
  nome: string
  email?: string
  telefone?: string
  adultos: number
  criancas: number
  mensagem?: string
  created_at?: string
}

export type Presente = {
  id: string
  nome: string
  descricao?: string
  preco?: number
  imagem_url?: string
  link_externo?: string
  reservado: boolean
  reservado_por?: string
  created_at?: string
}
