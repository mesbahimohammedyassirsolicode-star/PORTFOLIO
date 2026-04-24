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
    <section id="home" className="hero section">
      <motion.span
        className="hero-chip"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.1}
      >
        Available for freelance & collaborations
      </motion.span>
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.2}
      >
        Mohammed Yassir Mesbahi
      </motion.h1>

      <motion.p
        className="hero-title"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.35}
      >
        Full-Stack Developer & AI Automation Enthusiast
      </motion.p>

      <motion.p
        className="hero-description"
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
        className="hero-actions"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.55}
      >
        <a href="#projects" className="btn btn-primary">
          View Projects
        </a>
        <a href="#contact" className="btn btn-ghost">
          Contact
        </a>
      </motion.div>
    </section>
  );
}