import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FabricScene from '../components/FabricScene.jsx';
import CatalogueView from '../components/CatalogueView.jsx';
import EditorialStorySection from '../components/EditorialStorySection.jsx';
import CollectionGrid from '../components/CollectionGrid.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import BrandStatement from '../components/BrandStatement.jsx';
import TestimonialsSection from '../components/TestimonialsSection.jsx';
import NewsletterSection from '../components/NewsletterSection.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { products } from '../data/products.js';
import { collections } from '../data/collections.js';

export default function Home() {
  usePageTitle();
  const { state } = useLocation();

  // Footer "Newsletter" link from other pages lands here and scrolls to the signup.
  useEffect(() => {
    if (!state || !state.scrollTo) return undefined;
    const t = window.setTimeout(() => {
      const el = document.getElementById(state.scrollTo);
      if (!el) return;
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      el.querySelector('input')?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(t);
  }, [state]);

  return (
    <>
      <FabricScene />

      {/* The scroll scene ends here: the full catalogue, with filters and sorting. */}
      <section id="shop" className="vel-shop" aria-labelledby="shop-title">
        <div className="container-xl vel-shop__head">
          <h2 id="shop-title" className="vel-h2">Considered in every detail.</h2>
          <p>Sample pieces from the demo catalogue. Filter by colour, fabric, occasion or price.</p>
        </div>
        <CatalogueView products={products} />
      </section>

      <section className="vel-section vel-section--tint" aria-label="Collections">
        <div className="container-xl">
          <SectionHeading title="Four edits" intro="Editable collection groupings, each with its own mood." />
          <CollectionGrid collections={collections} />
        </div>
      </section>

      <EditorialStorySection />
      <BrandStatement />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
