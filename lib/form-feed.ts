import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { isoWithOffset, utcStamp, sanitizedExtension, type UploadedFile } from './s3-feed-common'

// Archive of the website's non-registration form submissions (inquiry, careers
// application, quote) to S3. Registrations go elsewhere — see registration-feed.ts,
// whose bucket is an agreed interface with Best Value's Liferay system and must
// not carry anything but registrations.
//
// The Google Sheets remain the system of record for these three forms, so callers
// treat a failure here as non-fatal.

const BUCKET = process.env.BV_FORMS_S3_BUCKET
const REGION = process.env.BV_FORMS_AWS_REGION || 'us-east-1'

export type FormKind = 'inquiry' | 'application' | 'quote'

const PREFIXES: Record<FormKind, string> = {
  inquiry: 'inquiries',
  application: 'applications',
  quote: 'quotes',
}

let client: S3Client | null = null
function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: process.env.BV_FORMS_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.BV_FORMS_AWS_SECRET_ACCESS_KEY!,
      },
    })
  }
  return client
}

export function isFormFeedConfigured(): boolean {
  return !!(BUCKET && process.env.BV_FORMS_AWS_ACCESS_KEY_ID && process.env.BV_FORMS_AWS_SECRET_ACCESS_KEY)
}

// One immutable JSON object per submission, keyed so that lexical order is
// chronological. Any attachment is written first under resumes/YYYY/MM/ and
// referenced by key, mirroring how the registration feed handles tax documents.
export async function writeFormSubmissionToS3(
  kind: FormKind,
  fields: Record<string, string>,
  file: UploadedFile | null = null,
): Promise<{ key: string; fileKey: string }> {
  if (!isFormFeedConfigured()) throw new Error('form feed not configured')

  const s3 = getClient()
  const now = new Date()
  const uuid = randomUUID()

  let fileKey = ''
  if (file) {
    const yyyy = now.getUTCFullYear().toString()
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
    fileKey = `resumes/${yyyy}/${mm}/${uuid}.${sanitizedExtension(file.name, file.contentType)}`
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: fileKey,
      Body: file.data,
      ContentType: file.contentType || 'application/octet-stream',
    }))
  }

  // Every value a string, blanks as "" never null — same convention as the
  // registration payload, so a future reader can treat all feeds alike.
  const payload: Record<string, string> = {
    submittedAt: isoWithOffset(now),
    formType: kind,
    ...fields,
    attachment: fileKey,
  }

  const key = `${PREFIXES[kind]}/${utcStamp(now)}-${uuid}.json`
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: JSON.stringify(payload),
    ContentType: 'application/json; charset=utf-8',
  }))

  return { key, fileKey }
}
