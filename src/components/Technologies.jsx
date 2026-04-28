import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { previewSkills } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";
import Button from "./ui/Button";

const badgeMap = {
  HTML: { label: "H", className: "bg-orange-500/15 text-orange-200 border-orange-300/30" },
  CSS: { label: "C", className: "bg-blue-500/15 text-blue-200 border-blue-300/30" },
  JavaScript: { label: "JS", className: "bg-amber-500/15 text-amber-200 border-amber-300/30" },
  PHP: { label: "P", className: "bg-indigo-500/15 text-indigo-200 border-indigo-300/30" },
  MySQL: { label: "M", className: "bg-cyan-500/15 text-cyan-200 border-cyan-300/30" },
};

function Technologies() {
  return (
    <SectionShell id="technologies" amount={0.25}>
      <SectionTitle
        eyebrow="Technologies"
        title="Technologies"
        subtitle="Core technologies I use to design, build, and maintain modern web applications."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {previewSkills.map((skill) => {
          return (
            <GlassCard
              key={skill}
              className="group relative overflow-hidden p-4 text-center sm:p-5 md:p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/15" />

              <div className="relative">
                <div className={`mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white/10 p-2 text-xs font-semibold ${badgeMap[skill]?.className ?? "text-violet-200"}`}>
                  {badgeMap[skill]?.label ?? skill.slice(0, 2).toUpperCase()}
                </div>

                <h3 className="mt-3 text-sm font-semibold text-white sm:text-base">{skill}</h3>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button as="a" href="#skills" variant="secondary" className="gap-2">
          View Skills <ArrowRight size={16} />
        </Button>
      </div>

    </SectionShell>
  );
}

export default memo(Technologies);
