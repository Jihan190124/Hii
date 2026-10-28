import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import QuantitySelector from '../components/QuantitySelector.jsx';
import EmptyState from '../components/EmptyState.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { useCart } from '../context/CartContext.jsx';
import { formatINR, plural } from '../utils/format.js';

export default function ShoppingBag() {
  usePageTitle('Shopping bag');
  const { lines, count, subtotal, setQty, removeItem } = useCart();

  if (!lines.length) {
    return (
      <>
        <PageHeader title="Shopping bag" />
        <section className="vel-section vel-section--flush">
          <div className="container-xl">
            <EmptyState title="Your bag is empty" text="Sarees you add will wait here.">
              <Link to="/shop" className="vel-btn">Continue shopping</Link>
            </EmptyState>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Shopping bag" intro={`${count} ${plural(count, 'item', 'items')}`} />
      <section className="vel-section vel-section--flush">
        <div className="container-xl">
          <div className="row g-4 g-lg-5">
            <div className="col-12 col-lg-8">
              <ul className="vel-bag">
                {lines.map(({ product, qty, lineTotal }) => (
                  <li key={product.id} className="vel-bagline">
                    <Link to={`/product/${product.slug}`} className="vel-bagline__img">
                      <img src={product.images[0]} alt={`${product.name}, ${product.colour} ${product.fabric} saree`} width="120" height="160" loading="lazy" />
                    </Link>
                    <div className="vel-bagline__info">
                      <Link to={`/product/${product.slug}`} className="vel-line__name">{product.name}</Link>
                      <p className="vel-line__meta">{product.colour}, {product.fabric}</p>
                      <p className="vel-line__meta">Unit price: {formatINR(product.price)}</p>
                      <div className="vel-line__row">
                        <QuantitySelector value={qty} onChange={(n) => setQty(product.id, n)} label={`Quantity for ${product.name}`} />
                        <button type="button" className="vel-line__remove" onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name} from bag`}>
                          <Trash2 size={16} aria-hidden="true" /> <span>Remove</span>
                        </button>
                      </div>
                    </div>
                    <p className="vel-bagline__total"><span className="vel-sr">Line total </span>{formatINR(lineTotal)}</p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="col-12 col-lg-4" aria-label="Order summary">
              <div className="vel-summary">
                <h2 className="vel-summary__title">Summary</h2>
                <p className="vel-summary__row"><span>Items</span><span>{count}</span></p>
                <p className="vel-summary__row vel-summary__row--total"><span>Subtotal</span><strong>{formatINR(subtotal)}</strong></p>
                <p className="vel-note">Shipping, taxes and payment have not been integrated. This subtotal is for the demo catalogue only.</p>
                <Link to="/checkout" className="vel-btn vel-btn--block">Proceed to checkout</Link>
                <Link to="/shop" className="vel-btn vel-btn--ghost vel-btn--block">Continue shopping</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
