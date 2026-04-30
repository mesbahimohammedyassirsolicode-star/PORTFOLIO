import { memo } from "react";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";

function About() {
  return (
    <SectionShell id="about" amount={0.25}>
      <SectionTitle
        eyebrow="About"
        title="About Me"
        subtitle="Focused on building practical systems that connect user experience with reliable logic."
      />
      <GlassCard className="reveal-fade-up reveal-delay-1 relative overflow-hidden p-7 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-36 -top-36 h-72 w-72 rounded-full bg-pink-500/[0.06] blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-36 -left-36 h-72 w-72 rounded-full bg-indigo-500/[0.06] blur-[80px]" />
        
        <div className="relative z-10 space-y-6">
          <p className="text-base font-normal leading-[1.8] text-slate-200/90 sm:text-lg sm:leading-[1.85] tracking-[-0.01em]">
            I am Mohammed Yassir Mesbahi, a student at Solicode specializing in web development and Gestion Informatique, with a growing foundation in HTML, CSS, JavaScript, and PHP.
          </p>
          <p className="text-base font-normal leading-[1.8] text-slate-300/80 sm:text-lg sm:leading-[1.85] tracking-[-0.01em]">
            I enjoy building modern applications where clean frontend interfaces connect with strong backend logic, with a strong focus on business and management systems that simplify workflows and improve efficiency.
          </p>
        </div>
      </GlassCard>
    </SectionShell>
  );
}

export default memo(About);