import { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "../lib/motion";
import "./tools-section.css";

/* ------------------------------------------------------------------
   Icons
   Official brand marks are used where the geometry is faithful
   (VS Code, Git, GitHub, Figma, Microsoft 365, Vercel, Cursor, n8n).
   For the rest — where no clean official path exists — a geometric
   monogram in the tool's own identity colour is used instead of an
   unrelated icon.
   Every mark is decorative: the tool name always sits beside it as text.
   ------------------------------------------------------------------ */

function Icon({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

const ICONS = {
  vscode: (
    <path
      fill="currentColor"
      stroke="none"
      d="M23 15.5 18.4 13l-5.9 4.5-3.8-3 3.8-3L18.4 7 23 4.5v11zM8.9 1 3 5v14l5.9 4 7.6-6V7L8.9 1Zm.7 12.9L6.6 11l-1.6 1.4-1-.8 2.6-2.3-2.6-2.3 1-.8 1.6 1.4 3-2.9.7.6-2.6 2.9 3 3-.7.6Z"
    />
  ),
  git: (
    <path
      fill="currentColor"
      stroke="none"
      d="M23.55 10.93 13.07.45a1.55 1.55 0 0 0-2.19 0L8.71 2.63l2.76 2.76a1.84 1.84 0 0 1 2.33 2.34l2.65 2.66a1.84 1.84 0 0 1 1.9 3.04 1.84 1.84 0 0 1-2.6 0 1.85 1.85 0 0 1-.4-2L12.86 8.96v6.52a1.84 1.84 0 0 1-.85 3.14 1.84 1.84 0 0 1-2.51-2.51l.01-.01 3.6-3.6a1.84 1.84 0 0 1-.4-2 1.83 1.83 0 0 1-.6-.74 1.85 1.85 0 0 1 .26-2.02 1.84 1.84 0 0 1 2.6 0 1.85 1.85 0 0 1 .41 2l-3.62 3.6a1.84 1.84 0 0 1 3.77-.93Z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.41-1.31.75-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.46-2.38 1.23-3.22-.13-.3-.54-1.52.11-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.28-1.23 3.28-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.47 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3Z"
    />
  ),
  postman: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
      <path d="M7.6 14.8a5.2 5.2 0 0 1 0-8.2" stroke="#0B0C0E" strokeWidth="1.6" />
      <circle cx="7.6" cy="10.7" r="1.5" fill="#0B0C0E" stroke="none" />
      <circle cx="15.2" cy="14.4" r="1.5" fill="#0B0C0E" stroke="none" />
      <path d="M9 10.9 14.2 13.9" stroke="#0B0C0E" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  android: (
    <>
      <path d="M5.5 8.5 3.8 5.6M18.5 8.5l1.7-2.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 17.5a6.5 6.5 0 0 1 12 0Z" fill="currentColor" stroke="none" opacity=".85" />
      <circle cx="10.2" cy="10.4" r="1" fill="currentColor" stroke="none" />
      <circle cx="13.8" cy="10.4" r="1" fill="currentColor" stroke="none" />
      <path d="M4.5 17.5h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  laragon: (
    <>
      <path d="M4 20V7.5A3.5 3.5 0 0 1 7.5 4H20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M4 20h7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="17.5" cy="16.5" r="3" fill="currentColor" stroke="none" opacity=".35" />
    </>
  ),
  cursor: (
    <>
      <path d="m12 2.6 8.1 4.7v9.4L12 21.4 3.9 16.7V7.3Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12 3.9 7.3M12 12l8.1-4.7M12 12v9.4" stroke="currentColor" strokeWidth="1.2" opacity=".7" />
    </>
  ),
  n8n: (
    <>
      <circle cx="12" cy="5" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="5" cy="17" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="17" r="2.4" fill="currentColor" stroke="none" />
      <path d="M12 7.4 6.4 14.8M12 7.4l5.6 7.4M7.4 17h9.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  figma: (
    <>
      <path d="M12 2.5h-2a2.5 2.5 0 0 0 0 5h2Z" fill="currentColor" stroke="none" />
      <path d="M12 2.5h2a2.5 2.5 0 0 1 0 5h-2Z" fill="currentColor" stroke="none" opacity=".7" />
      <path d="M12 7.5H10a2.5 2.5 0 0 0 0 5h2Z" fill="currentColor" stroke="none" opacity=".55" />
      <circle cx="14.5" cy="10" r="2.5" fill="currentColor" stroke="none" opacity=".8" />
      <path d="M10 15a2.5 2.5 0 0 1 5 0v4.5A2.5 2.5 0 0 1 12.5 22 2.5 2.5 0 0 1 10 19.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  microsoft: (
    <>
      <rect x="3" y="3" width="8.2" height="8.2" rx="1.1" fill="currentColor" stroke="none" />
      <rect x="12.8" y="3" width="8.2" height="8.2" rx="1.1" fill="currentColor" stroke="none" opacity=".75" />
      <rect x="3" y="12.8" width="8.2" height="8.2" rx="1.1" fill="currentColor" stroke="none" opacity=".6" />
      <rect x="12.8" y="12.8" width="8.2" height="8.2" rx="1.1" fill="currentColor" stroke="none" opacity=".45" />
    </>
  ),
  sage: (
    <>
      <path d="M16.5 4.2c3.4 1.1 5.4 4.2 5 7.9-.4 4-3.6 7-7.6 7.4-2.9.3-5.6-1-7-3.1 3.1.5 5.9-.9 7.3-3.6 1.4-2.9.8-6.4-1.6-8.4 1.2-.3 2.5-.3 3.9-.2Z" fill="currentColor" stroke="none" />
      <path d="M4.6 20.2c-.6-2.4-.2-4.9 1.1-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  vercel: (
    <path fill="currentColor" stroke="none" d="M12 3.2 22 20.8H2Z" />
  ),
  /* Capabilities — abstract marks, deliberately not imitating a product */
  agentic: (
    <>
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      <circle cx="4.6" cy="5.4" r="1.9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19.4" cy="5.4" r="1.9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.6" cy="18.6" r="1.9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19.4" cy="18.6" r="1.9" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.2 6.9 3.6 3.2m7.9-3.2-3.5 3.2m-7.9 5.4 3.6-3.2m7.9 3.2-3.5-3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".65" />
    </>
  ),
  prompt: (
    <>
      <rect x="2.8" y="4.4" width="18.4" height="15.2" rx="2.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="m7.4 9.6 2.6 2.6-2.6 2.6M12.6 15.2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

/* ------------------------------------------------------------------
   Data — descriptions state what the tool is actually used for.
   No proficiency scores, usage figures or unsupported claims.
   ------------------------------------------------------------------ */

const TOOLS = {
  vscode: { name: 'VS Code', icon: 'vscode', hue: '#3AA0F1', role: 'tool_role_editor', desc: 'tool_desc_vscode', featured: true },
  git: { name: 'Git', icon: 'git', hue: '#F05033', role: 'tool_role_vcs', desc: 'tool_desc_git' },
  github: { name: 'GitHub', icon: 'github', hue: '#E6EDF7', role: 'tool_role_hosting', desc: 'tool_desc_github' },
  postman: { name: 'Postman', icon: 'postman', hue: '#FF6C37', role: 'tool_role_api', desc: 'tool_desc_postman' },
  android: { name: 'Android Studio', icon: 'android', hue: '#3DDC84', role: 'tool_role_mobile', desc: 'tool_desc_android' },
  laragon: { name: 'MYSQL WORKBENCH', icon: 'laragon', hue: '#00B8A9', role: 'tool_role_local', desc: 'tool_desc_laragon' },

  cursor: { name: 'Cursor', icon: 'cursor', hue: '#B9C0CC', role: 'tool_role_ai_editor', desc: 'tool_desc_cursor' },
  n8n: { name: 'n8n', icon: 'n8n', hue: '#EA4B71', role: 'tool_role_automation', desc: 'tool_desc_n8n' },
  agentic: { name: 'Agentic AI Workflows', icon: 'agentic', hue: '#E7C600', role: 'tool_role_capability', desc: 'tool_desc_agentic', kind: 'capability' },
  prompt: { name: 'Prompt Engineering', icon: 'prompt', hue: '#9CA3AF', role: 'tool_role_capability', desc: 'tool_desc_prompt', kind: 'capability' },

  figma: { name: 'Figma', icon: 'figma', hue: '#A259FF', role: 'tool_role_design', desc: 'tool_desc_figma' },
  microsoft: { name: 'Microsoft 365', icon: 'microsoft', hue: '#00A4EF', role: 'tool_role_office', desc: 'tool_desc_microsoft' },
  sage: { name: 'Sage', icon: 'sage', hue: '#00D639', role: 'tool_role_business', desc: 'tool_desc_sage' },
  vercel: { name: 'Vercel', icon: 'vercel', hue: '#F4F7FB', role: 'tool_role_deploy', desc: 'tool_desc_vercel' },
};

const GROUPS = [
  { id: 'core', label: 'tools_core', cols: 4, items: ['vscode', 'git', 'github', 'postman', 'android', 'laragon'] },
  { id: 'ai', label: 'tools_ai', cols: 4, items: ['cursor', 'n8n', 'agentic', 'prompt'] },
  { id: 'prod', label: 'tools_productivity', cols: 4, items: ['figma', 'microsoft', 'sage', 'vercel'] },
];

function ToolCard({ tool, t, featured }) {
  return (
    <li
      className={`tool-card${featured ? ' tool-card--featured' : ''}${tool.kind === 'capability' ? ' tool-card--capability' : ''}`}
      style={{ '--tool-hue': tool.hue }}
    >
      <span className="tool-card__halo" aria-hidden="true" />
      <span className={`tool-card__icon tool-card__icon--${tool.kind === 'capability' ? 'capability' : 'product'}`} aria-hidden="true">
        <Icon>{ICONS[tool.icon]}</Icon>
      </span>
      <div className="tool-card__body">
        <p className="tool-card__name">{tool.name}</p>
        <p className="tool-card__desc">{t(tool.desc)}</p>
      </div>
      <p className="tool-card__role">{t(tool.role)}</p>
    </li>
  );
}

function Tools({ t }) {
  return (
    <section className="tools-section" id="tools">
      <div className="wrap">
        <div className="section-head tools-section__head">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p className="eyebrow tools-eyebrow">
              <span className="tools-eyebrow__line" aria-hidden="true" />
              {t('tools_eyebrow')}
            </p>
            <h2>{t('tools_title')}</h2>
          </motion.div>
          <motion.div className="section-head__aside" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p>{t('tools_desc')}</p>
          </motion.div>
        </div>

        {GROUPS.map((group, gi) => (
          <motion.section
            className="tool-group"
            key={group.id}
            aria-labelledby={`tools-group-${group.id}`}
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.div className="tool-group__head" variants={fadeUp}>
              <span className="tool-group__index" aria-hidden="true">{String(gi + 1).padStart(2, '0')}</span>
              <h3 id={`tools-group-${group.id}`}>{t(group.label)}</h3>
              <span className="tool-group__rule" aria-hidden="true" />
              <span className="tool-group__count" aria-hidden="true">{String(group.items.length).padStart(2, '0')}</span>
            </motion.div>

            <motion.ul className="tool-grid" style={{ '--tool-cols': group.cols }} variants={fadeUp}>
              {group.items.map((id) => {
                const tool = TOOLS[id];
                return <ToolCard key={id} tool={tool} t={t} featured={tool.featured} />;
              })}
            </motion.ul>
          </motion.section>
        ))}
      </div>
    </section>
  );
}

export default memo(Tools);