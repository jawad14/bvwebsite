import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'
import JsonLd from '@/components/JsonLd'

const BASE = 'https://www.bestvaluepart.com'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about aftermarket vs OEM parts, CAPA & NSF certification, Partlink numbers, warranties, and how to order from Best Value Auto Body Supply in Melrose Park, IL.',
  keywords: [
    'aftermarket parts FAQ', 'OEM parts definition', 'CAPA certified parts explained',
    'NSF certified auto parts', 'Partlink number', 'auto parts warranty', 'collision parts questions',
    'Best Value Auto Body FAQ',
  ],
  alternates: { canonical: `${BASE}/faq` },
  openGraph: {
    title: 'FAQs — Best Value Auto Body Supply',
    description: 'Everything you need to know about OEM-quality aftermarket parts, certifications, warranties, and ordering.',
    url: `${BASE}/faq`,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are Aftermarket Parts?',
      acceptedAnswer: { '@type': 'Answer', text: 'Aftermarket parts are the parts of a vehicle available in the market and used as replacements for the original parts of a vehicle.' },
    },
    {
      '@type': 'Question',
      name: 'What is OEM?',
      acceptedAnswer: { '@type': 'Answer', text: 'Original Equipment Manufacturer (OEM) parts are those components of a vehicle that were used during its original construction and assembly by the manufacturer. These parts are not necessarily manufactured by the car builder but are used in its original assembly.' },
    },
    {
      '@type': 'Question',
      name: 'What is meant by CAPA Certified Parts?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Certified Automotive Parts Association (CAPA) was established in the public interest in 1987 to set up and oversee a testing program to assure the suitability and quality of automotive replacement parts. CAPA Certification is even recognized by government regulators as an assurance of quality.' },
    },
    {
      '@type': 'Question',
      name: 'What is Partlink?',
      acceptedAnswer: { '@type': 'Answer', text: 'Partlink is a universal numbering system for the identification of aftermarket collision replacement parts. It provides a unique, universal part number for each independently reproduced replacement part as supplied by all aftermarket manufacturers and suppliers.' },
    },
    {
      '@type': 'Question',
      name: 'How do I know I am ordering the correct part?',
      acceptedAnswer: { '@type': 'Answer', text: 'We include the OEM Part Number and Partslink in our listings. The OEM part number and Partslink ensure that the part is the same as the one your dealership would use, giving you confidence that you are ordering exactly the right part for your vehicle.' },
    },
    {
      '@type': 'Question',
      name: 'What are NSF-certified parts?',
      acceptedAnswer: { '@type': 'Answer', text: 'NSF Automotive is an independent third-party certifier of automotive aftermarket parts, providing global certification services throughout the automotive supply chain. It is accredited to develop and certify to a range of automotive industry standards and is established to certify aftermarket auto parts in North America and Australia.' },
    },
    {
      '@type': 'Question',
      name: 'What is the warranty on the parts?',
      acceptedAnswer: { '@type': 'Answer', text: 'All merchandise sold by Best Value Auto Body Supply is subject only to the manufacturer\'s warranty and conditions, if any, and is subject to submission to the manufacturer for inspection and approval for repair or replacement of merchandise. All other accessories carry a 30-day warranty; light bulbs carry a 90-day warranty.' },
    },
    {
      '@type': 'Question',
      name: 'Do the parts come with hardware like nuts, screws, bolts and brackets?',
      acceptedAnswer: { '@type': 'Answer', text: 'Our parts do not come with any accessories or hardware. We highly recommend reusing any accessories from the old parts that are not damaged. If you do need installation hardware, your local dealership, hardware store, or auto parts store will typically have what you need.' },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'FAQs', item: `${BASE}/faq` },
  ],
}

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
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
