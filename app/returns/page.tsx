import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns & Warranty Policy',
  description:
    'Return and exchange policy for auto body parts at Best Value Auto Body Supply. RMA required, 25% restocking fee, manufacturer warranty, and specific part warranty details. Melrose Park, IL.',
  keywords: [
    'auto parts return policy', 'collision parts warranty', 'auto body parts exchange',
    'Best Value return policy', 'aftermarket parts warranty', 'RMA auto parts',
  ],
  alternates: { canonical: 'https://www.bestvaluepart.com/returns' },
  openGraph: {
    title: 'Returns & Warranty — Best Value Auto Body Supply',
    description: 'RMA-based returns, 25% restocking fee, manufacturer warranty, and specific part warranty coverage.',
    url: 'https://www.bestvaluepart.com/returns',
  },
}

const returnItems = [
  'All returns and exchanges must be notified to and authorized by a sales representative within 15 days of delivery, for no charge or fee.',
  'Products that have been worked on cannot be returned.',
  'No returns will be accepted after 1 year of receipt.',
  'A 25% restocking fee applies to all returns, covering shipping, handling, and processing costs.',
  'Special order items may be returned with a 25% restocking fee.',
  'The original invoice or pick ticket must accompany every return.',
  'Parts must be in new, resalable condition and in their original packaging.',
  'Painted or otherwise altered parts are not eligible for return.',
]

const warrantyItems = [
  'All merchandise is subject only to the manufacturer\'s warranty terms and conditions.',
  'Lights, mirrors, and fans carry a 6-month warranty from the date of delivery.',
  'Defects resulting from customer abuse, negligence, or mishandling void all warranty coverage.',
  'The customer is responsible for all shipping costs associated with warranty claims.',
  'No labor costs or inconvenience claims are covered under any warranty.',
  'Best Value Auto Body Supply is not responsible for any damages caused by a product.',
  'We strongly recommend retaining original parts. Non-operational vehicles resulting from a warranty claim remain the customer\'s responsibility.',
]

const warrantyDetails = [
  {
    part: 'Radiator & A/C Condenser',
    condition: 'Normal leaking without any damage',
    coverage: '1-Year',
    action: 'Exchange or full refund from date of purchase',
  },
  {
    part: 'Radiator Fan & A/C Fan Motor',
    condition: 'Does not work or fan blade shaking',
    coverage: '6-Month',
    action: 'Exchange or full refund from date of purchase',
  },
  {
    part: 'All Lights & Mirror Glass',
    condition: 'Normal leaking (lights) or glass shaking (mirrors)',
    coverage: '6-Month',
    action: 'Exchange or full refund from date of purchase',
  },
  {
    part: 'Black & Chrome Steel Bumpers',
    condition: 'Rusted',
    coverage: '1-Year',
    action: 'Exchange or full refund from date of purchase',
  },
]

const rmaSteps = [
  { n: '1', text: 'Make sure your parts are the correct ones. When receiving parts, check for damage and that the side matches the box label.' },
  { n: '2', text: 'Ask our driver to give you the Customer Copy and save it. You will need this to return your parts.' },
  { n: '3', text: 'Call our sales representatives to schedule an RMA (Return Merchandise Authorization).' },
  { n: '4', text: 'Part must be unaltered and undamaged, with its original packaging and in resalable form.' },
  { n: '5', text: 'Once the part is picked up by the driver, it will be inspected and approved by the warehouse manager.' },
  { n: '6', text: 'If the part is accepted for return, credit will take 24 hours to be posted to your account.' },
  { n: '7', text: 'If the part is not accepted for return, the part will be returned the next business day.' },
  { n: '8', text: 'Drivers are not allowed to pick up parts without a scheduled RMA.' },
  { n: '9', text: 'Drivers are not allowed to give credit for any returned parts.' },
  { n: '10', text: 'Credits will not be available instantly or used for exchanges while the part is being returned.' },
]

