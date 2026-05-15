import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()

    const name     = data.get('name')     as string
    const email    = data.get('email')    as string
    const phone    = data.get('phone')    as string || ''
    const category = data.get('category') as string
    const message  = data.get('message')  as string || ''

    if (!name || !email || !category) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST || 'smtp.gmail.com',
      port:   Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const recipient = process.env.APPLY_TO_EMAIL || 'infor@bestvaluepart.com'

    await transporter.sendMail({
      from:    `"BV Paint Inquiries" <${process.env.SMTP_USER}>`,
      to:      recipient,
      replyTo: email,
      subject: `Paint Inquiry - ${category} (${name})`,
      html: `
        <h2 style="margin:0 0 20px;font-family:sans-serif;color:#001D68">Paint Product Inquiry</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;margin-bottom:24px">
          <tr><td style="padding:6px 20px 6px 0;color:#888;width:140px">Category</td><td><strong>${category}</strong></td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Name</td><td>${name}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Phone</td><td>${phone || '-'}</td></tr>
        </table>
        ${message ? `<h3 style="font-family:sans-serif;font-size:14px;color:#555;margin:0 0 8px">Message</h3><p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap;margin:0">${message}</p>` : ''}
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Inquiry API error:', err)
    return NextResponse.json({ error: 'Failed to send inquiry. Please try again.' }, { status: 500 })
  }
}
