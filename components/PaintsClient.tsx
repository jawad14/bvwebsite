'use client'

import { useState, useEffect } from 'react'

interface Category {
  icon: string
  name: string
  description: string
  tags: string[]
}

const categories: Category[] = [
  {
    icon: '🎨', name: 'Paint',
    description: 'Basecoats, solid colors, and OEM-matched paint for collision repairs. Available in waterborne and solvent-based formulas for every spray system.',
    tags: ['Basecoat', 'Solid Color', 'OEM Match', 'Waterborne', 'Solvent'],
  },
  {
    icon: '✨', name: 'Clear Coat',
    description: 'High-gloss clear coats that protect your finish and deliver showroom shine. Choose from standard, high-build, and fast-dry formulas.',
    tags: ['High-Gloss', 'UV Protection', 'Fast Dry', 'High-Build'],
  },
  {
    icon: '🪣', name: 'Primer',
    description: 'Epoxy, urethane, and self-etching primers for superior adhesion and corrosion resistance on bare metal, plastic, and repaired substrates.',
    tags: ['Epoxy', 'Urethane', 'Self-Etching', 'High-Build', 'Sealer'],
  },
  {
    icon: '🧪', name: 'Thinners & Reducers',
    description: 'Slow, medium, and fast reducers to dial in viscosity and dry time for any shop environment. Compatible with all major paint systems.',
    tags: ['Slow', 'Medium', 'Fast', 'Temperature-Rated'],
  },
  {
    icon: '🧴', name: 'Additives & Cleaners',
    description: 'Wax and grease removers, fisheye eliminators, flex additives, and hardeners to prep surfaces and perfect your paint chemistry.',
    tags: ['Wax Remover', 'Fisheye Eliminator', 'Flex Additive', 'Hardener'],
  },
  {
    icon: '🔧', name: 'Body Repair & Fillers',
    description: 'Premium body filler, spot putty, and glazing compound for achieving a perfectly smooth substrate before primer and paint.',
    tags: ['Body Filler', 'Spot Putty', 'Glazing Compound', 'Lightweight Filler'],
  },
  {
    icon: '🩹', name: 'Adhesives & Sealants',
    description: 'Panel bond adhesive, seam sealer, and urethane windshield adhesive for structural repairs and waterproof joints.',
    tags: ['Panel Bond', 'Seam Sealer', 'Urethane', 'Structural'],
  },
  {
    icon: '🔴', name: 'Sandpaper & Abrasives',
    description: 'Dry and wet-sand abrasives from 40 to 3000 grit for every stage - stripping, block sanding, scuffing, and final color sanding.',
    tags: ['40–80 Grit', '150–320 Grit', '400–800 Grit', '1000–3000 Grit'],
  },
  {
    icon: '🎭', name: 'Masking Products',
    description: 'Fine-line masking tape, automotive masking paper, plastic sheeting, and pre-taped covers to protect every surface during paint.',
    tags: ['Fine-Line Tape', 'Masking Paper', 'Plastic Sheeting', 'Pre-Taped'],
  },
  {
    icon: '💨', name: 'Spray Products',
    description: 'Aerosol sprays for touch-ups, underbody protection, and quick repairs - ready-to-spray with no gun required.',
    tags: ['Touch-Up', 'Aerosol', 'Ready-to-Spray', 'Underbody'],
  },
  {
    icon: '🎯', name: 'Toners',
    description: 'Intermix toners for custom color blending and OEM color matching. Compatible with waterborne and solvent mixing systems.',
    tags: ['Intermix', 'Waterborne', 'Solvent', 'Custom Match'],
  },
  {
    icon: '🛡️', name: 'Undercoating',
    description: 'Rubberized and asphalt-based undercoating for rust prevention, sound deadening, and underbody protection on any vehicle.',
    tags: ['Rubberized', 'Asphalt', 'Sound Deadening', 'Rust Prevention'],
  },
  {
    icon: '🪄', name: 'Detail Products',
    description: 'Compound, polish, wax, clay bars, and interior dressings to finish and protect repaired vehicles before delivery.',
    tags: ['Compound', 'Polish', 'Wax', 'Clay Bar', 'Interior'],
  },
  {
    icon: '🔫', name: 'Tools & Equipment',
    description: 'Spray guns, mixing cups, stir sticks, strainers, tack cloths, and safety gear to keep your shop equipped and productive.',
    tags: ['Spray Guns', 'Mixing Cups', 'Strainers', 'Tack Cloths', 'Safety'],
  },
  {
    icon: '📦', name: 'Supply & Misc.',
    description: 'Shop consumables and specialty products - everything from mixing sticks and gloves to paint suits and respirator cartridges.',
    tags: ['Consumables', 'PPE', 'Gloves', 'Respirators', 'Paint Suits'],
  },
]

