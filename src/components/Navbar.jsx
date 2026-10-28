import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react';
import Logo from './Logo.jsx';
import MobileNavigation from './MobileNavigation.jsx';
import { NAV_LINKS } from '../config/nav.js';
import useScrolled from '../hooks/useScrolled.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function Navbar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(24);
  const { pathname } = useLocation();
  const { count: bagCount, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();

  useEffect(() => setMenuOpen(false), [pathname]);

  // Transparent over the hero on the homepage only, ivory everywhere else and after scrolling.
  const overHero = pathname === '/' && !scrolled;

  return (
    <>
      <header className={`vel-header ${overHero ? 'vel-header--clear' : ''}`}>
        <div className="container-xl vel-header__inner">
          <button
            type="button"
            className="vel-icon-btn d-lg-none"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <Link to="/" className="vel-header__brand" aria-label="VEL, home">
            <Logo />
          </Link>

          <nav className="vel-header__links d-none d-lg-flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className="vel-navlink">
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="vel-header__actions">
            <button type="button" className="vel-icon-btn" onClick={onSearch} aria-label="Search">
              <Search size={21} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <Link to="/wishlist" className="vel-icon-btn" aria-label={`Wishlist, ${wishCount} ${wishCount === 1 ? 'item' : 'items'}`}>
              <Heart size={21} strokeWidth={1.5} aria-hidden="true" />
              {wishCount > 0 && <span className="vel-icon-btn__count" aria-hidden="true">{wishCount}</span>}
            </Link>
            <button
              type="button"
              className="vel-icon-btn"
              onClick={openDrawer}
              aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag size={21} strokeWidth={1.5} aria-hidden="true" />
              {bagCount > 0 && <span className="vel-icon-btn__count" aria-hidden="true">{bagCount}</span>}
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
