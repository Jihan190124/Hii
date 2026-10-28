import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { getProductById } from '../data/products.js';
import { readJSON, writeJSON } from '../utils/storage.js';
import { useToast } from './ToastContext.jsx';

export const MAX_QTY = 10; // interface limit per line, not a stock statement
const KEY = 'vel.bag.v1';

const clampQty = (n) => Math.min(MAX_QTY, Math.max(1, Math.floor(Number(n)) || 1));

function init() {
  const saved = readJSON(KEY, []);
  if (!Array.isArray(saved)) return [];
  return saved
    .filter((i) => i && getProductById(i.id))
    .map((i) => ({ id: i.id, qty: clampQty(i.qty) }));
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.find((i) => i.id === action.id);
      if (existing) {
        return state.map((i) => (i.id === action.id ? { ...i, qty: clampQty(i.qty + action.qty) } : i));
      }
      return [...state, { id: action.id, qty: clampQty(action.qty) }];
    }
    case 'set':
      return state.map((i) => (i.id === action.id ? { ...i, qty: clampQty(action.qty) } : i));
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, init);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { push } = useToast();

  useEffect(() => writeJSON(KEY, items), [items]);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback(
    (product, qty = 1) => {
      dispatch({ type: 'add', id: product.id, qty });
      push(`${product.name} was added to your bag.`, { actionLabel: 'View bag', onAction: openDrawer });
    },
    [push, openDrawer]
  );
  const setQty = useCallback((id, qty) => dispatch({ type: 'set', id, qty }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const lines = useMemo(
    () =>
      items.map(({ id, qty }) => {
        const product = getProductById(id);
        return { product, qty, lineTotal: product.price * qty };
      }),
    [items]
  );
  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((n, l) => n + l.lineTotal, 0), [lines]);

  const value = useMemo(
    () => ({ lines, count, subtotal, addItem, setQty, removeItem, clear, drawerOpen, openDrawer, closeDrawer }),
    [lines, count, subtotal, addItem, setQty, removeItem, clear, drawerOpen, openDrawer, closeDrawer]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
