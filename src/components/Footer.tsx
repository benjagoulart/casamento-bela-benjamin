import Image from 'next/image'
import Link from 'next/link'
import FloralDivider from './FloralDivider'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#EFDCC3' }}>
      <FloralDivider />
      <div className="flex flex-col items-center py-10 px-6 gap-4">
        <Link href="/">
          <Image
            src="/monograma-bela_benjamin-01.png"
            alt="Monograma Bela & Benjamin"
            width={48}
            height={48}
            className="object-contain opacity-80"
          />
        </Link>
        <p
          className="text-lg text-center"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: '#4a4540' }}
        >
          Débora & Benjamin
        </p>
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
        >
          27 · 03 · 2027
        </p>
        <p
          className="text-xs mt-2"
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#8E98A1' }}
        >
          Sonho Dourado · Morro da Fumaça - SC
        </p>
      </div>
    </footer>
  )
}
