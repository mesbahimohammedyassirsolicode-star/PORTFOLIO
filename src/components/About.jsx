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
      <GlassCard className="reveal-fade-up reveal-delay-1 p-5 sm:p-8">
        <div className="space-y-4">
          <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            I am Mohammed Yassir Mesbahi, a student at Solicode specializing in web development and Gestion Informatique, with a growing foundation in HTML, CSS, JavaScript, and PHP.
          </p>
          <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            I enjoy building modern applications where clean frontend interfaces connect with strong backend logic, with a strong focus on business and management systems that simplify workflows and improve efficiency.
          </p>
        </div>
      </GlassCard>
    </SectionShell>
  );
}

export default memo(About);