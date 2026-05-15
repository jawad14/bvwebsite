import type { Metadata } from 'next'
import Image from 'next/image'
import JsonLd from '@/components/JsonLd'

const BASE = 'https://www.bestvaluepart.com'

export const metadata: Metadata = {
  title: 'Shop All Auto Body Parts',
  description:
    'Browse 8,000+ OEM-quality auto body parts — bumpers, headlights, fenders, mirrors, grilles, hoods, A/C condensers, and more. Same-day delivery across the Chicago metro. Call (773) 762-1000.',
  keywords: [
    'auto body parts Chicago', 'bumper covers Chicago', 'headlight assemblies Illinois',
    'fender replacement parts', 'OEM quality aftermarket parts', 'collision parts Melrose Park',
    'side mirrors wholesale', 'grille replacement Chicago', 'auto hood replacement',
    'A/C condenser parts', 'same-day auto parts delivery', 'wholesale collision parts Illinois',
  ],
  alternates: { canonical: `${BASE}/parts` },
  openGraph: {
    title: 'Shop All Auto Body Parts — Best Value Auto Body Supply',
    description: '8,000+ OEM-quality collision parts. Same-day delivery across Chicago. Bumpers, lights, fenders, mirrors & more.',
    url: `${BASE}/parts`,
    images: [{ url: `${BASE}/parts/bumper.webp`, width: 400, height: 260, alt: 'Auto bumper cover' }],
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Auto Body Parts Categories',
  description: 'OEM-quality auto body and collision parts available at Best Value Auto Body Supply',
  url: `${BASE}/parts`,
  numberOfItems: 16,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Bumpers & Bumper Covers', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 2, name: 'Headlights & Tail Lights', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 3, name: 'Corner & Parking Lights', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 4, name: 'Fog Lights', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 5, name: 'Hoods & Panels', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 6, name: 'Grilles & Grille Guards', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 7, name: 'Mirrors', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 8, name: 'Door Handles & Locks', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 9, name: 'Splash Guards & Shields', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 10, name: 'A/C Condensers', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 11, name: 'Condenser Fans', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 12, name: 'Heating & Cooling', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 13, name: 'Fenders', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 14, name: 'Doors & Related', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 15, name: 'Trunk Lids & Tailgates', url: `${BASE}/parts` },
    { '@type': 'ListItem', position: 16, name: 'Inner Structure', url: `${BASE}/parts` },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Shop All Parts', item: `${BASE}/parts` },
  ],
}

const categories = [
  {
    name: 'Bumpers & Bumper Covers',
    img: '/parts/bumper.webp',
    count: '1,200+ SKUs',
    desc: 'Front & rear bumper covers, reinforcements, absorbers, and complete assemblies.',
  },
  {
    name: 'Headlights & Tail Lights',
    img: '/parts/headlights.webp',
    count: '900+ SKUs',
    desc: 'OEM-spec headlight assemblies, tail lamp units, and replacement lenses.',
  },
  {
    name: 'Corner & Parking Lights',
    img: '/parts/corner-lights.webp',
    count: '400+ SKUs',
    desc: 'Corner lights, side markers, and parking lamp assemblies for all makes.',
  },
  {
    name: 'Fog Lights',
    img: '/parts/fog-light.webp',
    count: '350+ SKUs',
    desc: 'Direct-fit fog lamp assemblies and housings — front and rear.',
  },
  {
    name: 'Hoods & Panels',
    img: '/parts/front-bonnet.webp',
    count: '600+ SKUs',
    desc: 'Replacement hoods, bonnet panels, cowl panels, and hood hinges.',
  },
  {
    name: 'Grilles & Grille Guards',
    img: '/parts/grill.webp',
    count: '500+ SKUs',
    desc: 'Upper & lower grilles, grille inserts, and overlay kits.',
  },
  {
    name: 'Mirrors',
    img: '/parts/side-mirror.webp',
    count: '700+ SKUs',
    desc: 'Power, manual, heated, and tow mirrors for cars and trucks.',
  },
  {
    name: 'Door Handles & Locks',
    img: '/parts/handles.webp',
    count: '450+ SKUs',
    desc: 'Interior and exterior door handles, lock cylinders, and actuators.',
  },
  {
    name: 'Splash Guards & Shields',
    img: '/parts/splash-shield.webp',
    count: '300+ SKUs',
    desc: 'Mud flaps, splash shields, fender liners, and wheel well covers.',
  },
  {
    name: 'A/C Condensers',
    img: '/parts/ac-condenser.webp',
    count: '280+ SKUs',
    desc: 'Direct-fit A/C condensers and receiver-drier units.',
  },
  {
    name: 'Condenser Fans',
    img: '/parts/condenser-fan.webp',
    count: '200+ SKUs',
    desc: 'Radiator condenser fan assemblies and individual fan motors.',
  },
  {
    name: 'Heating & Cooling',
    img: '/parts/heater-core.webp',
    count: '380+ SKUs',
    desc: 'Heater cores, radiators, coolant overflow tanks, and thermostat housings.',
  },
  {
    name: 'Fenders',
    img: null,
    count: '550+ SKUs',
    desc: 'Front fenders, quarter panels, and inner fender liners for all makes.',
  },
  {
    name: 'Doors & Related',
    img: null,
    count: '420+ SKUs',
    desc: 'Door shells, door skins, hinges, and door weatherstripping.',
  },
  {
    name: 'Trunk Lids & Tailgates',
    img: null,
    count: '310+ SKUs',
    desc: 'Trunk lids, deck lids, tailgates, and liftgate assemblies.',
  },
  {
    name: 'Inner Structure',
    img: null,
    count: '240+ SKUs',
    desc: 'Radiator core supports, strut towers, sub-frames, and unibody parts.',
  },
]

