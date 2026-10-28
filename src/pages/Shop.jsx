import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import CatalogueView from '../components/CatalogueView.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { products } from '../data/products.js';

const VIEWS = {
  all: { title: 'Shop All', intro: 'Every saree in the sample catalogue.', filter: () => true },
  new: {
    title: 'New Arrivals',
    intro: 'The most recent additions to the sample catalogue.',
    filter: (p) => p.isNew,
  },
  bestsellers: {
    title: 'Bestsellers',
    intro: 'Bestseller labels in this demo are sample merchandising tags, not sales data.',
    filter: (p) => p.bestseller,
  },
};

export default function Shop({ view = 'all' }) {
  const cfg = VIEWS[view];
  usePageTitle(cfg.title);
  const base = useMemo(() => products.filter(cfg.filter), [cfg]);

  return (
    <>
      <PageHeader title={cfg.title} intro={cfg.intro}>
        <nav className="vel-subnav" aria-label="Shop sections">
          <NavLink to="/shop" end>Shop All</NavLink>
          <NavLink to="/shop/new-arrivals">New Arrivals</NavLink>
          <NavLink to="/shop/bestsellers">Bestsellers</NavLink>
        </nav>
      </PageHeader>
      <CatalogueView products={base} />
    </>
  );
}
