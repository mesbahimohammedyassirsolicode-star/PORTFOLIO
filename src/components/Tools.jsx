import { memo } from "react";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";

const tools = [
  {
    name: "Git",
    badge: "G",
    badgeClassName: "bg-orange-500/15 text-orange-200 border-orange-300/25",
    description: "Version control for safe collaboration and code history.",
  },
  {
    name: "Figma",
    badge: "F",
    badgeClassName: "bg-rose-500/15 text-rose-200 border-rose-300/25",
    description: "Design interfaces and prototype user experiences efficiently.",
  },
  {
    name: "Stitch",
    badge: "ST",
    badgeClassName: "bg-violet-500/15 text-violet-200 border-violet-300/25",
    description: "Design-to-code workflow support for faster UI handoff.",
  },
  {
    name: "Cursor",
    badge: "CU",
    badgeClassName: "bg-slate-400/15 text-slate-100 border-slate-200/25",
    description: "AI-assisted coding environment for rapid implementation.",
  },
  {
    name: "n8n",
    badge: "N8",
    badgeClassName: "bg-pink-500/15 text-pink-200 border-pink-300/25",
    description: "Automate workflows and integrate apps with low-code pipelines.",
  },
  {
    name: "Microsoft Office 365",
    badge: "M365",
    badgeClassName: "bg-sky-500/15 text-sky-200 border-sky-300/25",
    description: "Productivity suite for communication and documentation.",
  },
  {
    name: "Sage Paie",
    badge: "SP",
    badgeClassName: "bg-emerald-500/15 text-emerald-200 border-emerald-300/25",
    description: "Payroll management with structured and reliable processing.",
  },
  {
    name: "Sage Comptabilite",
    badge: "SC",
    badgeClassName: "bg-emerald-500/15 text-emerald-200 border-emerald-300/25",
    description: "Accounting workflows with organized financial tracking.",
  },
];

function Tools() {
  return (
    <SectionShell id="tools" amount={0.25}>
      <SectionTitle
        eyebrow="Tools"
        title="Tools & Software"
        subtitle="Professional software used to support delivery, collaboration, and business operations."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => {
          return (
            <GlassCard
              key={tool.name}
              className="group relative overflow-hidden p-5 sm:p-6 md:p-7"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/[0.06] blur-2xl transition-all duration-500 group-hover:bg-pink-500/[0.12] group-hover:scale-150" />

              <div className="relative flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-2 shadow-[0_0_20px_rgba(255,255,255,0.03)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_6px_20px_rgba(236,72,153,0.1)] sm:h-14 sm:w-14">
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg border px-1.5 text-xs font-bold leading-none ${tool.badgeClassName}`}
                  >
                    {tool.badge}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="mt-0.5 text-lg font-semibold tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-pink-300 sm:text-xl">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400/90 sm:line-clamp-1 sm:transition-all sm:duration-300 sm:group-hover:line-clamp-none sm:group-hover:text-slate-300">
                    {tool.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </SectionShell>
  );
}

export default memo(Tools);
