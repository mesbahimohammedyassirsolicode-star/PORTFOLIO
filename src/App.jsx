import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Stack from "./components/Stack";
import Tools from "./components/Tools";
import Solid from "./components/Solid";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Intro from "./components/Intro";
import { i18n, navItems } from "./data/portfolioData";
import useAnimationBudget from "./hooks/useAnimationBudget";
import useSpotlight from "./hooks/useSpotlight";

const SECTION_IDS = navItems.map((n) => n.id);

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
  const [activeSection, setActiveSection] = useState('home');
  const [introDone, setIntroDone] = useState(false);

  const t = useCallback((key) => i18n[lang]?.[key] ?? i18n.en[key] ?? key, [lang]);

  const { shouldLimitMotion } = useAnimationBudget();
  useSpotlight();

  useEffect(() => {
    document.documentElement.dataset.motion = shouldLimitMotion ? 'flat' : '3d';
    document.documentElement.classList.add('dark');
  }, [shouldLimitMotion]);

  const handleLangChange = useCallback((newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  // Reveal-on-scroll for any .reveal nodes added later (e.g. project filter swaps)
  useEffect(() => {
    const revealAll = () => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    if (!('IntersectionObserver' in window)) { revealAll(); return undefined; }
    const rv = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); rv.unobserve(entry.target); }
      }),
      { threshold: 0.12 }
    );
    const observePending = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => rv.observe(el));
    observePending();
    const mo = new MutationObserver(observePending);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { rv.disconnect(); mo.disconnect(); };
  }, []);

  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>

      <Intro onFinish={() => setIntroDone(true)} />
      <ScrollProgress />

      <Navbar
        activeSection={activeSection}
        lang={lang}
        onLangChange={handleLangChange}
        t={t}
      />

      <main id="main">
        <Hero t={t} start={introDone} />
        <About t={t} />
        <Stack t={t} />
        <Tools t={t} />
        <Solid t={t} />
        <Process t={t} />
        <Projects t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />
    </>
  );
}

export default App;