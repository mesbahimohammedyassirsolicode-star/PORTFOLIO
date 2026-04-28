import { memo } from "react";
import Button from "./ui/Button";

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-30 md:pb-16">
      <div className="section-glow -top-10 -left-12" />
      <div className="section-glow right-0 bottom-0" />

      <div className="section grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 max-w-2xl text-center lg:text-left">
          <p className="reveal-fade-up inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] tracking-[0.2em] text-slate-300 sm:px-4 sm:text-xs sm:tracking-[0.24em]">
            AVAILABLE FOR INTERNSHIP
          </p>

          <h1 className="reveal-fade-up reveal-delay-1 mt-5 text-3xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            Mohammed <span className="hero-name">Yassir Mesbahi</span>
          </h1>

          <p className="reveal-fade-up reveal-delay-2 mt-4 text-sm text-slate-300 sm:mt-6 sm:text-lg md:text-xl">
            Full Stack Developer & Gestion Informatique
          </p>

          <p className="reveal-fade-up reveal-delay-3 mt-2.5 max-w-xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base md:text-lg">
            I build modern web applications with clean code and smart business logic.
          </p>

          <div className="reveal-fade-up reveal-delay-4 mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3 lg:justify-start">
            <Button as="a" href="#projects">
              View Projects
            </Button>
            <Button as="a" href="/Mohammed-Yassir-Mesbahi-CV.pdf" variant="secondary">
              Download CV
            </Button>
          </div>
        </div>

        <div className="reveal-fade-up reveal-delay-2 relative z-10 mx-auto w-full max-w-[420px]">
          <div className="glass gradient-border p-5 sm:p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Core Focus</p>
            <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">Modern Products. Business Logic.</h3>

            <div className="mt-4 space-y-3 sm:mt-5">
              {["Responsive React UI", "RESTful Backend Thinking", "Maintainable Code Architecture"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-slate-200 sm:text-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 p-3 text-[11px] text-slate-300 sm:mt-6 sm:p-4 sm:text-xs">
{`const developer = {
  role: "full stack developer",
  quality: "clean code",
  mindset: "smart business logic",
};`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
