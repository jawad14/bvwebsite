const items = [
  { icon: '#i-shield', strong: '25 years of trust', span: 'Serving shops since 2001' },
  { icon: '#i-truck',  strong: '1-hour local delivery', span: 'Our own fleet, our own drivers' },
  { icon: '#i-check',  strong: 'Best price, guaranteed', span: "We beat any competitor's quote" },
  { icon: '#i-headset',strong: 'Largest call center', span: 'Personalised service, every order' },
]

export default function TrustStrip() {
  return (
    <section className="trust">
      <div className="container">
        <div className="trust__row">
          {items.map(({ icon, strong, span }) => (
            <div key={strong} className="trust__item">
              <span className="ico"><svg><use href={icon} /></svg></span>
              <div><strong>{strong}</strong><span>{span}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
