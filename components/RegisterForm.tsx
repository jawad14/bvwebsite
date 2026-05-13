'use client'

import { useState, useRef } from 'react'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

const BUSINESS_TYPES = [
  'Auto Body / Collision Repair Shop',
  'Independent Mechanic / Auto Repair',
  'Auto Dealership',
  'Fleet / Transportation Company',
  'Towing & Recovery',
  'Insurance / Appraisal',
  'Other',
]

const BUDGET_RANGES = [
  'Under $1,000 / month',
  '$1,000 – $5,000 / month',
  '$5,000 – $15,000 / month',
  '$15,000 – $50,000 / month',
  'Over $50,000 / month',
]

const SOURCES = [
  'Google / Search',
  'Referral from another shop',
  'Sales representative',
  'Social media',
  'Trade show / event',
  'Other',
]

type Step = 1 | 2 | 3

const EMPTY = {
  businessName: '', businessType: '', ein: '', yearsInBusiness: '', website: '', monthlyBudget: '',
  contactName: '', title: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '',
  licenseNumber: '', licenseState: '', notes: '', source: '',
}

export default function RegisterForm() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState(EMPTY)
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function set(field: keyof typeof EMPTY) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  function nextStep() { setStep(s => Math.min(s + 1, 3) as Step) }
  function prevStep() { setStep(s => Math.max(s - 1, 1) as Step) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (licenseFile) fd.append('licenseFile', licenseFile)

    try {
      const res  = await fetch('/api/register', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unknown error')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="reg-success">
        <div className="reg-success__icon">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="24" cy="24" r="22" />
            <path d="m14 24 7 7 13-14" />
          </svg>
        </div>
        <h2>Application Received!</h2>
        <p>
          Thank you, <strong>{form.contactName}</strong>. We&apos;ve received your registration for{' '}
          <strong>{form.businessName}</strong> and sent a confirmation to <strong>{form.email}</strong>.
        </p>
        <p>Our team will review your application within <strong>1–2 business days</strong> and contact you with your account details.</p>
        <div className="reg-success__actions">
          <a className="btn btn--primary" href="/">Back to Home</a>
          <a className="btn btn--ghost" href="tel:17737621000">Call Us: (773) 762-1000</a>
        </div>
      </div>
    )
  }

  return (
    <form className="reg-form" onSubmit={handleSubmit} noValidate>
      {/* Step indicator */}
      <div className="reg-steps">
        {(['Business Info', 'Contact & Address', 'License & Submit'] as const).map((label, i) => {
          const n = (i + 1) as Step
          return (
            <div key={label} className={`reg-step${step === n ? ' is-active' : ''}${step > n ? ' is-done' : ''}`}>
              <span className="reg-step__num">
                {step > n
                  ? <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="m3 8 3.5 3.5 6.5-7" /></svg>
                  : n}
              </span>
              <span className="reg-step__label">{label}</span>
              {i < 2 && <span className="reg-step__line" />}
            </div>
          )
        })}
      </div>

      {/* Step 1 — Business Info */}
      {step === 1 && (
        <div className="reg-panel">
          <h3 className="reg-panel__title">Business Information</h3>
          <div className="apply-form__grid">
            <div className="field field--full">
              <label htmlFor="r-bname">Business Name <span aria-hidden="true">*</span></label>
              <input id="r-bname" type="text" required placeholder="Acme Auto Body LLC"
                value={form.businessName} onChange={set('businessName')} />
            </div>
            <div className="field field--full">
              <label htmlFor="r-btype">Business Type <span aria-hidden="true">*</span></label>
              <select id="r-btype" required value={form.businessType} onChange={set('businessType')}>
                <option value="">Select type…</option>
                {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="r-ein">Federal Tax ID / EIN</label>
              <input id="r-ein" type="text" placeholder="12-3456789"
                value={form.ein} onChange={set('ein')} />
            </div>
            <div className="field">
              <label htmlFor="r-years">Years in Business</label>
              <input id="r-years" type="number" min="0" placeholder="5"
                value={form.yearsInBusiness} onChange={set('yearsInBusiness')} />
            </div>
            <div className="field">
              <label htmlFor="r-website">Website</label>
              <input id="r-website" type="url" placeholder="https://yourshop.com"
                value={form.website} onChange={set('website')} />
            </div>
            <div className="field">
              <label htmlFor="r-budget">Est. Monthly Parts Budget</label>
              <select id="r-budget" value={form.monthlyBudget} onChange={set('monthlyBudget')}>
                <option value="">Select range…</option>
                {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="reg-nav">
            <span />
            <button type="button" className="btn btn--primary" onClick={nextStep}
              disabled={!form.businessName || !form.businessType}>
              Next: Contact Info
              <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Contact & Address */}
      {step === 2 && (
        <div className="reg-panel">
          <h3 className="reg-panel__title">Contact &amp; Business Address</h3>
          <div className="apply-form__grid">
            <div className="field">
              <label htmlFor="r-cname">Contact Name <span aria-hidden="true">*</span></label>
              <input id="r-cname" type="text" required placeholder="John Smith"
                value={form.contactName} onChange={set('contactName')} />
            </div>
            <div className="field">
              <label htmlFor="r-title">Title / Role</label>
              <input id="r-title" type="text" placeholder="Owner"
                value={form.title} onChange={set('title')} />
            </div>
            <div className="field">
              <label htmlFor="r-email">Email <span aria-hidden="true">*</span></label>
              <input id="r-email" type="email" required placeholder="john@yourshop.com"
                value={form.email} onChange={set('email')} />
            </div>
            <div className="field">
              <label htmlFor="r-phone">Phone <span aria-hidden="true">*</span></label>
              <input id="r-phone" type="tel" required placeholder="(773) 555-0100"
                value={form.phone} onChange={set('phone')} />
            </div>
            <div className="field field--full">
              <label htmlFor="r-addr">Street Address</label>
              <input id="r-addr" type="text" placeholder="123 Main St"
                value={form.address} onChange={set('address')} />
            </div>
            <div className="field">
              <label htmlFor="r-city">City</label>
              <input id="r-city" type="text" placeholder="Chicago"
                value={form.city} onChange={set('city')} />
            </div>
            <div className="field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field">
                <label htmlFor="r-state">State</label>
                <select id="r-state" value={form.state} onChange={set('state')}>
                  <option value="">State</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="r-zip">ZIP</label>
                <input id="r-zip" type="text" maxLength={10} placeholder="60160"
                  value={form.zip} onChange={set('zip')} />
              </div>
            </div>
          </div>
          <div className="reg-nav">
            <button type="button" className="btn btn--ghost" onClick={prevStep}>← Back</button>
            <button type="button" className="btn btn--primary" onClick={nextStep}
              disabled={!form.contactName || !form.email || !form.phone}>
              Next: License &amp; Submit
              <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — License & Submit */}
      {step === 3 && (
        <div className="reg-panel">
          <h3 className="reg-panel__title">Business License &amp; Final Details</h3>
          <div className="apply-form__grid">
            <div className="field">
              <label htmlFor="r-lnum">Business License Number</label>
              <input id="r-lnum" type="text" placeholder="BL-123456"
                value={form.licenseNumber} onChange={set('licenseNumber')} />
            </div>
            <div className="field">
              <label htmlFor="r-lstate">License State</label>
              <select id="r-lstate" value={form.licenseState} onChange={set('licenseState')}>
                <option value="">Select state…</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field field--full">
              <label>Upload Business License <span className="field__hint">(PDF, JPG, PNG — max 5 MB)</span></label>
              <div
                className={`file-drop${licenseFile ? ' has-file' : ''}`}
                onClick={() => fileRef.current?.click()}
              >
                {licenseFile ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" style={{ color: 'var(--bv-red)', flexShrink: 0 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h4" />
                    </svg>
                    <span>{licenseFile.name}</span>
                    <button type="button" className="file-drop__remove"
                      onClick={e => { e.stopPropagation(); setLicenseFile(null); if (fileRef.current) fileRef.current.value = '' }}>
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" style={{ color: 'var(--ink-3)' }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Click to upload your business license</span>
                  </>
                )}
                <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,image/*,application/pdf" style={{ display: 'none' }}
                  onChange={e => {
                    const f = e.target.files?.[0]
                    if (f && f.size > 5 * 1024 * 1024) { alert('File must be under 5 MB.'); return }
                    setLicenseFile(f || null)
                  }} />
              </div>
            </div>
            <div className="field field--full">
              <label htmlFor="r-notes">Additional Notes</label>
              <textarea id="r-notes" rows={4} placeholder="Tell us about your business, parts needs, or any questions…"
                value={form.notes} onChange={set('notes')} />
            </div>
            <div className="field field--full">
              <label htmlFor="r-source">How did you hear about us?</label>
              <select id="r-source" value={form.source} onChange={set('source')}>
                <option value="">Select…</option>
                {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {status === 'error' && <p className="apply-error">{errorMsg}</p>}

          <div className="reg-nav">
            <button type="button" className="btn btn--ghost" onClick={prevStep}>← Back</button>
            <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Submitting…' : 'Submit Registration'}
              {status !== 'sending' && <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
