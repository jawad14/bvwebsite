import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()

    const businessName   = data.get('businessName') as string
    const businessType   = data.get('businessType') as string
    const ein            = data.get('ein') as string
    const yearsInBiz     = data.get('yearsInBusiness') as string
    const website        = data.get('website') as string
    const monthlyBudget  = data.get('monthlyBudget') as string
    const contactName    = data.get('contactName') as string
    const title          = data.get('title') as string
    const email          = data.get('email') as string
    const phone          = data.get('phone') as string
    const address        = data.get('address') as string
    const city           = data.get('city') as string
    const state          = data.get('state') as string
    const zip            = data.get('zip') as string
    const licenseNumber  = data.get('licenseNumber') as string
    const licenseState   = data.get('licenseState') as string
    const notes          = data.get('notes') as string
    const licenseFile    = data.get('licenseFile') as File | null
    const source         = data.get('source') as string

    if (!businessName || !email || !contactName) {
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

    const attachments: nodemailer.SendMailOptions['attachments'] = []
    if (licenseFile && licenseFile.size > 0) {
      const buf = Buffer.from(await licenseFile.arrayBuffer())
      attachments.push({ filename: licenseFile.name, content: buf })
    }

    const recipient = process.env.REGISTER_TO_EMAIL || process.env.APPLY_TO_EMAIL || 'sales@bestvaluepart.com'

    await transporter.sendMail({
      from:    `"BV Registrations" <${process.env.SMTP_USER}>`,
      to:      recipient,
      replyTo: email,
      subject: `New Customer Registration — ${businessName}`,
      html: `
        <h2 style="margin:0 0 20px;font-family:sans-serif;color:#001D68">New Business Registration</h2>

        <h3 style="font-family:sans-serif;color:#555;margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.06em">Business Information</h3>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;margin-bottom:24px;width:100%">
          <tr><td style="padding:6px 20px 6px 0;color:#888;width:180px">Business Name</td><td><strong>${businessName}</strong></td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Business Type</td><td>${businessType || '—'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">EIN / Tax ID</td><td>${ein || '—'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Years in Business</td><td>${yearsInBiz || '—'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Website</td><td>${website ? `<a href="${website}">${website}</a>` : '—'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Monthly Budget</td><td>${monthlyBudget || '—'}</td></tr>
        </table>

        <h3 style="font-family:sans-serif;color:#555;margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.06em">Contact</h3>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;margin-bottom:24px;width:100%">
          <tr><td style="padding:6px 20px 6px 0;color:#888;width:180px">Contact Name</td><td>${contactName}${title ? ` — ${title}` : ''}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Phone</td><td>${phone || '—'}</td></tr>
        </table>

        <h3 style="font-family:sans-serif;color:#555;margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.06em">Business Address</h3>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;margin-bottom:24px;width:100%">
          <tr><td style="padding:6px 20px 6px 0;color:#888;width:180px">Address</td><td>${address || '—'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">City / State / ZIP</td><td>${city || '—'}, ${state || '—'} ${zip || ''}</td></tr>
        </table>

        <h3 style="font-family:sans-serif;color:#555;margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.06em">License</h3>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;margin-bottom:24px;width:100%">
          <tr><td style="padding:6px 20px 6px 0;color:#888;width:180px">License Number</td><td>${licenseNumber || '—'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">License State</td><td>${licenseState || '—'}</td></tr>
          <tr><td style="padding:6px 20px 6px 0;color:#888">Document</td><td>${licenseFile && licenseFile.size > 0 ? `Attached: ${licenseFile.name}` : 'Not uploaded'}</td></tr>
        </table>

        ${notes ? `<h3 style="font-family:sans-serif;color:#555;margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.06em">Notes</h3><p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap;margin:0 0 24px">${notes}</p>` : ''}
        ${source ? `<p style="font-family:sans-serif;font-size:13px;color:#aaa">Heard about us: ${source}</p>` : ''}
      `,
      attachments,
    })

    // Confirmation to applicant
    await transporter.sendMail({
      from:    `"Best Value Auto Body Supply" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: `We received your registration — ${businessName}`,
      html: `
        <h2 style="font-family:sans-serif;color:#001D68">Thank you, ${contactName}!</h2>
        <p style="font-family:sans-serif;font-size:15px;color:#333">
          We've received your registration for <strong>${businessName}</strong> and our team will review it within 1–2 business days.
        </p>
        <p style="font-family:sans-serif;font-size:15px;color:#333">
          Once approved, you'll receive your account details and can start enjoying:
        </p>
        <ul style="font-family:sans-serif;font-size:15px;color:#333">
          <li>Volume discounts on all parts</li>
          <li>Net 30 payment terms</li>
          <li>Credit line based on your purchase history</li>
          <li>Dedicated account representative</li>
          <li>Priority support line</li>
        </ul>
        <p style="font-family:sans-serif;font-size:15px;color:#333">
          Questions? Call us at <a href="tel:17737621000" style="color:#ED1C24">(773) 762-1000</a> or reply to this email.
        </p>
        <p style="font-family:sans-serif;font-size:13px;color:#aaa;margin-top:32px">Best Value Auto Body Supply · 160-150 25th Ave, Melrose Park, IL 60160</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Register API error:', err)
    return NextResponse.json({ error: 'Failed to submit registration. Please try again.' }, { status: 500 })
  }
}
