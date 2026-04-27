import { useEffect, useMemo, useState } from "react";
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
import useSmoothWheelScroll from "./hooks/useSmoothWheelScroll";

function App() {
  const sectionIds = useMemo(
    () => ["home", "about", "technologies", "skills", "tools", "projects", "contact"],
    []
  );
  const [activeSection, setActiveSection] = useState("home");
  const { shouldLimitMotion } = useAnimationBudget();
  useSmoothWheelScroll({ enabled: !shouldLimitMotion });

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section) => section instanceof HTMLElement);
    if (!sections.length) {
      return undefined;
    }

    const getCurrentSection = () => {
      const headerElement = document.querySelector("header");
      const headerHeight = headerElement instanceof HTMLElement ? headerElement.offsetHeight : 84;
      const viewportAnchor = window.scrollY + headerHeight + 100;

      let currentSectionId = sections[0].id;
      for (const section of sections) {
        if (viewportAnchor >= section.offsetTop) {
          currentSectionId = section.id;
        } else {
          break;
        }
      }

      return currentSectionId;
    };

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentSectionId = getCurrentSection();
        setActiveSection((previousSection) =>
          previousSection === currentSectionId ? previousSection : currentSectionId
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {shouldLimitMotion ? null : (
        <>
          <div className="pointer-events-none fixed -right-24 -top-28 z-0 hidden h-80 w-80 rounded-full bg-violet-600/18 blur-3xl lg:block" />
          <div className="pointer-events-none fixed -bottom-24 -left-20 z-0 hidden h-72 w-72 rounded-full bg-indigo-500/14 blur-3xl lg:block" />
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
