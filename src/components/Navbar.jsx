import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "../data/portfolioData";
import { EASE } from "../lib/motion";

// Shared scroll helper: jumps to the section minus the sticky header height.
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector('header.top');
  const offset = (header ? header.offsetHeight : 68) + 1;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

function Navbar({ activeSection, lang, onLangChange, t }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1040px)');
    const handler = (e) => { if (e.matches) setIsMenuOpen(false); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const go = useCallback((id) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  }, []);

  return (
    <>
      <header className={`top${scrolled ? ' scrolled' : ''}`} id="top">
        <div className="wrap bar">
          <a className="brand" href="/" onClick={(e) => { e.preventDefault(); go('home'); }} aria-label="MYM — back to top">
            <span className="brand__mark">
              <img src="/MYM-logo.png" alt="" width="2172" height="724" />
            </span>
            <span className="brand__text">
              <span className="brand__name">M. Y. Mesbahi</span>
              <span className="brand__role">Full-Stack Developer</span>
            </span>
          </a>

          <nav className="desktop" aria-label="Main">
            {navItems.map(({ id, key }) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                aria-current={activeSection === id ? 'true' : undefined}
              >
                {t(key)}
              </button>
            ))}
          </nav>

          <div className="ctrls">
            <div className="seg" role="group" aria-label={t('lbl_lang')}>
              {['en', 'fr'].map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => onLangChange(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <a className="nav-cta" href="#contact" onClick={(e) => { e.preventDefault(); go('contact'); }}>
              {t('nav_contact')}
            </a>

            <button
              className="menu-btn"
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={t(isMenuOpen ? 'lbl_menu_close' : 'lbl_menu')}
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {isMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {navItems.map(({ id, key }, i) => (
              <motion.button
                key={id}
                type="button"
                onClick={() => go(id)}
                aria-current={activeSection === id ? 'true' : undefined}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i, duration: 0.28, ease: EASE }}
              >
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                {t(key)}
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Navbar);