import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import WishlistButton from './WishlistButton.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatINR } from '../utils/format.js';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { name, slug, price, images, badge, fabric, colour } = product;

  return (
    <article className="vel-card">
      <div className="vel-card__media">
        <Link to={`/product/${slug}`} className="vel-card__link" aria-label={`${name}, ${formatINR(price)}`} tabIndex={-1}>
          <img className="vel-card__img vel-card__img--primary" src={images[0]} alt={`${name}, ${colour} ${fabric} saree`} width="900" height="1200" loading="lazy" decoding="async" />
          <img className="vel-card__img vel-card__img--secondary" src={images[1]} alt="" aria-hidden="true" width="900" height="1200" loading="lazy" decoding="async" />
        </Link>
        {badge && <span className="vel-badge">{badge}</span>}
        <WishlistButton product={product} className="vel-card__wish" />
        {/* Every sample product is a single colour with no size, so quick add is always unambiguous. */}
        <button type="button" className="vel-card__quick" onClick={() => addItem(product)} aria-label={`Add ${name} to bag`}>
          <Plus size={18} aria-hidden="true" />
          <span className="vel-card__quick-label">Quick add</span>
        </button>
      </div>
      <div className="vel-card__body">
        <h3 className="vel-card__name">
          <Link to={`/product/${slug}`}>{name}</Link>
        </h3>
        <p className="vel-card__fabric">{colour}, {fabric}</p>
        <p className="vel-card__price">{formatINR(price)}</p>
      </div>
    </article>
  );
}
