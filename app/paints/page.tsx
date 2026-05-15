import type { Metadata } from 'next'
import PaintsClient from '@/components/PaintsClient'

export const metadata: Metadata = {
  title: 'Automotive Paints & Refinishing Supplies',
  description:
    'Shop automotive paints, clear coats, primers, reducers, body fillers, adhesives, masking products, and detailing supplies at Best Value Auto Body Supply in Melrose Park, IL. Same-day delivery across Chicago.',
  keywords: [
    'automotive paint Chicago', 'car paint supplies Illinois', 'clear coat Chicago',
    'automotive primer Melrose Park', 'body filler Chicago', 'auto refinishing supplies Illinois',
    'collision paint products', 'automotive paint wholesale Chicago',
  ],
  alternates: { canonical: 'https://www.bestvaluepart.com/paints' },
  openGraph: {
    title: 'Automotive Paints & Refinishing Supplies — Best Value Auto Body Supply',
    description: 'Paints, clear coats, primers, body fillers and more. Same-day delivery across Chicago metro.',
    url: 'https://www.bestvaluepart.com/paints',
  },
}

const _categories_moved_to_PaintsClient = [
  {
    icon: '🎨',
    name: 'Paint',
    slug: 'paint',
    description: '',
    tags: [],
  },
  {
    icon: '✨',
    name: 'Clear Coat',
    slug: 'clear',
    description:
      'High-gloss clear coats that protect your finish and deliver showroom shine. Choose from standard, high-build, and fast-dry formulas.',
    tags: ['High-Gloss', 'UV Protection', 'Fast Dry', 'High-Build'],
  },
  {
    icon: '🪣',
    name: 'Primer',
    slug: 'primer',
    description:
      'Epoxy, urethane, and self-etching primers for superior adhesion and corrosion resistance on bare metal, plastic, and repaired substrates.',
    tags: ['Epoxy', 'Urethane', 'Self-Etching', 'High-Build', 'Sealer'],
  },
  {
    icon: '🧪',
    name: 'Thinners & Reducers',
    slug: 'thinners-reducers',
    description:
      'Slow, medium, and fast reducers to dial in viscosity and dry time for any shop environment. Compatible with all major paint systems.',
    tags: ['Slow', 'Medium', 'Fast', 'Temperature-Rated'],
  },
  {
    icon: '🧴',
    name: 'Additives & Cleaners',
    slug: 'additives-cleaners',
    description:
      'Wax and grease removers, fisheye eliminators, flex additives, and hardeners to prep surfaces and perfect your paint chemistry.',
    tags: ['Wax Remover', 'Fisheye Eliminator', 'Flex Additive', 'Hardener'],
  },
  {
    icon: '🔧',
    name: 'Body Repair & Fillers',
    slug: 'body-repair-fillers',
    description:
      'Premium body filler, spot putty, and glazing compound for achieving a perfectly smooth substrate before primer and paint.',
    tags: ['Body Filler', 'Spot Putty', 'Glazing Compound', 'Lightweight Filler'],
  },
  {
    icon: '🩹',
    name: 'Adhesives & Sealants',
    slug: 'adhesives-sealants',
    description:
      'Panel bond adhesive, seam sealer, and urethane windshield adhesive for structural repairs and waterproof joints.',
    tags: ['Panel Bond', 'Seam Sealer', 'Urethane', 'Structural'],
  },
  {
    icon: '🔴',
    name: 'Sandpaper & Abrasives',
    slug: 'sandpaper',
    description:
      'Dry and wet-sand abrasives from 40 to 3000 grit for every stage — stripping, block sanding, scuffing, and final color sanding.',
    tags: ['40–80 Grit', '150–320 Grit', '400–800 Grit', '1000–3000 Grit'],
  },
  {
    icon: '🎭',
    name: 'Masking Products',
    slug: 'masking',
    description:
      'Fine-line masking tape, automotive masking paper, plastic sheeting, and pre-taped covers to protect every surface during paint.',
    tags: ['Fine-Line Tape', 'Masking Paper', 'Plastic Sheeting', 'Pre-Taped'],
  },
  {
    icon: '💨',
    name: 'Spray Products',
    slug: 'spray',
    description:
      'Aerosol sprays for touch-ups, underbody protection, and quick repairs — ready-to-spray with no gun required.',
    tags: ['Touch-Up', 'Aerosol', 'Ready-to-Spray', 'Underbody'],
  },
  {
    icon: '🎯',
    name: 'Toners',
    slug: 'toners',
    description:
      'Intermix toners for custom color blending and OEM color matching. Compatible with waterborne and solvent mixing systems.',
    tags: ['Intermix', 'Waterborne', 'Solvent', 'Custom Match'],
  },
  {
    icon: '🛡️',
    name: 'Undercoating',
    slug: 'undercoating',
    description:
      'Rubberized and asphalt-based undercoating for rust prevention, sound deadening, and underbody protection on any vehicle.',
    tags: ['Rubberized', 'Asphalt', 'Sound Deadening', 'Rust Prevention'],
  },
  {
    icon: '🪄',
    name: 'Detail Products',
    slug: 'detail',
    description:
      'Compound, polish, wax, clay bars, and interior dressings to finish and protect repaired vehicles before delivery.',
    tags: ['Compound', 'Polish', 'Wax', 'Clay Bar', 'Interior'],
  },
  {
    icon: '🔫',
    name: 'Tools & Equipment',
    slug: 'tools',
    description:
      'Spray guns, mixing cups, stir sticks, strainers, tack cloths, and safety gear to keep your shop equipped and productive.',
    tags: ['Spray Guns', 'Mixing Cups', 'Strainers', 'Tack Cloths', 'Safety'],
  },
  {
    icon: '📦',
    name: 'Supply & Misc.',
    slug: 'supply',
    description:
      'Shop consumables and specialty products — everything from mixing sticks and gloves to paint suits and respirator cartridges.',
    tags: ['Consumables', 'PPE', 'Gloves', 'Respirators', 'Paint Suits'],
  },
]