const EMPTY = { name: '', email: '', phone: '', message: '' }

export default function PaintsClient() {
  const [activeCategory, setActive] = useState<string | null>(null)
  const [form, setForm]             = useState(EMPTY)
  const [status, setStatus]         = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg]     = useState('')

  function openModal(name: string) {
    setActive(name)
    setForm(EMPTY)
    setStatus('idle')
    setErrorMsg('')
  }

  function closeModal() { setActive(null) }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = activeCategory ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeCategory])

  function set(field: keyof typeof EMPTY) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const fd = new FormData()
    fd.append('name',     form.name)
    fd.append('email',    form.email)
    fd.append('phone',    form.phone)
    fd.append('category', activeCategory!)
    fd.append('message',  form.message)

    try {
      const res  = await fetch('/api/inquiry', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unknown error')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <>
      {/* Category grid */}
      <div className="paint-cats">
        {categories.map(({ icon, name, description, tags }) => (
          <div key={name} className="paint-cat">
            <div className="paint-cat__head">
              <span className="paint-cat__icon">{icon}</span>
              <h3>{name}</h3>
            </div>
            <p>{description}</p>
            <div className="paint-cat__tags">
              {tags.map(t => <span key={t} className="paint-tag">{t}</span>)}
            </div>
            <button className="paint-cat__cta" onClick={() => openModal(name)}>
              Inquire about {name}
              <svg className="arrow" width="13" height="13"><use href="#i-arrow-sm" /></svg>
            </button>
          </div>
        ))}
      </div>

      {/* Inquiry modal */}
      {activeCategory && (
        <div
          className="apply-overlay"
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="apply-modal">
            <div className="apply-modal__head">
              <div>
                <p className="apply-modal__sub">Product Inquiry</p>
                <h3 className="apply-modal__title">{activeCategory}</h3>
              </div>
              <button className="drawer__close" onClick={closeModal} aria-label="Close">
                <svg><use href="#i-x" /></svg>
              </button>
            </div>

            {status === 'success' ? (
              <div className="apply-success">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="56" height="56" style={{ color: '#22c55e' }}>
                  <circle cx="24" cy="24" r="22" /><path d="m14 24 7 7 13-14" />
                </svg>
                <h4>Inquiry sent!</h4>
                <p>Thanks, {form.name}. One of our paint specialists will get back to you shortly.</p>
                <button className="btn btn--ghost" onClick={closeModal}>Close</button>
              </div>
            ) : (
              <form className="apply-form" onSubmit={handleSubmit} noValidate>
                <div className="inq-category-badge">
                  <span>Inquiring about:</span>
                  <strong>{activeCategory}</strong>
                </div>

                <div className="apply-form__grid">
                  <div className="field">
                    <label htmlFor="inq-name">Full Name <span aria-hidden="true">*</span></label>
                    <input id="inq-name" type="text" required placeholder="John Smith"
                      value={form.name} onChange={set('name')} />
                  </div>
                  <div className="field">
                    <label htmlFor="inq-email">Email <span aria-hidden="true">*</span></label>
                    <input id="inq-email" type="email" required placeholder="john@yourshop.com"
                      value={form.email} onChange={set('email')} />
                  </div>
                  <div className="field field--full">
                    <label htmlFor="inq-phone">Phone</label>
                    <input id="inq-phone" type="tel" placeholder="(773) 555-0100"
                      value={form.phone} onChange={set('phone')} />
                  </div>
                  <div className="field field--full">
                    <label htmlFor="inq-msg">What do you need? <span aria-hidden="true">*</span></label>
                    <textarea id="inq-msg" rows={4} required
                      placeholder={`Tell us what you need for ${activeCategory} - quantities, specific products, brands, or any questions…`}
                      value={form.message} onChange={set('message')} />
                  </div>
                </div>

                {status === 'error' && <p className="apply-error">{errorMsg}</p>}

                <div className="apply-form__actions">
                  <button type="button" className="btn btn--ghost" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
                    {status !== 'sending' && <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
