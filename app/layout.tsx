import type { Metadata, Viewport } from 'next'
import { EB_Garamond, Lato } from 'next/font/google'
import './globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ray Rodriguez Law Office | Hialeah, FL',
  description:
    'Ray Rodriguez Law Office is a trusted law firm in Hialeah, FL offering experienced legal representation in personal injury, family law, criminal defense, estate planning, and business litigation. Schedule your free consultation today.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  )
}