const steps = [
  {
    n: '1',
    title: 'Wash & Strip',
    body: 'Wash the panel and strip old paint or rust with 40–80 grit abrasive. Use a wax & grease remover before any sanding.',
    product: 'Wax & Grease Remover · 40–80 Grit Disc',
  },
  {
    n: '2',
    title: 'Fill & Block',
    body: 'Apply body filler to low spots, block-sand with 80–180 grit, then finish with spot putty and 220–320 grit for a smooth substrate.',
    product: 'Body Filler · Spot Putty · 80–320 Grit',
  },
  {
    n: '3',
    title: 'Prime',
    body: 'Spray epoxy primer over bare metal for corrosion protection, then top with urethane high-build primer. Block-sand to 400–600 grit.',
    product: 'Epoxy Primer · Urethane High-Build · 400–600 Grit',
  },
  {
    n: '4',
    title: 'Seal & Basecoat',
    body: 'Apply a sealer coat for uniform color holdout, then spray your OEM-matched basecoat. Allow flash time between coats.',
    product: 'Sealer · Basecoat Paint · Reducer',
  },
  {
    n: '5',
    title: 'Clear Coat',
    body: 'Apply 2–3 coats of clear over the basecoat while it\'s still tacky. Wet-sand with 1500–2000 grit if needed.',
    product: 'Clear Coat · 1500–2000 Grit · Hardener',
  },
  {
    n: '6',
    title: 'Detail & Deliver',
    body: 'Compound and polish to remove sanding marks, then finish with wax for a showroom-quality result.',
    product: 'Compound · Polish · Wax',
  },
]

const brands = [
  'SEM', 'U-POL', 'Evercoat', '3M', 'Dupli-Color',
  'Sherwin-Williams', 'Norton', 'Mirka', 'Transtar', 'Matrix',
]

const highlights = [
  { icon: '📦', title: '15+ Product Categories', body: 'Everything from paint and primer to abrasives, masking, and detailing — all from one supplier.' },
  { icon: '🎨', title: 'OEM Color Matching', body: 'We stock toners and mixing systems so you can hit every factory color with confidence.' },
  { icon: '🚚', title: 'Same-Day Delivery', body: 'Order by noon and get your paint and supplies on the same day to shops in our delivery zone.' },
  { icon: '📞', title: 'Expert Paint Advice', body: 'Our counter staff understands refinishing. Call us and we\'ll help you spec the right products for your job.' },
]

export default function PaintsPage() {
  return (
    <>
      {/* Banner */}
      <div className="page-banner">
        <div className="container page-banner__inner">
          <span className="eyebrow" style={{ color: '#FFB3B6' }}>Refinishing Supplies</span>
          <h1>Automotive Paints &amp; Supplies</h1>
          <p>
            Everything your shop needs to go from bare metal to showroom shine — paint, primer,
            clear coat, body filler, abrasives, masking, and more. 15+ categories in stock
            with same-day delivery to the Chicago metro area.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <a className="btn btn--primary btn--lg" href="tel:17737621000">
              <svg width="18" height="18"><use href="#i-phone" /></svg>
              Call to Order
            </a>
            <a className="btn btn--ghost-light btn--lg" href="/#contact">
              Request a Quote
              <svg className="arrow" width="18" height="18"><use href="#i-arrow" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Highlights strip */}
      <section className="section section--soft">
        <div className="container">
          <div className="paint-highlights">
            {highlights.map(({ icon, title, body }) => (
              <div key={title} className="paint-highlight">
                <span className="paint-highlight__icon">{icon}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paint Categories */}
      <section className="section">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Paint Categories</span>
              <h2>Shop by Product Type</h2>
            </div>
            <p style={{ maxWidth: 400, color: 'var(--ink-2)', fontSize: 15 }}>
              Click <strong>Inquire</strong> on any category to send us a quick request and
              we&apos;ll get back to you with pricing and availability.
            </p>
          </div>
          <PaintsClient />
        </div>
      </section>

      {/* Refinishing Process */}
      <section className="section section--soft">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Process Guide</span>
              <h2>The 6-Step Refinishing Process</h2>
            </div>
            <p style={{ maxWidth: 420, color: 'var(--ink-2)', fontSize: 15 }}>
              Use this as a product checklist. We stock everything for every step.
            </p>
          </div>
          <div className="paint-steps">
            {steps.map(({ n, title, body, product }) => (
              <div key={n} className="paint-step">
                <span className="paint-step__num">{n}</span>
                <div className="paint-step__body">
                  <h4>{title}</h4>
                  <p>{body}</p>
                  <span className="paint-step__products">{product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="section">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 32 }}>
            <div>
              <span className="eyebrow">Brands We Carry</span>
              <h2>Industry-Leading Refinishing Brands</h2>
            </div>
          </div>
          <div className="paint-brands">
            {brands.map(brand => (
              <div key={brand} className="paint-brand">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--soft">
        <div className="container">
          <div className="cta-banner" style={{ gridTemplateColumns: '1fr' }}>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
              <span className="chip" style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}>
                NEED HELP SPECCING YOUR JOB?
              </span>
              <h2 style={{ marginTop: 14, color: '#fff' }}>
                Talk to a paint specialist — we&apos;ll get you the right products.
              </h2>
              <p style={{ color: 'rgba(255,255,255,.8)', marginTop: 12 }}>
                Whether you need a single quart of reducer or a full shop supply of primers and clears,
                our team will put together the right order and get it to you the same day.
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
