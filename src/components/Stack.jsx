import { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "../lib/motion";

function Icon({ path }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {path}
    </svg>
  );
}

const ICONS = {
  frontend: <><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M2 9h20M6 6.5h.01M9 6.5h.01" /><path d="M7 13l2.5 2L7 17M12 17h5" /></>,
  backend: <><path d="M4 6h16v12H4z" /><path d="M4 10h16M8 6l-2 2M8 14l-2 2M11 14h6" /></>,
  data: <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  arch: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><path d="M14 14h7v7h-7z" /><path d="M10 6.5h4M6.5 10v4M14 17.5h-7" /></>,
};

// Proficiency is shown as a qualitative band, not an invented percentage.
const LEVELS = {
  core: { label: 'stack_level_core', width: '92%', tone: '' },
  advanced: { label: 'stack_level_advanced', width: '78%', tone: '' },
  working: { label: 'stack_level_working', width: '58%', tone: 'level__fill--amber' },
};

const GROUPS = [
  { icon: 'frontend', title: 'stack_frontend_title', sub: 'stack_frontend_sub', desc: 'stack_frontend_desc', level: 'core', chips: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Accessibility', 'Responsive design'] },
  { icon: 'backend', title: 'stack_backend_title', sub: 'stack_backend_sub', desc: 'stack_backend_desc', level: 'core', chips: ['PHP Native', 'Laravel', 'REST API', 'MVC', 'Validation', 'Authentication'] },
  { icon: 'data', title: 'stack_data_title', sub: 'stack_data_sub', desc: 'stack_data_desc', level: 'advanced', chips: ['SQL', 'MySQL', 'Schema design', 'Normalization', 'Indexes', 'Queries'] },
  { icon: 'arch', title: 'stack_arch_title', sub: 'stack_arch_sub', desc: 'stack_arch_desc', level: 'advanced', chips: ['OOP', 'SOLID', 'DRY', 'Separation of Concerns', 'Clean code', 'Design patterns'] },
];

function Stack({ t }) {
  return (
    <section id="stack">
      <div className="wrap">
        <div className="section-head">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p className="eyebrow">{t('stack_eyebrow')}</p>
            <h2>{t('stack_title')}</h2>
          </motion.div>
          <motion.div className="section-head__aside" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <span className="section-head__tag">{t('stack_domain')}</span>
            <p>{t('stack_desc')}</p>
          </motion.div>
        </div>

        <div className="stack-grid">
          {GROUPS.map((g) => {
            const level = LEVELS[g.level];
            return (
              <motion.article
                key={g.icon}
                className="card card-spotlight stack-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <span className="spotlight-glow" aria-hidden="true" />
                <div className="stack-card__top">
                  <span className="stack-card__icon"><Icon path={ICONS[g.icon]} /></span>
                  <div>
                    <h3>{t(g.title)}</h3>
                    <p className="stack-card__sub">{t(g.sub)}</p>
                  </div>
                </div>

                <p>{t(g.desc)}</p>

                <ul className="chips">
                  {g.chips.map((c) => <li key={c}>{c}</li>)}
                </ul>

                <div className="level">
                  <div className="level__head">
                    <span className="level__label">{t('stack_level')}</span>
                    <span className="level__label">{t(level.label)}</span>
                  </div>
                  <div className="level__track" role="presentation">
                    <span className={`level__fill ${level.tone}`} style={{ width: level.width }} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div className="card" variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={viewport} style={{ marginTop: '1rem' }}>
          <motion.span className="mono" variants={fadeUp}>{t('tools_core')}</motion.span>
          <motion.div variants={fadeUp}>
            <ul className="chips">
              {['Git', 'GitHub', 'VS Code', 'Postman', 'Android Studio', 'Laragon'].map((c) => <li key={c}>{c}</li>)}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Stack);