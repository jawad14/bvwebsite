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
      <FeaturedProducts />
      <VehicleTypes />
      <ValueSection />
      <Reviews />
      <CtaBanner />
    </>
  )
}
