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
        <div className="drawer__head">
          <a className="brand" href="/" style={{ gap: 8 }}>
            <img src="/bv-mark.webp" alt="" className="brand__mark" style={{ height: 36 }} />
            <span className="brand__word">
              <span className="brand__name" style={{ fontSize: 22 }}>best value<i>.</i></span>
            </span>
          </a>
          <button className="drawer__close" onClick={onClose} aria-label="Close menu">
            <svg><use href="#i-x" /></svg>
          </button>
        </div>

        <div className="drawer__section">
          <h4>Shop categories</h4>
          <div className="drawer__list">
            <a href="/parts">Bumpers &amp; Bumper Covers</a>
            <a href="/parts">Headlights &amp; Tail Lights</a>
            <a href="/parts">Fenders</a>
            <a href="/parts">Mirrors</a>
            <a href="/parts">Grilles</a>
            <a href="/parts">Hoods &amp; Panels</a>
            <a href="/parts">Doors &amp; Related</a>
            <a href="/parts">Heating &amp; Cooling</a>
            <a href="/paints">Automotive Paints</a>
            <a href="/parts">Inner Structure</a>
          </div>
        </div>

        <div className="drawer__section">
          <h4>Get help</h4>
          <div className="drawer__list">
            <a href="tel:17737621000">📞 Call (773) 762-1000</a>
            <a href="#contact">Request a quote</a>
            <a href="/delivery">Same-Day Delivery &amp; Zones</a>
            <a href="/returns">Returns &amp; Warranty</a>
            <a href="/faq">Frequently Asked Questions</a>
            <a href="/careers">Careers — We&apos;re hiring</a>
            <a href="/register" style={{ color: 'var(--bv-red)', fontWeight: 700 }}>Register Business Account</a>
            <a href="#contact">Become a shop partner</a>
            <a href="#contact">Visit our counter (Melrose Park, IL)</a>
          </div>
        </div>
      </div>
    </div>
  )
}
