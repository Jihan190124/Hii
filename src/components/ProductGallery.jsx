import { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

// Scroll-snap gallery: swipe on touch, arrows and thumbnails on desktop, arrow keys when focused.
export default function ProductGallery({ product }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const { images, name, colour, fabric } = product;

  const goTo = useCallback(
    (i) => {
      const el = ref.current;
      if (!el) return;
      const next = Math.max(0, Math.min(images.length - 1, i));
      el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
      setIndex(next);
    },
    [images.length, reduce]
  );

  const onScroll = () => {
    const el = ref.current;
    if (!el || !el.clientWidth) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
  };

  return (
    <div className="vel-gallery">
      <ul className="vel-gallery__thumbs d-none d-md-flex" aria-label="Choose image">
        {images.map((src, i) => (
          <li key={src}>
            <button type="button" className={i === index ? 'is-active' : ''} onClick={() => goTo(i)} aria-label={`Show image ${i + 1} of ${images.length}`} aria-current={i === index}>
              <img src={src} alt="" width="90" height="120" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      <div className="vel-gallery__stage">
        <div
          ref={ref}
          className="vel-gallery__track"
          onScroll={onScroll}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={`${name} images`}
        >
          {images.map((src, i) => (
            <div key={src} className="vel-gallery__slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${images.length}`}>
              <img
                src={src}
                alt={i === 0 ? `${name}, ${colour} ${fabric} saree` : `${name}, detail view`}
                width="900"
                height="1200"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchpriority={i === 0 ? 'high' : undefined}
                decoding="async"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button type="button" className="vel-gallery__arrow vel-gallery__arrow--prev d-none d-md-grid" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous image">
              <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" className="vel-gallery__arrow vel-gallery__arrow--next d-none d-md-grid" onClick={() => goTo(index + 1)} disabled={index === images.length - 1} aria-label="Next image">
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <p className="vel-gallery__dots d-md-none" aria-hidden="true">
              {images.map((src, i) => (
                <span key={src} className={i === index ? 'is-active' : ''} />
              ))}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
