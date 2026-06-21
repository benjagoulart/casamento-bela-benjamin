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
  { href: '/confirmar',      label: 'Confirmar Presença' },
  { href: '/galeria',        label: 'Galeria' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const linkStyle = (href: string) => ({
    fontFamily: 'Jost, sans-serif',
    fontWeight: 300,
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    color: pathname === href ? '#BA908B' : '#4a4540',
    transition: 'color 0.2s',
  })

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(245,235,227,0.96)' : 'rgba(245,235,227,0.75)',
        backdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid #D4CBC7' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between lg:justify-center relative">

        {/* Nav esquerda (desktop) */}
        <nav className="hidden lg:flex items-center gap-8 mr-10">
          {navLinks.slice(0, 3).map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle(l.href)}
              className="hover:text-[#BA908B] transition-colors duration-200">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Monograma central */}
        <Link href="/" className="flex-shrink-0" aria-label="Início">
          <div style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/monograma-bela_benjamin-01.png"
              alt="BD"
              width={40}
              height={48}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Nav direita (desktop) */}
        <nav className="hidden lg:flex items-center gap-8 ml-10">
          {navLinks.slice(3).map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle(l.href)}
              className="hover:text-[#BA908B] transition-colors duration-200">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className="lg:hidden absolute right-6 flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
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

      {/* Menu mobile */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? '400px' : '0' }}
      >
        <nav
          className="flex flex-col items-center py-6 gap-5 border-t"
          style={{ borderColor: '#D4CBC7', backgroundColor: 'rgba(245,235,227,0.98)' }}
        >
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
