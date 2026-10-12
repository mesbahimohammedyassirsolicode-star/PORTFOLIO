import { memo } from "react";
import { navItems } from "../data/portfolioData";

const GITHUB = 'https://github.com/mesbahimohammedyassirsolicode-star';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector('header.top');
  const offset = (header ? header.offsetHeight : 68) + 1;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
};

function Footer({ t }) {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <img className="footer-brand__logo" src="/MYM-logo.png" alt="MYM" width="2172" height="724" />
            <p className="footer-brand__tag">Mohammed Yassir Mesbahi — {t('hero_role')}</p>
          </div>

          <nav aria-label={t('foot_nav')}>
            <p className="mono" style={{ marginBottom: '.75rem' }}>{t('foot_nav')}</p>
            <ul className="footer-links">
              {navItems.map(({ id, key }) => (
                <li key={id}>
                  <button type="button" onClick={() => scrollToSection(id)}>{t(key)}</button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-meta">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {t('top')} ↑
            </button>
          </div>
        </div>

        <div className="footer-legal">
          <span>© {new Date().getFullYear()} Mohammed Yassir Mesbahi — {t('foot_rights')}</span>
          <span>{t('foot_version')}</span>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);