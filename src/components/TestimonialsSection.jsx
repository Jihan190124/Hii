import SectionHeading from './SectionHeading.jsx';
import { testimonials } from '../data/testimonials.js';

// Ready for real testimonials: edit src/data/testimonials.js. An empty array hides the section.
export default function TestimonialsSection({ items = testimonials }) {
  if (!items.length) return null;
  return (
    <section className="vel-section vel-testimonials" aria-label="Testimonials">
      <div className="container-xl">
        <SectionHeading
          title="In their words"
          intro="Sample content for development. Replace these placeholders with genuine customer testimonials before launch."
        />
        <ul className="row g-3 g-lg-4">
          {items.map((t, i) => (
            <li key={t.id} className="col-12 col-md-4">
              <div>
                <figure className="vel-quote">
                  <p className="vel-quote__flag">Sample testimonial</p>
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>{t.author}</figcaption>
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
