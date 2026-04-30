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
    <header className="sticky top-0 z-40 py-3 sm:py-4">
      <nav className={`mx-auto flex w-[min(1100px,90vw)] items-center justify-between rounded-2xl border border-white/[0.06] bg-slate-950/70 px-5 py-3 shadow-[0_4px_24px_rgba(2,6,23,0.4),0_1px_2px_rgba(0,0,0,0.3)] sm:px-7 sm:py-3.5 ${shouldLimitMotion ? "" : "supports-[backdrop-filter]:bg-slate-950/50 supports-[backdrop-filter]:backdrop-blur-2xl"}`}>
        <button
          className="cursor-pointer rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-sm font-semibold tracking-[0.16em] text-white transition-all duration-200 sm:text-base sm:tracking-[0.18em] nav-link-hover"
          onClick={() => handleScroll("home")}
        >
          MY<span className="brand-accent">M</span>
        </button>

        <div className="hidden flex-wrap gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link-hover relative rounded-lg border border-transparent px-3.5 py-2 text-[13px] font-medium transition ${
                activeSection === item.id
                  ? "nav-link-active"
                  : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] text-slate-300 transition-all duration-200 hover:border-white/[0.2] hover:bg-white/[0.06] md:hidden"
          onClick={() => setIsMenuOpen((previousValue) => !previousValue)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="text-lg leading-none">{isMenuOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      {isMenuOpen ? (
        <div className={`mx-auto mt-2 flex w-[min(1100px,90vw)] flex-col gap-1 rounded-2xl border border-white/[0.06] bg-slate-950/95 p-2.5 shadow-[0_8px_32px_rgba(2,6,23,0.5)] md:hidden ${shouldLimitMotion ? "" : "supports-[backdrop-filter]:bg-slate-950/80 supports-[backdrop-filter]:backdrop-blur-xl"}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link-hover rounded-lg border border-transparent px-4 py-3 text-left text-sm font-medium transition ${
                activeSection === item.id
                  ? "nav-link-active"
                  : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
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
