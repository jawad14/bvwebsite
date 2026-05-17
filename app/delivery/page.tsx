import type { Metadata } from 'next'
import Image from 'next/image'
import JsonLd from '@/components/JsonLd'

const BASE = 'https://www.bestvaluepart.com'

export const metadata: Metadata = {
  title: 'Same-Day Parts Delivery — Zones & Schedule',
  description:
    'Same-day auto body parts delivery across the Chicago metro — Melrose Park, Chicago, Evanston, Naperville & more. Zone 1 delivery in 1–2 hours. 5-state regional coverage. Call (773) 762-1000.',
  keywords: [
    'same day auto parts delivery Chicago', 'auto body parts delivery Melrose Park',
    'collision parts delivery Illinois', 'parts delivery Naperville', 'parts delivery Evanston',
    'wholesale parts delivery Chicago metro', 'auto parts delivery same day', 'delivery zones Chicago',
  ],
  alternates: { canonical: `${BASE}/delivery` },
  openGraph: {
    title: 'Same-Day Parts Delivery — Best Value Auto Body Supply',
    description: 'Zone 1 delivery in 1–2 hours. Chicago metro same-day. 5-state regional coverage. Order by 4 PM.',
    url: `${BASE}/delivery`,
    images: [{ url: `${BASE}/delivery-truck.webp`, width: 3048, height: 1376, alt: 'Best Value delivery truck' }],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE}/delivery#service`,
  name: 'Same-Day Auto Body Parts Delivery',
  description: 'Best Value Auto Body Supply offers same-day delivery of OEM-quality auto body and collision parts across the Chicago metro area and regional states. Our own branded fleet runs multiple daily routes.',
  provider: { '@id': `${BASE}/#organization` },
  areaServed: [
    { '@type': 'City', name: 'Chicago', containedIn: { '@type': 'State', name: 'Illinois' } },
    { '@type': 'City', name: 'Melrose Park' },
    { '@type': 'City', name: 'Evanston' },
    { '@type': 'City', name: 'Naperville' },
    { '@type': 'City', name: 'Joliet' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'Indiana' },
    { '@type': 'State', name: 'Wisconsin' },
    { '@type': 'State', name: 'Iowa' },
    { '@type': 'State', name: 'Michigan' },
  ],
  serviceType: 'Parts Delivery',
  url: `${BASE}/delivery`,
  offers: {
    '@type': 'Offer',
    description: 'Free delivery on orders over $150 (Zone 1 & 2) or $250 (Zone 3 & regional)',
    priceCurrency: 'USD',
    eligibleRegion: { '@type': 'State', name: 'Illinois' },
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Same-Day Delivery', item: `${BASE}/delivery` },
  ],
}

const stats = [
  { value: '2x Daily', label: 'Local delivery runs' },
  { value: 'Same Day', label: 'Metro-area orders' },
  { value: '5 States', label: 'Regional coverage' },
  { value: '25 Yrs', label: 'Serving the industry' },
]

const localZones = [
  {
    zone: 'Zone 1 - Immediate Local',
    time: 'Twice Daily',
    color: '#ED1C24',
    cutoff: 'AM: 8:30 · PM: 12:30',
    areas: [
      'Melrose Park', 'Franklin Park', 'River Grove', 'Elmwood Park',
      'Northlake', 'Stone Park', 'Bellwood', 'Hillside', 'Berkeley',
      'Maywood', 'Broadview', 'Westchester',
    ],
  },
  {
    zone: 'Zone 2 - Chicago & Inner Suburbs',
    time: 'Twice Daily',
    color: '#001D68',
    cutoff: 'AM: 8:30 · PM: 12:30',
    areas: [
      'Chicago (All neighborhoods)', 'Oak Park', 'Berwyn', 'Cicero',
      'Evanston', 'Skokie', 'Lincolnwood', 'Niles', 'Rosemont',
      'Schiller Park', 'Bensenville', 'Wood Dale', 'Addison',
    ],
  },
  {
    zone: 'Zone 3 - Extended Metro',
    time: 'Same Day',
    color: '#0ea5e9',
    cutoff: 'Order by 8:45 AM',
    areas: [
      'Des Plaines', 'Palatine', 'Arlington Heights', 'Schaumburg',
      'Elgin', 'Aurora', 'Naperville', 'Bolingbrook', 'Joliet',
      'Orland Park', 'Tinley Park', 'Homewood', 'Harvey', 'Calumet City',
    ],
  },
]

