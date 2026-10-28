import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProductById } from '../data/products.js';
import { readJSON, writeJSON } from '../utils/storage.js';
import { useToast } from './ToastContext.jsx';

const KEY = 'vel.wishlist.v1';
const WishlistContext = createContext(null);

const init = () => {
  const saved = readJSON(KEY, []);
  return Array.isArray(saved) ? saved.filter((id) => getProductById(id)) : [];
};

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(init);
  const { push } = useToast();

  useEffect(() => writeJSON(KEY, ids), [ids]);

  const has = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (product) => {
      if (ids.includes(product.id)) {
        setIds(ids.filter((id) => id !== product.id));
        push(`${product.name} was removed from your wishlist.`);
      } else {
        setIds([...ids, product.id]);
        push(`${product.name} was saved to your wishlist.`);
      }
    },
    [ids, push]
  );

  const value = useMemo(() => ({ ids, count: ids.length, has, toggle }), [ids, has, toggle]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
