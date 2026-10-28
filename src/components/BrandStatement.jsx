import { LilyMark } from './Logo.jsx';

export default function BrandStatement() {
  return (
    <section className="vel-statement" aria-label="Brand statement">
      <div className="container-xl">
        <LilyMark size={34} className="vel-statement__mark" />
        <p className="vel-statement__text">Some things never go out of bloom.</p>
      </div>
    </section>
  );
}
