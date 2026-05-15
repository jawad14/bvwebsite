'use client'

import { useEffect, useRef, useState } from 'react'

export default function QuoteModal() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onOpen() { setOpen(true); setSent(false) }
    window.addEventListener('bv:quote', onOpen)
    return () => window.removeEventListener('bv:quote', onOpen)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => nameRef.current?.focus(), 80)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!btnRef.current) return
    btnRef.current.textContent = 'Sending…'
    btnRef.current.disabled = true
    setTimeout(() => {
      setSent(true)
    }, 1000)
  }

  if (!open) return null

  return (
    <div
      className="qmodal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
      aria-modal="true"
      role="dialog"
      aria-label="Request a Quote"
    >
      <div className="qmodal">
        {/* Header */}
        <div className="qmodal__head">
          <div>
            <span className="eyebrow" style={{ color: '#FFB3B6' }}>FREE &amp; FAST</span>
            <h3>Request a Quote</h3>
          </div>
          <button className="qmodal__close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="qmodal__body">
          {sent ? (
            <div className="qmodal__success">
              <span className="qmodal__check">✓</span>
              <h4>Quote Request Sent!</h4>
              <p>A parts specialist will call or text you back, usually within minutes during business hours.</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
                <a className="btn btn--primary" href="tel:17737621000">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                  Call Now
                </a>
                <button className="btn btn--outline" onClick={() => { setSent(false); setOpen(false) }}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="qmodal__sub">
                No checkout, no sign-up. Send us the details — a real specialist will call or text back, usually within minutes.
              </p>
              <form className="qmodal__form" onSubmit={handleSubmit}>
                <div className="qmodal__row">
                  <div className="field">
                    <label>Your Name *</label>
                    <input ref={nameRef} type="text" placeholder="John Smith" required />
                  </div>
                  <div className="field">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="(773) 000-0000" required />
                  </div>
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" />
                </div>
                <div className="field">
                  <label>Vehicle (Year / Make / Model) *</label>
                  <input type="text" placeholder="e.g. 2020 Toyota Camry" required />
                </div>
                <div className="field">
                  <label>Parts Needed *</label>
                  <textarea
                    placeholder="e.g. Front bumper cover, left headlight assembly…"
                    rows={3}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <div className="field">
                  <label>Additional Notes</label>
                  <textarea placeholder="Paint code, OEM only, urgency, etc." rows={2} style={{ resize: 'vertical' }} />
                </div>
                <button className="btn btn--primary btn--lg" style={{ width: '100%', justifyContent: 'center' }} type="submit" ref={btnRef}>
                  Send Quote Request
                  <svg className="arrow" width="16" height="16"><use href="#i-arrow-sm" /></svg>
                </button>
              </form>

              <div className="qmodal__divider">or call us directly</div>

              <a className="qmodal__phone" href="tel:17737621000">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                (773) 762-1000
                <span>Mon–Fri 8 AM–7 PM · Sat 9–4 CST</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
