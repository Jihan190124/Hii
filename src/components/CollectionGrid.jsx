import { Link } from 'react-router-dom';

// Large editorial tiles, alternately offset on wide screens for an unhurried rhythm.
export default function CollectionGrid({ collections }) {
  return (
    <ul className="row g-3 g-lg-4 vel-collections">
      {collections.map((c, i) => (
        <li key={c.slug} className={`col-12 col-md-6 col-lg-3 ${i % 2 ? 'mt-lg-5' : ''}`}>
          <div>
            <Link to={`/collections/${c.slug}`} className="vel-tile">
              <img src={c.image} alt={c.imageAlt} width="800" height="1000" loading="lazy" decoding="async" />
              <span className="vel-tile__body">
                <span className="vel-tile__title">{c.name}</span>
                <span className="vel-tile__desc">{c.description}</span>
                <span className="vel-tile__cta">Explore {c.name}</span>
              </span>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
