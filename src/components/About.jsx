import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";

export default function About() {
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <SectionShell id="about" amount={0.25}>
      <SectionTitle
        eyebrow="About"
        title="About Me"
        subtitle="Focused on building practical systems that connect user experience with reliable logic."
      />
      <GlassCard
        className="p-5 sm:p-8"
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
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