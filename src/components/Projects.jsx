import { motion } from "framer-motion";
import { projects } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";

export default function Projects() {
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
    <SectionShell id="projects" amount={0.2}>
      <SectionTitle
        eyebrow="Projects"
        title="Featured Projects"
        subtitle="A selection of projects focused on usability, clean architecture, and measurable value."
      />
      <motion.div
        className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {projects.map((project, index) => (
          <GlassCard
            key={project.title}
            className="group overflow-hidden p-0"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: index * 0.04 }}
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                width="640"
                height="360"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">{project.title}</h3>
              <p className="text-sm leading-6 text-slate-300 sm:leading-7">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary px-4 py-2 text-xs"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost px-4 py-2 text-xs"
                >
                  GitHub
                </a>
              </div>
            </div>
          </GlassCard>
        ))}
      </motion.div>
    </SectionShell>
  );
}