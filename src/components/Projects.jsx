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
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <GlassCard
            key={project.title}
            className={`project-card-hover group overflow-hidden p-0 reveal-fade-up ${revealDelayClass[index % revealDelayClass.length]}`.trim()}
            data-index={index}
            data-limit-motion={shouldLimitMotion ? "true" : "false"}
          >
            <div className="relative h-48 overflow-hidden sm:h-56">
              <picture>
                <source srcSet={project.imageWebp} type="image/webp" />
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  width="640"
                  height="360"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
                  sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 30vw"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />
            </div>
            <div className="p-5 sm:p-7 relative z-10">
              <h3 className="mb-2.5 text-xl font-semibold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-pink-300 sm:text-2xl">{project.title}</h3>
              <p className="text-sm leading-[1.7] text-slate-400/90 sm:leading-[1.75]">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-slate-300/90 backdrop-blur-md transition-all duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.08]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={getSafeExternalUrl(project.demoUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-interactive px-5 py-2.5 text-xs"
                >
                  Live Demo
                </a>
                <a
                  href={getSafeExternalUrl(project.githubUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost btn-interactive px-5 py-2.5 text-xs"
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
