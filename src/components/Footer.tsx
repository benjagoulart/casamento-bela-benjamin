import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#EFDCC3', borderTop: '1px solid #D4CBC7' }}>
      <div className="flex flex-col items-center py-14 px-6 gap-5">

        {/* Ornamento topo */}
        <div className="flex items-center gap-3">
          <div className="h-px w-12" style={{ backgroundColor: '#D4CBC7' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#BA908B', opacity: 0.5 }} />
          <div className="h-px w-12" style={{ backgroundColor: '#D4CBC7' }} />
        </div>

        {/* Monograma — mix-blend-mode elimina fundo branco */}
        <Link href="/" aria-label="Início">
          <div style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/monograma-bela_benjamin-01.png"
              alt="Monograma B & D"
              width={64}
              height={78}
              className="object-contain opacity-75"
            />
          </div>
        </Link>

        {/* Nomes em script */}
        <p style={{ fontFamily: 'Pinyon Script, cursive', fontSize: '2.2rem', color: '#8E98A1' }}>
          Débora & Benjamin
        </p>

        {/* Data */}
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 400,
          fontSize: '0.75rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#BA908B',
        }}>
          27 · 03 · 2027
        </p>

        {/* Local */}
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 300,
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#8E98A1',
        }}>
          Sonho Dourado · Morro da Fumaça - SC
        </p>

        {/* Ornamento rodapé */}
        <div className="flex items-center gap-3 mt-2">
          <div className="h-px w-8" style={{ backgroundColor: '#D4CBC7' }} />
          <div className="w-1 h-1 rotate-45" style={{ backgroundColor: '#D4CBC7' }} />
          <div className="h-px w-8" style={{ backgroundColor: '#D4CBC7' }} />
        </div>
      </div>
    </footer>
  )
}
