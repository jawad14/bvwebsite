export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">
            <span className="dot" /> Built on Trust. Driven by Value.
          </span>
          <h1>
            Collision parts <span className="accent">that fit right</span> the first time.
          </h1>
          <p className="hero__sub">
            ALL AFTERMARKET/OEM COMPARABLE QUALITY bumpers, headlights, fenders and body parts at the best prices in the
            industry - backed by our own twice-daily delivery fleet and a real parts specialist on every call.
          </p>

          <div className="hero__ctas">
            <a className="btn btn--primary btn--lg" href="tel:17737621000">
              <svg width="18" height="18"><use href="#i-phone" /></svg>
              Call to order - (773) 762-1000
            </a>
            <a className="btn btn--ghost-light btn--lg" href="#contact">
              Request a free quote
              <svg className="arrow" width="18" height="18"><use href="#i-arrow" /></svg>
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>25 yrs</strong><span>SERVING THE INDUSTRY</span>
            </div>
            <div className="hero__stat">
              <strong>Twice daily</strong><span>LOCAL DELIVERY</span>
            </div>
            <div className="hero__stat">
              <strong>110,000+</strong><span>PARTS IN STOCK</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="ring" />
          <div className="ring ring--2" />
          <div className="ring ring--3" />
          <div className="car">
            <svg><use href="#hero-car" /></svg>
          </div>

          <div className="float float--a">
            <span className="ico"><svg><use href="#i-shield" /></svg></span>
            <div>Best price, guaranteed<small>We match any competitor</small></div>
          </div>
          <div className="float float--b">
            <span className="ico"><svg><use href="#i-truck" /></svg></span>
            <div>Delivered twice daily<small>Our own fleet, our own drivers</small></div>
          </div>
          <div className="float float--c">
            <span className="ico"><svg><use href="#i-headset" /></svg></span>
            <div>Largest call center<small>A real parts pro, every call</small></div>
          </div>
          <div className="float float--d">
            <span className="ico"><svg><use href="#i-check" /></svg></span>
            <div>25 years of trust<small>Family-run since 2001</small></div>
          </div>
        </div>
      </div>
    </section>
  )
}
