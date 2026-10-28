import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery.jsx';
import QuantitySelector from '../components/QuantitySelector.jsx';
import AddToBagButton from '../components/AddToBagButton.jsx';
import WishlistButton from '../components/WishlistButton.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import Accordion from '../components/Accordion.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import NotFound from './NotFound.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { getProductBySlug, getRelatedProducts } from '../data/products.js';
import { getCollection } from '../data/collections.js';
import { COLOURS } from '../data/colours.js';
import { SITE } from '../config/site.js';
import { formatINR } from '../utils/format.js';

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  usePageTitle(product ? product.name : 'Product not found');
  if (!product) {
    return <NotFound title="We could not find that saree" text="It may no longer be in the catalogue." />;
  }
  // key resets quantity and scroll-observers whenever the route switches to another product.
  return <ProductView key={product.id} product={product} />;
}

const TBC = <span className="vel-tbc">To be confirmed</span>;

function ProductView({ product }) {
  const [qty, setQty] = useState(1);
  const [ctaGone, setCtaGone] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const ctaRef = useRef(null);
  const collection = getCollection(product.collection);
  const related = getRelatedProducts(product);

  // The mobile purchase bar appears only after the main button has scrolled away, and hides at the footer.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const cta = new IntersectionObserver(([e]) => setCtaGone(!e.isIntersecting && e.boundingClientRect.top < 0));
    const foot = new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting));
    if (ctaRef.current) cta.observe(ctaRef.current);
    const footer = document.querySelector('footer');
    if (footer) foot.observe(footer);
    return () => { cta.disconnect(); foot.disconnect(); };
  }, []);

  return (
    <article className="vel-pdp">
      <div className="container-xl">
        <nav className="vel-crumbs" aria-label="Breadcrumb">
          <Link to="/shop" className="vel-link">Shop</Link>
          {collection && (
            <>
              <span aria-hidden="true">/</span>
              <Link to={`/collections/${collection.slug}`} className="vel-link">{collection.name}</Link>
            </>
          )}
        </nav>

        <div className="row g-4 g-xl-5">
          <div className="col-12 col-lg-7">
            <ProductGallery product={product} />
          </div>

          <div className="col-12 col-lg-5">
            <div className="vel-pdp__info">
              {product.badge && <p className="vel-badge vel-badge--inline">{product.badge}</p>}
              <h1 className="vel-h1 vel-pdp__name">{product.name}</h1>
              <p className="vel-pdp__price">{formatINR(product.price)}</p>
              <p className="vel-pdp__tax">Taxes and shipping are not configured in this demo.</p>
              <p className="vel-pdp__desc">{product.description}</p>

              <dl className="vel-specs">
                <div>
                  <dt>Colour</dt>
                  <dd>
                    <span className="vel-swatch__dot" style={{ background: COLOURS[product.colour] || '#ccc' }} aria-hidden="true" />
                    {product.colour}
                  </dd>
                </div>
                <div><dt>Fabric</dt><dd>{product.fabric}</dd></div>
                <div><dt>Occasion</dt><dd>{product.occasion}</dd></div>
                <div><dt>Saree length</dt><dd>{product.details.sareeLength || TBC}</dd></div>
                <div><dt>Blouse piece</dt><dd>{product.details.blousePiece || TBC}</dd></div>
              </dl>

              <div className="vel-pdp__buy" ref={ctaRef}>
                <QuantitySelector value={qty} onChange={setQty} />
                <AddToBagButton product={product} quantity={qty} block />
              </div>
              <div className="vel-pdp__secondary">
                <WishlistButton product={product} variant="text" />
                <WhatsAppButton product={product} block />
              </div>

              <Accordion
                items={[
                  {
                    title: 'Fabric and details',
                    children: (
                      <p>
                        {product.fabric} saree in {product.colour.toLowerCase()}. Weave details, saree length and blouse-piece
                        measurements will be added here once confirmed for this piece.
                      </p>
                    ),
                  },
                  { title: 'Care', children: <p>{SITE.careNote}</p> },
                  { title: 'Delivery', children: <p>{SITE.deliveryNote}</p> },
                ]}
              />
            </div>
          </div>
        </div>

        <section className="vel-related" aria-label="Related sarees">
          <SectionHeading title="You may also love" />
          <ProductGrid products={related} />
        </section>
      </div>

      <div className={`vel-buybar d-md-none ${ctaGone && !footerVisible ? 'is-visible' : ''}`} aria-hidden={!(ctaGone && !footerVisible)}>
        <div className="vel-buybar__info">
          <span className="vel-buybar__name">{product.name}</span>
          <span>{formatINR(product.price)}</span>
        </div>
        <AddToBagButton product={product} quantity={qty} className="vel-buybar__btn" />
      </div>
    </article>
  );
}
