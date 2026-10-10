import { memo, useState, useMemo } from "react";
import { projects } from "../data/portfolioData";

const CATEGORIES = ['all', 'fullstack', 'frontend'];
const CAT_LABEL_KEY = { all: 'filter_all', fullstack: 'filter_fullstack', frontend: 'filter_frontend', mobile: 'filter_mobile' };

function Projects({ t }) {
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => filter === 'all' ? projects : projects.filter((p) => p.cat === filter),
    [filter]
  );

  // First visible card gets featured class (wide layout on desktop)
  const countText = visible.length === 1
    ? t('count_one')
    : t('count_many').replace('{n}', visible.length);

  return (
    <section id="projects" data-spy="">
      <div className="wrap">
        <div className="proj-head reveal">
          <div>
            <p className="eyebrow">{t('proj_eyebrow')}</p>
            <h2>{t('proj_title')}</h2>
          </div>
          <div>
            {/* Filter bar */}
            <div className="filters" role="group" aria-label={t('lbl_filter')}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={filter === cat}
                  onClick={() => setFilter(cat)}
                >
                  {t(CAT_LABEL_KEY[cat])} ({cat === 'all' ? projects.length : projects.filter((p) => p.cat === cat).length})
                </button>
              ))}
            </div>
            <p className="count" role="status" aria-live="polite">{countText}</p>
          </div>
        </div>

        {/* Project cards */}
        {visible.length > 0 ? (
          <div className="projects">
            {visible.map((proj, idx) => (
              <article
                key={proj.id}
                className={`project reveal card-spotlight${idx === 0 ? ' featured' : ''}`}
                data-cat={proj.cat}
              >
                <div className="visual">
                  <img
                    src={proj.img}
                    alt={proj.imgAlt}
                    loading="lazy"
                    onError={(e) => e.target.remove()}
                  />
                  <span className="num" aria-hidden="true">{proj.num}</span>
                </div>
                <div className="pbody">
                  <div className="ptop">
                    <h3>{proj.title}</h3>
                    <span className="cat">{proj.catLabel}</span>
                  </div>
                  <div className="prs">
                    <p><b>{t('lbl_problem')}</b> · <span>{t(proj.problemKey)}</span></p>
                    <p><b>{t('lbl_solution')}</b> · <span>{t(proj.solutionKey)}</span></p>
                    <p><b>{t('lbl_result')}</b> · <span>{t(proj.resultKey)}</span></p>
                  </div>
                  <ul className="proj-stack">
                    {proj.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <div className="plinks">
                    <a href={proj.repo} target="_blank" rel="noopener noreferrer">
                      {t('lnk_code')} ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty">{t('empty')}</p>
        )}
      </div>
    </section>
  );
}

export default memo(Projects);
