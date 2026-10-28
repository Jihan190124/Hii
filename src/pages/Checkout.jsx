import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { useCart } from '../context/CartContext.jsx';
import { buildOrderDraft, CHECKOUT_REQUIREMENTS } from '../services/checkout.js';
import { formatINR } from '../utils/format.js';

// A demonstration page only. There is deliberately no payment form, no "place order" action and no success page.
export default function Checkout() {
  usePageTitle('Checkout');
  const { lines } = useCart();
  const draft = buildOrderDraft(lines);

  return (
    <>
      <PageHeader title="Checkout" intro="This is a demonstration page. No order is placed and no payment is taken." />
      <section className="vel-section vel-section--flush">
        <div className="container-xl">
          <div className="row g-4 g-lg-5">
            <div className="col-12 col-lg-7">
              <h2 className="vel-h3">What a live checkout still needs</h2>
              <ul className="vel-checklist">
                {CHECKOUT_REQUIREMENTS.map((r) => <li key={r}>{r}</li>)}
              </ul>
              <p className="vel-note">The integration point is <code>src/services/checkout.js</code>. Connect a payment provider and an order backend there.</p>
            </div>

            <aside className="col-12 col-lg-5" aria-label="Bag summary">
              {draft.items.length === 0 ? (
                <EmptyState title="Your bag is empty" text="Add a saree to see it here.">
                  <Link to="/shop" className="vel-btn">Continue shopping</Link>
                </EmptyState>
              ) : (
                <div className="vel-summary">
                  <h2 className="vel-summary__title">Your bag</h2>
                  <ul className="vel-summary__items">
                    {lines.map(({ product, qty, lineTotal }) => (
                      <li key={product.id}>
                        <span>{product.name} × {qty}</span>
                        <span>{formatINR(lineTotal)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="vel-summary__row vel-summary__row--total"><span>Subtotal</span><strong>{formatINR(draft.subtotal)}</strong></p>
                  <button type="button" className="vel-btn vel-btn--block" disabled>Payment not yet available</button>
                  <Link to="/bag" className="vel-btn vel-btn--ghost vel-btn--block">Back to bag</Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
