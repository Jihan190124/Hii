import ProductCard from './ProductCard.jsx';
import Reveal from './Reveal.jsx';
import EmptyState from './EmptyState.jsx';

// Bootstrap grid: two per row on phones, three on tablets, four on large screens.
export default function ProductGrid({ products, emptyTitle = 'Nothing here yet', emptyText, emptyAction, animate = true }) {
  if (!products.length) {
    return (
      <EmptyState title={emptyTitle} text={emptyText}>
        {emptyAction}
      </EmptyState>
    );
  }
  return (
    <ul className="row g-2 g-md-3 g-lg-4 vel-grid">
      {products.map((p, i) => (
        <li key={p.id} className="col-6 col-md-4 col-lg-3">
          {animate ? (
            <Reveal delay={(i % 4) * 0.05} y={10}>
              <ProductCard product={p} />
            </Reveal>
          ) : (
            <ProductCard product={p} />
          )}
        </li>
      ))}
    </ul>
  );
}
