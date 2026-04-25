import { motion } from "framer-motion";

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    show: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: "easeOut" },
    }),
  };

  return (
    <section id="home" className="section flex min-h-[calc(100vh-110px)] flex-col justify-center gap-4">
      <motion.span
        className="w-fit rounded-full border border-violet-300/35 bg-violet-500/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-violet-200"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.1}
      >
        Available for freelance & collaborations
      </motion.span>
      <motion.h1
        className="max-w-[15ch] text-4xl leading-[1.06] font-bold text-white sm:text-5xl lg:text-7xl"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.2}
      >
        Mohammed Yassir Mesbahi
      </motion.h1>

      <motion.p
        className="m-0 text-lg font-medium text-slate-300 lg:text-2xl"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.35}
      >
        Full-Stack Developer & AI Automation Enthusiast
      </motion.p>

      <motion.p
        className="m-0 max-w-3xl leading-8 text-slate-400"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.45}
      >
        Étudiant en 1ère année à Solicode et technicien en gestion informatisée,
        passionné par le développement web, les systèmes de gestion et les
        automatisations avec l’intelligence artificielle.
      </motion.p>

      <motion.div
        className="mt-2 flex flex-wrap gap-3"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.55}
      >
        <a href="#projects" className="btn-primary">
          View Projects
        </a>
        <a href="#contact" className="btn-ghost">
          Contact
        </a>
      </motion.div>
    </section>
  );
}