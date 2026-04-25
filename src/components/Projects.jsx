import { motion } from "framer-motion";
import { projects } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";

export default function Projects() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 22 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="projects"
      className="section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionTitle
        eyebrow="Projects"
        title="Selected work focused on real-world utility."
        subtitle="Each project is designed around practical value, maintainability, and smooth user interactions."
      />
      <motion.div className="grid grid-cols-1 gap-4 lg:grid-cols-2" variants={sectionVariants}>
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="glass p-6"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            whileHover={{
              y: -10,
              borderColor: "rgba(59, 130, 246, 0.45)",
              boxShadow: "0 30px 60px rgba(59, 130, 246, 0.2)",
            }}
          >
            <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
            <p className="text-slate-300">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-blue-200/30 bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}