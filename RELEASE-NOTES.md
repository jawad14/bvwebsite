# Release Notes — Best Value Auto Body Supply Website
**Release Date:** May 17, 2026
**Prepared by:** Development Team
**Status:** Deployed

---

## Summary

This release implements content and policy updates reviewed and annotated by the Best Value Auto Body Supply team on May 15–16, 2026. Changes span the Home page, Returns & Warranty page, and Delivery page. One item (Search Parts) has been deferred — see note below.

---

## Changes by Page

### All Pages — Topbar

| Field | Before | After |
|---|---|---|
| Hours (Mon–Fri) | Mon–Fri 8 AM–7 PM CST | Mon–Fri 8–6 CST |
| Saturday hours | *(not shown)* | Sat 8–3 CST |
| Promo strip delivery text | 1-hour local delivery | Twice-daily local delivery |

---

### Home Page (`/`)

| Location | Before | After |
|---|---|---|
| Hero sub-text | "backed by our own 1-hour delivery fleet" | "backed by our own twice-daily delivery fleet" |
| Hero stat | **1-hour** LOCAL DELIVERY | **Twice daily** LOCAL DELIVERY |
| Hero floating badge | Delivered in 1 hour | Delivered twice daily |
| Trust strip | 1-hour local delivery | Twice-daily delivery |
| Why Best Value — Pillar 2 title | Our own 1-hour delivery | Twice-daily delivery |
| Why Best Value — Pillar 2 body | "most orders land in under an hour" | "two routes a day across Chicagoland" |

---

### Returns & Warranty Page (`/returns`)

#### Card 1 — Return Policy

| Item | Before | After |
|---|---|---|
| Item 1 | "within 15 days of delivery." | "within 15 days of delivery, for no charge or fee." |
| Item 2 | "opened or used cannot be returned" | "worked on cannot be returned" |
| Item 3 | "after 21 days of receipt" | "after 1 year of receipt" |
| Item 4 | "20% restocking fee" | **25% restocking fee** |
| Item 5 | "Special order items cannot be returned under any circumstances." | "Special order items may be returned with a 25% restocking fee." |
| Refused shipments note | 20% restocking fee | **25% restocking fee** |
| New — RMA notice | *(not present)* | Added: "For all deliveries, a Return Merchandise Authorization (RMA) must be requested." |

#### Card 2 — Received an Incorrect Part?

| Item | Before | After |
|---|---|---|
| Subtitle | *(none)* | Added: "(Part received is different from what was on the invoice)" |
| Return process | "We will issue a call tag" | "We will issue an **RMA**" |

#### Card 3 — Warranty Coverage

| Item | Before | After |
|---|---|---|
| Removed line | "Accessories carry a 30-day warranty from the date of delivery." | **Removed** |
| Updated line | "Light bulbs carry a 90-day warranty" | "Light bulbs, **mirrors, and fans** carry a **6-month** warranty" |

#### Card 4 — Parts Warranty Details *(New)*

New card added with specific warranty coverage by part type:

| Part Type | Covered Condition | Coverage |
|---|---|---|
| Radiator & A/C Condenser | Normal leaking, no damage | **1 Year** — exchange or full refund |
| Radiator Fan & A/C Fan Motor | Doesn't work or fan blade shaking | **6 Months** — exchange or full refund |
| All Lights & Mirror Glass | Normal leaking / glass shaking | **6 Months** — exchange or full refund |
| Black & Chrome Steel Bumpers | Rusted | **1 Year** — exchange or full refund |

#### Card 5 — RMA Procedure *(New)*

New card added with the official 10-step Return Merchandise Authorization procedure, effective April 14, 2025. Includes full English and Spanish versions.

Key RMA rules:
- Drivers cannot pick up parts without a scheduled RMA
- Drivers cannot give credit for returned parts
- Credits take 24 hours to post after return is accepted
- Parts must be unaltered, undamaged, and in original packaging

---

### Delivery Page (`/delivery`)

#### Delivery Zone Times & Cutoffs

| Zone | Time Before | Time After | Cutoff Before | Cutoff After |
|---|---|---|---|---|
| Zone 1 - Immediate Local | 1–2 Hours | **Twice Daily** | Order by 4:00 PM | AM: 8:30 · PM: 12:30 |
| Zone 2 - Chicago & Inner Suburbs | 2–3 Hours | **Twice Daily** | Order by 2:00 PM | AM: 8:30 · PM: 12:30 |
| Zone 3 - Extended Metro | 3–5 Hours | **Same Day** | Order by 12:00 PM | Order by 8:45 AM |

Stats strip: "1 Hr" → **2x Daily**

#### Regional State Coverage

| State | Coverage Before | Coverage After | Cities Updated |
|---|---|---|---|
| Illinois | Statewide | Chicago & Surrounding Suburbs | Yes — narrowed to metro area |
| Indiana | Northwest IN — Gary, Hammond, Merrillville, South Bend | Northwest & Central IN | Expanded: Whiting, East Chicago, Dyer, Highland, Griffith, Schererville, Merrillville |
| Wisconsin | Southeast WI | Southeast WI | Expanded: Kenosha, Racine, Elkhorn, Milwaukee, Waukesha, Cudahy, Brookfield, Franklin, Big Bend |
| Iowa | Eastern IA — Davenport, Iowa City, Cedar Rapids | Eastern IA | Expanded: Silvis, Moline, Muscatine, West Liberty, Des Moines, Marshalltown |
| Michigan / Southwest MI | Kalamazoo, Grand Rapids, Benton Harbor | **Renamed: Indiana (Extended)** — Central & South IN | Indianapolis, Carmel, Fishers, Lawrence, Beech Grove, Greenwood, Plainfield, Brownsburg, Avon, South Bend, Niles, Elkhart, Lafayette, Frankfort, Lebanon |

#### Delivery Rules

| Rule | Before | After |
|---|---|---|
| Rule 1 — Order Cutoff Times | Zone 1 by 4 PM, Zone 2 by 2 PM, Zone 3 by 12 PM | Updated to match twice-daily schedule: Zone 1&2 AM 8:30 / PM 12:30, Zone 3 by 8:45 AM |
| Rule 2 — Minimum Order for Free Delivery | Free delivery over $150 / $250 | **Removed** |
| Rule 3 (was 4) — Refused or Missed Deliveries | 20% restocking fee | **25% restocking fee** |
| Rule 5 (was 6) — Damaged or Incorrect Parts | "arrange a call tag" | "issue an RMA" |
| Renumbering | Rules 1–6 | Rules 1–5 (Rule 2 removed, rest renumbered) |

---

## Deferred / Not Implemented

| Item | Reason |
|---|---|
| **Search Parts functionality** | The Search Parts bar on the home page is for **illustration purposes only** and does not perform a live parts search. This is a known UI placeholder. No changes made. Future development item if a live catalog search is required. |

---

## Files Changed

| File | Description |
|---|---|
| `components/Topbar.tsx` | Hours and delivery promo text |
| `components/Hero.tsx` | Stat, sub-text, floating badge |
| `components/TrustStrip.tsx` | Delivery pillar |
| `components/ValueSection.tsx` | Delivery pillar title and body |
| `app/returns/page.tsx` | Full policy rewrite — 5 cards including new Warranty Details and RMA Procedure |
| `app/delivery/page.tsx` | Zone times, cutoffs, regional coverage, rules |
| `app/globals.css` | New CSS for warranty table and RMA step layout |
