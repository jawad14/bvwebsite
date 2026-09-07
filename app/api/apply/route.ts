import { NextRequest, NextResponse } from 'next/server'

const SHEET_URL = process.env.GOOGLE_SHEET_APPLY_URL || process.env.GOOGLE_SHEET_URL!
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

interface EduRow { name?: string; address?: string; from?: string; to?: string; graduated?: string; degree?: string }

function formatEducation(raw: string): string {
  if (!raw) return ''
  try {
    const edu = JSON.parse(raw) as Record<string, EduRow>
    const labels: Record<string, string> = { highSchool: 'High School', college: 'College', other: 'Other' }
    return Object.entries(edu)
      .filter(([, r]) => r && (r.name || r.degree))
      .map(([key, r]) => {
        const parts = [
          labels[key] || key,
          r.name,
          r.address,
          [r.from, r.to].filter(Boolean).join('–'),
          r.graduated ? `Graduated: ${r.graduated}` : '',
          r.degree ? `Degree: ${r.degree}` : '',
        ].filter(Boolean)
        return parts.join(' | ')
      })
      .join('\n')
  } catch {
    return ''
  }
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

    const firstName  = (data.get('firstName') as string) || (data.get('name') as string) || ''
    const lastName   = data.get('lastName')  as string || ''
    const mi         = data.get('mi')        as string || ''
    const email      = data.get('email')     as string
    const phone      = data.get('phone')     as string || ''
    const position   = data.get('position')  as string
    const address    = data.get('address')   as string || ''
    const apt        = data.get('apt')       as string || ''
    const city       = data.get('city')      as string || ''
    const state      = data.get('state')     as string || ''
    const zip        = data.get('zip')       as string || ''
    const eduRaw     = data.get('education') as string || ''
    const file       = data.get('resume')    as File | null

    if (!email || !position) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const fullName    = [firstName, mi ? mi + '.' : '', lastName].filter(Boolean).join(' ')
    const fullAddress = [address, apt, city, state, zip].filter(Boolean).join(', ')
    const education   = formatEducation(eduRaw)

    // Encode the resume so the Apps Script can save it to a Drive folder
    let resumeName = ''
    let resumeType = ''
    let resumeData = ''
    if (file && file.size > 0) {
      resumeName = String(file.name).substring(0, 200)
      resumeType = file.type || 'application/octet-stream'
      resumeData = Buffer.from(await file.arrayBuffer()).toString('base64')
    }

    // Send to Google Sheet
    await fetch(SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'application',
        name:      String(fullName).substring(0, 200),
        email:     String(email).substring(0, 100),
        phone:     String(phone).substring(0, 20),
        address:   String(fullAddress).substring(0, 300),
        position:  String(position).substring(0, 300),
        education: education.substring(0, 2000),
        resumeName,
        resumeType,
        resumeData,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Apply API error:', err)
    return NextResponse.json({ error: 'Failed to send application. Please try again.' }, { status: 500 })
  }
}
