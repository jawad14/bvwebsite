// One-off smoke test for the S3 registration feed (contract acceptance step 2).
// Run: set -a; source .env.local; set +a; npx tsx scripts/test-registration-feed.ts
import { writeRegistrationToS3 } from '../lib/registration-feed'

async function main() {
  const result = await writeRegistrationToS3(
    {
      companyName: 'Test Shop LLC',
      address: '123 Main St, Chicago, IL, 60601',
      telIdNo: '7737621000',
      mobile: '',
      fax: '',
      contactName: 'John A Smith',
      email: 'test@example.com',
      taxDeduction: 'Yes',
      printName: 'John Smith',
    },
    {
      name: 'test-tax-doc.pdf',
      contentType: 'application/pdf',
      data: Buffer.from('%PDF-1.4 test document for feed acceptance\n'),
    },
  )
  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => { console.error(err); process.exit(1) })
