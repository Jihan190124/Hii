import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import CatalogueView from '../components/CatalogueView.jsx';
import NotFound from './NotFound.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { products } from '../data/products.js';
import { getCollection } from '../data/collections.js';

export default function Collection() {
  const { slug } = useParams();
  const collection = getCollection(slug);
  usePageTitle(collection ? collection.name : 'Collection not found');
  const base = useMemo(() => products.filter((p) => p.collection === slug), [slug]);

  if (!collection) {
    return <NotFound title="We could not find that collection" text="It may have been renamed or removed." />;
  }
  return (
    <>
      <PageHeader title={collection.name} intro={collection.intro}>
        <p className="vel-crumbs"><Link to="/collections" className="vel-link">All collections</Link></p>
      </PageHeader>
      <CatalogueView products={base} emptyTitle="This collection is being prepared" emptyText="Check back soon, or browse the full catalogue." />
    </>
  );
}
