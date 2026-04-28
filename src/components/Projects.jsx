import { memo } from "react";
import { projects } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";
import useAnimationBudget from "../hooks/useAnimationBudget";

const SAFE_EXTERNAL_URL = /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+(?:[/?#].*)?$/i;

const getSafeExternalUrl = (url) => (SAFE_EXTERNAL_URL.test(url) ? url : "#");

function Projects() {
  const { shouldLimitMotion } = useAnimationBudget();
  const revealDelayClass = ["", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];

  return (
    <SectionShell id="projects" amount={0.2}>
      <SectionTitle
        eyebrow="Projects"
        title="Featured Projects"
        subtitle="A selection of projects focused on usability, clean architecture, and measurable value."
      />
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <GlassCard
            key={project.title}
            className={`project-card-hover group overflow-hidden p-0 reveal-fade-up ${revealDelayClass[index % revealDelayClass.length]}`.trim()}
            data-index={index}
            data-limit-motion={shouldLimitMotion ? "true" : "false"}
          >
            <div className="relative h-48 overflow-hidden sm:h-52">
              <picture>
                <source srcSet={project.imageWebp} type="image/webp" />
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  width="640"
                  height="360"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.015]"
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
                  sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 30vw"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-200 group-hover:text-violet-100 sm:text-xl">{project.title}</h3>
              <p className="line-clamp-3 text-sm leading-6 text-slate-300 sm:leading-7">{project.description}</p>
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
                  href={getSafeExternalUrl(project.demoUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-4 py-2 text-xs"
                >
                  Live Demo
                </a>
                <a
                  href={getSafeExternalUrl(project.githubUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-4 py-2 text-xs"
                >
                  GitHub
                </a>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionShell>
  );
}

export default memo(Projects);
