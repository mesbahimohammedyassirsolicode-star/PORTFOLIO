import { memo } from "react";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";

const tools = [
  {
    name: "Git",
    badge: "G",
    badgeClassName: "bg-orange-500/15 text-orange-200 border-orange-300/30",
    description: "Version control for safe collaboration and code history.",
  },
  {
    name: "Figma",
    badge: "F",
    badgeClassName: "bg-rose-500/15 text-rose-200 border-rose-300/30",
    description: "Design interfaces and prototype user experiences efficiently.",
  },
  {
    name: "Stitch",
    badge: "ST",
    badgeClassName: "bg-violet-500/15 text-violet-200 border-violet-300/30",
    description: "Design-to-code workflow support for faster UI handoff.",
  },
  {
    name: "Cursor",
    badge: "CU",
    badgeClassName: "bg-slate-400/20 text-slate-100 border-slate-200/30",
    description: "AI-assisted coding environment for rapid implementation.",
  },
  {
    name: "n8n",
    badge: "N8",
    badgeClassName: "bg-pink-500/15 text-pink-200 border-pink-300/30",
    description: "Automate workflows and integrate apps with low-code pipelines.",
  },
  {
    name: "Microsoft Office 365",
    badge: "M365",
    badgeClassName: "bg-sky-500/15 text-sky-200 border-sky-300/30",
    description: "Productivity suite for communication and documentation.",
  },
  {
    name: "Sage Paie",
    badge: "SP",
    badgeClassName: "bg-emerald-500/15 text-emerald-200 border-emerald-300/30",
    description: "Payroll management with structured and reliable processing.",
  },
  {
    name: "Sage Comptabilite",
    badge: "SC",
    badgeClassName: "bg-emerald-500/15 text-emerald-200 border-emerald-300/30",
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
              className="group relative overflow-hidden p-4 sm:p-5 md:p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/15" />

              <div className="relative flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 p-2 sm:h-11 sm:w-11">
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md border px-1 text-[10px] font-semibold leading-none ${tool.badgeClassName}`}
                  >
                    {tool.badge}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:line-clamp-1 sm:transition-all sm:duration-300 sm:group-hover:line-clamp-none sm:group-hover:text-slate-200">
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
