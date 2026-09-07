import { NextRequest, NextResponse } from 'next/server'

const SHEET_URL = process.env.GOOGLE_SHEET_REGISTER_URL || process.env.GOOGLE_SHEET_URL!
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY!

// Rate limiting: track IPs
const submissions = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60_000 // 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (submissions.get(ip) || []).filter(t => now - t < RATE_WINDOW)
  if (timestamps.length >= RATE_LIMIT) return true
  timestamps.push(now)
  submissions.set(ip, timestamps)
  return false
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please wait and try again.' }, { status: 429 })
    }

    const data = await req.formData()

    // Honeypot check
    if (data.get('website')) {
      return NextResponse.json({ ok: true }) // silently reject
    }

    // Verify reCAPTCHA
    const recaptchaToken = data.get('recaptchaToken') as string
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
    })
    const recaptchaResult = await recaptchaRes.json()

    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 403 })
    }

    const companyName  = data.get('companyName')  as string
    const street       = data.get('street')        as string || ''
    const city         = data.get('city')          as string || ''
    const state        = data.get('state')         as string || ''
    const zip          = data.get('zip')           as string || ''
    const tel          = data.get('tel')           as string || ''
    const mobile       = data.get('mobile')        as string || ''
    const fax          = data.get('fax')           as string || ''
    const firstName    = data.get('firstName')     as string
    const middleName   = data.get('middleName')    as string || ''
    const lastName     = data.get('lastName')      as string
    const email        = data.get('email')         as string
    const taxDeduction = data.get('taxDeduction')  as string || ''
    const printName    = data.get('printName')     as string || ''
    const taxFile      = data.get('taxFile')       as File | null

    if (!companyName || !email || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const contactName = [firstName, middleName, lastName].filter(Boolean).join(' ')
    const address     = [street, city, state, zip].filter(Boolean).join(', ')
    const hasTaxFile  = !!(taxFile && taxFile.size > 0)

    // Encode the tax file so the Apps Script can save it to a Drive folder
    let taxFileName = ''
    let taxFileType = ''
    let taxFileData = ''
    if (hasTaxFile) {
      taxFileName = String(taxFile!.name).substring(0, 200)
      taxFileType = taxFile!.type || 'application/octet-stream'
      taxFileData = Buffer.from(await taxFile!.arrayBuffer()).toString('base64')
    }

    // Send to Google Sheet
    await fetch(SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'registration',
        companyName:  String(companyName).substring(0, 200),
        address:      String(address).substring(0, 300),
        tel:          String(tel).substring(0, 20),
        mobile:       String(mobile).substring(0, 20),
        fax:          String(fax).substring(0, 20),
        contactName:  String(contactName).substring(0, 200),
        email:        String(email).substring(0, 100),
        taxDeduction: taxDeduction === 'yes' ? 'Yes' : taxDeduction === 'no' ? 'No' : '',
        printName:    String(printName).substring(0, 200),
        taxFileName,
        taxFileType,
        taxFileData,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Register API error:', err)
    return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 })
  }
}
