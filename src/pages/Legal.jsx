import PageHeader from '../components/PageHeader.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

const COPY = {
  privacy: { title: 'Privacy Policy', what: 'how VEL collects, uses and protects personal information' },
  terms: { title: 'Terms', what: 'the terms on which VEL sells its sarees and operates this website' },
};

// Placeholder pages so footer links resolve. Replace with legal text reviewed for your business.
export default function Legal({ kind }) {
  const { title, what } = COPY[kind];
  usePageTitle(title);
  return (
    <>
      <PageHeader title={title} />
      <section className="vel-section vel-section--flush">
        <div className="container-xl">
          <div className="vel-prose">
            <p>This is a placeholder page. The final text will explain {what}.</p>
            <p className="vel-note">Replace this page with a {title.toLowerCase()} reviewed by a qualified professional before launch.</p>
          </div>
        </div>
      </section>
    </>
  );
}
