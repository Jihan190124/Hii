import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import useDialog from '../hooks/useDialog.js';
import useMediaQuery from '../hooks/useMediaQuery.js';
import { COLOURS } from '../data/colours.js';
import { formatINR } from '../utils/format.js';

// Bottom sheet on phones and tablets, side drawer on large screens.
export default function ProductFilters(props) {
  return <AnimatePresence>{props.open && <Panel {...props} />}</AnimatePresence>;
}

function Panel({ onClose, filters, options, bounds, count, activeCount, toggle, setPrice, onReset }) {
  const ref = useDialog(onClose);
  const wide = useMediaQuery('(min-width: 992px)');
  const offscreen = wide ? { x: '100%' } : { y: '100%' };
  const onscreen = wide ? { x: 0 } : { y: 0 };

  return (
    <>
      <motion.div className="vel-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Filter sarees"
        tabIndex={-1}
        className="vel-sheet"
        initial={offscreen}
        animate={onscreen}
        exit={offscreen}
        transition={{ duration: 0.42, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="vel-sheet__head">
          <h2 className="vel-sheet__title">Filter</h2>
          <button type="button" className="vel-icon-btn" onClick={onClose} aria-label="Close filters">
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className="vel-sheet__body">
          <fieldset className="vel-fieldset">
            <legend>Price</legend>
            <p className="vel-price-range" aria-live="polite">{formatINR(filters.min)} to {formatINR(filters.max)}</p>
            <label className="vel-range">
              <span className="vel-sr">Minimum price</span>
              <input
                type="range"
                min={bounds.min}
                max={bounds.max}
                step={bounds.step}
                value={filters.min}
                onChange={(e) => setPrice(Math.min(Number(e.target.value), filters.max), filters.max)}
              />
            </label>
            <label className="vel-range">
              <span className="vel-sr">Maximum price</span>
              <input
                type="range"
                min={bounds.min}
                max={bounds.max}
                step={bounds.step}
                value={filters.max}
                onChange={(e) => setPrice(filters.min, Math.max(Number(e.target.value), filters.min))}
              />
            </label>
          </fieldset>

          <fieldset className="vel-fieldset">
            <legend>Colour</legend>
            <ul className="vel-swatches">
              {options.colours.map((c) => {
                const on = filters.colours.includes(c);
                return (
                  <li key={c}>
                    <button type="button" className={`vel-swatch ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => toggle('colours', c)}>
                      <span className="vel-swatch__dot" style={{ background: COLOURS[c] || '#ccc' }} aria-hidden="true" />
                      {c}
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <CheckGroup legend="Fabric" values={options.fabrics} selected={filters.fabrics} onToggle={(v) => toggle('fabrics', v)} />
          <CheckGroup legend="Occasion" values={options.occasions} selected={filters.occasions} onToggle={(v) => toggle('occasions', v)} />
        </div>

        <div className="vel-sheet__foot">
          <button type="button" className="vel-btn vel-btn--ghost" onClick={onReset} disabled={!activeCount}>Reset</button>
          <button type="button" className="vel-btn" onClick={onClose}>
            Show {count} {count === 1 ? 'piece' : 'pieces'}
          </button>
        </div>
      </motion.div>
    </>
  );
}

function CheckGroup({ legend, values, selected, onToggle }) {
  return (
    <fieldset className="vel-fieldset">
      <legend>{legend}</legend>
      <ul className="vel-checks">
        {values.map((v) => (
          <li key={v}>
            <label className="vel-check">
              <input type="checkbox" checked={selected.includes(v)} onChange={() => onToggle(v)} />
              <span className="vel-check__box" aria-hidden="true"><Check size={13} strokeWidth={2.5} /></span>
              {v}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
