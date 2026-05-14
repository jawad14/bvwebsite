import type { Metadata } from 'next'
import Image from 'next/image'
import CareersClient from '@/components/CareersClient'

export const metadata: Metadata = {
  title: 'Careers | Best Value Auto Body Supply',
  description:
    'Join the Best Value Auto Body Supply team. Browse open positions in sales, operations, logistics, and customer service and apply online.',
}

const perks = [
  { icon: '💰', title: 'Competitive Pay', body: 'Market-rate wages plus performance bonuses for sales roles.' },
  { icon: '🚗', title: 'Company Vehicle', body: 'Delivery drivers get a fully maintained company vehicle.' },
  { icon: '🏥', title: 'Health Benefits', body: 'Medical, dental, and vision coverage for full-time employees.' },
  { icon: '📈', title: 'Room to Grow', body: '25 years of growth — we promote from within whenever possible.' },
]

export default function CareersPage() {
  return (
    <>
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
              src="/careers.png"
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
              <a href="mailto:careers@bestvaluepart.com" style={{ color: 'var(--bv-red)' }}>
                careers@bestvaluepart.com
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
