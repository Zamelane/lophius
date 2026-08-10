import { Link } from 'react-router-dom';

export function SettingsPage() {
  return (
    <section className="page">
      <h2 className="page__title">Settings</h2>
      <p className="page__text">
        Placeholder settings page. Add form state and chrome.storage here later.
      </p>
      <Link className="page__link" to="/">
        Back to Home
      </Link>
    </section>
  );
}
