'use client'

import { useRef } from 'react'

export default function CtaBanner() {
  const btnRef = useRef<HTMLButtonElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!btnRef.current) return
    btnRef.current.textContent = '✓ Quote on the way'
    setTimeout(() => {
      if (btnRef.current) btnRef.current.textContent = 'Send quote request'
    }, 2400)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner" id="contact">
          <div>
            <span className="chip" style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}>
              REQUEST A QUOTE
            </span>
            <h2 style={{ marginTop: 14 }}>
              Tell us the vehicle and the damage. We&apos;ll quote you the best price.
            </h2>
            <p>
              No checkout, no sign-up. Send us the year, make, model and what you&apos;re looking
              for — a real specialist will text or call back, usually within minutes.
            </p>
            <form className="cta-banner__form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Your name" required />
              <input type="tel" placeholder="Phone (we'll call back)" required />
              <input
                className="full"
                type="text"
                placeholder="Year / make / model & part needed"
                required
              />
              <button className="btn btn--primary btn--lg full" type="submit" ref={btnRef}>
                Send quote request
              </button>
            </form>
          </div>

          <div className="cta-banner__phone">
            <div>
              <span style={{ fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)', fontWeight: 700 }}>
                Prefer to talk?
              </span>
            </div>
            <a className="pn" href="tel:17737621000" style={{ marginTop: 8 }}>
              <svg><use href="#i-phone" /></svg> (773) 762-1000
            </a>
            <small>
              The industry&apos;s largest call center<br />Mon–Fri 8 AM–7 PM CST · Sat 9–4
            </small>
          </div>
        </div>
      </div>
    </section>
  )
}
