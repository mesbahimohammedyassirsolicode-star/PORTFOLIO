import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Stack from "./components/Stack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { i18n, navItems } from "./data/portfolioData";
import useAnimationBudget from "./hooks/useAnimationBudget";
import useSpotlight from "./hooks/useSpotlight";

const SECTION_IDS = navItems.map((n) => n.id); // ['home','about','stack','projects','contact']

function App() {
  const [lang, setLangState] = useState(() => localStorage.getItem("lang") || "en");
  const [theme, setThemeState] = useState(() => localStorage.getItem("theme") || "system");
  const [activeSection, setActiveSection] = useState("home");

  // Translation helper
  const t = useCallback(
    (key) => i18n[lang]?.[key] ?? i18n.en[key] ?? key,
    [lang]
  );

  const { shouldLimitMotion } = useAnimationBudget();
  useSpotlight();

  // Motion capability gate: touch, low-power and reduced-motion all get the flat reveal
  useEffect(() => {
    document.documentElement.dataset.motion = shouldLimitMotion ? "flat" : "3d";
  }, [shouldLimitMotion]);

  // Apply language
  const handleLangChange = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.setAttribute("lang", newLang);
  };

  // Apply theme
  const applyTheme = useCallback((pref) => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const dark = pref === "dark" || (pref === "system" && mq.matches);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const handleThemeChange = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if ((localStorage.getItem("theme") || "system") === "system") applyTheme("system");
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [applyTheme]);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  // Reveal animation via IntersectionObserver
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const rv = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            rv.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => rv.observe(el));
    return () => rv.disconnect();
  }, []);

  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>

      <Navbar
        activeSection={activeSection}
        lang={lang}
        onLangChange={handleLangChange}
        theme={theme}
        onThemeChange={handleThemeChange}
        t={t}
      />

      <main id="main">
        <Hero t={t} />
        <About t={t} />
        <Stack t={t} />
        <Projects t={t} />
        <Contact t={t} />
      </main>

      <footer>
        <div className="wrap">
          <p>© {new Date().getFullYear()} Mohammed Yassir Mesbahi · Solicode Tangier · Startup MYM</p>
          <a href="#home">{t('top')}</a>
        </div>
      </footer>
    </>
  );
}

export default App;
