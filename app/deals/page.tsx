import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { deals } from '@/lib/deals'

export const metadata: Metadata = {
  title: 'Deals & Promotions — Weekly Specials',
  description:
    'Current deals and weekly specials on auto body parts and refinishing supplies at Best Value Auto Body Supply, Melrose Park, IL. Discounts on bumpers, headlights, paint, and more.',
  keywords: [
    'auto body parts deals Chicago', 'collision parts promotions Illinois',
    'auto parts weekly specials', 'bumper deals Chicago', 'headlight specials Illinois',
    'auto paint promotions', 'Best Value Auto Body deals',
  ],
  alternates: { canonical: 'https://www.bestvaluepart.com/deals' },
  openGraph: {
    title: 'Deals & Weekly Specials — Best Value Auto Body Supply',
    description: 'Weekly and monthly specials on collision parts and refinishing supplies. Updated regularly.',
    url: 'https://www.bestvaluepart.com/deals',
  },
}

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  'This Week':    { bg: '#fff3cd', color: '#92400e' },
  'This Month':   { bg: '#dbeafe', color: '#1e3a8a' },
  'Limited Time': { bg: '#fce7f3', color: '#9d174d' },
  'Clearance':    { bg: '#fee2e2', color: '#991b1b' },
  'Bundle Deal':  { bg: '#d1fae5', color: '#065f46' },
  'Flash Sale':   { bg: '#ede9fe', color: '#4c1d95' },
  'New':          { bg: '#ecfdf5', color: '#065f46' },
}

function isExpired(dateStr: string) {
  return new Date(dateStr) < new Date(new Date().toDateString())
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function DealsPage() {
  redirect('/')
  const activeDeals   = deals.filter(d => d.active && !isExpired(d.validUntil))
  const expiredDeals  = deals.filter(d => d.active && isExpired(d.validUntil))

  return (
    <>
      {/* Banner */}
      <div className="page-banner">
        <div className="container page-banner__inner">
          <span className="eyebrow" style={{ color: '#FFB3B6' }}>
            🔥 Current Promotions
          </span>
          <h1>Deals &amp; Weekly Specials</h1>
          <p>
            New deals every week on parts, paint, and supplies. Call to order and mention
            the deal - our team will apply your discount automatically.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
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

      {/* Active deals */}
      <section className="section">
        <div className="container">
          {activeDeals.length === 0 ? (
            <div className="deals-empty">
              <span style={{ fontSize: 48 }}>🔧</span>
              <h3>New deals coming soon</h3>
              <p>Check back next week or call us - we always have something for our regular customers.</p>
              <a className="btn btn--primary" href="tel:17737621000">
                <svg width="16" height="16"><use href="#i-phone" /></svg>
                Call (773) 762-1000
              </a>
            </div>
          ) : (
            <>
              <div className="section__head" style={{ marginBottom: 36 }}>
                <div>
                  <span className="eyebrow">Active Now</span>
                  <h2>{activeDeals.length} Deal{activeDeals.length !== 1 ? 's' : ''} Running</h2>
                </div>
                <p style={{ color: 'var(--ink-2)', fontSize: 15, maxWidth: 380 }}>
                  Deals change weekly. Subscribe to our newsletter or check back often.
                </p>
              </div>
              <div className="deals-grid">
                {activeDeals.map(deal => {
                  const badgeStyle = BADGE_COLORS[deal.badge] ?? { bg: '#f3f4f6', color: '#374151' }
                  const daysLeft = Math.ceil(
                    (new Date(deal.validUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  )
                  return (
                    <div key={deal.id} className="deal-card">
                      <div className="deal-card__top">
                        <span
                          className="deal-badge"
                          style={{ background: badgeStyle.bg, color: badgeStyle.color }}
                        >
                          {deal.badge}
                        </span>
                        <span className="deal-card__cat">{deal.category}</span>
                      </div>

                      <div className="deal-card__highlight">{deal.highlight}</div>
                      <h3 className="deal-card__title">{deal.title}</h3>
                      <p className="deal-card__desc">{deal.description}</p>

                      <div className="deal-card__footer">
                        <div className="deal-card__meta">
                          <span className={`deal-expiry${daysLeft <= 3 ? ' deal-expiry--urgent' : ''}`}>
                            {daysLeft <= 3
                              ? `⚡ Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}!`
                              : `Valid until ${formatDate(deal.validUntil)}`}
                          </span>
                          <span className="deal-terms">{deal.terms}</span>
                        </div>
                        <a
                          className="btn btn--primary"
                          href={deal.ctaHref ?? 'tel:17737621000'}
                        >
                          {deal.ctaHref && !deal.ctaHref.startsWith('tel')
                            ? null
                            : <svg width="15" height="15"><use href="#i-phone" /></svg>
                          }
                          {deal.ctaLabel ?? 'Call to Order'}
                          {deal.ctaHref && !deal.ctaHref.startsWith('tel') && (
                            <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>
                          )}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Expired deals (collapsed) */}
      {expiredDeals.length > 0 && (
        <section className="section section--soft">
          <div className="container">
            <div className="section__head" style={{ marginBottom: 24 }}>
              <div>
                <span className="eyebrow">Past Promotions</span>
                <h2>Recently Expired</h2>
              </div>
            </div>
            <div className="deals-expired">
              {expiredDeals.map(deal => (
                <div key={deal.id} className="deal-expired-row">
                  <span className="deal-expired-row__title">{deal.title}</span>
                  <span className="deal-expired-row__cat">{deal.category}</span>
                  <span className="deal-expired-row__highlight">{deal.highlight}</span>
                  <span className="deal-expired-row__date">Ended {formatDate(deal.validUntil)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner" style={{ gridTemplateColumns: '1fr' }}>
            <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
              <span className="chip" style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}>
                NEVER MISS A DEAL
              </span>
              <h2 style={{ marginTop: 14, color: '#fff' }}>
                Register your shop and get deals first.
              </h2>
              <p style={{ color: 'rgba(255,255,255,.8)', marginTop: 12 }}>
                Registered business accounts get early access to weekly specials,
                exclusive pricing, and a dedicated account rep who knows your needs.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
                <a className="btn btn--primary btn--lg" href="/register">
                  Register Your Business
                  <svg className="arrow" width="18" height="18"><use href="#i-arrow" /></svg>
                </a>
                <a className="btn btn--ghost-light btn--lg" href="tel:17737621000">
                  <svg width="18" height="18"><use href="#i-phone" /></svg>
                  Call (773) 762-1000
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
