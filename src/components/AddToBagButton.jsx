import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function AddToBagButton({ product, quantity = 1, block = false, variant = 'solid', label = 'Add to bag', className = '' }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const t = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      className={`vel-btn ${variant === 'ghost' ? 'vel-btn--ghost' : ''} ${block ? 'vel-btn--block' : ''} ${className}`}
      onClick={() => {
        addItem(product, quantity);
        setAdded(true);
      }}
    >
      {added ? (
        <>
          <Check size={16} aria-hidden="true" /> Added to bag
        </>
      ) : (
        label
      )}
    </button>
  );
}
