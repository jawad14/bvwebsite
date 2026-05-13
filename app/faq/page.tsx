import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'

export const metadata: Metadata = {
  title: 'FAQs | Best Value Auto Body Supply',
  description:
    'Frequently asked questions about aftermarket parts, OEM, CAPA certified parts, Partlink, NSF certification, warranties, and ordering from Best Value Auto Body Supply.',
}

export default function FaqPage() {
  return (
    <>
      {/* Page banner */}
      <div className="page-banner">
        <div className="container page-banner__inner">
          <span className="eyebrow" style={{ color: '#FFB3B6' }}>Support</span>
          <h1>Frequently Asked Questions</h1>
          <p>
            Here you can find answers to the questions most people have about our parts,
            certifications, warranties, and ordering process.
          </p>
        </div>
      </div>

      {/* FAQ accordion */}
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <FaqAccordion />

          {/* Still have questions CTA */}
          <div className="faq-cta">
            <div>
              <h3>Still have a question?</h3>
              <p>
                Our parts specialists are standing by. Call us or send a message and
                we&apos;ll get back to you within minutes.
              </p>
            </div>
            <div className="faq-cta__actions">
              <a className="btn btn--primary" href="tel:17737621000">
                <svg width="16" height="16"><use href="#i-phone" /></svg>
                Call (773) 762-1000
              </a>
              <a className="btn btn--ghost" href="/#contact">
                Request a quote
                <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
