import { useCallback, useEffect, useMemo, useState } from 'react';
import { activeFilterCount, applyFilters, emptyFilters, priceBounds, sortProducts, unique } from '../utils/catalogue.js';

// Filter + sort state for any list of products (Shop, New Arrivals, Collections).
export default function useCatalogueControls(baseProducts) {
  const bounds = useMemo(() => priceBounds(baseProducts), [baseProducts]);
  const options = useMemo(
    () => ({
      colours: unique(baseProducts, 'colour'),
      fabrics: unique(baseProducts, 'fabric'),
      occasions: unique(baseProducts, 'occasion'),
    }),
    [baseProducts]
  );
  const [filters, setFilters] = useState(() => emptyFilters(bounds));
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    setFilters(emptyFilters(bounds));
    setSort('featured');
  }, [bounds]);

  const results = useMemo(() => sortProducts(applyFilters(baseProducts, filters), sort), [baseProducts, filters, sort]);
  const activeCount = activeFilterCount(filters, bounds);

  const toggle = useCallback((key, value) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));
  }, []);

  const setPrice = useCallback((min, max) => setFilters((f) => ({ ...f, min, max })), []);
  const reset = useCallback(() => setFilters(emptyFilters(bounds)), [bounds]);

  return { bounds, options, filters, sort, setSort, results, activeCount, toggle, setPrice, reset };
}
