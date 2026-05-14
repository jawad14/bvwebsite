import type { Metadata } from 'next'
import { Suspense } from 'react'
import CareerApplyForm from '@/components/CareerApplyForm'

export const metadata: Metadata = {
  title: 'Job Application | Best Value Auto Body Supply',
  description: 'Apply for a position at Best Value Auto Body Supply — Warehouse, Driver, Customer Service, and more.',
}

export default function ApplyPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner__inner">
          <span className="eyebrow" style={{ color: '#FFB3B6' }}>Employment Application</span>
          <h1>Apply for a Position</h1>
          <p>
            Complete the form below and submit your application online. We review every
            application and will contact qualified candidates within a few business days.
          </p>
        </div>
      </div>

      <section className="section section--soft">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="app-form-wrap">
            <div className="app-form-header">
              <div className="app-form-header__brand">
                <strong>Best Value Auto Body Supply, Inc.</strong>
                <span>160 N 25th Ave · Melrose Park, IL 60160</span>
                <span>Phone: (773) 762-1000 · Fax: (773) 542-5854</span>
              </div>
              <a className="btn btn--ghost btn--sm" href="/careers">← All positions</a>
            </div>
            <Suspense>
              <CareerApplyForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
