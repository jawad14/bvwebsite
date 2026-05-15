import type { Metadata } from 'next'
import { Jost, Inter } from 'next/font/google'
import './globals.css'
import SvgSprite from '@/components/SvgSprite'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'
import QuoteModal from '@/components/QuoteModal'
import JsonLd from '@/components/JsonLd'

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

const BASE = 'https://www.bestvaluepart.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Best Value Auto Body Supply | OEM-Quality Collision Parts — Chicago',
    template: '%s | Best Value Auto Body Supply',
  },
  description:
    'Best Value Auto Body Supply — Melrose Park, IL. OEM-quality bumpers, headlights, fenders, mirrors, grilles & collision parts. Same-day delivery across Chicago. Call (773) 762-1000.',
  keywords: [
    'auto body parts Chicago', 'collision parts Melrose Park', 'OEM bumpers Illinois',
    'aftermarket headlights Chicago', 'fender replacement Chicago', 'auto body supply shop',
    'same day parts delivery Chicago', 'best value auto body', 'wholesale auto parts Illinois',
    'CAPA certified parts', 'NSF certified collision parts', 'automotive paint Chicago',
  ],
  authors: [{ name: 'Best Value Auto Body Supply', url: BASE }],
  creator: 'Best Value Auto Body Supply',
  publisher: 'Best Value Auto Body Supply, Inc.',
  category: 'Automotive Parts & Supplies',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: BASE },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE,
    siteName: 'Best Value Auto Body Supply',
    title: 'Best Value Auto Body Supply | OEM-Quality Collision Parts — Chicago',
    description: 'OEM-quality bumpers, headlights, fenders, mirrors & collision parts. Same-day delivery across Chicago metro. 25 years of trust. Call (773) 762-1000.',
    images: [{ url: '/bv-logo.webp', width: 1024, height: 366, alt: 'Best Value Auto Body Supply' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Value Auto Body Supply | OEM-Quality Collision Parts',
    description: 'Same-day delivery of OEM-quality auto body parts across Chicago. Call (773) 762-1000.',
    images: ['/bv-logo.webp'],
  },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  verification: {
    google: 'add-your-google-search-console-token-here',
  },
}

// Sitewide JSON-LD schemas
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'AutoPartsStore', 'LocalBusiness'],
  '@id': `${BASE}/#organization`,
  name: 'Best Value Auto Body Supply',
  legalName: 'Best Value Auto Body Supply, Inc.',
  url: BASE,
  logo: { '@type': 'ImageObject', url: `${BASE}/bv-logo.webp`, width: 1024, height: 366 },
  image: `${BASE}/bv-logo.webp`,
  description: 'Best Value Auto Body Supply supplies collision repair shops, mechanics, and drivers with OEM-quality auto body parts at honest prices. Founded in 2001, we operate our own branded delivery fleet with same-day delivery across the Chicago metro area.',
  foundingDate: '2001',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '160-150 25th Ave',
    addressLocality: 'Melrose Park',
    addressRegion: 'IL',
    postalCode: '60160',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 41.8997, longitude: -87.8620 },
  telephone: '+17737621000',
  email: 'infor@bestvaluepart.com',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Check',
  areaServed: [
    { '@type': 'City', name: 'Chicago', containedIn: { '@type': 'State', name: 'Illinois' } },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Indiana' },
    { '@type': 'State', name: 'Wisconsin' },
    { '@type': 'State', name: 'Iowa' },
    { '@type': 'State', name: 'Michigan' },
  ],
  sameAs: [
    'https://www.facebook.com/bestvalueautobody',
    'https://www.instagram.com/bestvalueautobody',
  ],
  hasMap: 'https://maps.google.com/?q=160+25th+Ave+Melrose+Park+IL+60160',
  knowsAbout: [
    'Auto body parts', 'Collision repair parts', 'OEM aftermarket parts',
    'CAPA certified parts', 'NSF certified parts', 'Automotive paint',
    'Same-day parts delivery', 'Bumper covers', 'Headlight assemblies',
    'Fenders', 'Mirrors', 'Grilles', 'Hoods', 'A/C condensers',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE}/#website`,
  url: BASE,
  name: 'Best Value Auto Body Supply',
  description: 'OEM-quality auto body parts with same-day delivery across Chicago.',
  publisher: { '@id': `${BASE}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/parts?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className={`${jost.variable} ${inter.variable}`}>
        <SvgSprite />
        <Topbar />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatBot />
        <QuoteModal />
      </body>
    </html>
  )
}
