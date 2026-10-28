import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

export default function NotFound({ title = 'This page could not be found', text = 'The link may be mistyped or the page may have moved.' }) {
  usePageTitle('Page not found');
  return (
    <section className="vel-section">
      <div className="container-xl">
        <EmptyState title={title} text={text}>
          <Link to="/shop" className="vel-btn">Browse the shop</Link>
          <Link to="/" className="vel-btn vel-btn--ghost">Back to home</Link>
        </EmptyState>
      </div>
    </section>
  );
}
