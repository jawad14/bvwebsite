import Image from 'next/image'

const cats = [
  {
    img: '/parts/bumper.jpg',
    count: '2,400+ SKUs',
    name: 'Bumpers & Covers',
    alt: 'Front bumper cover',
  },
  {
    img: '/parts/headlights.jpg',
    count: '1,800+ SKUs',
    name: 'Headlights & Tail Lights',
    alt: 'Headlight assembly',
  },
  {
    img: '/parts/splash-shield.jpg',
    count: '1,200+ SKUs',
    name: 'Fenders',
    alt: 'Fender / splash shield',
  },
  {
    img: '/parts/side-mirror.jpg',
    count: '900+ SKUs',
    name: 'Mirrors',
    alt: 'Side mirror assembly',
  },
  {
    img: '/parts/grill.jpg',
    count: '700+ SKUs',
    name: 'Grilles',
    alt: 'Front grille',
  },
  {
    img: '/parts/front-bonnet.jpg',
    count: '1,000+ SKUs',
    name: 'Hoods & Panels',
    alt: 'Hood / front bonnet',
  },
  {
    img: '/parts/ac-condenser.jpg',
    count: '1,400+ SKUs',
    name: 'Heating & Cooling',
    alt: 'AC condenser',
  },
  {
    img: '/parts/fog-light.jpg',
    count: '600+ codes',
    name: 'Automotive Paints',
    alt: 'Fog light',
  },
]

export default function Categories() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="section__head">
          <div>
            <span className="eyebrow">Shop by category</span>
            <h2 style={{ marginTop: 12 }}>
              The body shop&apos;s catalog<br />— without the markup.
            </h2>
          </div>
          <p>
            From front bumpers to inner structure, we stock the high-turn collision parts your
            shop needs, all priced for the long haul.
          </p>
        </div>

        <div className="cats">
          {cats.map(({ img, count, name, alt }, i) => {
            const isTry = i === 0  // trial style on Bumpers only
            return (
              <a key={name} className={`cat${isTry ? ' cat--try' : ''}`} href="#">
                {/* image area */}
                <div className="cat__art">
                  <span className="cat__count">{count}</span>
                  <Image
                    src={img}
                    alt={alt}
                    fill
                    sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                    style={{
                      objectFit: 'contain',
                      padding: isTry ? '8px' : '12px',
                    }}
                  />
                </div>
                {/* label row */}
                <div className="cat__name">
                  {name}
                  <svg><use href="#i-arrow-sm" /></svg>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
