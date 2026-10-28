import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getProductById } from '../data/products.js';
import { plural } from '../utils/format.js';

export default function Wishlist() {
  usePageTitle('Wishlist');
  const { ids } = useWishlist();
  const { addItem } = useCart();
  const saved = ids.map(getProductById).filter(Boolean);

  return (
    <>
      <PageHeader title="Wishlist" intro={saved.length ? `${saved.length} saved ${plural(saved.length, 'piece', 'pieces')}.` : 'Pieces you save will wait here.'} />
      <section className="vel-section vel-section--flush">
        <div className="container-xl">
          {saved.length > 0 && (
            <p className="vel-wishlist__actions">
              <button type="button" className="vel-btn vel-btn--ghost vel-btn--sm" onClick={() => saved.forEach((p) => addItem(p))}>
                Add all to bag
              </button>
            </p>
          )}
          <ProductGrid
            products={saved}
            animate={false}
            emptyTitle="Nothing saved yet"
            emptyText="Tap the heart on any saree to keep it here."
            emptyAction={<Link to="/shop" className="vel-btn">Explore the shop</Link>}
          />
        </div>
      </section>
    </>
  );
}
