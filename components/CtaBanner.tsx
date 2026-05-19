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
      btn.textContent = '✓ Quote on the way'
      setTimeout(() => {
        btn.textContent = 'Send quote request'
        btn.disabled = false
        setSent(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      btn.textContent = 'Send quote request'
      btn.disabled = false
    }
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
              for - a real specialist will text or call back, usually within minutes.
            </p>
            <form className="cta-banner__form" ref={formRef} onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Your name" required />
              <input name="phone" type="tel" placeholder="Phone (we'll call back)" required />
              <input name="email" type="email" placeholder="Email address" />
              <input name="vehicle" type="text" placeholder="Vehicle (Year / Make / Model)" required />
              <input className="full" name="parts" type="text" placeholder="Parts needed" required />
              <textarea className="full" name="notes" placeholder="Additional notes (optional)" rows={2} style={{ resize: 'vertical' }} />
              {/* Honeypot */}
              <input type="text" name="website" autoComplete="off" tabIndex={-1} style={{ position: 'absolute', left: -9999, opacity: 0, height: 0, width: 0 }} />
              {error && <p className="full" style={{ color: '#ff6b6b', fontSize: 14, margin: 0 }}>{error}</p>}
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
