import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns & Warranty Policy',
  description:
    'Return and exchange policy for auto body parts at Best Value Auto Body Supply. 15-day return window, manufacturer warranty, and our no-hassle process. Melrose Park, IL.',
  keywords: [
    'auto parts return policy', 'collision parts warranty', 'auto body parts exchange',
    'Best Value return policy', 'aftermarket parts warranty',
  ],
  alternates: { canonical: 'https://www.bestvaluepart.com/returns' },
  openGraph: {
    title: 'Returns & Warranty — Best Value Auto Body Supply',
    description: '15-day returns, manufacturer warranty, no-hassle exchange process.',
    url: 'https://www.bestvaluepart.com/returns',
  },
}

const returnItems = [
  'All returns and exchanges must be notified to and authorized by a sales representative within 15 days of delivery.',
  'Products that have been opened or used cannot be returned.',
  'No returns will be accepted after 21 days of receipt.',
  'A 20% restocking fee applies to all returns, covering shipping, handling, and processing costs.',
  'Special order items cannot be returned under any circumstances.',
  'The original invoice or pick ticket must accompany every return.',
  'Parts must be in new, resalable condition and in their original packaging.',
  'Painted or otherwise altered parts are not eligible for return.',
]

const warrantyItems = [
  'All merchandise is subject only to the manufacturer\'s warranty terms and conditions.',
  'Accessories carry a 30-day warranty from the date of delivery.',
  'Light bulbs carry a 90-day warranty from the date of delivery.',
  'Defects resulting from customer abuse, negligence, or mishandling void all warranty coverage.',
  'The customer is responsible for all shipping costs associated with warranty claims.',
  'No labor costs or inconvenience claims are covered under any warranty.',
  'Best Value Auto Body Supply is not responsible for any damages caused by a product.',
  'We strongly recommend retaining original parts. Non-operational vehicles resulting from a warranty claim remain the customer\'s responsibility.',
]

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="policy-list">
      {items.map((item, i) => (
        <li key={i}>
          <span className="policy-list__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4 12 5 5 11-11" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ReturnsPage() {
  return (
    <>
      {/* Page banner */}
      <div className="page-banner">
        <div className="container page-banner__inner">
          <span className="eyebrow" style={{ color: '#FFB3B6' }}>Policies</span>
          <h1>Returns &amp; Warranty</h1>
          <p>
            We stand behind every part we sell. Review our return and warranty policies below,
            or call a specialist if you need help with an order.
          </p>
        </div>
      </div>

      {/* Policy content */}
      <section className="section section--soft">
        <div className="container">
          <div className="policy-grid">

            {/* Card 1 - Return Policy */}
            <div className="policy-card">
              <div className="policy-card__head">
                <span className="policy-card__num">1</span>
                <h3>Return Policy</h3>
              </div>
              <PolicyList items={returnItems} />
              <p className="policy-note">
                <strong>Refused shipments:</strong> Customers who reject deliveries at the door
                must pay the return freight charges plus a 20% restocking fee before any future
                orders can be processed.
              </p>
            </div>

            {/* Card 2 - Incorrect Parts */}
            <div className="policy-card">
              <div className="policy-card__head">
                <span className="policy-card__num">2</span>
                <h3>Received an Incorrect Part?</h3>
              </div>
              <ul className="policy-list">
                <li>
                  <span className="policy-list__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m4 12 5 5 11-11" />
                    </svg>
                  </span>
                  Report any incorrect items to our team immediately upon delivery. Do not install
                  or modify the part.
                </li>
                <li>
                  <span className="policy-list__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m4 12 5 5 11-11" />
                    </svg>
                  </span>
                  We will issue a call tag for the return at no cost to you and arrange
                  replacement delivery via the original shipping method.
                </li>
                <li>
                  <span className="policy-list__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m4 12 5 5 11-11" />
                    </svg>
                  </span>
                  Replacement is contingent on receiving the incorrect part back in its original
                  condition.
                </li>
              </ul>
            </div>

            {/* Card 3 - Warranties */}
            <div className="policy-card">
              <div className="policy-card__head">
                <span className="policy-card__num">3</span>
                <h3>Warranty Coverage</h3>
              </div>
              <PolicyList items={warrantyItems} />
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner" style={{ gridTemplateColumns: '1fr' }}>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
              <span className="chip" style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}>
                NEED HELP WITH A RETURN?
              </span>
              <h2 style={{ marginTop: 14, color: '#fff' }}>
                Talk to a parts specialist - we&apos;ll sort it out fast.
              </h2>
              <p style={{ color: 'rgba(255,255,255,.8)', marginTop: 12 }}>
                Call or submit a request and one of our team members will walk you through the
                return or warranty process, usually within minutes.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
                <a className="btn btn--primary btn--lg" href="tel:17737621000">
                  <svg width="18" height="18"><use href="#i-phone" /></svg>
                  Call (773) 762-1000
                </a>
                <a className="btn btn--ghost-light btn--lg" href="/#contact">
                  Submit a request
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
