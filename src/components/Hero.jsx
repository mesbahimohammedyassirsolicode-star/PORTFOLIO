import { motion } from "framer-motion";
import Button from "./ui/Button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-30 md:pb-16">
      <div className="section-glow -top-10 -left-12" />
      <div className="section-glow right-0 bottom-0" />

      <div className="section grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-2xl"
        >
          <motion.p variants={item} className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] tracking-[0.2em] text-slate-300 sm:px-4 sm:text-xs sm:tracking-[0.24em]">
            AVAILABLE FOR INTERNSHIP
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 text-3xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl"
          >
            Mohammed <span className="hero-name">Yassir Mesbahi</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-base text-slate-300 sm:mt-6 sm:text-lg md:text-xl">
            Full Stack Developer & Gestion Informatique
          </motion.p>

          <motion.p variants={item} className="mt-3 max-w-xl text-sm text-slate-400 sm:text-base md:text-lg">
            I build modern web applications with clean code and smart business logic.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.22 }}
          >
            <Button as="a" href="#projects">
              View Projects
            </Button>
            <Button as="a" href="/Mohammed-Yassir-Mesbahi-CV.pdf" variant="secondary">
              Download CV
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.22 }}
          className="relative z-10 mx-auto w-full max-w-[420px]"
        >
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
        </motion.div>
      </div>
    </section>
  );
}