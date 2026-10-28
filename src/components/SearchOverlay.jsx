import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import useDialog from '../hooks/useDialog.js';
import { products } from '../data/products.js';
import { collections } from '../data/collections.js';
import { searchProducts } from '../utils/catalogue.js';
import { formatINR } from '../utils/format.js';

const SUGGESTIONS = ['Organza', 'Ivory', 'Festive', 'Evening', 'Linen'];

export default function SearchOverlay({ open, onClose }) {
  return <AnimatePresence>{open && <Panel onClose={onClose} />}</AnimatePresence>;
}

function Panel({ onClose }) {
  const ref = useDialog(onClose);
  const [query, setQuery] = useState('');
  const term = query.trim();
  const results = useMemo(() => searchProducts(term, products, collections).slice(0, 8), [term]);

  return (
    <>
      <motion.div className="vel-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        tabIndex={-1}
        className="vel-search"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="container-xl">
          <div className="vel-search__bar">
            <Search size={22} strokeWidth={1.5} aria-hidden="true" />
            <label className="vel-sr" htmlFor="site-search">Search sarees by name, colour, fabric, collection or occasion</label>
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, colour, fabric or occasion"
              autoComplete="off"
              enterKeyHint="search"
            />
            {query && (
              <button type="button" className="vel-search__clear" onClick={() => setQuery('')}>
                Clear
              </button>
            )}
            <button type="button" className="vel-icon-btn" onClick={onClose} aria-label="Close search">
              <X size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="vel-search__body">
            {!term && (
              <div>
                <p className="vel-search__hint">Try a fabric, a colour or an occasion.</p>
                <ul className="vel-chips">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button type="button" className="vel-chip" onClick={() => setQuery(s)}>{s}</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {term && (
              <p className="vel-search__status" role="status">
                {results.length
                  ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${term}”`
                  : `No sarees match “${term}”. Check the spelling or try a fabric, colour or occasion.`}
              </p>
            )}

            {results.length > 0 && (
              <ul className="vel-search__results">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link to={`/product/${p.slug}`} onClick={onClose} className="vel-result">
                      <img src={p.images[0]} alt="" width="60" height="80" loading="lazy" />
                      <span className="vel-result__text">
                        <span className="vel-result__name">{p.name}</span>
                        <span className="vel-result__meta">{p.colour}, {p.fabric}</span>
                      </span>
                      <span className="vel-result__price">{formatINR(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
