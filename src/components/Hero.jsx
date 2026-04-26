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
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-22">
      <div className="section-glow -top-10 -left-12" />
      <div className="section-glow right-0 bottom-0" />

      <div className="section grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-2xl"
        >
          <motion.p variants={item} className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs tracking-[0.24em] text-slate-300">
            AVAILABLE FOR INTERNSHIP
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl"
          >
            Mohammed <span className="hero-name">Yassir Mesbahi</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-lg text-slate-300 md:text-xl">
            Full Stack Developer & Gestion Informatique
          </motion.p>

          <motion.p variants={item} className="mt-3 text-base text-slate-400 md:text-lg">
            I build modern web applications with clean code and smart business logic.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap gap-3"
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
          <div className="glass gradient-border p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Core Focus</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Modern Products. Business Logic.</h3>

            <div className="mt-5 space-y-3">
              {["Responsive React UI", "RESTful Backend Thinking", "Maintainable Code Architecture"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>

            <pre className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/80 p-4 text-xs text-slate-300">
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