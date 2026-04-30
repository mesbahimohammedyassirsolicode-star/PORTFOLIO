import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { previewSkills } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";
import Button from "./ui/Button";

const badgeMap = {
  HTML: { label: "H", className: "bg-orange-500/15 text-orange-200 border-orange-300/25" },
  CSS: { label: "C", className: "bg-blue-500/15 text-blue-200 border-blue-300/25" },
  JavaScript: { label: "JS", className: "bg-amber-500/15 text-amber-200 border-amber-300/25" },
  PHP: { label: "P", className: "bg-indigo-500/15 text-indigo-200 border-indigo-300/25" },
  MySQL: { label: "M", className: "bg-cyan-500/15 text-cyan-200 border-cyan-300/25" },
};

function Technologies() {
  return (
    <SectionShell id="technologies" amount={0.25}>
      <SectionTitle
        eyebrow="Technologies"
        title="Technologies"
        subtitle="Core technologies I use to design, build, and maintain modern web applications."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
        {previewSkills.map((skill) => {
          return (
            <GlassCard
              key={skill}
              className="group relative overflow-hidden p-5 text-center sm:p-6 md:p-7"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/[0.06] blur-2xl transition-all duration-500 group-hover:bg-indigo-500/[0.15] group-hover:scale-150" />

              <div className="relative">
                <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl border bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-2 text-lg font-bold shadow-[0_0_24px_rgba(255,255,255,0.03)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_24px_rgba(99,102,241,0.15)] ${badgeMap[skill]?.className ?? "text-indigo-200 border-white/10"}`}>
                  {badgeMap[skill]?.label ?? skill.slice(0, 2).toUpperCase()}
                </div>

                <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-white sm:text-lg transition-colors duration-300 group-hover:text-indigo-300">{skill}</h3>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button as="a" href="#skills" variant="secondary" className="gap-2">
          View Skills <ArrowRight size={16} />
        </Button>
      </div>

    </SectionShell>
  );
}

export default memo(Technologies);
