import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { LilyMark } from '../components/Logo.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { IMAGES } from '../data/images.js';

export default function OurStory() {
  usePageTitle('Our Story');
  return (
    <>
      <header className="vel-pagehead vel-pagehead--story">
        <div className="container-xl">
          <h1 className="vel-h1 vel-h1--xl">Elegance, in full bloom.</h1>
        </div>
      </header>

      <section className="vel-section vel-section--flush">
        <div className="container-xl">
          <div className="row g-4 g-lg-5 align-items-start">
            <div className="col-12 col-lg-6">
              <Reveal>
                <img className="vel-story-img" src={IMAGES.ourStory.src} alt={IMAGES.ourStory.alt} width="1000" height="1300" loading="lazy" />
              </Reveal>
            </div>
            <div className="col-12 col-lg-5 offset-lg-1">
              <Reveal delay={0.1} className="vel-prose">
                <p className="vel-prose__lead">
                  VEL is a contemporary saree label inspired by the quiet elegance of the lily, a flower that needs no
                  embellishment to be remembered.
                </p>
                <p>
                  We think of the saree as an art of draping: one length of cloth, arranged by hand and made personal by
                  the person who wears it. Our eye is drawn to simplicity, to the richness of Indian textiles, and to the
                  moments that make every drape meaningful.
                </p>
                <p>
                  The lily appears here lightly, as a line in a border or a mark on a page, never as decoration for its
                  own sake.
                </p>
                <p className="vel-note">Founder note and studio story: to be added by the VEL team.</p>
                <Link to="/shop" className="vel-btn">Explore the collection</Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="vel-statement vel-statement--pink" aria-label="Quote">
        <Reveal className="container-xl">
          <LilyMark size={30} className="vel-statement__mark" />
          <p className="vel-statement__text">Some things never go out of bloom.</p>
        </Reveal>
      </section>

      <section className="vel-section">
        <div className="container-xl">
          <ul className="row g-4 vel-values">
            <li className="col-12 col-md-4">
              <h2 className="vel-h3">Simplicity</h2>
              <p>Clean lines and calm colour, so the drape does the talking.</p>
            </li>
            <li className="col-12 col-md-4">
              <h2 className="vel-h3">Textiles</h2>
              <p>An appreciation for organza, chanderi, linen and silk blends, chosen for how they fall.</p>
            </li>
            <li className="col-12 col-md-4">
              <h2 className="vel-h3">Meaning</h2>
              <p>Sarees for weddings, festivals, evenings and ordinary days that deserve a little ceremony.</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
