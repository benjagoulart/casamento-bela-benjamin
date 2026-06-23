import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Débora & Benjamin — 27.03.2027',
  description: 'Casamento de Débora Meister Pereira e Benjamin Córdova Goulart · 27 de Março de 2027 · Sonho Dourado, Morro da Fumaça - SC',
  openGraph: {
    title: 'Débora & Benjamin — 27.03.2027',
    description: 'Venha celebrar conosco este momento tão especial.',
    images: ['/images/monograma.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ backgroundColor: '#F5EBE3' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
