import Image from 'next/image'

const cats = [
  { img: '/parts/bumper.webp',           name: 'Bumpers & Bumper Covers',    count: '1,200+ SKUs', desc: 'Front & rear bumper covers, reinforcements, absorbers, and complete assemblies.' },
  { img: '/parts/headlights.webp',       name: 'Headlights & Tail Lights',   count: '900+ SKUs',   desc: 'OEM-spec headlight assemblies, tail lamp units, and replacement lenses.' },
  { img: '/parts/corner-lights.webp',    name: 'Corner & Parking Lights',    count: '400+ SKUs',   desc: 'Corner lights, side markers, and parking lamp assemblies for all makes.' },
  { img: '/parts/fog-light.webp',        name: 'Fog Lights',                 count: '350+ SKUs',   desc: 'Direct-fit fog lamp assemblies and housings.' },
  { img: '/parts/front-bonnet.webp',     name: 'Hoods & Panels',             count: '600+ SKUs',   desc: 'Replacement hoods, bonnet panels, cowl panels, and hood hinges.' },
  { img: '/parts/grill.webp',            name: 'Grilles & Grille Guards',    count: '500+ SKUs',   desc: 'Upper & lower grilles, grille inserts, and overlay kits.' },
  { img: '/parts/side-mirror.webp',      name: 'Mirrors',                    count: '700+ SKUs',   desc: 'Power, manual, heated, and tow mirrors for cars and trucks.' },
  { img: '/parts/splash-shield.webp',    name: 'Splash Guards & Shields',    count: '300+ SKUs',   desc: 'Mud flaps, splash shields, fender liners, and wheel well covers.' },
  { img: '/parts/ac-condenser.webp',     name: 'A/C Condensers',             count: '280+ SKUs',   desc: 'Direct-fit A/C condensers and receiver-drier units.' },
  { img: '/parts/condenser-fan.webp',    name: 'Radiator & Condenser Fans',  count: '200+ SKUs',   desc: 'Radiator condenser fan assemblies and individual fan motors.' },
  { img: '/parts/radiator-cooling.webp', name: 'Radiators & Cooling',        count: '380+ SKUs',   desc: 'Radiators, heater cores, coolant overflow tanks, and thermostat housings.' },
  { img: '/parts/handles.webp',          name: 'Fenders',                    count: '550+ SKUs',   desc: 'Front fenders, quarter panels, and inner fender liners for all makes.' },
  { img: '/parts/door.webp',             name: 'Doors & Related',            count: '420+ SKUs',   desc: 'Door shells, door skins, hinges, and door weatherstripping.' },
  { img: '/parts/trunk.webp',            name: 'Trunk Lids & Tailgates',     count: '310+ SKUs',   desc: 'Trunk lids, deck lids, tailgates, and liftgate assemblies.' },
  { img: '/parts/inner-structure.webp',  name: 'Inner Structure',            count: '240+ SKUs',   desc: 'Radiator core supports, strut towers, sub-frames, and unibody parts.' },
]

export default function Categories() {
  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="section__head" style={{ marginBottom: 40 }}>
          <div>
            <span className="eyebrow">Shop by category</span>
            <h2 style={{ marginTop: 12 }}>
              The body shop&apos;s catalog<br />- without the markup.
            </h2>
          </div>
          <p style={{ maxWidth: 400, color: 'var(--ink-2)', fontSize: 15 }}>
            From front bumpers to heating &amp; cooling, we stock the high-turn collision parts
            your shop needs - all priced for the long haul.
          </p>
        </div>

        <div className="parts-grid">
          {cats.map(({ img, name, count, desc }) => (
            <a key={name} className="part-card" href="tel:17737621000" aria-label={`Inquire about ${name}`}>
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
                  Call to Order
                  <svg width="14" height="14"><use href="#i-arrow-sm" /></svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn btn--primary btn--lg" href="tel:17737621000">
            <svg width="18" height="18"><use href="#i-phone" /></svg>
            Call to Order
          </a>
          <a className="btn btn--outline btn--lg" href="/#contact">
            Request a Quote
            <svg className="arrow" width="16" height="16"><use href="#i-arrow-sm" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
