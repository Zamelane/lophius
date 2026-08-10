import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <HashRouter>
      <div className="app">
        <header className="app__header">
          <h1 className="app__brand">Lophius</h1>
          <nav className="app__nav" aria-label="Extension pages">
            <NavLink className="app__nav-link" to="/" end>
              Home
            </NavLink>
            <NavLink className="app__nav-link" to="/settings">
              Settings
            </NavLink>
          </nav>
        </header>

        <main className="app__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
