'use client'

import { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const POSITIONS = [
  'Warehouse',
  'Driver',
  'Customer Service / General Offices',
  'Other',
]

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

interface EduRow {
  name: string
  address: string
  from: string
  to: string
  graduated: 'yes' | 'no' | ''
  degree: string
}

const emptyEdu = (): EduRow => ({ name: '', address: '', from: '', to: '', graduated: '', degree: '' })

export default function CareerApplyForm() {
  const params = useSearchParams()
  const preselect = params.get('position') || ''

  const [form, setForm] = useState({
    lastName: '', firstName: '', mi: '',
    address: '', apt: '', city: '', state: '', zip: '',
    phone: '', email: '',
    otherPosition: '',
  })
  const [positions, setPositions] = useState<string[]>(preselect ? [preselect] : [])
  const [education, setEducation] = useState({
    highSchool: emptyEdu(),
    college:    emptyEdu(),
    other:      emptyEdu(),
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [status, setStatus]         = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg]     = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function setF(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  function setEdu(section: keyof typeof education, field: keyof EduRow, value: string) {
    setEducation(ed => ({ ...ed, [section]: { ...ed[section], [field]: value } }))
  }

  function togglePosition(pos: string) {
    setPositions(prev =>
      prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (positions.length === 0) {
      setErrorMsg('Please select at least one position.')
      return
    }
    setStatus('sending')
    setErrorMsg('')

    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    const positionList = positions.includes('Other') && form.otherPosition
      ? positions.map(p => p === 'Other' ? `Other: ${form.otherPosition}` : p).join(', ')
      : positions.join(', ')
    fd.append('position', positionList)
    fd.append('education', JSON.stringify(education))
    if (resumeFile) fd.append('resume', resumeFile)

    try {
      const res  = await fetch('/api/apply', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unknown error')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="apply-success" style={{ padding: '60px 32px' }}>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="56" height="56" style={{ color: '#22c55e' }}>
          <circle cx="24" cy="24" r="22" /><path d="m14 24 7 7 13-14" />
        </svg>
        <h4>Application Submitted!</h4>
        <p>Thank you, {form.firstName}. We&apos;ll review your application and be in touch soon.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          <a className="btn btn--primary" href="/careers">View all positions</a>
          <a className="btn btn--ghost" href="/">Back to Home</a>
        </div>
      </div>
    )
  }

  return (
    <form className="app-form" onSubmit={handleSubmit} noValidate>

      {/* EEO Notice */}
      <div className="app-eeo">
        <strong>Equal Employment Opportunity Employer.</strong> We adhere to a policy of making
        employment decisions without regard to race, color, religion, sex, sexual orientation,
        national origin, citizenship, age, or disability. Your opportunity for employment
        depends solely on your qualifications.
      </div>

      {/* Personal Information */}
      <div className="app-section">
        <h3 className="app-section__title">Personal Information</h3>
        <div className="app-grid">
          <div className="field" style={{ gridColumn: 'span 3' }}>
            <label htmlFor="af-last">Last Name <span aria-hidden="true">*</span></label>
            <input id="af-last" type="text" required placeholder="Smith"
              value={form.lastName} onChange={setF('lastName')} />
          </div>
          <div className="field" style={{ gridColumn: 'span 3' }}>
            <label htmlFor="af-first">First Name <span aria-hidden="true">*</span></label>
            <input id="af-first" type="text" required placeholder="John"
              value={form.firstName} onChange={setF('firstName')} />
          </div>
          <div className="field">
            <label htmlFor="af-mi">M.I.</label>
            <input id="af-mi" type="text" maxLength={1} placeholder="A"
              value={form.mi} onChange={setF('mi')} />
          </div>

          <div className="field" style={{ gridColumn: 'span 5' }}>
            <label htmlFor="af-addr">Street Address <span aria-hidden="true">*</span></label>
            <input id="af-addr" type="text" required placeholder="123 Main St"
              value={form.address} onChange={setF('address')} />
          </div>
          <div className="field" style={{ gridColumn: 'span 2' }}>
            <label htmlFor="af-apt">Apt / Unit</label>
            <input id="af-apt" type="text" placeholder="Apt 2B"
              value={form.apt} onChange={setF('apt')} />
          </div>

          <div className="field" style={{ gridColumn: 'span 3' }}>
            <label htmlFor="af-city">City <span aria-hidden="true">*</span></label>
            <input id="af-city" type="text" required placeholder="Melrose Park"
              value={form.city} onChange={setF('city')} />
          </div>
          <div className="field" style={{ gridColumn: 'span 2' }}>
            <label htmlFor="af-state">State</label>
            <select id="af-state" value={form.state} onChange={setF('state')}>
              <option value="">State</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="field" style={{ gridColumn: 'span 2' }}>
            <label htmlFor="af-zip">ZIP <span aria-hidden="true">*</span></label>
            <input id="af-zip" type="text" required maxLength={10} placeholder="60160"
              value={form.zip} onChange={setF('zip')} />
          </div>

          <div className="field" style={{ gridColumn: 'span 3' }}>
            <label htmlFor="af-phone">Phone # <span aria-hidden="true">*</span></label>
            <input id="af-phone" type="tel" required placeholder="(773) 555-0100"
              value={form.phone} onChange={setF('phone')} />
          </div>
          <div className="field" style={{ gridColumn: 'span 4' }}>
            <label htmlFor="af-email">Email Address <span aria-hidden="true">*</span></label>
            <input id="af-email" type="email" required placeholder="john@example.com"
              value={form.email} onChange={setF('email')} />
          </div>
        </div>
      </div>

      {/* Position Applied For */}
      <div className="app-section">
        <h3 className="app-section__title">Position Applied For <span aria-hidden="true" style={{ color: 'var(--bv-red)' }}>*</span></h3>
        <div className="app-positions">
          {POSITIONS.map(pos => (
            <label key={pos} className={`pos-check${positions.includes(pos) ? ' is-checked' : ''}`}>
              <input
                type="checkbox"
                checked={positions.includes(pos)}
                onChange={() => togglePosition(pos)}
              />
              <span className="pos-check__box" aria-hidden="true" />
              {pos}
            </label>
          ))}
        </div>
        {positions.includes('Other') && (
          <div className="field" style={{ maxWidth: 360, marginTop: 12 }}>
            <label htmlFor="af-other-pos">Please specify</label>
            <input id="af-other-pos" type="text" placeholder="Position title…"
              value={form.otherPosition} onChange={setF('otherPosition')} />
          </div>
        )}
      </div>

      {/* Education */}
      <div className="app-section">
        <h3 className="app-section__title">Education</h3>
        <div className="edu-table">
          <div className="edu-table__head">
            <span>School</span>
            <span>Address</span>
            <span>From</span>
            <span>To</span>
            <span>Graduated?</span>
            <span>Degree / Diploma</span>
          </div>
          {([
            ['highSchool', 'High School'],
            ['college',    'College'],
            ['other',      'Other'],
          ] as const).map(([key, label]) => (
            <div key={key} className="edu-table__row">
              <div className="edu-table__label">{label}</div>
              <input type="text" placeholder="School name"
                value={education[key].name}
                onChange={e => setEdu(key, 'name', e.target.value)} />
              <input type="text" placeholder="City, State"
                value={education[key].address}
                onChange={e => setEdu(key, 'address', e.target.value)} />
              <input type="text" placeholder="Year"
                value={education[key].from}
                onChange={e => setEdu(key, 'from', e.target.value)} />
              <input type="text" placeholder="Year"
                value={education[key].to}
                onChange={e => setEdu(key, 'to', e.target.value)} />
              <div className="edu-grad">
                <label className="edu-yn">
                  <input type="radio" name={`grad-${key}`} value="yes"
                    checked={education[key].graduated === 'yes'}
                    onChange={() => setEdu(key, 'graduated', 'yes')} />
                  Yes
                </label>
                <label className="edu-yn">
                  <input type="radio" name={`grad-${key}`} value="no"
                    checked={education[key].graduated === 'no'}
                    onChange={() => setEdu(key, 'graduated', 'no')} />
                  No
                </label>
              </div>
              <input type="text" placeholder="e.g. B.S., GED"
                value={education[key].degree}
                onChange={e => setEdu(key, 'degree', e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* Resume */}
      <div className="app-section">
        <h3 className="app-section__title">Resume <span className="field__hint">(PDF, DOC, DOCX - max 4 MB, optional)</span></h3>
        <div
          className={`file-drop${resumeFile ? ' has-file' : ''}`}
          style={{ maxWidth: 480 }}
          onClick={() => fileRef.current?.click()}
        >
          {resumeFile ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" style={{ color: 'var(--bv-red)', flexShrink: 0 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h4" />
              </svg>
              <span>{resumeFile.name}</span>
              <button type="button" className="file-drop__remove"
                onClick={ev => { ev.stopPropagation(); setResumeFile(null); if (fileRef.current) fileRef.current.value = '' }}>
                Remove
              </button>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26" style={{ color: 'var(--ink-3)' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Click to upload your resume</span>
            </>
          )}
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
            onChange={e => {
              const f = e.target.files?.[0]
              if (f && f.size > 4 * 1024 * 1024) { alert('File must be under 4 MB.'); return }
              setResumeFile(f || null)
            }} />
        </div>
      </div>

      {errorMsg && <p className="apply-error" style={{ margin: '0 0 16px' }}>{errorMsg}</p>}

      <div className="app-footer">
        <p className="app-footer__note">
          By submitting this application you certify that the information provided is true and complete to the best of your knowledge.
        </p>
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Submitting…' : 'Submit Application'}
          {status !== 'sending' && <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>}
        </button>
      </div>
    </form>
  )
}
