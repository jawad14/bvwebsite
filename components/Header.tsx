'use client'

import { useState } from 'react'
import Image from 'next/image'
import SearchForm from './SearchForm'
import MobileDrawer from './MobileDrawer'

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="header">
        <div className="container header__row">
          <a className="brand" href="/" aria-label="Best Value — Auto Body Supply, Home">
            <Image src="/bv-logo.webp" alt="Best Value Auto Body Supply" width={224} height={80} className="brand__logo brand__logo--desktop" style={{ height: 80, width: 'auto' }} priority />
            <Image src="/bv-mark.webp" alt="Best Value" width={44} height={44} className="brand__logo brand__logo--mobile" style={{ height: 44, width: 'auto' }} priority />
          </a>

          <SearchForm />

          <div className="header__actions">
            <a className="icon-btn" href="tel:17737621000" aria-label="Call to order" style={{ color: 'var(--bv-red)' }}>
              <svg><use href="#i-phone" /></svg>
              <span className="icon-btn__label" style={{ fontFamily: 'var(--font-jost),sans-serif' }}>
                <span style={{ color: 'var(--ink-3)', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', display: 'block' }}>Call to order</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--bv-navy)', letterSpacing: '.01em' }}>(773) 762-1000</span>
              </span>
            </a>
            <button className="btn btn--primary" style={{ height: 44 }} onClick={() => window.dispatchEvent(new CustomEvent('bv:quote'))}>
              Request a quote
              <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>
            </button>
            <button
              className="menu-toggle"
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <svg><use href="#i-menu" /></svg>
            </button>
          </div>
        </div>

        <nav className="nav" aria-label="Primary">
          <div className="container">
            <div className="nav__row">
              <a className="nav__link is-active" href="/parts">Shop All Parts</a>
              <a className="nav__link" href="/paints">Automotive Paints</a>
              <a className="nav__link has-flame" href="/deals">
                <svg><use href="#i-flame" /></svg> Deals
              </a>
              <a className="nav__link" href="/returns">Returns &amp; Warranty</a>
              <a className="nav__link" href="/delivery">Same-Day Delivery</a>
              <a className="nav__link" href="/faq">FAQs</a>
              <a className="nav__link" href="/careers">Careers</a>
              <a className="nav__link" href="/register" style={{ color: 'var(--bv-red)', fontWeight: 700 }}>Register Account</a>
            </div>
          </div>
        </nav>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
