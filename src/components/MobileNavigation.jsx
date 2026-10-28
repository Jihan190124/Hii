import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Logo from './Logo.jsx';
import useDialog from '../hooks/useDialog.js';
import { NAV_LINKS } from '../config/nav.js';

export default function MobileNavigation({ open, onClose }) {
  return <AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>;
}

function Panel({ onClose }) {
  const ref = useDialog(onClose);
  return (
    <>
      <motion.div className="vel-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={ref}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        className="vel-mnav"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="vel-mnav__top">
          <Link to="/" onClick={onClose} aria-label="VEL, home"><Logo /></Link>
          <button type="button" className="vel-icon-btn" onClick={onClose} aria-label="Close menu">
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="vel-mnav__list">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className="vel-mnav__link" onClick={onClose}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
          <ul className="vel-mnav__sub">
            <li><Link to="/shop/new-arrivals" onClick={onClose}>New Arrivals</Link></li>
            <li><Link to="/shop/bestsellers" onClick={onClose}>Bestsellers</Link></li>
            <li><Link to="/wishlist" onClick={onClose}>Wishlist</Link></li>
            <li><Link to="/bag" onClick={onClose}>Shopping bag</Link></li>
          </ul>
        </nav>
      </motion.div>
    </>
  );
}
