export default function PromoSplit() {
  return (
    <section className="section section--soft">
      <div className="container">
        <div className="split">
          {/* Shop desk promo */}
          <div className="promo promo--red">
            <div>
              <span className="chip" style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}>
                FOR COLLISION SHOPS
              </span>
              <h3 style={{ marginTop: 14 }}>Order by phone. We&apos;ll be there in an hour.</h3>
              <p>
                Across Chicagoland and the surrounding metro, our own trucks run all day - so the
                parts you need to finish a job today get there today.
              </p>
            </div>
            <div className="promo__ctas">
              <a className="btn" style={{ background: '#fff', color: 'var(--bv-red)' }} href="tel:17737621000">
                <svg width="14" height="14"><use href="#i-phone" /></svg>
                Call our shop desk
              </a>
              <a className="btn btn--ghost-light" href="#contact">See delivery zones</a>
            </div>
            <svg className="promo__art"><use href="#part-bumper" /></svg>
          </div>

          {/* Driver promo */}
          <div className="promo promo--navy">
            <div>
              <span className="chip" style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}>
                FOR DRIVERS
              </span>
              <h3 style={{ marginTop: 14 }}>
                Skip the dealer. We&apos;ll quote you the best price - by phone.
              </h3>
              <p>
                Tell us your year, make, model and what&apos;s damaged. A real parts specialist will
                quote you in minutes - and beat the dealer&apos;s price.
              </p>
            </div>
            <div className="promo__ctas">
              <a className="btn btn--primary" href="tel:17737621000">
                <svg width="14" height="14"><use href="#i-phone" /></svg>
                Get a price
              </a>
              <a className="btn btn--ghost-light" href="#contact">Request a quote online</a>
            </div>
            <svg className="promo__art"><use href="#part-headlight" /></svg>
          </div>
        </div>
      </div>
    </section>
  )
}
