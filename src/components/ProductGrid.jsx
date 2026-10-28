import ProductCard from './ProductCard.jsx';
import EmptyState from './EmptyState.jsx';

// Bootstrap grid: two per row on phones, three on tablets, four on large screens.
export default function ProductGrid({ products, emptyTitle = 'Nothing here yet', emptyText, emptyAction }) {
  if (!products.length) {
    return (
      <EmptyState title={emptyTitle} text={emptyText}>
        {emptyAction}
      </EmptyState>
    );
  }
  return (
    <ul className="row g-2 g-md-3 g-lg-4 vel-grid">
      {products.map((p) => (
        <li key={p.id} className="col-6 col-md-4 col-lg-3">
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
