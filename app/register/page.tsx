import type { Metadata } from 'next'
import RegisterForm from '@/components/RegisterForm'

export const metadata: Metadata = {
  title: 'Registered Customer Program | Best Value Auto Body Supply',
  description:
    'Apply for a registered business account with Best Value Auto Body Supply. Enjoy volume discounts, invoice terms for qualified customers, and a dedicated account rep.',
}

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" />
      </svg>
    ),
    title: 'Volume Discounts',
    body: 'Unlock tiered discounts of 5–20% off catalog prices based on your monthly order volume.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
    title: 'Net 30 Payment Terms',
    body: 'After 30 invoices terms — for qualified customers.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Dedicated Account Rep',
    body: 'One point of contact who knows your business, your vehicles, and your ordering patterns.',
  },
]

const steps = [
  { n: '1', title: 'Fill out the form', body: 'Provide your business details, contact info, and upload your business license.' },
  { n: '2', title: 'We review your application', body: 'Our team verifies your information within 1–2 business days.' },
  { n: '3', title: 'Get your account', body: 'Receive your login credentials and dedicated rep contact.' },
]

export default function RegisterPage() {
  return (
    <>
      {/* Banner */}
      <div className="page-banner">
        <div className="container page-banner__inner">
          <span className="eyebrow" style={{ color: '#FFB3B6' }}>Registered Customer Program</span>
          <h1>Apply for a Business Account</h1>
          <p>
            Licensed collision shops, mechanics, and dealers can apply for a registered account
            and unlock exclusive pricing, credit terms, and dedicated support.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <section className="section section--soft">
        <div className="container">
          <div className="section__head" style={{ marginBottom: 36 }}>
            <div>
              <span className="eyebrow">Member Benefits</span>
              <h2>Why Register?</h2>
            </div>
          </div>
          <div className="reg-benefits">
            {benefits.map(({ icon, title, body }) => (
              <div key={title} className="reg-benefit">
                <span className="reg-benefit__icon">{icon}</span>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section section--soft" id="apply">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="section__head" style={{ marginBottom: 36 }}>
            <div>
              <span className="eyebrow">Application</span>
              <h2>Application Form to Open a New Account</h2>
            </div>
          </div>
          <div className="acct-form-wrap">
            <div className="acct-form-header">
              <strong>Best Value Auto Body Supply, Inc.</strong>
              <span>160 N 25th Ave · Melrose Park, IL 60160 · Phone: (773) 762-1000 · Fax: (773) 542-5854</span>
            </div>
            <RegisterForm />
          </div>
        </div>
      </section>
    </>
  )
}
