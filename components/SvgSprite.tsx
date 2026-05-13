export default function SvgSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {/* UI icons */}
        <symbol id="i-search" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </g>
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M5 12h14m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-arrow-sm" viewBox="0 0 16 16">
          <path d="M3 8h10m-3-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-caret" viewBox="0 0 16 16">
          <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24">
          <path d="M5 4h4l2 5-3 2a13 13 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
          </g>
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" />
          </g>
        </symbol>
        <symbol id="i-heart" viewBox="0 0 24 24">
          <path d="M12 21s-7-4.4-9.5-9.2C.8 8.2 3 5 6 5c2 0 3.4 1 4.5 2.5C12 5.6 13.5 5 15 5c3 0 5.2 3.2 3.5 6.8C19 16.6 12 21 12 21Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </symbol>
        <symbol id="i-x" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </symbol>
        <symbol id="i-star" viewBox="0 0 24 24">
          <path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8L12 3Z" fill="currentColor" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="m4 12 5 5 11-11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-flame" viewBox="0 0 24 24">
          <path d="M12 3c1 4-3 6-3 10a5 5 0 0 0 10 0c0-3-2-4-3-7-2 1-3 3-3 5 0 0-2-3-1-8Z" fill="currentColor" />
        </symbol>
        <symbol id="i-truck" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7z" />
            <circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" />
          </g>
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
            <path d="m8.5 12 2.5 2.5L16 9.5" />
          </g>
        </symbol>
        <symbol id="i-headset" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
            <rect x="3" y="14" width="4" height="6" rx="1.5" />
            <rect x="17" y="14" width="4" height="6" rx="1.5" />
            <path d="M20 19a3 3 0 0 1-3 3h-3" />
          </g>
        </symbol>
        <symbol id="i-return" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" />
          </g>
        </symbol>

        {/* Social */}
        <symbol id="i-fb" viewBox="0 0 24 24">
          <path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.4-2 2.1-2H17V2.2C16.6 2 15.5 2 14.3 2 11.8 2 10 3.6 10 6.7V10H7v4h3v8h3Z" fill="currentColor" />
        </symbol>
        <symbol id="i-ig" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
          </g>
        </symbol>
        <symbol id="i-yt" viewBox="0 0 24 24">
          <path d="M22 8a3 3 0 0 0-2-2c-1.7-.5-8-.5-8-.5s-6.3 0-8 .5a3 3 0 0 0-2 2c-.5 1.7-.5 4-.5 4s0 2.3.5 4a3 3 0 0 0 2 2c1.7.5 8 .5 8 .5s6.3 0 8-.5a3 3 0 0 0 2-2c.5-1.7.5-4 .5-4S22.5 9.7 22 8Z" fill="currentColor" />
          <path d="m10 15 5-3-5-3v6Z" fill="#fff" />
        </symbol>
        <symbol id="i-x-social" viewBox="0 0 24 24">
          <path d="M18 2h3l-7 8 8 12h-7l-5-7-5 7H2l7-9L1 2h7l4 6 6-6Z" fill="currentColor" />
        </symbol>

        {/* Part SVG art */}
        <symbol id="part-bumper" viewBox="0 0 200 120">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M14 78c0-26 22-44 86-44s86 18 86 44v18c0 6-4 10-10 10H24c-6 0-10-4-10-10V78Z" fill="currentColor" fillOpacity=".08" />
            <path d="M14 78c0-26 22-44 86-44s86 18 86 44" />
            <path d="M50 60h100" strokeDasharray="2 6" />
            <path d="M30 90h20M150 90h20" />
            <circle cx="100" cy="78" r="6" />
          </g>
        </symbol>
        <symbol id="part-headlight" viewBox="0 0 200 120">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M20 40c30-22 100-30 160-12 12 4 14 14 8 22-2 4-4 10-4 16 0 14-12 22-30 22H50C28 88 14 76 14 60c0-7 1-13 6-20Z" fill="currentColor" fillOpacity=".08" />
            <circle cx="60" cy="58" r="22" fill="currentColor" fillOpacity=".18" />
            <circle cx="60" cy="58" r="10" />
            <path d="M100 50h60M100 60h54M100 70h44" />
          </g>
        </symbol>
        <symbol id="part-fender" viewBox="0 0 200 120">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M18 96V70c0-30 20-46 56-46h70c18 0 30 12 30 30v42H18Z" fill="currentColor" fillOpacity=".08" />
            <circle cx="60" cy="84" r="20" />
            <circle cx="60" cy="84" r="8" />
            <path d="M90 50h70" />
          </g>
        </symbol>
        <symbol id="part-mirror" viewBox="0 0 200 120">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M40 28h70c20 0 32 14 32 32v22c0 8-6 14-14 14H50c-12 0-22-10-22-22V42c0-8 6-14 12-14Z" fill="currentColor" fillOpacity=".08" />
            <path d="M52 40h66c10 0 16 8 16 18v18c0 6-4 10-10 10H58c-8 0-14-6-14-14V52" fill="currentColor" fillOpacity=".18" />
            <path d="M150 60h26" />
          </g>
        </symbol>
        <symbol id="part-grille" viewBox="0 0 200 120">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M18 30h164v60H18z" fill="currentColor" fillOpacity=".08" />
            <path d="M28 44h144M28 56h144M28 68h144M28 80h144" />
            <circle cx="100" cy="60" r="10" fill="currentColor" fillOpacity=".4" />
          </g>
        </symbol>
        <symbol id="part-hood" viewBox="0 0 200 120">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M16 90c20-44 60-66 84-66s64 22 84 66c2 4-2 8-6 8H22c-4 0-8-4-6-8Z" fill="currentColor" fillOpacity=".08" />
            <path d="M60 60c12-16 28-22 40-22s28 6 40 22" />
            <path d="M100 38v60" strokeDasharray="3 6" />
          </g>
        </symbol>
        <symbol id="part-door" viewBox="0 0 200 120">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M28 18h120c8 0 14 6 14 14v68c0 4-4 8-8 8H30c-4 0-8-4-8-8V26c0-4 2-8 6-8Z" fill="currentColor" fillOpacity=".08" />
            <rect x="42" y="34" width="100" height="34" rx="6" />
            <path d="M120 86c0-4 4-8 8-8h12" />
          </g>
        </symbol>
        <symbol id="part-radiator" viewBox="0 0 200 120">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <rect x="22" y="22" width="156" height="76" rx="6" fill="currentColor" fillOpacity=".08" />
            <path d="M40 22v76M60 22v76M80 22v76M100 22v76M120 22v76M140 22v76M160 22v76" />
            <path d="M22 50h156M22 70h156" />
          </g>
        </symbol>
        <symbol id="part-paint" viewBox="0 0 200 120">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M70 28h60v8h12v18a8 8 0 0 1-8 8H66a8 8 0 0 1-8-8V36h12v-8Z" fill="currentColor" fillOpacity=".08" />
            <path d="M80 62h40v40a6 6 0 0 1-6 6H86a6 6 0 0 1-6-6V62Z" fill="currentColor" fillOpacity=".18" />
            <path d="M90 78h20" />
          </g>
        </symbol>

        {/* Vehicle silhouettes */}
        <symbol id="veh-sedan" viewBox="0 0 80 36">
          <path d="M6 24h68v4H6zM10 24c2-10 10-14 22-14h20c10 0 16 4 20 14H10Z" fill="currentColor" />
          <circle cx="22" cy="28" r="4" fill="currentColor" />
          <circle cx="60" cy="28" r="4" fill="currentColor" />
        </symbol>
        <symbol id="veh-suv" viewBox="0 0 80 36">
          <path d="M6 24h68v4H6zM10 24V14c0-2 2-4 4-4h44c4 0 8 2 14 10v4H10Z" fill="currentColor" />
          <circle cx="22" cy="28" r="4" fill="currentColor" />
          <circle cx="60" cy="28" r="4" fill="currentColor" />
        </symbol>
        <symbol id="veh-pickup" viewBox="0 0 90 36">
          <path d="M4 24h82v4H4zM8 24V14c0-2 2-4 4-4h22c4 0 6 2 8 6h32v8H8Z" fill="currentColor" />
          <circle cx="20" cy="28" r="4" fill="currentColor" />
          <circle cx="68" cy="28" r="4" fill="currentColor" />
        </symbol>
        <symbol id="veh-hatch" viewBox="0 0 80 36">
          <path d="M6 24h68v4H6zM10 24c2-12 10-14 24-14h28c8 0 12 6 12 14H10Z" fill="currentColor" />
          <circle cx="22" cy="28" r="4" fill="currentColor" />
          <circle cx="60" cy="28" r="4" fill="currentColor" />
        </symbol>
        <symbol id="veh-van" viewBox="0 0 90 36">
          <path d="M4 24h82v4H4zM8 24V12c0-2 2-4 4-4h60c4 0 8 4 8 8v8H8Z" fill="currentColor" />
          <circle cx="20" cy="28" r="4" fill="currentColor" />
          <circle cx="70" cy="28" r="4" fill="currentColor" />
        </symbol>
        <symbol id="veh-coupe" viewBox="0 0 80 36">
          <path d="M6 24h68v4H6zM12 24c2-10 10-14 22-14 10 0 16 0 20 4l10 10H12Z" fill="currentColor" />
          <circle cx="22" cy="28" r="4" fill="currentColor" />
          <circle cx="60" cy="28" r="4" fill="currentColor" />
        </symbol>

        {/* Hero car */}
        <symbol id="hero-car" viewBox="0 0 220 110">
          <g fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round">
            <path d="M14 78h192v6H14zM26 78c2-22 18-34 40-34h68c20 0 36 12 40 34" fill="#fff" fillOpacity=".15" />
            <path d="M40 64c8-14 22-20 40-20h40c18 0 32 6 40 20" />
            <circle cx="60" cy="84" r="14" fill="#0B0B0B" stroke="#fff" />
            <circle cx="60" cy="84" r="6" fill="#fff" />
            <circle cx="160" cy="84" r="14" fill="#0B0B0B" stroke="#fff" />
            <circle cx="160" cy="84" r="6" fill="#fff" />
            <path d="M30 70h12M178 70h12" stroke="#FFE4A0" strokeWidth="4" strokeLinecap="round" />
          </g>
        </symbol>
      </defs>
    </svg>
  )
}
