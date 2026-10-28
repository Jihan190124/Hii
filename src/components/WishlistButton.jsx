import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function WishlistButton({ product, variant = 'icon', className = '' }) {
  const { has, toggle } = useWishlist();
  const saved = has(product.id);
  const label = saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`;

  return (
    <button
      type="button"
      className={`vel-wish vel-wish--${variant} ${saved ? 'is-saved' : ''} ${className}`}
      onClick={() => toggle(product)}
      aria-pressed={saved}
      aria-label={label}
    >
      <motion.span
        key={saved ? 'on' : 'off'}
        className="vel-wish__icon"
        initial={saved ? { scale: 0.7 } : false}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 14 }}
      >
        <Heart size={20} strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
      </motion.span>
      {variant === 'text' && <span>{saved ? 'Saved to wishlist' : 'Save to wishlist'}</span>}
    </button>
  );
}
