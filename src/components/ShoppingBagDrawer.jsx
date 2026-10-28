import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import useDialog from '../hooks/useDialog.js';
import QuantitySelector from './QuantitySelector.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatINR, plural } from '../utils/format.js';

export default function ShoppingBagDrawer() {
  const { drawerOpen, closeDrawer } = useCart();
  const { pathname } = useLocation();
  useEffect(() => { closeDrawer(); }, [pathname, closeDrawer]);
  return <AnimatePresence>{drawerOpen && <Panel onClose={closeDrawer} />}</AnimatePresence>;
}

function Panel({ onClose }) {
  const ref = useDialog(onClose);
  const { lines, count, subtotal, setQty, removeItem } = useCart();

  return (
    <>
      <motion.div className="vel-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
      <motion.aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        tabIndex={-1}
        className="vel-drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.42, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="vel-drawer__head">
          <h2 className="vel-drawer__title">Your bag <span>({count} {plural(count, 'item', 'items')})</span></h2>
          <button type="button" className="vel-icon-btn" onClick={onClose} aria-label="Close bag">
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="vel-drawer__empty">
            <p className="vel-empty__title">Your bag is empty</p>
            <p className="vel-empty__text">Sarees you add will wait here.</p>
            <Link to="/shop" className="vel-btn" onClick={onClose}>Continue shopping</Link>
          </div>
        ) : (
          <>
            <ul className="vel-drawer__lines">
              {lines.map(({ product, qty, lineTotal }) => (
                <li key={product.id} className="vel-line">
                  <Link to={`/product/${product.slug}`} onClick={onClose} className="vel-line__img">
                    <img src={product.images[0]} alt="" width="90" height="120" />
                  </Link>
                  <div className="vel-line__info">
                    <Link to={`/product/${product.slug}`} onClick={onClose} className="vel-line__name">{product.name}</Link>
                    <p className="vel-line__meta">{product.colour}, {product.fabric}</p>
                    <p className="vel-line__meta">{formatINR(product.price)} each</p>
                    <div className="vel-line__row">
                      <QuantitySelector value={qty} onChange={(n) => setQty(product.id, n)} label={`Quantity for ${product.name}`} />
                      <button type="button" className="vel-line__remove" onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name} from bag`}>
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <p className="vel-line__total">{formatINR(lineTotal)}</p>
                </li>
              ))}
            </ul>
            <div className="vel-drawer__foot">
              <p className="vel-drawer__subtotal"><span>Subtotal</span><strong>{formatINR(subtotal)}</strong></p>
              <p className="vel-note">Shipping, taxes and payment are not set up in this demo.</p>
              <Link to="/checkout" className="vel-btn vel-btn--block" onClick={onClose}>Proceed to checkout</Link>
              <div className="vel-drawer__links">
                <Link to="/bag" className="vel-link" onClick={onClose}>View bag</Link>
                <button type="button" className="vel-link vel-link--btn" onClick={onClose}>Continue shopping</button>
              </div>
            </div>
          </>
        )}
      </motion.aside>
    </>
  );
}
