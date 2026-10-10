import { memo, useEffect, useState } from "react";
import { navItems } from "../data/portfolioData";
import { MymLogo } from "./MymLogo";

function Navbar({ activeSection, lang, onLangChange, theme, onThemeChange, t }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-based header frost
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isMenuOpen) { setIsMenuOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  // Close mobile menu on wide viewport
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const handler = (e) => { if (e.matches) setIsMenuOpen(false); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className={`top${scrolled ? ' scrolled' : ''}`} id="top">
      <div className="wrap bar">
        {/* Logo */}
        <button
          className="logo"
          onClick={() => scrollTo('home')}
          aria-label="MYM — back to top"
          style={{ background: 'none', border: 0 }}
        >
          <MymLogo height={38} />
        </button>

        {/* Desktop nav */}
        <nav className="desktop" aria-label="Main">
          {navItems.map(({ id, key }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              aria-current={activeSection === id ? 'location' : undefined}
              data-nav={id}
            >
              {t(key)}
            </button>
          ))}
        </nav>

        <div className="ctrls">
          {/* Language toggle */}
          <div className="seg" role="group" aria-label={t('lbl_lang')}>
            {['en', 'fr'].map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => onLangChange(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* 3-state theme toggle */}
          <div className="seg" role="group" aria-label={t('lbl_theme')}>
            <button
              type="button"
              data-theme-btn="light"
              aria-pressed={theme === 'light'}
              aria-label={t('theme_light')}
              title="Light"
              onClick={() => onThemeChange('light')}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
              </svg>
            </button>
            <button
              type="button"
              data-theme-btn="system"
              aria-pressed={theme === 'system'}
              aria-label={t('theme_system')}
              title="System"
              onClick={() => onThemeChange('system')}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="12" rx="2"/>
                <path d="M8 20h8M12 16v4"/>
              </svg>
            </button>
            <button
              type="button"
              data-theme-btn="dark"
              aria-pressed={theme === 'dark'}
              aria-label={t('theme_dark')}
              title="Dark"
              onClick={() => onThemeChange('dark')}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>
              </svg>
            </button>
          </div>

          {/* CV link (640px+) */}
          <a className="cv-link" href="/Mohammed-Yassir-Mesbahi-CV.pdf" download>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16"/>
            </svg>
            CV
          </a>

          {/* Hamburger */}
          <button
            className="menu-btn"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={t(isMenuOpen ? 'lbl_menu_close' : 'lbl_menu')}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isMenuOpen && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile">
          {navItems.map(({ id, key }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              aria-current={activeSection === id ? 'location' : undefined}
              data-nav={id}
            >
              {t(key)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export default memo(Navbar);