const regionalZones = [
  {
    state: 'Illinois',
    coverage: 'Chicago & Surrounding Suburbs',
    time: 'Same Day / Next Day',
    cities: ['Chicago', 'Melrose Park', 'Oak Park', 'Evanston', 'Skokie', 'Cicero', 'Berwyn', 'Wilmette', 'Niles', 'Schiller Park'],
  },
  {
    state: 'Indiana',
    coverage: 'Northwest & Central IN',
    time: 'Same Day / Next Day',
    cities: ['Whiting', 'East Chicago', 'Hammond', 'Gary', 'Dyer', 'Highland', 'Griffith', 'Schererville', 'Merrillville'],
  },
  {
    state: 'Wisconsin',
    coverage: 'Southeast WI',
    time: 'Next Business Day',
    cities: ['Kenosha', 'Racine', 'Elkhorn', 'Milwaukee', 'Waukesha', 'Cudahy', 'Brookfield', 'Franklin', 'Big Bend'],
  },
  {
    state: 'Iowa',
    coverage: 'Eastern IA',
    time: '1–2 Business Days',
    cities: ['Silvis', 'Moline', 'Davenport', 'Muscatine', 'West Liberty', 'Iowa City', 'Cedar Rapids', 'Des Moines', 'Marshalltown'],
  },
  {
    state: 'Indiana (Extended)',
    coverage: 'Central & South IN',
    time: '1–2 Business Days',
    cities: ['South Bend', 'Niles', 'Elkhart', 'Lafayette', 'Frankfort', 'Lebanon', 'Indianapolis', 'Carmel', 'Fishers', 'Lawrence', 'Beech Grove', 'Greenwood', 'Plainfield', 'Brownsburg', 'Avon'],
  },
]

const rules = [
  {
    n: '1',
    title: 'Order Cutoff Times',
    body: 'Zone 1 and Zone 2 run twice daily - AM route cutoff is 8:30 AM, PM route cutoff is 12:30 PM. Zone 3 same-day cutoff is 8:45 AM. Orders placed after cutoff are scheduled for the next available route.',
  },
  {
    n: '2',
    title: 'Signature & Receiving',
    body: 'A signature is required upon delivery for all orders over $500. Please ensure someone is available to receive and inspect parts at the time of delivery. Damages must be reported immediately.',
  },
  {
    n: '3',
    title: 'Refused or Missed Deliveries',
    body: 'Refused deliveries are subject to a 25% restocking fee plus return freight charges. If our driver cannot reach you, we will call ahead - a second attempt may incur a redelivery fee.',
  },
  {
    n: '4',
    title: 'Scheduling & Route Changes',
    body: 'Need to schedule a specific delivery window? Call our dispatch team by 9:00 AM and we will do our best to accommodate. Route changes after dispatch may not always be possible.',
  },
  {
    n: '5',
    title: 'Damaged or Incorrect Parts',
    body: 'Inspect all parts before signing. Report damage or incorrect items immediately - do not install or modify the part. We will issue an RMA and arrange a replacement at no cost to you.',
  },
]

