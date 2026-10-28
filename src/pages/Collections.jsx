import PageHeader from '../components/PageHeader.jsx';
import CollectionGrid from '../components/CollectionGrid.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { collections } from '../data/collections.js';

export default function Collections() {
  usePageTitle('Collections');
  return (
    <>
      <PageHeader title="Collections" intro="Four edits, each with its own palette and mood." />
      <section className="vel-section vel-section--flush">
        <div className="container-xl">
          <CollectionGrid collections={collections} />
        </div>
      </section>
    </>
  );
}
