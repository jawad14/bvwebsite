'use client'

import { useEffect, useRef } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!open) return null

  return (
    <div
      className="drawer is-open"
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="drawer__panel" ref={panelRef}>
        {/* Header */}
        <div className="drawer__head">
          <a href="/" aria-label="Best Value - Auto Body Supply">
            <img src="/bv-logo.webp" alt="Best Value Auto Body Supply" style={{ height: 60, width: 'auto' }} />
          </a>
          <button className="drawer__close" onClick={onClose} aria-label="Close menu">
            <svg><use href="#i-x" /></svg>
          </button>
        </div>

        {/* Quick nav */}
        <div className="drawer__quicknav">
          <a href="/parts" className="drawer__quicklink">
            <svg width="16" height="16"><use href="#i-arrow-sm" /></svg>
            Shop All Parts
          </a>
          <a href="/paints" className="drawer__quicklink">
            <svg width="16" height="16"><use href="#i-arrow-sm" /></svg>
            Automotive Paints
          </a>

        </div>

        {/* Category list */}
        <div className="drawer__section">
          <h4>Parts categories</h4>
          <div className="drawer__list">
            <a href="/parts">Bumpers &amp; Bumper Covers</a>
            <a href="/parts">Headlights &amp; Tail Lights</a>
            <a href="/parts">Corner &amp; Parking Lights</a>
            <a href="/parts">Fog Lights</a>
            <a href="/parts">Fenders</a>
            <a href="/parts">Mirrors</a>
            <a href="/parts">Grilles</a>
            <a href="/parts">Hoods &amp; Panels</a>
            <a href="/parts">Doors &amp; Related</a>
            <a href="/parts">Heating &amp; Cooling</a>
            <a href="/parts">A/C Condensers</a>
            <a href="/parts">Inner Structure</a>
          </div>
        </div>

        {/* Help links */}
        <div className="drawer__section">
          <h4>Help &amp; Company</h4>
          <div className="drawer__list">
            <a href="tel:17737621000">📞 Call (773) 762-1000</a>
            <button className="drawer__quote-btn" onClick={() => { onClose(); setTimeout(() => window.dispatchEvent(new CustomEvent('bv:quote')), 150) }}>Request a quote</button>
            <a href="/delivery">Same-Day Delivery &amp; Zones</a>
            <a href="/returns">Returns &amp; Warranty</a>
            <a href="/faq">Frequently Asked Questions</a>
            <a href="/careers">Careers - We&apos;re hiring</a>
            <a href="#contact">Visit our counter (Melrose Park, IL)</a>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
          <a
            href="/register"
            className="btn btn--primary"
            style={{ width: '100%', justifyContent: 'center', height: 48 }}
          >
            Register Business Account
          </a>
        </div>
      </div>
    </div>
  )
}
