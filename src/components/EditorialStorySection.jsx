import { Link } from 'react-router-dom';
import { IMAGES } from '../data/images.js';

export default function EditorialStorySection() {
  return (
    <section className="vel-section vel-story" aria-labelledby="story-title">
      <div className="container-xl">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-12 col-lg-7">
            <div className="vel-story__images">
              <img className="vel-story__large" src={IMAGES.storyLarge.src} alt={IMAGES.storyLarge.alt} width="1000" height="1300" loading="lazy" decoding="async" />
              <img className="vel-story__small" src={IMAGES.storySmall.src} alt={IMAGES.storySmall.alt} width="700" height="900" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div>
              <h2 id="story-title" className="vel-h2 vel-story__title">The quiet elegance of the lily.</h2>
              <p className="vel-story__text">
                Inspired by the quiet elegance of the lily, VEL celebrates the beauty of simplicity, the richness of
                Indian textiles, and the moments that make every drape meaningful.
              </p>
              <Link to="/our-story" className="vel-link">Discover Our Story</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
