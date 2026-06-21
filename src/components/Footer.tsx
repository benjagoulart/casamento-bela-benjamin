import Image from 'next/image'
import Link from 'next/link'
import FloralDivider from './FloralDivider'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#EFDCC3' }}>
      <FloralDivider variant="floral" />
      <div className="flex flex-col items-center py-10 px-6 gap-4">
        <Link href="/">
          <Image
            src="/monograma-bela_benjamin-01.png"
            alt="Monograma Bela & Benjamin"
            width={60}
            height={72}
            className="object-contain opacity-80"
          />
        </Link>
        <p
          className="text-center"
          style={{ fontFamily: 'Pinyon Script, cursive', fontSize: '2rem', color: '#8E98A1' }}
        >
          Débora & Benjamin
        </p>
        <FloralDivider variant="diamond" color="#BA908B" className="py-1 w-40" />
        <p
          className="text-xs tracking-[0.35em] uppercase"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#BA908B' }}
        >
          27 · 03 · 2027
        </p>
        <p
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
        >
          Sonho Dourado · Morro da Fumaça - SC
        </p>
      </div>
    </footer>
  )
}
