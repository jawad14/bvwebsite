'use client'

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  applyAs: string
}

const jobs: Job[] = [
  {
    id: 'warehouse-associate',
    title: 'Warehouse Associate',
    department: 'Operations',
    location: 'Melrose Park, IL',
    type: 'Full-time',
    applyAs: 'Warehouse',
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
    applyAs: 'Driver',
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
    id: 'customer-service',
    title: 'Customer Service Specialist',
    department: 'Customer Service',
    location: 'Melrose Park, IL',
    type: 'Full-time',
    applyAs: 'Customer Service / General Offices',
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
    id: 'parts-sales-rep',
    title: 'Parts Sales Representative',
    department: 'Sales',
    location: 'Melrose Park, IL',
    type: 'Full-time',
    applyAs: 'Customer Service / General Offices',
    description:
      'Handle inbound calls and quotes from collision repair shops and independent mechanics. Match customers with the right OEM-quality parts quickly and accurately.',
    requirements: [
      'Experience in automotive parts sales or counter sales',
      'Strong phone communication skills',
      'Ability to work in a fast-paced call center environment',
      'Basic knowledge of auto body or collision parts a plus',
    ],
  },
  {
    id: 'counter-sales',
    title: 'Counter Sales Associate',
    department: 'Sales',
    location: 'Melrose Park, IL',
    type: 'Full-time',
    applyAs: 'Customer Service / General Offices',
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

export default function CareersClient() {
  return (
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
          <a
            className="btn btn--primary"
            href={`/careers/apply?position=${encodeURIComponent(job.applyAs)}`}
          >
            Apply Now
            <svg className="arrow" width="14" height="14"><use href="#i-arrow-sm" /></svg>
          </a>
        </div>
      ))}
    </div>
  )
}
