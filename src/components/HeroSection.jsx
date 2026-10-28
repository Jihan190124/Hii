import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '../data/images.js';
import { SITE } from '../config/site.js';

// One orchestrated entrance: headline, supporting line and actions rise in sequence.
const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 0.61, 0.36, 1] },
});

export default function HeroSection() {
  const { hero } = IMAGES;
  return (
    <section className="vel-hero" aria-labelledby="hero-title">
      <img
        className="vel-hero__img"
        src={hero.src}
        alt={hero.alt}
        style={{ '--hero-pos': hero.position }}
        width="1600"
        height="1000"
        fetchpriority="high"
        decoding="async"
      />
      <div className="vel-hero__scrim" aria-hidden="true" />
      <div className="container-xl vel-hero__content">
        <motion.h1 id="hero-title" className="vel-hero__title" {...rise(0.1)}>
          {SITE.tagline}
        </motion.h1>
        <motion.p className="vel-hero__text" {...rise(0.3)}>
          Discover sarees that celebrate the beauty of every moment.
        </motion.p>
        <motion.div className="vel-hero__actions" {...rise(0.5)}>
          <Link to="/shop" className="vel-btn vel-btn--light">Discover the Collection</Link>
          <Link to="/our-story" className="vel-btn vel-btn--outline-light">Our Story</Link>
        </motion.div>
      </div>
    </section>
  );
}
