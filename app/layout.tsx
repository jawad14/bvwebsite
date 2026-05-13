import type { Metadata } from 'next'
import { Jost, Inter } from 'next/font/google'
import './globals.css'
import SvgSprite from '@/components/SvgSprite'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const jost = Jost({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jost',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Best Value — Auto Body Supply | Bumpers, Headlights, Fenders & OEM-Quality Collision Parts',
  description:
    'Shop OEM-quality bumpers, headlights, fenders, mirrors, grilles and collision parts at fair, no-gimmick prices. Free fitment lookup, fast US shipping, expert support. Built on trust. Driven by value.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${inter.variable}`}>
        <SvgSprite />
        <Topbar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
