import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <a className="brand" href="/" aria-label="Best Value — Auto Body Supply">
              <Image src="/bv-logo-white.png" alt="Best Value Auto Body Supply" width={145} height={52} className="brand__mark" />
            </a>
            <p>
              Best Value Auto Body Supply, Inc. — supplying collision repair shops, mechanics and
              drivers with OEM-quality parts at honest prices since 2001. 25 years of trust, our
              own delivery fleet, and the industry&apos;s largest call center.
            </p>
            <div className="social">
              <a href="#" aria-label="Facebook"><svg><use href="#i-fb" /></svg></a>
              <a href="#" aria-label="Instagram"><svg><use href="#i-ig" /></svg></a>
              <a href="#" aria-label="YouTube"><svg><use href="#i-yt" /></svg></a>
              <a href="#" aria-label="X"><svg><use href="#i-x-social" /></svg></a>
            </div>
          </div>

          <div className="footer__col">
            <h5>Shop</h5>
            <ul>
              <li><a href="#">Bumpers</a></li>
              <li><a href="#">Headlights &amp; Tail Lights</a></li>
              <li><a href="#">Fenders</a></li>
              <li><a href="#">Mirrors</a></li>
              <li><a href="#">Grilles</a></li>
              <li><a href="#">Hoods &amp; Panels</a></li>
              <li><a href="#">Automotive Paints</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>How we work</h5>
            <ul>
              <li><a href="tel:17737621000">Call to order</a></li>
              <li><a href="#contact">Request a quote</a></li>
              <li><a href="#contact">1-hour delivery zones</a></li>
              <li><a href="#contact">Best price guarantee</a></li>
              <li><a href="/returns">Returns &amp; Warranty</a></li>
              <li><a href="/faq">FAQs</a></li>
              <li><a href="#contact">Visit our counter</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About Best Value</a></li>
              <li><a href="#">Wholesale &amp; dealers</a></li>
              <li><a href="#">Become a shop partner</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Contact</h5>
            <div className="footer__contact">
              <div>
                <svg><use href="#i-pin" /></svg>
                <span>160–150 25th Ave<br />Melrose Park, IL 60160</span>
              </div>
              <div>
                <svg><use href="#i-phone" /></svg>
                <span>+1 (773) 762-1000</span>
              </div>
              <div>
                <svg><use href="#i-mail" /></svg>
                <span>sales@bestvaluepart.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Best Value Auto Body Supply, Inc. · Built on Trust. Driven by Value.</span>
          <div className="pays">
            <span>EST. 2001</span>
            <span>25 YRS</span>
            <span>1-HR DELIVERY</span>
            <span>BEST PRICE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
