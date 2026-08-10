import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section className="page">
      <h2 className="page__title">Home</h2>
      <p className="page__text">
        Minimal popup shell. Use the nav above or continue to settings.
      </p>
      <Link className="page__link" to="/settings">
        Go to Settings
      </Link>
    </section>
  );
}
