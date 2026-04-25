import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "../data/portfolioData";

export default function Navbar({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const y = element.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 py-4">
      <nav className="mx-auto flex w-[min(1120px,92vw)] items-center justify-between rounded-2xl border border-white/15 bg-slate-950/65 px-4 py-3 backdrop-blur-xl">
        <motion.button
          className="cursor-pointer border-0 bg-transparent text-base font-bold tracking-[0.16em] text-white"
          onClick={() => handleScroll("home")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          M<span className="brand-accent">Y</span>M
        </motion.button>

        <div className="hidden flex-wrap gap-1 md:flex">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`rounded-lg border border-transparent px-3 py-1.5 text-sm transition ${
                activeSection === item.id
                    ? "nav-link-active"
                  : "text-slate-400 hover:bg-white/8 hover:text-white"
              }`}
              onClick={() => handleScroll(item.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-slate-200 transition hover:border-white/40 hover:bg-white/10 md:hidden"
          onClick={() => setIsMenuOpen((previousValue) => !previousValue)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="text-lg leading-none">{isMenuOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="mx-auto mt-2 flex w-[min(1120px,92vw)] flex-col gap-1 rounded-2xl border border-white/15 bg-slate-950/90 p-2 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                  activeSection === item.id
                    ? "nav-link-active"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => handleScroll(item.id)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
