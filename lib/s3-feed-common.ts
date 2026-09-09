// Shared helpers for the S3 submission feeds (registrations, and the other
// website forms). Conventions follow the Best Value registration feed contract
// v2.0 so every feed reads the same way.

// ISO 8601 with the display-timezone UTC offset, e.g. 2026-09-07T17:09:31-05:00
// (contract FMT-4; section 10 — America/Chicago unless told otherwise).
export function isoWithOffset(date: Date, timeZone = 'America/Chicago'): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, timeZoneName: 'longOffset',
  }).formatToParts(date)
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? ''
  const hour = get('hour') === '24' ? '00' : get('hour')
  const rawOffset = get('timeZoneName').replace('GMT', '') // '-05:00', or '' for UTC
  const offset = rawOffset || '+00:00'
  return `${get('year')}-${get('month')}-${get('day')}T${hour}:${get('minute')}:${get('second')}${offset}`
}

// UTC, ISO 8601 basic form: YYYYMMDDTHHMMSSZ (contract OBJ-3). Sorting keys by
// this puts them in chronological order.
export function utcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

export function sanitizedExtension(fileName: string, contentType: string): string {
  const match = /\.([A-Za-z0-9]{1,10})$/.exec(fileName)
  if (match) return match[1].toLowerCase()
  if (contentType === 'application/pdf') return 'pdf'
  if (contentType === 'image/jpeg') return 'jpg'
  if (contentType === 'image/png') return 'png'
  return 'bin'
}

export interface UploadedFile {
  name: string
  contentType: string
  data: Buffer
}
