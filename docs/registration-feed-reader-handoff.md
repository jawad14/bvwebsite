# Registration feed — reader hand-off (DEV)

Everything the Best Value / Liferay side needs to read web registrations out of S3.
Implements `bv_registration_feed_contract` v2.0. Dev only — production is not built yet.

## 1. Credentials

IAM user: **`bv-web-registrations-reader-dev`**

| | |
|---|---|
| Access key ID | *delivered separately* |
| Secret access key | *delivered separately* |

Per **SEC-8** these are handed over out of band — not by email, chat, or committed to a
repo. If they are ever exposed, say so and we will rotate them; that is a two-minute job
and breaks nothing on the website side.

## 2. Connection details

| Setting | Value |
|---|---|
| AWS account | `784737317291` |
| Bucket | `bestvalue-web-registrations-dev` |
| Region | `us-east-1` |
| Registration prefix | `registrations/` |
| Tax file prefix | `tax-files/` |

## 3. What these credentials can and cannot do

Granted:
- `s3:ListBucket` on the bucket, restricted to the `registrations/*` and `tax-files/*` prefixes
- `s3:GetObject` on those same two prefixes

Not granted — by design, per **SEC-2** and **SEC-3**:
- No `PutObject`. The reader cannot write anything.
- No `DeleteObject`. Nothing on the Liferay side can destroy a registration.
- No access to any other bucket in the account.

If your code needs one of the denied actions, that is a signal to discuss the design rather
than widen the policy.

## 4. Reading the feed

Each submission is exactly one immutable JSON object:

```
registrations/20260907T170931Z-3f2a9c1e-....json
              └── UTC, ISO 8601 basic ──┘ └─ UUID ─┘
```

The timestamp comes first, so **lexical key order is chronological order** (OBJ-4). Objects
are written once and never modified, overwritten, or deleted (OBJ-6).

Suggested polling loop, hourly:

1. `ListObjectsV2` with `Prefix=registrations/`, and `StartAfter=<last key you imported>`.
   Because keys sort chronologically, `StartAfter` gives you only new objects and you never
   need to page through history.
2. For each key returned, `GetObject` and parse the JSON.
3. Insert it, and record the key as imported.
4. Persist the highest key seen as the new `StartAfter` watermark.

**Deduplication.** The object key is the primary identity — one key equals one submission,
and keys are never reused. Tracking imported keys (or just the watermark) is sufficient. As
a secondary guard, `email` + `submittedAt` together form the duplicate key (FMT-8), so a
replayed object can be recognised even if the watermark is lost.

Note this does *not* deduplicate the same **customer** registering twice on different days —
that is two legitimate submissions with different UUIDs, and both will arrive as separate
objects. Treating them as one customer is business logic on your side.

## 5. Payload

```json
{
  "submittedAt":  "2026-09-07T17:09:31-05:00",
  "companyName":  "Test Shop LLC",
  "address":      "123 Main St, Chicago IL",
  "telIdNo":      "7737621000",
  "mobile":       "",
  "fax":          "",
  "contactName":  "John A Smith",
  "email":        "test@example.com",
  "taxDeduction": "Yes",
  "printName":    "John Smith",
  "taxFile":      "tax-files/2026/09/3f2a9c1e-....pdf",
  "location":     "BestValue-Chicago"
}
```

Guarantees you can rely on:

- All eleven contract keys are always present, exactly as spelled above (FMT-5).
- Every value is a JSON **string**, including phone numbers (FMT-2).
- Blank fields are `""` — never `null`, never an omitted key (FMT-3).
- `submittedAt` is ISO 8601 with UTC offset. We are emitting **America/Chicago** as agreed
  in section 10 — tell us if you want a different display timezone.
- `taxDeduction` is one of `"Yes"`, `"No"`, `""` (FMT-6).
- `location` is the Best Value branch the customer chose: `"BestValue-Chicago"` or
  `"Bestvalue-GrandRapids"` (exact strings, case-sensitive). It is required on the form and checked by the server, so on
  new registrations it is never `""`. This is a **twelfth key added after contract v2.0**; the
  original eleven are unchanged. Objects written before it was added do not have it.
- `Content-Type` is `application/json; charset=utf-8` (OBJ-7).

## 6. Tax documents

`taxFile` holds an **S3 object key**, not a URL and not a Drive link (FMT-7). Fetch it with
`GetObject` against the same bucket. Key shape is `tax-files/YYYY/MM/<uuid>.<ext>`, where the
UUID matches the one in the registration key — so a document always traces back to its
registration (DOC-2). Original `Content-Type` is preserved on the object (DOC-4).

If a submission had no upload, `taxFile` is `""`.

## 7. Quick verification

```bash
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export AWS_DEFAULT_REGION=us-east-1

# list registrations
aws s3api list-objects-v2 \
  --bucket bestvalue-web-registrations-dev \
  --prefix registrations/ \
  --query 'Contents[].Key'

# fetch one
aws s3api get-object \
  --bucket bestvalue-web-registrations-dev \
  --key registrations/<key-from-above> /dev/stdout
```

A `PutObject` or `DeleteObject` attempt returning `AccessDenied` is correct behaviour, not a
misconfiguration.

## 8. Current state

- The dev bucket has Block Public Access fully on, SSE-S3 default encryption, and versioning
  enabled (SEC-4, SEC-5, SEC-7).
- The staging website writes to this bucket on every registration.
- **The bucket currently contains test submissions** written during setup — company names
  `Test Shop LLC` and `Refactor Check LLC`. Exclude these when reconciling row counts.
- The Google Sheet write for registrations has been switched off, so S3 is now the only
  destination for new registrations. Please confirm the backfill plan (acceptance step 4)
  before we do the same in production.

## 9. Open items for Best Value

1. Confirm `us-east-1` and the bucket names.
2. Confirm **America/Chicago** as the display timezone for `submittedAt`.
3. The IAM policy examples in the contract (section 7) use ARNs like
   `arn:aws:s3:::bucket/registrations:*` — with a colon. That matches no real key; it should
   be `registrations/*`. We built the policies with `/*`. Worth correcting in the contract.
4. Production AWS account. The contract assumes dev and production are separate accounts,
   but the credentials we hold are for a single shared account (`784737317291`). Tell us
   whether production should live in that same account or a separate one, and we will build
   `bestvalue-web-registrations` + its two IAM users to match.
5. New `location` field (section 5). Please map it on the Web Registered Customers screen
   and confirm your importer tolerates the extra key.
