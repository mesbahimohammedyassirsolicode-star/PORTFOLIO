import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function About() {
  return (
    <section id="about" className="section">
      <SectionTitle
        eyebrow="About"
        title="Building practical digital products with clean engineering."
        subtitle="I focus on maintainable architecture, purposeful user experience, and automation that saves real time."
      />
      <motion.div
        className="about-card glass"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65 }}
      >
        <p>
          I am Mohammed Yassir Mesbahi, a full-stack developer in training with
          a strong foundation in computerized management. I combine frontend
          precision and backend structure to build systems that are reliable,
          scalable, and user-friendly.
        </p>
        <p>
          My approach is simple: design clean interfaces, build robust logic,
          and use AI automation to improve delivery speed and product quality.
          I enjoy working on projects that turn complex workflows into clear,
          efficient digital experiences.
        </p>
      </motion.div>
    </section>
  );
}