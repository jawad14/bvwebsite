import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()

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

    const fullName = [firstName, mi ? mi + '.' : '', lastName].filter(Boolean).join(' ')

    if (!email || !position) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    let eduHtml = ''
    if (eduRaw) {
      try {
        const edu = JSON.parse(eduRaw)
        const rows = [['High School', edu.highSchool], ['College', edu.college], ['Other', edu.other]] as const
        eduHtml = `
          <h3 style="font-family:sans-serif;color:#555;margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.06em">Education</h3>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;margin-bottom:16px">
            <thead><tr style="background:#f5f5f5">
              <th style="padding:8px;text-align:left;border:1px solid #eee">Level</th>
              <th style="padding:8px;text-align:left;border:1px solid #eee">School</th>
              <th style="padding:8px;text-align:left;border:1px solid #eee">Address</th>
              <th style="padding:8px;text-align:left;border:1px solid #eee">From</th>
              <th style="padding:8px;text-align:left;border:1px solid #eee">To</th>
              <th style="padding:8px;text-align:left;border:1px solid #eee">Graduated</th>
              <th style="padding:8px;text-align:left;border:1px solid #eee">Degree</th>
            </tr></thead>
            <tbody>
              ${rows.map(([label, row]) => `<tr>
                <td style="padding:8px;border:1px solid #eee"><strong>${label}</strong></td>
                <td style="padding:8px;border:1px solid #eee">${row?.name || '—'}</td>
                <td style="padding:8px;border:1px solid #eee">${row?.address || '—'}</td>
                <td style="padding:8px;border:1px solid #eee">${row?.from || '—'}</td>
                <td style="padding:8px;border:1px solid #eee">${row?.to || '—'}</td>
                <td style="padding:8px;border:1px solid #eee">${row?.graduated || '—'}</td>
                <td style="padding:8px;border:1px solid #eee">${row?.degree || '—'}</td>
              </tr>`).join('')}
            </tbody>
          </table>`
      } catch { /* ignore parse error */ }
    }

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
      port:   Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const attachments: nodemailer.SendMailOptions['attachments'] = []
    if (file && file.size > 0) {
      const buf = Buffer.from(await file.arrayBuffer())
      attachments.push({ filename: file.name, content: buf })
    }

    const recipient = process.env.APPLY_TO_EMAIL || 'sales@bestvaluepart.com'

    await transporter.sendMail({
      from:    `"BV Careers" <${process.env.SMTP_USER}>`,
      to:      recipient,
      replyTo: email,
      subject: `Job Application — ${position} (${fullName || email})`,
      html: `
        <h2 style="margin:0 0 20px;font-family:sans-serif;color:#001D68">New Job Application</h2>

        <h3 style="font-family:sans-serif;color:#555;margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.06em">Personal Information</h3>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;margin-bottom:24px">
          <tr><td style="padding:6px 20px 6px 0;color:#888;width:160px">Name</td><td><strong>${fullName || '—'}</strong></td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Phone</td><td>${phone || '—'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Address</td><td>${[address, apt, city, state, zip].filter(Boolean).join(', ') || '—'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Position(s)</td><td><strong>${position}</strong></td></tr>
        </table>

        ${eduHtml}

        ${file && file.size > 0 ? `<p style="font-family:sans-serif;font-size:13px;color:#888;margin-top:16px">Resume attached: ${file.name}</p>` : '<p style="font-family:sans-serif;font-size:13px;color:#888;margin-top:16px">No resume attached.</p>'}
      `,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Apply API error:', err)
    return NextResponse.json({ error: 'Failed to send application. Please try again.' }, { status: 500 })
  }
}
