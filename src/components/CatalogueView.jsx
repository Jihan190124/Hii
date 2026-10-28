import { useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import ProductGrid from './ProductGrid.jsx';
import ProductFilters from './ProductFilters.jsx';
import useCatalogueControls from '../hooks/useCatalogueControls.js';
import { SORTS } from '../utils/catalogue.js';
import { plural } from '../utils/format.js';

// Toolbar + filters + grid, shared by Shop, New Arrivals, Bestsellers and Collection pages.
export default function CatalogueView({ products, emptyTitle, emptyText }) {
  const c = useCatalogueControls(products);
  const [open, setOpen] = useState(false);
  const chips = [
    ...c.filters.colours.map((v) => ['colours', v]),
    ...c.filters.fabrics.map((v) => ['fabrics', v]),
    ...c.filters.occasions.map((v) => ['occasions', v]),
  ];

  return (
    <section className="vel-catalogue" aria-label="Product listing">
      <div className="container-xl">
        <div className="vel-toolbar">
          <button type="button" className="vel-btn vel-btn--ghost vel-btn--sm" onClick={() => setOpen(true)} aria-haspopup="dialog">
            <SlidersHorizontal size={16} aria-hidden="true" />
            Filter
            {c.activeCount > 0 && <span className="vel-count" aria-label={`${c.activeCount} active`}>{c.activeCount}</span>}
          </button>
          <p className="vel-toolbar__count" role="status">
            {c.results.length} {plural(c.results.length, 'piece', 'pieces')}
          </p>
          <label className="vel-select">
            <span className="vel-sr">Sort by</span>
            <select value={c.sort} onChange={(e) => c.setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </label>
        </div>

        {chips.length > 0 && (
          <ul className="vel-chips vel-chips--active" aria-label="Active filters">
            {chips.map(([key, value]) => (
              <li key={`${key}-${value}`}>
                <button type="button" className="vel-chip" onClick={() => c.toggle(key, value)} aria-label={`Remove filter ${value}`}>
                  {value} <X size={13} aria-hidden="true" />
                </button>
              </li>
            ))}
            <li>
              <button type="button" className="vel-link vel-link--btn" onClick={c.reset}>Clear all</button>
            </li>
          </ul>
        )}

        <ProductGrid
          products={c.results}
          emptyTitle={emptyTitle || 'No sarees match these filters'}
          emptyText={emptyText || 'Try widening the price range or removing a filter.'}
          emptyAction={c.activeCount > 0 ? <button type="button" className="vel-btn vel-btn--ghost" onClick={c.reset}>Reset filters</button> : null}
        />
      </div>

      <ProductFilters
        open={open}
        onClose={() => setOpen(false)}
        filters={c.filters}
        options={c.options}
        bounds={c.bounds}
        count={c.results.length}
        activeCount={c.activeCount}
        toggle={c.toggle}
        setPrice={c.setPrice}
        onReset={c.reset}
      />
    </section>
  );
}
