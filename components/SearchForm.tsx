'use client'

import { useRef } from 'react'

export default function SearchForm() {
  const btnRef = useRef<HTMLButtonElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!btnRef.current) return
    const original = btnRef.current.innerHTML
    btnRef.current.innerHTML = '✓ Searching…'
    setTimeout(() => {
      if (btnRef.current) btnRef.current.innerHTML = original
    }, 1400)
  }

  return (
    <form className="megasearch" role="search" aria-label="Find parts that fit your vehicle" onSubmit={handleSubmit}>
      <div className="megasearch__field is-text">
        <label htmlFor="q">Search parts</label>
        <input id="q" type="search" placeholder="Bumper cover, headlight assembly, fender…" />
      </div>
      <div className="megasearch__field">
        <label htmlFor="year">Year</label>
        <select id="year">
          <option>2024</option><option>2023</option><option>2022</option>
          <option>2021</option><option>2020</option>
        </select>
        <svg className="caret"><use href="#i-caret" /></svg>
      </div>
      <div className="megasearch__field">
        <label htmlFor="make">Make</label>
        <select id="make">
          <option>Ford</option><option>Chevrolet</option><option>Toyota</option>
          <option>Honda</option><option>RAM</option>
        </select>
        <svg className="caret"><use href="#i-caret" /></svg>
      </div>
      <div className="megasearch__field">
        <label htmlFor="model">Model</label>
        <select id="model">
          <option>F-150</option><option>Silverado 1500</option><option>Camry</option>
          <option>Civic</option><option>1500</option>
        </select>
        <svg className="caret"><use href="#i-caret" /></svg>
      </div>
      <button className="megasearch__go" type="submit" ref={btnRef}>
        <svg width="16" height="16"><use href="#i-search" /></svg>
        Find parts
      </button>
    </form>
  )
}
