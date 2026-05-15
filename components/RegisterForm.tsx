'use client'

import { useState, useRef } from 'react'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

export default function RegisterForm() {
  const [form, setForm] = useState({
    companyName: '',
    street: '', city: '', state: '', zip: '',
    tel: '', mobile: '', fax: '',
    firstName: '', middleName: '', lastName: '',
    email: '',
    taxDeduction: '' as 'yes' | 'no' | '',
    printName: '',
    agreed: false,
  })
  const [taxFile, setTaxFile]   = useState<File | null>(null)
  const [status, setStatus]     = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.agreed) { setErrorMsg('Please read and agree to the declaration.'); return }
    setStatus('sending')
    setErrorMsg('')

    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
    if (taxFile) fd.append('taxFile', taxFile)

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
            <circle cx="24" cy="24" r="22" /><path d="m14 24 7 7 13-14" />
          </svg>
        </div>
        <h2>Application Received!</h2>
        <p>
          Thank you, <strong>{form.firstName} {form.lastName}</strong>. We&apos;ve received the account
          application for <strong>{form.companyName}</strong> and will be in touch within 1–2 business days.
        </p>
        <div className="reg-success__actions">
          <a className="btn btn--primary" href="/">Back to Home</a>
          <a className="btn btn--ghost" href="tel:17737621000">Call (773) 762-1000</a>
        </div>
      </div>
    )
  }

  return (
    <form className="acct-form" onSubmit={handleSubmit} noValidate>

      {/* Company Information */}
      <div className="acct-section">
        <h3 className="acct-section__title">Company Information</h3>

        <div className="acct-row">
          <div className="field field--full">
            <label htmlFor="r-company">Company Name <span aria-hidden="true">*</span></label>
            <input id="r-company" type="text" required placeholder="Acme Auto Body LLC"
              value={form.companyName} onChange={set('companyName')} />
          </div>
        </div>

        <div className="acct-row acct-row--addr">
          <div className="field" style={{ flex: 3 }}>
            <label htmlFor="r-street">Street</label>
            <input id="r-street" type="text" placeholder="123 Main St"
              value={form.street} onChange={set('street')} />
          </div>
          <div className="field" style={{ flex: 2 }}>
            <label htmlFor="r-city">City</label>
            <input id="r-city" type="text" placeholder="Chicago"
              value={form.city} onChange={set('city')} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label htmlFor="r-state">State</label>
            <select id="r-state" value={form.state} onChange={set('state')}>
              <option value="">-</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label htmlFor="r-zip">Zip</label>
            <input id="r-zip" type="text" maxLength={10} placeholder="60160"
              value={form.zip} onChange={set('zip')} />
          </div>
        </div>

        <div className="acct-row acct-row--3">
          <div className="field">
            <label htmlFor="r-tel">Tel / ID #</label>
            <input id="r-tel" type="tel" placeholder="(773) 762-1000"
              value={form.tel} onChange={set('tel')} />
          </div>
          <div className="field">
            <label htmlFor="r-mobile">Mobile Tel</label>
            <input id="r-mobile" type="tel" placeholder="(773) 555-0100"
              value={form.mobile} onChange={set('mobile')} />
          </div>
          <div className="field">
            <label htmlFor="r-fax">Fax</label>
            <input id="r-fax" type="tel" placeholder="(773) 542-5854"
              value={form.fax} onChange={set('fax')} />
          </div>
        </div>

        <div className="acct-row acct-row--3">
          <div className="field">
            <label htmlFor="r-first">Contact First Name <span aria-hidden="true">*</span></label>
            <input id="r-first" type="text" required placeholder="John"
              value={form.firstName} onChange={set('firstName')} />
          </div>
          <div className="field">
            <label htmlFor="r-middle">Middle Name</label>
            <input id="r-middle" type="text" placeholder="A."
              value={form.middleName} onChange={set('middleName')} />
          </div>
          <div className="field">
            <label htmlFor="r-last">Last Name <span aria-hidden="true">*</span></label>
            <input id="r-last" type="text" required placeholder="Smith"
              value={form.lastName} onChange={set('lastName')} />
          </div>
        </div>

        <div className="acct-row">
          <div className="field field--full">
            <label htmlFor="r-email">Email ID <span aria-hidden="true">*</span></label>
            <input id="r-email" type="email" required placeholder="john@yourshop.com"
              value={form.email} onChange={set('email')} />
          </div>
        </div>
      </div>

      {/* Tax Deduction */}
      <div className="acct-section">
        <div className="acct-tax">
          <span className="acct-tax__q">Want Tax Deduction?</span>
          <label className="acct-radio">
            <input type="radio" name="taxDeduction" value="yes"
              checked={form.taxDeduction === 'yes'}
              onChange={() => setForm(f => ({ ...f, taxDeduction: 'yes' }))} />
            <span />Yes
          </label>
          <label className="acct-radio">
            <input type="radio" name="taxDeduction" value="no"
              checked={form.taxDeduction === 'no'}
              onChange={() => setForm(f => ({ ...f, taxDeduction: 'no' }))} />
            <span />No
          </label>
          <span className="acct-tax__hint">If Yes, please attach a copy of Tax I.D.</span>
        </div>

        {form.taxDeduction === 'yes' && (
          <div className="field" style={{ marginTop: 16, maxWidth: 480 }}>
            <label>Tax I.D. Document <span className="field__hint">(PDF, JPG, PNG - max 5 MB)</span></label>
            <div
              className={`file-drop${taxFile ? ' has-file' : ''}`}
              onClick={() => fileRef.current?.click()}
            >
              {taxFile ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" style={{ color: 'var(--bv-red)', flexShrink: 0 }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h4" />
                  </svg>
                  <span>{taxFile.name}</span>
                  <button type="button" className="file-drop__remove"
                    onClick={ev => { ev.stopPropagation(); setTaxFile(null); if (fileRef.current) fileRef.current.value = '' }}>
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26" style={{ color: 'var(--ink-3)' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span>Click to upload your Tax I.D. document</span>
                </>
              )}
              <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,image/*" style={{ display: 'none' }}
                onChange={e => {
                  const f = e.target.files?.[0]
                  if (f && f.size > 5 * 1024 * 1024) { alert('File must be under 5 MB.'); return }
                  setTaxFile(f || null)
                }} />
            </div>
          </div>
        )}
      </div>

      {/* Declaration */}
      <div className="acct-section acct-declaration">
        <p className="acct-declaration__text">
          <em>
            I hereby declare that the information given here is complete and correct to the
            best of my knowledge and belief. I agree to open an account with{' '}
            <strong>BEST VALUE AUTO BODY SUPPLY INC.</strong>
          </em>
        </p>

        <div className="acct-sign">
          <div className="field" style={{ flex: 2 }}>
            <label htmlFor="r-print">Print Name <span aria-hidden="true">*</span></label>
            <input id="r-print" type="text" required placeholder="Full legal name"
              value={form.printName} onChange={set('printName')} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Date</label>
            <input type="text" readOnly value={new Date().toLocaleDateString('en-US')} style={{ background: 'var(--bg-soft)', color: 'var(--ink-3)' }} />
          </div>
        </div>

        <label className="acct-agree">
          <input type="checkbox" checked={form.agreed}
            onChange={e => setForm(f => ({ ...f, agreed: e.target.checked }))} />
          <span className="acct-agree__box" aria-hidden="true" />
          I have read the declaration above and agree to open an account with Best Value Auto Body Supply Inc.
        </label>

        {errorMsg && <p className="apply-error" style={{ marginTop: 14 }}>{errorMsg}</p>}
      </div>

      <div className="acct-footer">
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Submitting…' : 'Submit Application'}
          {status !== 'sending' && <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>}
        </button>
        <span className="acct-footer__note">We&apos;ll review your application and contact you within 1–2 business days.</span>
      </div>

    </form>
  )
}
