export const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

const STEP = 500;

export const unique = (list, key) => [...new Set(list.map((p) => p[key]))].sort();

export function priceBounds(list) {
  if (!list.length) return { min: 0, max: 0, step: STEP };
  const prices = list.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices) / STEP) * STEP,
    max: Math.ceil(Math.max(...prices) / STEP) * STEP,
    step: STEP,
  };
}

export const emptyFilters = (bounds) => ({
  colours: [],
  fabrics: [],
  occasions: [],
  min: bounds.min,
  max: bounds.max,
});

export function activeFilterCount(f, bounds) {
  return (
    f.colours.length +
    f.fabrics.length +
    f.occasions.length +
    (f.min > bounds.min || f.max < bounds.max ? 1 : 0)
  );
}

export function applyFilters(list, f) {
  return list.filter(
    (p) =>
      p.price >= f.min &&
      p.price <= f.max &&
      (!f.colours.length || f.colours.includes(p.colour)) &&
      (!f.fabrics.length || f.fabrics.includes(p.fabric)) &&
      (!f.occasions.length || f.occasions.includes(p.occasion))
  );
}

export function sortProducts(list, sort) {
  const out = [...list];
  switch (sort) {
    case 'newest':
      return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case 'price-asc':
      return out.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return out.sort((a, b) => b.price - a.price);
    default:
      return out; // catalogue order = featured order
  }
}

export function searchProducts(query, list, collections) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const collectionName = Object.fromEntries(collections.map((c) => [c.slug, c.name]));
  return list.filter((p) => {
    const hay = [p.name, p.colour, p.fabric, p.occasion, collectionName[p.collection], p.badge]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return tokens.every((t) => hay.includes(t));
  });
}
