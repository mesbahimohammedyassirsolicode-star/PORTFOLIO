import { memo } from "react";

const coreStack = [
  { name: "React 19", role: "Web UI", isAccent: false },
  { name: "PHP / Laravel", role: "Backend & API", isAccent: false },
  { name: "Kotlin", role: "Android Mobile", isAccent: true },
  { name: "MySQL", role: "Database", isAccent: false },
  { name: "JavaScript ES6+", role: "Logic", isAccent: false },
  { name: "Tailwind CSS", role: "Styling", isAccent: false },
];

const alsoFamiliar = [
  "Native PHP Mobile",
  "RESTful API Design",
  "HTML5 Semantic & a11y",
  "JSON Schema",
  "Figma UI Prototyping",
];

const workflowTools = [
  "Git & GitHub",
  "Android Studio",
  "Cursor AI IDE",
  "AI Agentic Workflows",
  "n8n Automation",
  "Microsoft 365",
  "Sage Paie & Comptabilité",
];

function TechTools({ t }) {
  return (
    <section id="skills" className="space-y-8">
      <div>
        <p className="text-xs font-bold tracking-widest text-[var(--accent-txt)] uppercase font-sans">
          {t("tech_tag")}
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
          {t("tech_title")}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Group 1: Core Stack */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {t("tech_group1")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {coreStack.map((item) => (
              <div
                key={item.name}
                className="p-3.5 rounded-xl text-center border border-[var(--border-subtle)] bg-[var(--surface-card)] transition hover:border-[var(--border-hover)]"
              >
                <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                  {item.name}
                </div>
                <span
                  className={`text-xs ${
                    item.isAccent
                      ? "text-[var(--accent-txt)] font-semibold"
                      : "text-[var(--text-secondary)] font-medium"
                  }`}
                >
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Group 2: Also Familiar */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {t("tech_group2")}
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {alsoFamiliar.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-subtle)] text-[var(--text-primary)] font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Group 3: Workflow, AI & Enterprise Tools */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {t("tech_group3")}
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {workflowTools.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-subtle)] text-[var(--text-secondary)] font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(TechTools);
