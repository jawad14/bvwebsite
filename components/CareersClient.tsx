'use client'

import { useState, useRef, useEffect } from 'react'

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
}

const jobs: Job[] = [
  {
    id: 'parts-sales-rep',
    title: 'Parts Sales Representative',
    department: 'Sales',
    location: 'Melrose Park, IL',
    type: 'Full-time',
    description:
      'Handle inbound calls and quotes from collision repair shops and independent mechanics. You\'ll match customers with the right OEM-quality parts quickly and accurately.',
    requirements: [
      'Experience in automotive parts sales or counter sales',
      'Strong phone communication skills',
      'Ability to work in a fast-paced call center environment',
      'Basic knowledge of auto body or collision parts a plus',
    ],
  },
  {
    id: 'customer-service',
    title: 'Customer Service Specialist',
    department: 'Customer Service',
    location: 'Melrose Park, IL',
    type: 'Full-time',
    description:
      'Be the voice of Best Value for our customers — resolving order issues, tracking deliveries, handling returns, and ensuring every customer leaves satisfied.',
    requirements: [
      '2+ years customer service experience',
      'Calm under pressure with strong problem-solving skills',
      'Proficiency with order management or CRM systems',
      'Bilingual (English/Spanish) a plus',
    ],
  },
  {
    id: 'warehouse-associate',
    title: 'Warehouse Associate',
    department: 'Operations',
    location: 'Melrose Park, IL',
    type: 'Full-time',
    description:
      'Pick, pack, and stage orders for our same-day delivery fleet. Keep inventory accurate and the warehouse organized so we can ship fast every single day.',
    requirements: [
      'Ability to lift up to 75 lbs',
      'Experience in a warehouse or distribution center preferred',
      'Forklift certification a plus',
      'Reliable and punctual — early shift starts at 6 AM',
    ],
  },
  {
    id: 'delivery-driver',
    title: 'Delivery Driver',
    department: 'Logistics',
    location: 'Chicago Metro Area',
    type: 'Full-time',
    description:
      'Drive our company fleet to deliver parts to collision shops and customers across the Chicago metro area. Same-day routes, company vehicle, and competitive pay.',
    requirements: [
      'Valid Illinois driver\'s license with clean driving record',
      'Familiarity with Chicago metro streets and suburbs',
      'Ability to lift and carry auto parts (up to 75 lbs)',
      'DOT medical card or willingness to obtain one',
    ],
  },
  {
    id: 'counter-sales',
    title: 'Counter Sales Associate',
    department: 'Sales',
    location: 'Melrose Park, IL',
    type: 'Full-time',
    description:
      'Serve walk-in customers at our Melrose Park counter. Help mechanics and DIY customers find the right parts, process orders, and keep the counter running smoothly.',
    requirements: [
      'Previous counter or retail sales experience',
      'Knowledge of auto parts or willingness to learn quickly',
      'Strong interpersonal skills and customer-first attitude',
      'Spanish language skills a plus',
    ],
  },
]

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  message: '',
}

export default function CareersClient() {
  const [activeJob, setActiveJob] = useState<Job | null>(null)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [resumeFile, setResume]   = useState<File | null>(null)
  const [status, setStatus]       = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg]   = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  function openModal(job: Job) {
    setActiveJob(job)
    setForm(EMPTY_FORM)
    setResume(null)
    setStatus('idle')
    setErrorMsg('')
  }

  function closeModal() {
    setActiveJob(null)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = activeJob ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeJob])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!activeJob) return

    setStatus('sending')
    setErrorMsg('')

    const fd = new FormData()
    fd.append('name',     form.name)
    fd.append('email',    form.email)
    fd.append('phone',    form.phone)
    fd.append('position', activeJob.title)
    fd.append('linkedin', form.linkedin)
    fd.append('message',  form.message)
    if (resumeFile) fd.append('resume', resumeFile)

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: fd })
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
      {/* Job listings */}
      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card__meta">
              <span className="chip">{job.department}</span>
              <span className="job-card__type">{job.type}</span>
            </div>
            <h3 className="job-card__title">{job.title}</h3>
            <p className="job-card__loc">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z" />
                <circle cx="8" cy="6" r="1.5" />
              </svg>
              {job.location}
            </p>
            <p className="job-card__desc">{job.description}</p>
            <ul className="job-card__reqs">
              {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
            <button className="btn btn--primary" onClick={() => openModal(job)}>
              Apply Now
              <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>
            </button>
          </div>
        ))}
      </div>

      {/* Apply modal */}
      {activeJob && (
        <div
          className="apply-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="apply-modal" ref={modalRef}>
            <div className="apply-modal__head">
              <div>
                <p className="apply-modal__sub">Applying for</p>
                <h3 className="apply-modal__title">{activeJob.title}</h3>
              </div>
              <button className="drawer__close" onClick={closeModal} aria-label="Close">
                <svg><use href="#i-x" /></svg>
              </button>
            </div>

            {status === 'success' ? (
              <div className="apply-success">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="56" height="56" style={{ color: '#22c55e' }}>
                  <circle cx="24" cy="24" r="22" />
                  <path d="m14 24 7 7 13-14" />
                </svg>
                <h4>Application submitted!</h4>
                <p>Thank you, {form.name}. We&apos;ll review your application and get back to you soon.</p>
                <button className="btn btn--ghost" onClick={closeModal}>Close</button>
              </div>
            ) : (
              <form className="apply-form" onSubmit={handleSubmit} noValidate>
                <div className="apply-form__grid">
                  <div className="field">
                    <label htmlFor="af-name">Full Name <span aria-hidden="true">*</span></label>
                    <input
                      id="af-name" type="text" required autoComplete="name"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="af-email">Email <span aria-hidden="true">*</span></label>
                    <input
                      id="af-email" type="email" required autoComplete="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="af-phone">Phone</label>
                    <input
                      id="af-phone" type="tel" autoComplete="tel"
                      placeholder="(773) 555-0100"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="af-linkedin">LinkedIn / Portfolio URL</label>
                    <input
                      id="af-linkedin" type="url"
                      placeholder="https://linkedin.com/in/…"
                      value={form.linkedin}
                      onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                    />
                  </div>
                  <div className="field field--full">
                    <label htmlFor="af-message">Cover Letter</label>
                    <textarea
                      id="af-message" rows={5}
                      placeholder="Tell us why you'd be a great fit…"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                  <div className="field field--full">
                    <label>Resume <span className="field__hint">(PDF, DOC, DOCX — max 4 MB)</span></label>
                    <div
                      className={`file-drop${resumeFile ? ' has-file' : ''}`}
                      onClick={() => fileRef.current?.click()}
                    >
                      {resumeFile ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" style={{ color: 'var(--bv-red)' }}>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h4" />
                          </svg>
                          <span>{resumeFile.name}</span>
                          <button
                            type="button"
                            className="file-drop__remove"
                            onClick={e => { e.stopPropagation(); setResume(null); if (fileRef.current) fileRef.current.value = '' }}
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" style={{ color: 'var(--ink-3)' }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span>Click to upload your resume</span>
                        </>
                      )}
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        style={{ display: 'none' }}
                        onChange={e => {
                          const f = e.target.files?.[0]
                          if (f && f.size > 4 * 1024 * 1024) {
                            alert('File is too large. Please upload a file under 4 MB.')
                            return
                          }
                          setResume(f || null)
                        }}
                      />
                    </div>
                  </div>
                </div>

                {status === 'error' && (
                  <p className="apply-error">{errorMsg}</p>
                )}

                <div className="apply-form__actions">
                  <button type="button" className="btn btn--ghost" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Submit Application'}
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
