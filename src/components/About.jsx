import { memo } from "react";

// About section — matches p01-accueil.html About + MYM + Journey + Mindset structure
function About({ t }) {
  return (
    <section id="about">
      <div className="wrap">
        {/* Intro row */}
        <div className="about-intro reveal">
          <div>
            <p className="eyebrow">{t('about_eyebrow')}</p>
            <h2>{t('about_title')}</h2>
          </div>
          <div>
            <p className="lead">{t('about_text')}</p>
            <dl className="facts">
              <div><dt>{t('f1_k')}</dt><dd>{t('f1_v')}</dd></div>
              <div><dt>{t('f2_k')}</dt><dd>{t('f2_v')}</dd></div>
              <div><dt>{t('f3_k')}</dt><dd>{t('f3_v')}</dd></div>
            </dl>
          </div>
        </div>

        {/* Card grid */}
        <div className="about-grid">
          {/* MYM startup card (inverted) */}
          <article className="card card-spotlight mym reveal">
            <span className="spotlight-glow" aria-hidden="true" />
            <span className="tag">{t('mym_tag')}</span>
            <h3>Startup MYM</h3>
            <p>{t('mym_desc')}</p>
            <p className="status">{t('mym_status')}</p>
          </article>

          {/* Journey timeline */}
          <article className="card card-spotlight reveal">
            <span className="spotlight-glow" aria-hidden="true" />
            <h3>{t('tl_title')}</h3>
            <ul className="timeline">
              <li>
                <strong>{t('t1')}</strong>
                <span>{t('t1d')}</span>
              </li>
              <li>
                <strong>{t('t2')}</strong>
                <span>{t('t2d')}</span>
              </li>
              <li>
                <strong>{t('t3')}</strong>
                <span>{t('t3d')}</span>
              </li>
              <li>
                <strong>{t('t4')}</strong>
                <span>{t('t4d')}</span>
              </li>
            </ul>
          </article>

          {/* Engineering mindset (full row) */}
          <article className="card card-spotlight reveal full-row">
            <span className="spotlight-glow" aria-hidden="true" />
            <h3>{t('mind_title')}</h3>
            <ul className="ticks">
              <li>{t('mind1')}</li>
              <li>{t('mind2')}</li>
              <li>{t('mind3')}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export default memo(About);