import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { isoWithOffset, utcStamp, sanitizedExtension, type UploadedFile } from './s3-feed-common'

// Best Value registration feed — contract v2.0 (bv_registration_feed_contract).
// One immutable JSON object per submission under registrations/, tax document
// under tax-files/YYYY/MM/, same UUID linking the two (OBJ-1..7, DOC-1..3).

const BUCKET = process.env.BV_REG_S3_BUCKET
const REGION = process.env.BV_REG_AWS_REGION || 'us-east-1'

let client: S3Client | null = null
function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: process.env.BV_REG_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.BV_REG_AWS_SECRET_ACCESS_KEY!,
      },
    })
  }
  return client
}

export interface RegistrationFields {
  companyName: string
  address: string
  telIdNo: string
  mobile: string
  fax: string
  contactName: string
  email: string
  taxDeduction: string // 'Yes' | 'No' | ''
  printName: string
}

export type RegistrationTaxFile = UploadedFile

export function isFeedConfigured(): boolean {
  return !!(BUCKET && process.env.BV_REG_AWS_ACCESS_KEY_ID && process.env.BV_REG_AWS_SECRET_ACCESS_KEY)
}

// Writes the tax document (if any) then the registration JSON. Throws on failure;
// the caller decides whether that fails the request (during dual-write it must not).
export async function writeRegistrationToS3(
  fields: RegistrationFields,
  taxFile: RegistrationTaxFile | null,
): Promise<{ registrationKey: string; taxFileKey: string }> {
  if (!isFeedConfigured()) throw new Error('registration feed not configured')

  const s3 = getClient()
  const now = new Date()
  const uuid = randomUUID()

  // tax-files/YYYY/MM/<uuid>.<ext> (DOC-1, DOC-2), original Content-Type kept (DOC-4)
  let taxFileKey = ''
  if (taxFile) {
    const yyyy = now.getUTCFullYear().toString()
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
    taxFileKey = `tax-files/${yyyy}/${mm}/${uuid}.${sanitizedExtension(taxFile.name, taxFile.contentType)}`
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: taxFileKey,
      Body: taxFile.data,
      ContentType: taxFile.contentType || 'application/octet-stream',
    }))
  }

  // All eleven fields, always strings, blanks as "" (FMT-1..7)
  const payload = {
    submittedAt: isoWithOffset(now),
    companyName: fields.companyName,
    address: fields.address,
    telIdNo: fields.telIdNo,
    mobile: fields.mobile,
    fax: fields.fax,
    contactName: fields.contactName,
    email: fields.email,
    taxDeduction: fields.taxDeduction,
    printName: fields.printName,
    taxFile: taxFileKey,
  }

  // registrations/<YYYYMMDDTHHMMSSZ>-<uuid>.json (OBJ-2..5)
  const registrationKey = `registrations/${utcStamp(now)}-${uuid}.json`
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: registrationKey,
    Body: JSON.stringify(payload),
    ContentType: 'application/json; charset=utf-8',
  }))

  return { registrationKey, taxFileKey }
}
