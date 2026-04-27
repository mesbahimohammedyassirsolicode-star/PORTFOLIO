import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
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
  const themeOptions = useMemo(
    () => [
      { id: "violet", label: "Violet", dotClass: "bg-violet-500" },
      { id: "blue", label: "Blue", dotClass: "bg-blue-500" },
      { id: "emerald", label: "Emerald", dotClass: "bg-emerald-500" },
    ],
    []
  );
  const sectionIds = useMemo(
    () => ["home", "about", "technologies", "skills", "tools", "projects", "contact"],
    []
  );
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState("violet");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 24, mass: 0.6 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 24, mass: 0.6 });

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = (event) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (isMobile || shouldReduceMotion) {
      return undefined;
    }

    const onMouseMove = (event) => {
      cursorX.set(event.clientX - 170);
      cursorY.set(event.clientY - 170);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [cursorX, cursorY, isMobile, shouldReduceMotion]);

  return (
    <div className={`relative min-h-screen overflow-x-clip theme-${theme}`}>
      <motion.div
        className="progress-bar fixed top-0 left-0 z-50 h-1 w-full origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      {!isMobile && !shouldReduceMotion ? (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-0 h-[340px] w-[340px] rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/20 blur-[70px]"
          style={{ x: springX, y: springY }}
        />
      ) : null}
      <div className="pointer-events-none fixed -right-24 -top-28 z-0 hidden h-96 w-96 rounded-full bg-violet-600/45 blur-[95px] sm:block" />
      <div className="pointer-events-none fixed -bottom-24 -left-20 z-0 hidden h-80 w-80 rounded-full bg-blue-500/45 blur-[90px] sm:block" />
      <div className="bg-grid" />
      <motion.div
        className="fixed right-3 bottom-3 z-40 rounded-2xl border border-white/15 bg-slate-950/75 p-2 sm:right-4 sm:bottom-4 sm:p-2.5 backdrop-blur-xl"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0.2 } : { duration: 0.35 }}
      >
        <div className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-slate-300 uppercase">
          Accent
        </div>
        <div className="flex items-center gap-2">
          {themeOptions.map((themeOption) => (
            <motion.button
              key={themeOption.id}
              type="button"
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${
                theme === themeOption.id
                  ? "scale-110 border-white/70 bg-white/10"
                  : "border-white/20 hover:border-white/45"
              }`}
              onClick={() => setTheme(themeOption.id)}
              aria-label={`Switch to ${themeOption.label} accent`}
              whileTap={{ scale: 0.92 }}
            >
              <span className={`h-4 w-4 rounded-full ${themeOption.dotClass}`} />
            </motion.button>
          ))}
        </div>
      </motion.div>
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