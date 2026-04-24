import { motion } from "framer-motion";
import { projects } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionTitle
        eyebrow="Projects"
        title="Selected work focused on real-world utility."
        subtitle="Each project is designed around practical value, maintainability, and smooth user interactions."
      />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="project-card glass"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(59, 130, 246, 0.2)" }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}