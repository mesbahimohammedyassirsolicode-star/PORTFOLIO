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
        className="p-6 sm:p-8"
        variants={itemVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="space-y-4">
          <p className="leading-8 text-slate-300">
            I am Mohammed Yassir Mesbahi, a student at Solicode with a growing
            foundation in web development using HTML, CSS, JavaScript, and PHP.
          </p>
          <p className="leading-8 text-slate-300">
            I enjoy building modern applications where clean frontend interfaces
            connect with strong backend logic, especially for business and
            management systems that make workflows simpler and more efficient.
          </p>
        </div>
      </GlassCard>
    </SectionShell>
  );
}