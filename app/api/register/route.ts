import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { recipients } from '@/lib/email-config'

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()

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

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST || 'smtp.gmail.com',
      port:   Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const attachments: nodemailer.SendMailOptions['attachments'] = []
    if (taxFile && taxFile.size > 0) {
      const buf = Buffer.from(await taxFile.arrayBuffer())
      attachments.push({ filename: taxFile.name, content: buf })
    }

    const recipient = recipients.register

    await transporter.sendMail({
      from:    `"BV Registrations" <${process.env.SMTP_USER}>`,
      to:      recipient,
      replyTo: email,
      subject: `New Account Application - ${companyName}`,
      html: `
        <h2 style="margin:0 0 20px;font-family:sans-serif;color:#001D68">New Account Application</h2>

        <h3 style="font-family:sans-serif;color:#555;margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.06em">Company Information</h3>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;margin-bottom:24px">
          <tr><td style="padding:6px 20px 6px 0;color:#888;width:160px">Company Name</td><td><strong>${companyName}</strong></td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Address</td><td>${address || '-'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Tel / ID #</td><td>${tel || '-'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Mobile</td><td>${mobile || '-'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Fax</td><td>${fax || '-'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Contact Name</td><td>${contactName}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Tax Deduction</td><td>${taxDeduction === 'yes' ? '✅ Yes' : taxDeduction === 'no' ? 'No' : '-'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Print Name</td><td>${printName || '-'}</td></tr>
        </table>

        ${taxFile && taxFile.size > 0 ? `<p style="font-family:sans-serif;font-size:13px;color:#888">Tax I.D. attached: ${taxFile.name}</p>` : ''}

        <p style="font-family:sans-serif;font-size:12px;color:#aaa;margin-top:24px;border-top:1px solid #eee;padding-top:16px">
          Submitted on ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}
        </p>
      `,
      attachments,
    })

    // Confirmation to applicant
    await transporter.sendMail({
      from:    `"Best Value Auto Body Supply" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: `Account Application Received - ${companyName}`,
      html: `
        <h2 style="font-family:sans-serif;color:#001D68">Thank you, ${firstName}!</h2>
        <p style="font-family:sans-serif;font-size:15px;color:#333">
          We've received your account application for <strong>${companyName}</strong>.
          Our team will review it and contact you within 1–2 business days.
        </p>
        <p style="font-family:sans-serif;font-size:15px;color:#333">
          Questions? Call us at <a href="tel:17737621000" style="color:#ED1C24">(773) 762-1000</a>.
        </p>
        <p style="font-family:sans-serif;font-size:13px;color:#aaa;margin-top:32px">
          Best Value Auto Body Supply Inc. · 160 N 25th Ave, Melrose Park, IL 60160
        </p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Register API error:', err)
    return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 })
  }
}
