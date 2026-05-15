import FavButton from './FavButton'

interface Product {
  meta: string
  title: string
  fitment: string
  now: string
  was?: string
  stars: number
  reviews: number
  badges?: { text: string; variant: 'red' | 'navy' | 'ghost' }[]
  art: string
}

const products: Product[] = [
  {
    meta: 'FORD F-150 · 2021–2023',
    title: 'Front Bumper Cover - Primed, w/o Park Assist',
    fitment: 'Fits 4 trims · Style/Sport package',
    now: '$219', was: '$268', stars: 4.9, reviews: 312,
    badges: [{ text: '−18%', variant: 'red' }, { text: 'CAPA', variant: 'ghost' }],
    art: '#part-bumper',
  },
  {
    meta: 'CHEVROLET SILVERADO · 2019–2024',
    title: 'Headlight Assembly - Halogen, Driver & Passenger',
    fitment: 'Includes wiring connector · DOT compliant',
    now: '$284', was: '$329', stars: 4.8, reviews: 188,
    badges: [{ text: 'PAIR', variant: 'navy' }],
    art: '#part-headlight',
  },
  {
    meta: 'TOYOTA CAMRY · 2018–2023',
    title: 'Front Fender - Right (Passenger), Primed Steel',
    fitment: 'Pre-drilled trim holes · Ready to paint',
    now: '$129', stars: 4.7, reviews: 94,
    badges: [{ text: 'HOT', variant: 'red' }],
    art: '#part-fender',
  },
  {
    meta: 'RAM 1500 · 2019–2024',
    title: 'Tow Mirror Set - Heated, Power-Folding, Signal',
    fitment: 'Plug-and-play · Black textured housing',
    now: '$498', was: '$569', stars: 4.9, reviews: 211,
    badges: [{ text: 'HEATED', variant: 'ghost' }, { text: '−12%', variant: 'red' }],
    art: '#part-mirror',
  },
  {
    meta: 'HONDA ACCORD · 2018–2022',
    title: 'Upper Grille - Gloss Black, w/o Camera',
    fitment: 'OEM-style mounting tabs',
    now: '$94', stars: 4.6, reviews: 67,
    art: '#part-grille',
  },
  {
    meta: 'JEEP WRANGLER JL · 2018–2024',
    title: 'Hood - Steel, Primed, w/ Hood Insulator',
    fitment: 'CAPA-grade replacement',
    now: '$389', stars: 4.8, reviews: 52,
    badges: [{ text: 'NEW', variant: 'navy' }],
    art: '#part-hood',
  },
  {
    meta: 'NISSAN ALTIMA · 2019–2024',
    title: 'Radiator - 1 Row Aluminum, w/o Turbo',
    fitment: 'Pressure-tested · Includes drain plug',
    now: '$118', was: '$151', stars: 4.7, reviews: 138,
    badges: [{ text: '−22%', variant: 'red' }],
    art: '#part-radiator',
  },
  {
    meta: 'HYUNDAI SONATA · 2020–2023',
    title: 'Front Door Shell - Driver Side, Ready to Paint',
    fitment: 'CAPA certified',
    now: '$342', stars: 4.6, reviews: 41,
    badges: [{ text: 'PRIMED', variant: 'ghost' }],
    art: '#part-door',
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i}><use href="#i-star" /></svg>
      ))}
    </>
  )
}

export default function FeaturedProducts() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <div>
            <span className="eyebrow">Top sellers this week</span>
            <h2 style={{ marginTop: 12 }}>Parts the pros keep reordering.</h2>
          </div>
          <a className="more" href="#">
            View all best sellers <svg width="14" height="14"><use href="#i-arrow-sm" /></svg>
          </a>
        </div>

        <div className="products">
          {products.map((p) => (
            <article key={p.title} className="card">
              <div className="card__media">
                {p.badges && (
                  <div className="card__badges">
                    {p.badges.map((b) => (
                      <span key={b.text} className={`badge badge--${b.variant}`}>{b.text}</span>
                    ))}
                  </div>
                )}
                <FavButton />
                <svg><use href={p.art} /></svg>
              </div>
              <div className="card__body">
                <div className="card__meta">{p.meta}</div>
                <div className="card__title">{p.title}</div>
                <div className="card__fitment">{p.fitment}</div>
                <div className="card__row">
                  <div className="card__price">
                    <span className="now">{p.now}</span>
                    {p.was && <span className="was">{p.was}</span>}
                  </div>
                  <div className="card__stars">
                    <Stars rating={p.stars} />
                    <span>{p.stars} ({p.reviews})</span>
                  </div>
                </div>
                <a className="card__cta" href="tel:17737621000">
                  <svg><use href="#i-phone" /></svg> Call to order
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
