import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import { SITE } from '../config/site.js';

const placeholder = (v) => v || 'To be added';

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goToNewsletter = () => {
    if (pathname === '/') {
      document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'newsletter' } });
    }
  };

  return (
    <footer className="vel-footer on-dark">
      <div className="container-xl">
        <div className="row g-4 g-lg-5">
          <div className="col-12 col-lg-4">
            <Link to="/" aria-label="VEL, home" className="vel-footer__logo"><Logo stacked /></Link>
            <p className="vel-footer__about">{SITE.description}</p>
          </div>

          <nav className="col-6 col-lg-2" aria-label="Shop">
            <h2 className="vel-footer__h">Shop</h2>
            <ul>
              <li><Link to="/shop">Shop All</Link></li>
              <li><Link to="/shop/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/shop/bestsellers">Bestsellers</Link></li>
              <li><Link to="/collections">Collections</Link></li>
            </ul>
          </nav>

          <nav className="col-6 col-lg-2" aria-label="Customer care">
            <h2 className="vel-footer__h">Customer care</h2>
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/bag">Shopping bag</Link></li>
              <li><button type="button" onClick={goToNewsletter}>Newsletter</button></li>
            </ul>
          </nav>

          <div className="col-12 col-lg-4">
            <h2 className="vel-footer__h">Contact</h2>
            <ul className="vel-footer__contact">
              <li>Email: {placeholder(SITE.contact.email)}</li>
              <li>Phone: {placeholder(SITE.contact.phone)}</li>
              <li>Address: {placeholder(SITE.contact.address)}</li>
            </ul>
            <h2 className="vel-footer__h vel-footer__h--spaced">Follow</h2>
            <ul className="vel-footer__social">
              {SITE.social.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  ) : (
                    <span>{s.label} (coming soon)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="vel-footer__legal">
          <p>© {new Date().getFullYear()} VEL. All rights reserved. Sample catalogue for demonstration.</p>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
