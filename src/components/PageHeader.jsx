export default function PageHeader({ title, intro, children }) {
  return (
    <header className="vel-pagehead">
      <div className="container-xl">
        <h1 className="vel-h1">{title}</h1>
        {intro && <p className="vel-pagehead__intro">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
