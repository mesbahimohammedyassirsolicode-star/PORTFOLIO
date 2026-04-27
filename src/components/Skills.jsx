import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";
import Button from "./ui/Button";

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

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

export default function Skills() {
  return (
    <SectionShell id="skills" amount={0.25}>
      <SectionTitle
        eyebrow="Skills"
        title="Skills"
        subtitle="Collaboration and personal strengths I bring to every project."
      />

      <motion.div
        className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09 } },
        }}
      >
        {softSkills.map((skill) => (
          <GlassCard
            key={skill.title}
            className="group relative overflow-hidden p-4 text-center sm:p-5 md:p-6"
            variants={cardVariants}
            whileHover={{
              scale: 1.04,
              y: -8,
              boxShadow: "0 0 0 1px rgba(167, 139, 250, 0.55), 0 30px 68px rgba(2, 6, 23, 0.7)",
            }}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/20" />
            <div className="relative">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white/10 text-sm font-semibold text-violet-200">
                {skill.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white sm:text-base">{skill.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{skill.description}</p>
            </div>
          </GlassCard>
        ))}
      </motion.div>
      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45 }}
      >
        <Button as="a" href="#tools" variant="secondary" className="gap-2">
          View Tools <ArrowRight size={16} />
        </Button>
      </motion.div>
    </SectionShell>
  );
}