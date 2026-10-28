export default function SectionHeading({ title, intro, align = 'center', as: Tag = 'h2', className = '' }) {
  return (
    <header className={`vel-heading vel-heading--${align} ${className}`}>
      <Tag className="vel-h2">{title}</Tag>
      {intro && <p className="vel-heading__intro">{intro}</p>}
    </header>
  );
}
