const pillars = [
  {
    n: 1,
    strong: '25 years of trust',
    text: 'Family-run since 2001. Generations of body shops have built their work on Best Value parts.',
  },
  {
    n: 2,
    strong: 'Twice-daily delivery',
    text: 'We run our own fleet of trucks and drivers across Chicagoland - two routes a day so your parts arrive when you need them.',
  },
  {
    n: 3,
    strong: 'Best price, guaranteed',
    text: "Show us a lower written quote on a comparable part and we'll beat it. Same fair price every time.",
  },
  {
    n: 4,
    strong: 'The largest call center in the industry',
    text: 'Dozens of US-based parts specialists answering the phone - personalised service on every order, no scripts.',
  },
]

export default function ValueSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="value">
          <div>
            <span className="eyebrow" style={{ color: '#FFB3B6' }}>Why Best Value</span>
            <h2 style={{ marginTop: 12 }}>
              Professional quality<br />without the markup.
            </h2>
            <p>
              For 25 years we&apos;ve supplied collision repair shops, mechanics and drivers across
              the US with parts that fit, arrive fast, and don&apos;t cost dealer money. No online
              checkout, no sign-ups - just a call to a real parts pro and the right part at your door.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a className="btn btn--primary" href="tel:17737621000">
                <svg width="14" height="14"><use href="#i-phone" /></svg> Call (773) 762-1000
              </a>
              <a className="btn btn--ghost-light" href="#contact">About Best Value</a>
            </div>
          </div>

          <div className="value__pillars">
            {pillars.map(({ n, strong, text }) => (
              <div key={n} className="value__pillar">
                <span className="num">{n}</span>
                <div>
                  <strong>{strong}</strong>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
