export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar__row">
        <div className="topbar__left">
          <a className="topbar__item" href="tel:17737621000">
            <svg><use href="#i-phone" /></svg>
            +1 (773) 762-1000
          </a>
          <span className="topbar__sep" aria-hidden="true" />
          <span className="topbar__item">Mon–Fri 8 AM–7 PM CST</span>
        </div>
        <div className="topbar__right">
          <span className="topbar__promo">
            🇺🇸 <strong>25 years</strong> serving collision shops &amp; drivers ·{' '}
            <strong>1-hour local delivery</strong>
          </span>
          <span className="topbar__sep" aria-hidden="true" />
          <a href="#contact" className="topbar__item">Delivery zones</a>
          <a href="/returns" className="topbar__item">Returns &amp; Warranty</a>
          <a href="/faq" className="topbar__item">FAQs</a>
          <a href="/careers" className="topbar__item">Careers</a>
          <a href="/register" className="topbar__item" style={{ color: 'var(--bv-red)', fontWeight: 700 }}>Register Account</a>
        </div>
      </div>
    </div>
  )
}
