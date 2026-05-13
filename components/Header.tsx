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
            <Image src="/bv-logo.png" alt="Best Value Auto Body Supply" width={123} height={44} className="brand__mark" priority />
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
            <a className="btn btn--primary" href="#contact" style={{ height: 44 }}>
              Request a quote
              <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>
            </a>
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
              <a className="nav__link is-active" href="#">Shop All Parts</a>
              <a className="nav__link" href="#">Bumpers</a>
              <a className="nav__link" href="#">Headlights &amp; Tail Lights</a>
              <a className="nav__link" href="#">Fenders</a>
              <a className="nav__link" href="#">Mirrors</a>
              <a className="nav__link" href="#">Grilles</a>
              <a className="nav__link" href="#">Hoods &amp; Panels</a>
              <a className="nav__link" href="#">Heating &amp; Cooling</a>
              <a className="nav__link" href="#">Automotive Paints</a>
              <a className="nav__link has-flame" href="#">
                <svg><use href="#i-flame" /></svg> Deals
              </a>
            </div>
          </div>
        </nav>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