export default function DeliveryPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Hero */}
      <div className="delivery-hero">
        <div className="delivery-hero__bg" />
        <div className="container delivery-hero__inner">
          <div className="delivery-hero__copy">
            <span className="eyebrow" style={{ color: '#FFB3B6' }}>Our Fleet</span>
            <h1>Fast, Reliable Parts Delivery</h1>
            <p>
              Our own branded delivery fleet runs daily routes across the Chicago metro area
              and into surrounding states. Same-day delivery to local shops -
              no third-party carriers, no excuses.
            </p>
            <div className="delivery-hero__actions">
              <a className="btn btn--primary btn--lg" href="tel:17737621000">
                <svg width="18" height="18"><use href="#i-phone" /></svg>
                Schedule a Delivery
              </a>
              <a className="btn btn--ghost-light btn--lg" href="/#contact">
                Request a Quote
                <svg className="arrow" width="18" height="18"><use href="#i-arrow" /></svg>
              </a>
            </div>
          </div>
          <div className="delivery-hero__truck">
            <Image
              src="/delivery-truck.webp"
              alt="Best Value Auto Body Supply delivery truck"
              width={3048}
              height={1376}
              priority
              className="delivery-hero__img"
            />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="delivery-stats">
        <div className="container delivery-stats__row">
          {stats.map(({ value, label }) => (
            <div key={label} className="delivery-stat">
              <span className="delivery-stat__val">{value}</span>
              <span className="delivery-stat__label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Local delivery zones */}
      <section className="section">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Chicago Metro</span>
              <h2>Local Delivery Zones &amp; Times</h2>
            </div>
            <p style={{ maxWidth: 400, color: 'var(--ink-2)', fontSize: 15 }}>
              We run multiple routes daily. The earlier you order, the faster we deliver.
            </p>
          </div>
          <div className="dzone-grid">
            {localZones.map(({ zone, time, color, cutoff, areas }) => (
              <div key={zone} className="dzone-card" style={{ '--zone-color': color } as React.CSSProperties}>
                <div className="dzone-card__head">
                  <div>
                    <p className="dzone-card__zone">{zone}</p>
                    <h3 className="dzone-card__time">{time}</h3>
                  </div>
                  <span className="dzone-card__cutoff">{cutoff}</span>
                </div>
                <ul className="dzone-areas">
                  {areas.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional coverage */}
      <section className="section section--soft">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 36 }}>
            <div>
              <span className="eyebrow">Beyond Illinois</span>
              <h2>Regional State Coverage</h2>
            </div>
            <p style={{ maxWidth: 400, color: 'var(--ink-2)', fontSize: 15 }}>
              We ship to 5 surrounding states. Call to confirm coverage for your specific location.
            </p>
          </div>
          <div className="regional-grid">
            {regionalZones.map(({ state, coverage, time, cities }) => (
              <div key={state} className="regional-card">
                <div className="regional-card__head">
                  <div>
                    <div className="regional-card__state">{state}</div>
                    <div className="regional-card__coverage">{coverage}</div>
                  </div>
                  <span className="regional-card__time">{time}</span>
                </div>
                <div className="regional-card__body">
                  <div className="regional-card__label">Coverage includes</div>
                  <div className="regional-card__cities">
                    {cities.map(city => (
                      <span key={city} className="regional-card__city">{city}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Rules */}
      <section className="section">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Policies</span>
              <h2>Delivery Rules &amp; Policies</h2>
            </div>
          </div>
          <div className="delivery-rules">
            {rules.map(({ n, title, body }) => (
              <div key={n} className="delivery-rule">
                <span className="delivery-rule__num">{n}</span>
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
      <section className="section section--soft">
        <div className="container">
          <div className="cta-banner" style={{ gridTemplateColumns: '1fr' }}>
            <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto' }}>
              <span className="chip" style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}>
                READY TO ORDER?
              </span>
              <h2 style={{ marginTop: 14, color: '#fff' }}>
                Call now and we&apos;ll dispatch today.
              </h2>
              <p style={{ color: 'rgba(255,255,255,.8)', marginTop: 12 }}>
                Our dispatch team is standing by. Tell us what you need and your location -
                we&apos;ll confirm your delivery window on the spot.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
                <a className="btn btn--primary btn--lg" href="tel:17737621000">
                  <svg width="18" height="18"><use href="#i-phone" /></svg>
                  Call (773) 762-1000
                </a>
                <a className="btn btn--ghost-light btn--lg" href="/#contact">
                  Request a Quote
                  <svg className="arrow" width="18" height="18"><use href="#i-arrow" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
