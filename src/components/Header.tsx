'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',               label: 'Início' },
  { href: '/nossa-historia', label: 'Nossa História' },
  { href: '/cerimonia',      label: 'Cerimônia' },
  { href: '/presentes',      label: 'Presentes' },
  { href: '/galeria',        label: 'Galeria' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(245,235,227,0.92)' : '#F5EBE3',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #D4CBC7',
        boxShadow: scrolled ? '0 10px 34px rgba(74,69,64,0.07)' : 'none',
      }}
    >
      {/* ── Desktop: monograma centralizado + nav abaixo ── */}
      <div
        className="hidden lg:flex flex-col items-center transition-all duration-500"
        style={{ paddingTop: scrolled ? '10px' : '16px', paddingBottom: scrolled ? '10px' : '16px' }}
      >
        <Link href="/" aria-label="Início">
          <div
            className="transition-all duration-500"
            style={{ mixBlendMode: 'multiply', transform: scrolled ? 'scale(0.85)' : 'scale(1)' }}
          >
            <Image
              src="/images/monograma.png"
              alt="Monograma B & D"
              width={59}
              height={72}
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <nav className="flex items-center gap-10 mt-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link${pathname === l.href ? ' active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Mobile: monograma + hamburger ── */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Início">
          <div style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/images/monograma.png"
              alt="Monograma B & D"
              width={46}
              height={56}
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="flex flex-col gap-[5px] p-2"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: '#4a4540',
                transform:
                  i === 0 && menuOpen ? 'rotate(45deg) translate(3px, 3px)' :
                  i === 2 && menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : '',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? '400px' : '0' }}
      >
        <nav
          className="flex flex-col items-center py-6 gap-5"
          style={{ borderTop: '1px solid #D4CBC7', backgroundColor: '#F5EBE3' }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link${pathname === l.href ? ' active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
