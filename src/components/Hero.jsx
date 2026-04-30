import { memo } from "react";
import Button from "./ui/Button";

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
      <div className="section-glow -top-16 -left-16 opacity-50" />
      <div className="section-glow right-0 bottom-0 opacity-30" />

      <div className="section grid items-center gap-12 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="relative z-10 max-w-2xl text-center lg:text-left">
          <div className="reveal-fade-up inline-flex items-center gap-2.5 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-2 text-[10px] tracking-[0.22em] text-violet-200 sm:px-5 sm:text-xs sm:tracking-[0.24em] shadow-[0_0_20px_rgba(139,92,246,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400"></span>
            </span>
            AVAILABLE FOR INTERNSHIP
          </div>

          <h1 className="reveal-fade-up reveal-delay-1 mt-7 text-4xl font-bold tracking-[-0.03em] leading-[1.08] text-white sm:mt-8 sm:text-5xl md:text-[4.25rem]">
            Mohammed <br className="hidden sm:block" /><span className="hero-name">Yassir Mesbahi</span>
          </h1>

          <p className="reveal-fade-up reveal-delay-2 mt-5 text-base font-medium text-slate-300/90 sm:mt-6 sm:text-lg md:text-xl tracking-[-0.01em]">
            Full Stack Developer & Gestion Informatique
          </p>

          <p className="reveal-fade-up reveal-delay-3 mt-4 max-w-xl text-sm leading-relaxed text-slate-400/80 sm:mt-5 sm:text-base md:text-lg mx-auto lg:mx-0">
            I build modern web applications with clean code and smart business logic.
          </p>

          <div className="reveal-fade-up reveal-delay-4 mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4 lg:justify-start">
            <Button as="a" href="#projects">
              View Projects
            </Button>
            <Button as="a" href="/Mohammed-Yassir-Mesbahi-CV.pdf" variant="secondary">
              Download CV
            </Button>
          </div>
        </div>

        <div className="reveal-fade-up reveal-delay-2 relative z-10 mx-auto w-full max-w-[420px]">
          <div className="glass gradient-border p-6 sm:p-7 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-violet-400/90">Core Focus</p>
            <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">Modern Products. Business Logic.</h3>

            <div className="mt-6 space-y-3 sm:mt-7">
              {["Responsive React UI", "RESTful Backend Thinking", "Maintainable Code Architecture"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-xs text-slate-200/90 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] hover:translate-x-1 sm:text-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            <pre className="mt-7 overflow-x-auto rounded-xl border border-white/[0.04] bg-[#080f1e] p-4 text-[12px] leading-loose shadow-inner sm:mt-8 sm:p-5 sm:text-[13px] font-mono">
<code><span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> <span className="text-white">=</span> {'{'}
  <span className="text-violet-300">role</span>: <span className="text-emerald-300">"full stack developer"</span>,
  <span className="text-violet-300">quality</span>: <span className="text-emerald-300">"clean code"</span>,
  <span className="text-violet-300">mindset</span>: <span className="text-emerald-300">"smart business logic"</span>,
{'}'};</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
