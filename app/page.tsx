import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import BrandsMarquee from '@/components/BrandsMarquee'
import TrustStrip from '@/components/TrustStrip'
import Categories from '@/components/Categories'
import PromoSplit from '@/components/PromoSplit'
import FeaturedProducts from '@/components/FeaturedProducts'
import VehicleTypes from '@/components/VehicleTypes'
import ValueSection from '@/components/ValueSection'
import Reviews from '@/components/Reviews'
import CtaBanner from '@/components/CtaBanner'
import JsonLd from '@/components/JsonLd'

const BASE = 'https://www.bestvaluepart.com'

export const metadata: Metadata = {
  title: 'Best Value Auto Body Supply | Wholesale Collision Parts — Chicago, IL',
  description:
    'Chicago\'s leading wholesale auto body parts supplier. OEM-quality bumpers, headlights, fenders, mirrors & collision parts. Twice-daily delivery across Chicagoland — Oak Park, Cicero, Berwyn, Evanston, Schaumburg & more. Call (773) 762-1000.',
  keywords: [
    'wholesale auto body parts Chicago', 'collision parts supplier Chicagoland',
    'OEM quality aftermarket parts Illinois', 'auto body parts Oak Park', 'auto body parts Cicero',
    'auto body parts Berwyn', 'auto body parts Evanston', 'auto body parts Schaumburg',
    'bumper covers Chicago wholesale', 'headlights fenders mirrors Chicago',
    'same day auto parts delivery Chicago', 'body shop supply Melrose Park Illinois',
    'CAPA certified parts Chicago', 'NSF certified collision parts',
    'auto body supply shop Chicago metro', 'collision repair parts Illinois',
  ],
  alternates: { canonical: BASE },
  openGraph: {
    url: BASE,
    images: [{ url: `${BASE}/bv-logo.webp`, width: 1024, height: 366, alt: 'Best Value Auto Body Supply' }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
  ],
}

export default function Home() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Hero />
      <BrandsMarquee />
      <TrustStrip />
      <Categories />
      <PromoSplit />
      {/* <FeaturedProducts /> */}
      <VehicleTypes />
      <ValueSection />
      <Reviews />
      <CtaBanner />
    </>
  )
}
