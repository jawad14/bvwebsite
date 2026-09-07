import { NextRequest, NextResponse } from 'next/server'

const SHEET_URL = process.env.GOOGLE_SHEET_INQUIRY_URL || process.env.GOOGLE_SHEET_URL!
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

    const name     = data.get('name')     as string
    const email    = data.get('email')    as string
    const phone    = data.get('phone')    as string || ''
    const category = data.get('category') as string
    const message  = data.get('message')  as string || ''

    if (!name || !email || !category) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Send to Google Sheet
    await fetch(SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'inquiry',
        category: String(category).substring(0, 100),
        name:     String(name).substring(0, 100),
        email:    String(email).substring(0, 100),
        phone:    String(phone).substring(0, 20),
        message:  String(message).substring(0, 2000),
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Inquiry API error:', err)
    return NextResponse.json({ error: 'Failed to send inquiry. Please try again.' }, { status: 500 })
  }
}
