import type { Metadata } from 'next'
import Image from 'next/image'
import CareersClient from '@/components/CareersClient'
import JsonLd from '@/components/JsonLd'

const BASE = 'https://www.bestvaluepart.com'

export const metadata: Metadata = {
  title: 'Careers — Join Our Team',
  description:
    'Work at Best Value Auto Body Supply in Melrose Park, IL. Open positions in parts sales, delivery driving, warehouse operations, and customer service. Competitive pay, health benefits, company vehicle.',
  keywords: [
    'auto parts jobs Chicago', 'careers Melrose Park IL', 'delivery driver job Chicago',
    'auto body parts sales job', 'warehouse job Melrose Park', 'Best Value Auto Body careers',
  ],
  alternates: { canonical: `${BASE}/careers` },
  openGraph: {
    title: 'Careers — Best Value Auto Body Supply',
    description: 'Join our growing team in Melrose Park, IL. Competitive pay, health benefits, and room to grow.',
    url: `${BASE}/careers`,
  },
}

const jobPostingSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Parts Sales Representative',
    description: 'Handle inbound and outbound sales of auto body and collision parts to repair shops, dealerships, and individual customers. Requires auto parts knowledge and strong customer service skills.',
    datePosted: '2026-01-01',
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Best Value Auto Body Supply',
      sameAs: BASE,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '160-150 25th Ave',
        addressLocality: 'Melrose Park',
        addressRegion: 'IL',
        postalCode: '60160',
        addressCountry: 'US',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: { '@type': 'QuantitativeValue', minValue: 45000, maxValue: 75000, unitText: 'YEAR' },
    },
    applicationContact: { '@type': 'ContactPoint', email: 'infor@bestvaluepart.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Delivery Driver - Parts & Logistics',
    description: 'Drive our branded delivery fleet to deliver auto body parts to collision shops and customers across the Chicago metro area. Valid driver\'s license required. Company vehicle provided.',
    datePosted: '2026-01-01',
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Best Value Auto Body Supply',
      sameAs: BASE,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '160-150 25th Ave',
        addressLocality: 'Melrose Park',
        addressRegion: 'IL',
        postalCode: '60160',
        addressCountry: 'US',
      },
    },
    applicationContact: { '@type': 'ContactPoint', email: 'infor@bestvaluepart.com' },
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Careers', item: `${BASE}/careers` },
  ],
}

const perks = [
  { icon: '💰', title: 'Competitive Pay', body: 'Market-rate wages plus performance bonuses for sales roles.' },
  { icon: '🚗', title: 'Company Vehicle', body: 'Delivery drivers get a fully maintained company vehicle.' },
  { icon: '🏥', title: 'Health Benefits', body: 'Medical, dental, and vision coverage for full-time employees.' },
  { icon: '📈', title: 'Room to Grow', body: '25 years of growth - we promote from within whenever possible.' },
]

export default function CareersPage() {
  return (
    <>
      <JsonLd data={jobPostingSchemas} />
      <JsonLd data={breadcrumbSchema} />
      {/* Page banner */}
      <div className="page-banner page-banner--split">
        <div className="container page-banner__inner">
          <div className="page-banner__copy">
            <span className="eyebrow" style={{ color: '#FFB3B6' }}>We&apos;re hiring</span>
            <h1>Build Your Career at Best Value</h1>
            <p>
              Join a 25-year-old company that&apos;s still growing. We&apos;re looking for driven,
              customer-focused people to help us serve collision shops and drivers across
              the Chicago metro area.
            </p>
          </div>
          <div className="page-banner__visual" aria-hidden="true">
            <Image
              src="/careers.webp"
              alt="Best Value Auto Body Supply team"
              width={835}
              height={520}
              className="page-banner__img"
              priority
            />
          </div>
        </div>
      </div>

      {/* Job listings */}
      <section className="section">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Open Positions</span>
              <h2>Current Openings</h2>
            </div>
            <p style={{ maxWidth: 440, color: 'var(--ink-2)', fontSize: 15 }}>
              Don&apos;t see a fit? Email your resume to{' '}
              <a href="mailto:infor@bestvaluepart.com" style={{ color: 'var(--bv-red)' }}>
                infor@bestvaluepart.com
              </a>{' '}
              and we&apos;ll keep it on file.
            </p>
          </div>
          <CareersClient />
        </div>
      </section>

      {/* Perks strip */}
      <section className="section section--soft">
        <div className="container">
          <div className="perks-grid">
            {perks.map(({ icon, title, body }) => (
              <div key={title} className="perk-card">
                <span className="perk-card__icon">{icon}</span>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
