import type { Metadata } from 'next'
import RegisterForm from '@/components/RegisterForm'

export const metadata: Metadata = {
  title: 'Registered Customer Program | Best Value Auto Body Supply',
  description:
    'Apply for a registered business account with Best Value Auto Body Supply. Enjoy volume discounts, customer credit, Net 30 terms, and a dedicated account rep.',
}

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
    title: 'Customer Credit Line',
    body: 'Earn a credit line based on your purchase history — up to $50,000 for high-volume accounts.',
  },
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
    body: 'Buy now, pay later with Net 30 invoice terms — ideal for managing shop cash flow.',
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
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
    title: 'Priority Support Line',
    body: 'Skip the queue — registered customers get direct access to our senior parts specialists.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: 'Early Access to Deals',
    body: 'Get first look at new arrivals, overstocked items, and clearance deals before they go public.',
  },
]

const steps = [
  { n: '1', title: 'Fill out the form', body: 'Provide your business details, contact info, and upload your business license.' },
  { n: '2', title: 'We review your application', body: 'Our team verifies your information within 1–2 business days.' },
  { n: '3', title: 'Get your account', body: 'Receive your login credentials, credit limit, and dedicated rep contact.' },
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

      {/* How it works */}
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section__head" style={{ marginBottom: 36 }}>
            <div>
              <span className="eyebrow">Process</span>
              <h2>How It Works</h2>
            </div>
          </div>
          <div className="reg-how">
            {steps.map(({ n, title, body }) => (
              <div key={n} className="reg-how__step">
                <span className="reg-how__num">{n}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section section--soft" id="apply">
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="section__head" style={{ marginBottom: 36 }}>
            <div>
              <span className="eyebrow">Application</span>
              <h2>Register Your Business</h2>
            </div>
          </div>
          <div className="reg-form-wrap">
            <RegisterForm />
          </div>
        </div>
      </section>
    </>
  )
}
