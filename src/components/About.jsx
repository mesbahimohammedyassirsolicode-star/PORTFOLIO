import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function About() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="about"
      className="section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <SectionTitle
        eyebrow="About"
        title="Building practical digital products with clean engineering."
        subtitle="I focus on maintainable architecture, purposeful user experience, and automation that saves real time."
      />
      <motion.div
        className="glass space-y-4 p-6 sm:p-7"
        variants={itemVariants}
      >
        <p className="leading-8 text-slate-300">
          I am Mohammed Yassir Mesbahi, a full-stack developer in training with
          a strong foundation in computerized management. I combine frontend
          precision and backend structure to build systems that are reliable,
          scalable, and user-friendly.
        </p>
        <p className="leading-8 text-slate-300">
          My approach is simple: design clean interfaces, build robust logic,
          and use AI automation to improve delivery speed and product quality.
          I enjoy working on projects that turn complex workflows into clear,
          efficient digital experiences.
        </p>
      </motion.div>
    </motion.section>
  );
}