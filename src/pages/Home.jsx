import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import EditorialStorySection from '../components/EditorialStorySection.jsx';
import CollectionGrid from '../components/CollectionGrid.jsx';
import BrandStatement from '../components/BrandStatement.jsx';
import TestimonialsSection from '../components/TestimonialsSection.jsx';
import NewsletterSection from '../components/NewsletterSection.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { products } from '../data/products.js';
import { collections } from '../data/collections.js';

const featured = products.filter((p) => p.featuredHome).slice(0, 6);

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
      <HeroSection />

      <section className="vel-section" aria-labelledby="featured-title">
        <div className="container-xl">
          <SectionHeading title="Considered in every detail." intro="A first look at the collection. Sample pieces, to be replaced with the VEL catalogue." />
          <span id="featured-title" className="vel-sr">Featured sarees</span>
          <ProductGrid products={featured} />
          <p className="vel-section__cta"><Link to="/shop" className="vel-link">Shop All</Link></p>
        </div>
      </section>

      <EditorialStorySection />

      <section className="vel-section vel-section--tint" aria-labelledby="collections-title">
        <div className="container-xl">
          <SectionHeading title="Four ways to wear the bloom." intro="Editable collection groupings." />
          <span id="collections-title" className="vel-sr">Collections</span>
          <CollectionGrid collections={collections} />
        </div>
      </section>

      <BrandStatement />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
