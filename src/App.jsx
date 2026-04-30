import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Skills from "./components/Skills";
import Tools from "./components/Tools";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SectionDivider from "./components/SectionDivider";
import useAnimationBudget from "./hooks/useAnimationBudget";

const SECTION_IDS = ["home", "about", "technologies", "skills", "tools", "projects", "contact"];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const { shouldLimitMotion } = useAnimationBudget();

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((section) => section instanceof HTMLElement);
    if (!sections.length || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const visibleSections = new Map();
    let rafId = 0;
    const updateActiveSection = () => {
      const sortedByVisibility = [...visibleSections.entries()].sort((a, b) => b[1] - a[1]);
      if (!sortedByVisibility.length) {
        return;
      }
      const nextSectionId = sortedByVisibility[0][0];
      setActiveSection((previousSection) =>
        previousSection === nextSectionId ? previousSection : nextSectionId
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio <= 0) {
            visibleSections.delete(entry.target.id);
            return;
          }
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        });
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateActiveSection);
      },
      {
        root: null,
        rootMargin: "-12% 0px -38% 0px",
        threshold: [0, 0.1, 0.2, 0.35],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScrollBounds = () => {
      if (window.scrollY <= 4) {
        setActiveSection((previousSection) => (previousSection === "home" ? previousSection : "home"));
        return;
      }

      const documentHeight = document.documentElement.scrollHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      if (viewportBottom >= documentHeight - 6) {
        setActiveSection((previousSection) =>
          previousSection === "contact" ? previousSection : "contact"
        );
      }
    };

    window.addEventListener("scroll", handleScrollBounds, { passive: true });
    handleScrollBounds();

    return () => {
      window.removeEventListener("scroll", handleScrollBounds);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {shouldLimitMotion ? null : (
        <>
          <div className="pointer-events-none fixed -right-32 -top-32 z-0 hidden h-80 w-80 rounded-full bg-violet-600/10 blur-3xl lg:block" />
          <div className="pointer-events-none fixed -bottom-28 -left-24 z-0 hidden h-72 w-72 rounded-full bg-indigo-500/8 blur-3xl lg:block" />
          <div className="pointer-events-none fixed top-1/2 right-1/4 z-0 hidden h-48 w-48 rounded-full bg-pink-500/5 blur-3xl lg:block" />
          <div className="bg-grid" />
        </>
      )}
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Technologies />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Tools />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </div>
  );
}

export default App;
