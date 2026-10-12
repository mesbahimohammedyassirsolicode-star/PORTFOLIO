import { memo, useState, useMemo } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { projects } from "../data/portfolioData";
import ProjectModal from "./ProjectModal";
import { fadeUp, viewport } from "../lib/motion";

const CATEGORIES = ['all', 'fullstack', 'frontend'];
const CAT_LABEL_KEY = { all: 'filter_all', fullstack: 'filter_fullstack', frontend: 'filter_frontend' };

function ProjectCard({ proj, onOpen, t }) {
  return (
    <motion.article
      className="project card-spotlight"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      onClick={() => onOpen(proj)}
    >
      <span className="spotlight-glow" aria-hidden="true" />
      <div className="project__media">
        <img src={proj.img} alt={proj.imgAlt} loading="lazy" decoding="async" onError={(e) => e.currentTarget.remove()} />
        <div className="project__badges">
          <span className="project__index">{t('lbl_index')} <b>{proj.num}</b></span>
          <span className="project__status"><i aria-hidden="true" /> {proj.catLabel}</span>
        </div>
      </div>

      <div className="project__body">
        <span className="project__cat">{proj.catLabel}</span>
        <h3>{proj.title}</h3>

        <ul className="prs">
          <li><b>{t('lbl_problem')}</b>{t(proj.problemKey)}</li>
          <li><b>{t('lbl_solution')}</b>{t(proj.solutionKey)}</li>
          <li><b>{t('lbl_result')}</b>{t(proj.resultKey)}</li>
        </ul>

        <ul className="project__stack">
          {proj.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>

        <div className="project__links">
          <button type="button" onClick={(e) => { e.stopPropagation(); onOpen(proj); }}>
            {t('btn_details')}
          </button>
          <a href={proj.repo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            {t('lnk_code')} ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function Projects({ t }) {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.cat === filter)),
    [filter]
  );

  const countText = visible.length === 1
    ? t('count_one')
    : t('count_many').replace('{n}', visible.length);

  return (
    <LayoutGroup>
      <section id="projects">
        <div className="wrap">
          <div className="section-head">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              <p className="eyebrow">{t('proj_eyebrow')}</p>
              <h2>{t('proj_title')}</h2>
            </motion.div>
            <motion.div className="section-head__aside" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              <p>{t('proj_desc')}</p>
            </motion.div>
          </div>

          <div className="proj-toolbar">
            <div className="filters" role="group" aria-label={t('lbl_filter')}>
              {CATEGORIES.map((cat) => (
                <button key={cat} type="button" aria-pressed={filter === cat} onClick={() => setFilter(cat)}>
                  {t(CAT_LABEL_KEY[cat])}
                </button>
              ))}
            </div>
            <p className="count" role="status" aria-live="polite">{countText}</p>
          </div>

          {visible.length > 0 ? (
            <div className="projects">
              {visible.map((proj) => (
                <ProjectCard key={proj.id} proj={proj} onOpen={setActive} t={t} />
              ))}
            </div>
          ) : (
            <p className="empty">{t('empty')}</p>
          )}
        </div>

        <ProjectModal proj={active} onClose={() => setActive(null)} t={t} />
      </section>
    </LayoutGroup>
  );
}

export default memo(Projects);