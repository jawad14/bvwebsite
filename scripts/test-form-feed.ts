// Smoke test for the website form archive (inquiry / quote / careers application)
// and a re-check of the registration feed.
// Run: set -a; source .env.local; set +a; npx tsx scripts/test-form-feed.ts
import { writeFormSubmissionToS3 } from '../lib/form-feed'
import { writeRegistrationToS3 } from '../lib/registration-feed'

async function main() {
  console.log('inquiry     ', await writeFormSubmissionToS3('inquiry', {
    category: 'Parts',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '3125551234',
    message: 'Do you carry alternators for a 2015 F-150?',
  }))

  console.log('quote       ', await writeFormSubmissionToS3('quote', {
    name: 'Sam Rivera',
    phone: '7735559876',
    email: '',
    vehicle: '2018 Honda Civic',
    parts: 'Front bumper',
    notes: '',
  }))

  console.log('application ', await writeFormSubmissionToS3(
    'application',
    {
      name: 'Alex Chen',
      email: 'alex@example.com',
      phone: '2245550000',
      address: '55 Oak St, Des Moines, IA, 50309',
      position: 'Delivery Driver',
      education: 'College | Iowa State | Degree: BSc',
    },
    { name: 'alex-resume.pdf', contentType: 'application/pdf', data: Buffer.from('%PDF-1.4 resume smoke test\n') },
  ))

  // Registration path again, to prove the shared-helper extraction is intact.
  console.log('registration', await writeRegistrationToS3({
    companyName: 'Refactor Check LLC',
    address: '1 Test Way, Chicago, IL, 60601',
    telIdNo: '3125550000',
    mobile: '',
    fax: '',
    contactName: 'QA Bot',
    email: 'qa@example.com',
    taxDeduction: 'No',
    printName: 'QA Bot',
    location: 'Bestvalue-GrandRapids',
  }, null))
}

main().catch(err => { console.error(err); process.exit(1) })
