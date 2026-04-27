import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";

const tools = [
  {
    name: "Git",
    logo: "https://cdn.simpleicons.org/git/F05032",
    description: "Version control for safe collaboration and code history.",
  },
  {
    name: "Figma",
    logo: "https://cdn.simpleicons.org/figma/F24E1E",
    description: "Design interfaces and prototype user experiences efficiently.",
  },
  {
    name: "Stitch",
    logo: "/stitch-logo.png",
    description: "Design-to-code workflow support for faster UI handoff.",
  },
  {
    name: "Cursor",
    logo: "https://cdn.simpleicons.org/cursor/FFFFFF",
    description: "AI-assisted coding environment for rapid implementation.",
  },
  {
    name: "n8n",
    logo: "https://cdn.simpleicons.org/n8n/EA4B71",
    description: "Automate workflows and integrate apps with low-code pipelines.",
  },
  {
    name: "Microsoft Office 365",
    logo: "/microsoft-365-logo.png",
    description: "Productivity suite for communication and documentation.",
  },
  {
    name: "Sage Paie",
    logo: "https://cdn.simpleicons.org/sage/00DC82",
    description: "Payroll management with structured and reliable processing.",
  },
  {
    name: "Sage Comptabilite",
    logo: "https://cdn.simpleicons.org/sage/00DC82",
    description: "Accounting workflows with organized financial tracking.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

export default function Tools() {
  return (
    <SectionShell id="tools" amount={0.25}>
      <SectionTitle
        eyebrow="Tools"
        title="Tools & Software"
        subtitle="Professional software used to support delivery, collaboration, and business operations."
      />

      <motion.div
        className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09 } },
        }}
      >
        {tools.map((tool) => {
          return (
            <GlassCard
              key={tool.name}
              className="group relative overflow-hidden p-4 sm:p-5 md:p-6"
              variants={cardVariants}
              whileHover={{ scale: 1.01, y: -5 }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/20" />

              <div className="relative flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 p-2 sm:h-11 sm:w-11">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width="24"
                    height="24"
                    className="h-6 w-6 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">{tool.name}</h3>
                  <p className="mt-2 line-clamp-1 text-sm leading-relaxed text-slate-300 transition-all duration-300 group-hover:line-clamp-none group-hover:text-slate-200">
                    {tool.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
