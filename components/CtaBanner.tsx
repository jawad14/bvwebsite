'use client'

import { useRef, useState } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

const RECAPTCHA_SITE_KEY = '6LcON_IsAAAAAGJ-Fl79iBcd6PTsYtizhaGC7aam'

export default function CtaBanner() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!btnRef.current || !formRef.current) return
    setError('')

    const form = formRef.current
    const btn = btnRef.current
    btn.textContent = 'Verifying…'
    btn.disabled = true

    try {
      const token = await new Promise<string>((resolve, reject) => {
        if (!window.grecaptcha) { reject(new Error('reCAPTCHA not loaded')); return }
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'quote' })
            .then(resolve).catch(reject)
        })
      })

      btn.textContent = 'Sending…'

      const formData = new FormData(form)
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          vehicle: formData.get('vehicle'),
          parts: formData.get('parts'),
          notes: formData.get('notes'),
          website: formData.get('website'),
          recaptchaToken: token,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      setSent(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      btnRef.current!.textContent = 'Send quote request'
      btnRef.current!.disabled = false
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner" id="contact">
          <div className="cta-banner__left">
            <span className="chip" style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}>
              REQUEST A QUOTE
            </span>
            <h2 style={{ marginTop: 14 }}>
              Tell us the vehicle &amp; the damage.<br />
              We&apos;ll quote you the <span style={{ color: 'var(--bv-red)' }}>best price</span>.
            </h2>
            <p>
              No checkout, no sign-up. Send us the year, make, model and what
              you&apos;re looking for&mdash;a real specialist will text or call
              back, usually within minutes.
            </p>

            <div className="cta-banner__trust">
              <div className="cta-banner__trust-item">
                <svg width="18" height="18"><use href="#i-shield" /></svg>
                <span>Price-match guarantee</span>
              </div>
              <div className="cta-banner__trust-item">
                <svg width="18" height="18"><use href="#i-truck" /></svg>
                <span>Twice-daily delivery</span>
              </div>
              <div className="cta-banner__trust-item">
                <svg width="18" height="18"><use href="#i-headset" /></svg>
                <span>Real specialists</span>
              </div>
            </div>
          </div>

          <div className="cta-banner__right">
            {sent ? (
              <div className="cta-banner__success">
                <div className="cta-banner__success-icon">✓</div>
                <h3>Quote request received!</h3>
                <p>A parts specialist will reach out shortly&mdash;usually within minutes.</p>
                <button
                  className="btn btn--ghost-light btn--lg"
                  type="button"
                  onClick={() => {
                    setSent(false)
                    if (btnRef.current) {
                      btnRef.current.textContent = 'Send quote request'
                      btnRef.current.disabled = false
                    }
                  }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form className="cta-banner__form" ref={formRef} onSubmit={handleSubmit}>
                <div className="cta-banner__form-group">
                  <label htmlFor="cta-name">Your info</label>
                  <div className="cta-banner__form-row">
                    <input id="cta-name" name="name" type="text" placeholder="Full name" required />
                    <input name="phone" type="tel" placeholder="Phone number" required />
                  </div>
                  <input name="email" type="email" placeholder="Email (optional)" />
                </div>

                <div className="cta-banner__form-group">
                  <label htmlFor="cta-vehicle">Vehicle &amp; parts</label>
                  <input id="cta-vehicle" name="vehicle" type="text" placeholder="Year / Make / Model  (e.g. 2019 Honda Accord)" required />
                  <input name="parts" type="text" placeholder="Parts needed  (e.g. front bumper, headlight)" required />
                  <textarea name="notes" placeholder="Additional details (optional)" rows={2} />
                </div>

                {/* Honeypot */}
                <input type="text" name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" style={{ position: 'absolute', left: -9999, opacity: 0, height: 0, width: 0 }} />

                {error && <p className="cta-banner__error">{error}</p>}

                <button className="btn btn--primary btn--lg" type="submit" ref={btnRef}>
                  <svg width="18" height="18"><use href="#i-arrow" /></svg>
                  Send quote request
                </button>

                <p className="cta-banner__fine">
                  We&apos;ll only use your info to respond to this request. No spam, ever.
                </p>
              </form>
            )}

            <div className="cta-banner__divider">
              <span>or call us directly</span>
            </div>

            <div className="cta-banner__phone">
              <a className="pn" href="tel:17737621000">
                <svg><use href="#i-phone" /></svg> (773) 762-1000
              </a>
              <small>Mon–Fri 8 AM – 7 PM CST · Sat 9 – 4</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
