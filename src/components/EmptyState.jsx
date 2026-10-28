import { LilyMark } from './Logo.jsx';

export default function EmptyState({ title, text, children }) {
  return (
    <div className="vel-empty" role="status">
      <LilyMark size={40} className="vel-empty__mark" />
      <h2 className="vel-empty__title">{title}</h2>
      {text && <p className="vel-empty__text">{text}</p>}
      {children && <div className="vel-empty__actions">{children}</div>}
    </div>
  );
}
