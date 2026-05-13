import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()

    const name     = data.get('name') as string
    const email    = data.get('email') as string
    const phone    = data.get('phone') as string
    const position = data.get('position') as string
    const linkedin = data.get('linkedin') as string
    const message  = data.get('message') as string
    const file     = data.get('resume') as File | null

    if (!name || !email || !position) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
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
      subject: `Job Application — ${position} (${name})`,
      html: `
        <h2 style="margin:0 0 16px;font-family:sans-serif">New Job Application</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
          <tr><td style="padding:6px 16px 6px 0;color:#555;white-space:nowrap">Position</td><td><strong>${position}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#555">Name</td><td>${name}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#555">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#555">Phone</td><td>${phone || '—'}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#555">LinkedIn</td><td>${linkedin ? `<a href="${linkedin}">${linkedin}</a>` : '—'}</td></tr>
        </table>
        ${message ? `<h3 style="font-family:sans-serif;margin:24px 0 8px">Cover Letter</h3><p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap">${message}</p>` : ''}
        ${file && file.size > 0 ? `<p style="font-family:sans-serif;font-size:13px;color:#888;margin-top:24px">Resume attached: ${file.name}</p>` : '<p style="font-family:sans-serif;font-size:13px;color:#888;margin-top:24px">No resume file attached.</p>'}
      `,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Apply API error:', err)
    return NextResponse.json({ error: 'Failed to send application. Please try again.' }, { status: 500 })
  }
}
