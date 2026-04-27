import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Skills from "./components/Skills";
import Tools from "./components/Tools";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SectionDivider from "./components/SectionDivider";

function App() {
  const sectionIds = useMemo(
    () => ["home", "about", "technologies", "skills", "tools", "projects", "contact"],
    []
  );
  const [activeSection, setActiveSection] = useState("home");
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

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
    <div className="relative min-h-screen overflow-x-clip">
      <motion.div
        className="progress-bar fixed top-0 left-0 z-50 h-1 w-full origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="pointer-events-none fixed -right-24 -top-28 z-0 hidden h-80 w-80 rounded-full bg-violet-600/30 blur-[90px] sm:block" />
      <div className="pointer-events-none fixed -bottom-24 -left-20 z-0 hidden h-72 w-72 rounded-full bg-indigo-500/20 blur-[90px] sm:block" />
      <div className="bg-grid" />
      <Navbar activeSection={activeSection} sectionIds={sectionIds} />
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