const heroImages = [
  { src: '/parts/bumper.webp', alt: 'Bumper' },
  { src: '/parts/headlights.webp', alt: 'Headlight' },
  { src: '/parts/grill.webp', alt: 'Grille' },
  { src: '/parts/side-mirror.webp', alt: 'Mirror' },
  { src: '/parts/front-bonnet.webp', alt: 'Hood' },
  { src: '/parts/corner-lights.webp', alt: 'Corner light' },
]

const placeholderIcons: Record<string, string> = {
  'Fenders': '🚗',
  'Doors & Related': '🚪',
  'Trunk Lids & Tailgates': '🔧',
  'Inner Structure': '⚙️',
}

export default function PartsPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Hero */}
      <div className="parts-hero">
        <div className="parts-hero__bg" />
        <div className="container parts-hero__inner">
          <div className="parts-hero__copy">
            <span className="eyebrow" style={{ color: '#FFB3B6' }}>OEM-Quality Parts</span>
            <h1>Shop All Auto Body Parts</h1>
            <p>
              Over 8,000 SKUs in stock — bumpers, lights, fenders, mirrors, grilles, and more.
              All OEM-spec quality at honest prices, with same-day delivery across the Chicago metro.
            </p>
            <div className="parts-hero__actions">
              <a className="btn btn--primary btn--lg" href="tel:17737621000">
                <svg width="18" height="18"><use href="#i-phone" /></svg>
                Call to Order
              </a>
              <a className="btn btn--ghost-light btn--lg" href="/#contact">
                Request a Quote
                <svg className="arrow" width="18" height="18"><use href="#i-arrow" /></svg>
              </a>
            </div>
            <div className="parts-hero__trust">
              <span>✓ Same-Day Delivery</span>
              <span>✓ Best Price Guarantee</span>
              <span>✓ 25 Years in Business</span>
            </div>
          </div>
          <div className="parts-hero__mosaic">
            {heroImages.map(({ src, alt }) => (
              <div key={src} className="parts-hero__tile">
                <Image src={src} alt={alt} width={300} height={220} className="parts-hero__tile-img" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="parts-stats">
        <div className="container parts-stats__row">
          {[
            { val: '8,000+', label: 'Parts in Stock' },
            { val: '500+', label: 'Vehicle Makes & Models' },
            { val: '1-Hour', label: 'Local Delivery' },
            { val: '25 Yrs', label: 'Industry Experience' },
          ].map(({ val, label }) => (
            <div key={label} className="parts-stat">
              <span className="parts-stat__val">{val}</span>
              <span className="parts-stat__label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Browse by Category</span>
              <h2>All Parts Categories</h2>
            </div>
            <p style={{ maxWidth: 400, color: 'var(--ink-2)', fontSize: 15 }}>
              Can&apos;t find what you need? Call us — our team locates hard-to-find parts daily.
            </p>
          </div>
          <div className="parts-grid">
            {categories.map(({ name, img, count, desc }) => (
              <a
                key={name}
                href={`tel:17737621000`}
                className="part-card"
                aria-label={`Inquire about ${name}`}
              >
                <div className="part-card__img-wrap">
                  {img ? (
                    <Image
                      src={img}
                      alt={name}
                      width={400}
                      height={260}
                      className="part-card__img"
                    />
                  ) : (
                    <div className="part-card__placeholder">
                      <span className="part-card__icon">{placeholderIcons[name] ?? '🔩'}</span>
                      <span className="part-card__placeholder-label">{name}</span>
                    </div>
                  )}
                  <span className="part-card__badge">{count}</span>
                </div>
                <div className="part-card__body">
                  <h3 className="part-card__name">{name}</h3>
                  <p className="part-card__desc">{desc}</p>
                  <span className="part-card__cta">
                    Call to Order
                    <svg width="14" height="14"><use href="#i-arrow-sm" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="section section--soft">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Simple Process</span>
              <h2>How to Order Parts</h2>
            </div>
          </div>
          <div className="parts-steps">
            {[
              { n: '1', title: 'Call or Request a Quote', body: 'Reach our parts specialists at (773) 762-1000 or submit an online quote request. Have your vehicle year, make, model, and VIN handy.' },
              { n: '2', title: 'Get Your Price', body: 'We check stock and give you an honest price — guaranteed to be the best you\'ll find. No hidden fees, no surprises.' },
              { n: '3', title: 'Confirm & Schedule Delivery', body: 'Confirm your order and we\'ll schedule same-day or next-day delivery to your shop or location.' },
              { n: '4', title: 'Receive & Inspect', body: 'Our driver delivers direct to your bay. Inspect parts on arrival — any issues are resolved immediately, no hassle.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="parts-step">
                <span className="parts-step__num">{n}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <span className="chip" style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}>
                READY TO ORDER?
              </span>
              <h2 style={{ color: '#fff', marginTop: 14 }}>
                We have the part. Let&apos;s get it to you today.
              </h2>
              <p style={{ color: 'rgba(255,255,255,.8)', marginTop: 10 }}>
                Our parts specialists are standing by Mon–Fri 8 AM–7 PM CST.
                Same-day delivery available for orders placed before cutoff.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <a className="btn btn--primary btn--lg" href="tel:17737621000">
                <svg width="18" height="18"><use href="#i-phone" /></svg>
                (773) 762-1000
              </a>
              <a className="btn btn--ghost-light btn--lg" href="/#contact">
                Request a Quote
                <svg className="arrow" width="18" height="18"><use href="#i-arrow" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
