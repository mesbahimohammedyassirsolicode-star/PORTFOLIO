import { memo } from "react";
import { ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";
import Button from "./ui/Button";

const softSkills = [
  {
    title: "Problem Solving",
    description: "Analyze challenges and turn complex issues into clear, practical solutions.",
  },
  {
    title: "Teamwork",
    description: "Collaborate effectively with teammates to achieve shared goals on time.",
  },
  {
    title: "Communication",
    description: "Explain ideas clearly and keep project discussions focused and productive.",
  },
  {
    title: "Adaptability",
    description: "Adjust quickly to new tools, feedback, and changing project requirements.",
  },
];

function Skills() {
  return (
    <SectionShell id="skills" amount={0.25}>
      <SectionTitle
        eyebrow="Skills"
        title="Skills"
        subtitle="Collaboration and personal strengths I bring to every project."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {softSkills.map((skill) => (
            <GlassCard
            key={skill.title}
            className="group relative overflow-hidden p-5 text-center sm:p-6 md:p-7"
          >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/[0.06] blur-2xl transition-all duration-500 group-hover:bg-pink-500/[0.15] group-hover:scale-150" />
            <div className="relative">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.03] text-lg font-bold text-white shadow-[0_0_24px_rgba(255,255,255,0.03)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_24px_rgba(236,72,153,0.12)]">
                {skill.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-white sm:text-lg group-hover:text-pink-300 transition-colors duration-300">{skill.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400/90">{skill.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button as="a" href="#tools" variant="secondary" className="gap-2">
          View Tools <ArrowRight size={16} />
        </Button>
      </div>
    </SectionShell>
  );
}

export default memo(Skills);
