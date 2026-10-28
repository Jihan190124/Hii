import { Minus, Plus } from 'lucide-react';
import { MAX_QTY } from '../context/CartContext.jsx';

export default function QuantitySelector({ value, onChange, label = 'Quantity', min = 1, max = MAX_QTY }) {
  return (
    <div className="vel-qty" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus size={16} aria-hidden="true" />
      </button>
      <span className="vel-qty__value" aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