function CheckIcon() {
  return (
    <span className="policy-list__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m4 12 5 5 11-11" />
      </svg>
    </span>
  )
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="policy-list">
      {items.map((item, i) => (
        <li key={i}><CheckIcon />{item}</li>
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
                must pay the return freight charges plus a 25% restocking fee before any future
                orders can be processed.
              </p>
              <p className="policy-note" style={{ marginTop: 10, background: 'rgba(237,28,36,.06)', borderColor: 'var(--bv-red)' }}>
                <strong>RMA required:</strong> For all deliveries, a Return Merchandise
                Authorization (RMA) must be requested. Contact our sales team to schedule your RMA
                before any parts are picked up.
              </p>
            </div>

            {/* Card 2 - Incorrect Parts */}
            <div className="policy-card">
              <div className="policy-card__head">
                <span className="policy-card__num">2</span>
                <h3>Received an Incorrect Part?</h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 16 }}>
                (Part received is different from what was on the invoice)
              </p>
              <ul className="policy-list">
                <li>
                  <CheckIcon />
                  Report any incorrect items to our team immediately upon delivery. Do not install
                  or modify the part.
                </li>
                <li>
                  <CheckIcon />
                  We will issue an RMA for the return at no cost to you and arrange
                  replacement delivery via the original shipping method.
                </li>
                <li>
                  <CheckIcon />
                  Replacement is contingent on receiving the incorrect part back in its original
                  condition.
                </li>
              </ul>
            </div>

            {/* Card 3 - Warranty Coverage */}
            <div className="policy-card">
              <div className="policy-card__head">
                <span className="policy-card__num">3</span>
                <h3>Warranty Coverage</h3>
              </div>
              <PolicyList items={warrantyItems} />
            </div>

            {/* Card 4 - Parts Warranty Details */}
            <div className="policy-card" style={{ gridColumn: '1 / -1' }}>
              <div className="policy-card__head">
                <span className="policy-card__num">4</span>
                <h3>Parts Warranty Details</h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 24 }}>
                Specific warranty periods by part type. All warranties apply from the date of purchase and cover exchange or full refund.
              </p>
              <div className="warranty-table">
                <div className="warranty-table__head">
                  <span>Part Type</span>
                  <span>Covered Condition</span>
                  <span>Coverage Period</span>
                  <span>Resolution</span>
                </div>
                {warrantyDetails.map(({ part, condition, coverage, action }) => (
                  <div key={part} className="warranty-table__row">
                    <span className="warranty-part">{part}</span>
                    <span className="warranty-condition">{condition}</span>
                    <span className="warranty-period" style={{ color: coverage === '1-Year' ? 'var(--bv-red)' : 'var(--bv-navy)', fontWeight: 700 }}>{coverage}</span>
                    <span className="warranty-action">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 5 - RMA Procedure */}
            <div className="policy-card" style={{ gridColumn: '1 / -1' }}>
              <div className="policy-card__head">
                <span className="policy-card__num">5</span>
                <h3>Return Merchandise Authorization (RMA) Procedure</h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 24 }}>
                The following procedures are required to return parts and are effective April 14, 2025.
              </p>
              <div className="rma-steps">
                {rmaSteps.map(({ n, text }) => (
                  <div key={n} className="rma-step">
                    <span className="rma-step__num">{n}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>

              <div className="rma-spanish">
                <h4>Procedimiento de Devoluciones y Reembolsos</h4>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 16 }}>
                  Los siguientes procedimientos son necesarios para devolver piezas, vigente a partir del 14 de abril de 2025:
                </p>
                <ol className="rma-spanish__list">
                  <li><strong>Asegurese de que las piezas sean las correctas.</strong> Al recibirlas, compruebe que no presenten danos y que el lado coincida con lo que dice la etiqueta de la caja.</li>
                  <li><strong>Solicite a nuestro conductor la Copia del Cliente y guardela,</strong> la necesitara para devolver las piezas.</li>
                  <li><strong>Debera llamar a nuestros representantes de ventas para programar un RMA</strong> (Autorizacion de Devolucion de Mercancia).</li>
                  <li><strong>La pieza debe estar intacta y sin danos,</strong> en su empaque original y en condiciones aptas para su reventa.</li>
                  <li><strong>Una vez que el conductor recoja la pieza,</strong> el Encargado de bodega debera inspeccionar y aprobar.</li>
                  <li><strong>Si se acepta la devolucion,</strong> el credito toma 24 horas para ser acreditado en su cuenta.</li>
                  <li><strong>Si no se acepta la devolucion,</strong> se devolvera la parte el siguiente dia habil.</li>
                  <li><strong>Los conductores no pueden recoger piezas sin un RMA programado.</strong></li>
                  <li><strong>Los conductores no pueden autorizar el reembolso de las piezas devueltas.</strong></li>
                  <li><strong>Los creditos no estaran disponibles instantaneamente,</strong> ni se podran utilizar para hacer cambios cuando se vuelva otra parte.</li>
                </ol>
              </div>
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
