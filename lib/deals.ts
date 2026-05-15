export type DealBadge =
  | 'This Week'
  | 'This Month'
  | 'Limited Time'
  | 'Clearance'
  | 'Bundle Deal'
  | 'Flash Sale'
  | 'New'

export interface Deal {
  id: string
  active: boolean          // set false to hide without deleting
  badge: DealBadge
  title: string
  category: string
  description: string
  highlight: string        // short discount callout, e.g. "Save 20%" or "Buy 2 Get 1"
  terms: string            // fine-print / conditions
  validUntil: string       // ISO date string "YYYY-MM-DD" - shown as "Valid until …"
  ctaLabel?: string        // defaults to "Call to Order"
  ctaHref?: string         // defaults to tel:17737621000
}

// ─────────────────────────────────────────────────────────────
//  ADD / EDIT DEALS HERE
//  Set active: false to pause a deal without deleting it.
//  Set a past validUntil date and it will show as "Expired".
// ─────────────────────────────────────────────────────────────
export const deals: Deal[] = [
  {
    id: 'bumper-blowout-may',
    active: true,
    badge: 'This Month',
    title: 'Bumper Blowout - May',
    category: 'Bumpers & Covers',
    description:
      'Stock up on front and rear bumper covers for the most popular domestic and import vehicles. OEM-quality aftermarket parts at prices your shop will love.',
    highlight: 'Save 15%',
    terms: 'Applies to in-stock bumper covers only. Cannot be combined with other offers. Call to confirm availability.',
    validUntil: '2026-05-31',
  },
  {
    id: 'paint-primer-bundle',
    active: true,
    badge: 'Bundle Deal',
    title: 'Paint + Primer Bundle',
    category: 'Automotive Paints',
    description:
      'Buy any gallon of basecoat paint and get a quart of urethane primer at half price. Mix, match, and save on your next refinishing job.',
    highlight: '50% Off Primer',
    terms: 'One discounted primer per basecoat gallon purchased. In-store and phone orders only.',
    validUntil: '2026-05-25',
    ctaLabel: 'Shop Paints',
    ctaHref: '/paints',
  },
  {
    id: 'headlight-week',
    active: true,
    badge: 'This Week',
    title: 'Headlight & Tail Light Week',
    category: 'Lighting',
    description:
      'Collision shop special - 10% off all headlight assemblies, tail lights, and fog lights. OEM-spec replacements for Ford, Chevy, Toyota, Honda, and more.',
    highlight: 'Save 10%',
    terms: 'Valid on lighting assemblies only. Excludes bulbs and electrical components.',
    validUntil: '2026-05-18',
  },
  {
    id: 'fleet-clearance',
    active: true,
    badge: 'Clearance',
    title: 'Overstock Clearance - Hoods & Panels',
    category: 'Hoods & Sheet Metal',
    description:
      'We\'re clearing space in the warehouse. Grab hoods, fenders, and door skins at our lowest prices of the year - while supplies last.',
    highlight: 'Up to 25% Off',
    terms: 'While supplies last. Clearance items are final sale. Call ahead to check stock.',
    validUntil: '2026-06-15',
  },
  {
    id: 'new-account-flash',
    active: true,
    badge: 'Flash Sale',
    title: 'New Account Flash Discount',
    category: 'All Parts',
    description:
      'Open a registered business account this month and receive 10% off your first three orders. Perfect for shops looking to switch suppliers.',
    highlight: '10% Off - First 3 Orders',
    terms: 'New registered accounts only. Must be approved within the month. Applied automatically at order placement.',
    validUntil: '2026-05-31',
    ctaLabel: 'Register Now',
    ctaHref: '/register',
  },
  {
    id: 'ac-condenser-june',
    active: true,
    badge: 'New',
    title: 'A/C Condenser Summer Special',
    category: 'Heating & Cooling',
    description:
      'Summer is coming. Get ahead of the season with discounted A/C condensers and cooling components for the most common vehicle makes.',
    highlight: 'Save 12%',
    terms: 'In-stock A/C condensers only. Call to confirm fitment and availability for your vehicle.',
    validUntil: '2026-06-30',
  },
]
