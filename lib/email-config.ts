// ─── Central email recipient config ──────────────────────────────────────────
// Change RECIPIENT_EMAIL in .env.local to update where all form submissions go.
// Individual overrides can be set with the env vars below.

const DEFAULT_RECIPIENT = process.env.RECIPIENT_EMAIL || 'info@bestvaluepart.com'

export const recipients = {
  inquiry: process.env.INQUIRY_TO_EMAIL  || DEFAULT_RECIPIENT,
  quote:   process.env.QUOTE_TO_EMAIL    || DEFAULT_RECIPIENT,
  careers: process.env.APPLY_TO_EMAIL    || DEFAULT_RECIPIENT,
  register: process.env.REGISTER_TO_EMAIL || DEFAULT_RECIPIENT,
}
