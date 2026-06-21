'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/nossa-historia', label: 'Nossa História' },
  { href: '/cerimonia', label: 'Cerimônia' },
  { href: '/presentes', label: 'Presentes' },
  { href: '/confirmar', label: 'Confirmar Presença' },
  { href: '/galeria', label: 'Galeria' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(245,235,227,0.95)' : 'rgba(245,235,227,0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: scrolled ? '1px solid #D4CBC7' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between lg:justify-center relative">
        {/* Desktop nav left */}
        <nav className="hidden lg:flex items-center gap-6 mr-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[#BA908B]"
              style={{
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                color: pathname === link.href ? '#BA908B' : '#4a4540',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/monograma-bela_benjamin-01.png"
            alt="Monograma Bela & Benjamin"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav right */}
        <nav className="hidden lg:flex items-center gap-6 ml-8">
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[#BA908B]"
              style={{
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                color: pathname === link.href ? '#BA908B' : '#4a4540',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 absolute right-6"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span
            className="block w-6 h-px bg-[#4a4540] transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : '' }}
          />
          <span
            className="block w-6 h-px bg-[#4a4540] transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-px bg-[#4a4540] transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : '' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="lg:hidden flex flex-col items-center py-6 gap-5 border-t"
          style={{ borderColor: '#D4CBC7', backgroundColor: 'rgba(245,235,227,0.98)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.25em] uppercase"
              style={{
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                color: pathname === link.href ? '#BA908B' : '#4a4540',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
