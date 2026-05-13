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

export default function Home() {
  return (
    <>
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
