import Image from 'next/image'

const cats = [
  { img: '/parts/bumper.jpg',        name: 'Bumpers & Bumper Covers',   count: '1,200+ SKUs', desc: 'Front & rear bumper covers, reinforcements, and complete assemblies.' },
  { img: '/parts/headlights.jpg',    name: 'Headlights & Tail Lights',  count: '900+ SKUs',   desc: 'OEM-spec headlight assemblies, tail lamp units, and replacement lenses.' },
  { img: '/parts/corner-lights.jpg', name: 'Corner & Parking Lights',   count: '400+ SKUs',   desc: 'Corner lights, side markers, and parking lamp assemblies for all makes.' },
  { img: '/parts/fog-light.jpg',     name: 'Fog Lights',                count: '350+ SKUs',   desc: 'Direct-fit fog lamp assemblies and housings — front and rear.' },
  { img: '/parts/front-bonnet.jpg',  name: 'Hoods & Panels',            count: '600+ SKUs',   desc: 'Replacement hoods, cowl panels, and hood hinges.' },
  { img: '/parts/grill.jpg',         name: 'Grilles & Grille Guards',   count: '500+ SKUs',   desc: 'Upper & lower grilles, grille inserts, and overlay kits.' },
  { img: '/parts/side-mirror.jpg',   name: 'Mirrors',                   count: '700+ SKUs',   desc: 'Power, manual, heated, and tow mirrors for cars and trucks.' },
  { img: '/parts/handles.jpg',       name: 'Door Handles & Locks',      count: '450+ SKUs',   desc: 'Interior and exterior door handles, lock cylinders, and actuators.' },
  { img: '/parts/splash-shield.jpg', name: 'Splash Guards & Shields',   count: '300+ SKUs',   desc: 'Mud flaps, splash shields, fender liners, and wheel well covers.' },
  { img: '/parts/ac-condenser.jpg',  name: 'A/C Condensers',            count: '280+ SKUs',   desc: 'Direct-fit A/C condensers and receiver-drier units.' },
  { img: '/parts/condenser-fan.jpg', name: 'Condenser Fans',            count: '200+ SKUs',   desc: 'Radiator condenser fan assemblies and individual fan motors.' },
  { img: '/parts/heater-core.jpg',   name: 'Heating & Cooling',         count: '380+ SKUs',   desc: 'Heater cores, radiators, coolant overflow tanks, and thermostat housings.' },
]

export default function Categories() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="section__head" style={{ marginBottom: 40 }}>
          <div>
            <span className="eyebrow">Shop by category</span>
            <h2 style={{ marginTop: 12 }}>
              The body shop&apos;s catalog<br />— without the markup.
            </h2>
          </div>
          <p style={{ maxWidth: 400, color: 'var(--ink-2)', fontSize: 15 }}>
            From front bumpers to heating &amp; cooling, we stock the high-turn collision parts
            your shop needs — all priced for the long haul.
          </p>
        </div>

        <div className="parts-grid">
          {cats.map(({ img, name, count, desc }) => (
            <a key={name} className="part-card" href="/parts" aria-label={`Shop ${name}`}>
              <div className="part-card__img-wrap">
                <Image
                  src={img}
                  alt={name}
                  width={400}
                  height={260}
                  className="part-card__img"
                  sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="part-card__badge">{count}</span>
              </div>
              <div className="part-card__body">
                <h3 className="part-card__name">{name}</h3>
                <p className="part-card__desc">{desc}</p>
                <span className="part-card__cta">
                  Shop Now
                  <svg width="14" height="14"><use href="#i-arrow-sm" /></svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a className="btn btn--outline btn--lg" href="/parts">
            View All Parts &amp; Categories
            <svg className="arrow" width="16" height="16"><use href="#i-arrow-sm" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
