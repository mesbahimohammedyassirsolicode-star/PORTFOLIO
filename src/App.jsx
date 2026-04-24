import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  const sectionIds = useMemo(
    () => ["home", "about", "skills", "projects", "contact"],
    []
  );
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <div className="app-shell">
      <div className="bg-orb bg-orb-one" />
      <div className="bg-orb bg-orb-two" />
      <div className="bg-grid" />
      <Navbar activeSection={activeSection} sectionIds={sectionIds} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;