const reviews = [
  {
    quote: '"Fender showed up next day, lined up perfect, painted up clean. This is my second order — Best Value is in my parts rotation now."',
    initials: 'MR',
    name: 'Mike R.',
    role: 'Collision Shop Owner · Joliet, IL',
  },
  {
    quote: '"Called in, talked to a real person, found exactly the right bumper for my F-150. Saved me $180 vs. the dealer."',
    initials: 'JT',
    name: 'Jamal T.',
    role: 'DIY Owner · Atlanta, GA',
  },
  {
    quote: '"Headlight assemblies arrived double-boxed, no shipping damage, plug-and-play. Solid pricing for shop accounts."',
    initials: 'SP',
    name: 'Sara P.',
    role: 'Service Manager · Phoenix, AZ',
  },
]

export default function Reviews() {
  return (
    <section className="section section--soft">
      <div className="container">
        <div className="section__head">
          <div>
            <span className="eyebrow">Trusted by 14,000+ shops &amp; drivers</span>
            <h2 style={{ marginTop: 12 }}>What customers are saying.</h2>
          </div>
          <a className="more" href="#">
            Read all reviews <svg width="14" height="14"><use href="#i-arrow-sm" /></svg>
          </a>
        </div>

        <div className="reviews">
          {reviews.map(({ quote, initials, name, role }) => (
            <article key={name} className="review">
              <div className="review__stars">
                {[1,2,3,4,5].map((i) => <svg key={i}><use href="#i-star" /></svg>)}
              </div>
              <p>{quote}</p>
              <div className="review__who">
                <span className="avatar">{initials}</span>
                <div><strong>{name}</strong><span>{role}</span></div>
                <span className="review__verified">
                  <svg><use href="#i-check" /></svg> Verified
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
