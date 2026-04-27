import { memo, useCallback, useState } from "react";
import { navItems } from "../data/portfolioData";
import useAnimationBudget from "../hooks/useAnimationBudget";

function Navbar({ activeSection, onSectionChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { shouldLimitMotion } = useAnimationBudget();

  const handleScroll = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    onSectionChange?.(sectionId);
    const y = element.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: y, behavior: shouldLimitMotion ? "auto" : "smooth" });
    setIsMenuOpen(false);
  }, [onSectionChange, shouldLimitMotion]);

  return (
    <header className="sticky top-0 z-40 py-2.5 sm:py-3.5">
      <nav className="mx-auto flex w-[min(1120px,92vw)] items-center justify-between rounded-2xl border border-white/12 bg-slate-950/88 px-3 py-2.5 shadow-[0_10px_26px_rgba(2,6,23,0.34)] supports-[backdrop-filter]:bg-slate-950/72 supports-[backdrop-filter]:backdrop-blur-md sm:px-5 sm:py-3">
        <button
          className="cursor-pointer border-0 bg-transparent text-sm font-semibold tracking-[0.16em] text-white sm:text-base sm:tracking-[0.18em]"
          onClick={() => handleScroll("home")}
        >
          MY<span className="brand-accent">M</span>
        </button>

        <div className="hidden flex-wrap gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`relative rounded-lg border border-transparent px-3.5 py-2 text-sm transition ${
                activeSection === item.id
                  ? "nav-link-active"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => handleScroll(item.id)}
            >
              {activeSection === item.id ? (
                <span
                  className="absolute inset-x-2 -bottom-[3px] h-[2px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--accent-from), var(--accent-mid), var(--accent-to))",
                  }}
                />
              ) : null}
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-slate-200 transition hover:border-white/40 hover:bg-white/10 md:hidden"
          onClick={() => setIsMenuOpen((previousValue) => !previousValue)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="text-lg leading-none">{isMenuOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      {isMenuOpen ? (
        <div className="mx-auto mt-2 flex w-[min(1120px,92vw)] flex-col gap-1 rounded-2xl border border-white/12 bg-slate-950/95 p-2 shadow-xl supports-[backdrop-filter]:bg-slate-950/86 supports-[backdrop-filter]:backdrop-blur-md md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`rounded-lg px-3 py-2.5 text-left text-sm transition ${
                activeSection === item.id
                  ? "nav-link-active"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => handleScroll(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export default memo(Navbar);
