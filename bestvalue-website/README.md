# Best Value — Auto Body Supply (Website Redesign)

A fresh, US-market-focused redesign of **bestvaluepart.com**, built directly from the official Best Value brand guide.

> **Brand promise:** *Built on Trust. Driven by Value.*
> Professional quality without the markup.

---

## What's in this folder

```
.
├── index.html              # Homepage (single source of truth)
├── README.md
└── assets/
    ├── css/styles.css      # All styles, CSS variables, responsive layout
    ├── js/main.js          # Mobile drawer, search & cart stubs
    └── img/
        ├── logo.svg            # Primary logo (color)
        ├── logo-white.svg      # White logo for dark backgrounds
        └── favicon.svg
```

No build step. No npm install. Open `index.html` and it runs.

---

## Open in VS Code

```bash
# from this folder
code .
```

Then either:

- Right-click `index.html` → **Open with Live Server** (recommended — install the *Live Server* extension by Ritwick Dey for hot reload), **or**
- Drag `index.html` into a browser tab.

For a quick local server without extensions:

```bash
# any one of these works
npx serve .
python -m http.server 5173
php -S localhost:5173
```

---

## Design system at a glance

These are wired into `assets/css/styles.css` as CSS custom properties — change them once and everything follows.

| Token | Value | Source |
|---|---|---|
| `--bv-red` | `#ED1C24` | Brand guide |
| `--bv-navy` | `#001D68` | Brand guide |
| `--bv-black` | `#090909` | Brand guide |
| `--bv-white` | `#FFFFFF` | Brand guide |
| Display type | **Jost** (Century-Gothic alternative on Google Fonts) | Brand guide specifies Century Gothic; Jost is the closest free web match |
| Body type | **Inter** | Brand guide |

The brand guide's full red/navy ramps (`#FF102A → #74040A`, `#2A81E7 → #181B3F`) are mapped to `--bv-red-700/-900` and `--bv-navy-700/-900` for hover/dark states.

> If you license **Century Gothic** for web use, replace the Google Fonts `<link>` in `index.html` with your `@font-face` block and change `font-family: 'Jost'` → `'Century Gothic'` in `styles.css` (only the `h1–h4` and `.btn` rules need touching — `font-family: 'Jost', 'Century Gothic', …` already lists it as a fallback).

---

## Sections built

1. **Top bar** — phone, hours, free-shipping promo, dealer link
2. **Header** — logo, mega Year/Make/Model + keyword search, account/cart
3. **Primary nav** — collision-parts categories + Deals
4. **Hero** — bold headline, dual CTA, trust stats, floating value chips
5. **Brand marquee** — make logos (textual; swap to SVGs when you have licensed marks)
6. **Trust strip** — OEM-quality · Free shipping · Returns · US support
7. **Shop by category** — 8 collision-parts tiles with SKU counts
8. **Split promo** — Body shops (wholesale) ↔ DIY owners
9. **Featured products** — 8 cards with badges, fitment, ratings, CTA
10. **Shop by vehicle type** — sedan / SUV / pickup / hatch / coupe / van
11. **Why Best Value** — 4 messaging pillars in a navy panel
12. **Reviews** — three verified testimonials
13. **Newsletter CTA** + phone callout
14. **Footer** — sitemap, contact, social, payment chips

---

## Easy customisations

| To change… | Edit |
|---|---|
| Brand colors | `:root { --bv-red, --bv-navy … }` in `styles.css` |
| Logo | `assets/img/logo.svg` (and `logo-white.svg`) |
| Phone & address | Search `(773) 762-1000` and `Melrose Park` in `index.html` |
| Categories shown on homepage | `#categories` block in `index.html` |
| Featured products | `.products` block — each card is self-contained |
| Hero copy | `.hero__copy` block |
| Product art | The `<symbol id="part-…">` defs at the top of `index.html`. Replace with real product photos (`<img>`) when available — the markup already accepts either. |

---

## Migrating to React / Next.js later

The HTML is intentionally **component-shaped**. Each section is wrapped in a `<section>` or `<header>/<footer>` and uses isolated class prefixes (`.hero__…`, `.card__…`, `.cat__…`). To port:

1. Copy `assets/css/styles.css` straight in as a global stylesheet (or split per-component).
2. Lift each `<section>` into its own component: `Header`, `MegaSearch`, `Hero`, `TrustStrip`, `CategoryGrid`, `PromoSplit`, `ProductGrid`, `ProductCard`, `VehicleTypes`, `WhyBestValue`, `Reviews`, `NewsletterCTA`, `Footer`.
3. Keep the `<svg width="0" height="0">` icon sprite at the layout root so `<use href="#…">` resolves anywhere.

Suggested file tree:

```
app/
  components/
    Header.tsx
    MegaSearch.tsx
    Hero.tsx
    TrustStrip.tsx
    CategoryGrid.tsx
    ProductCard.tsx
    ProductGrid.tsx
    PromoSplit.tsx
    VehicleTypes.tsx
    WhyBestValue.tsx
    Reviews.tsx
    NewsletterCTA.tsx
    Footer.tsx
    icons/Sprite.tsx        # the <svg><defs>…</defs></svg> block
  globals.css               # assets/css/styles.css
  page.tsx                  # composes the components in order
public/
  logo.svg
  logo-white.svg
  favicon.svg
```

---

## Accessibility & responsiveness

- Semantic landmarks (`header`, `nav`, `main` sections, `footer`).
- `aria-label`s on icon-only buttons and the brand link.
- Visible focus styles inherited (no `outline: none` overrides).
- Breakpoints: **1100px** (tablet), **900px** (large mobile / drawer activates), **700px** and **480px** (small mobile).
- All long touch targets are ≥ 38–48px tall.
- The mega-search reflows to a 2-column grid on phones; the nav drops into a slide-in drawer.

---

## License

Code in this folder is yours to extend. Brand marks (logo, "best value." wordmark, tagline) belong to Best Value Auto Body Supply, Inc.
