import { memo } from "react";

function Hero({ t }) {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <p className="badge">
            <span className="dot" aria-hidden="true" />
            <span>{t('status')}</span>
          </p>
          <h1>
            Mohammed Yassir <br />
            Mesbahi<span className="dot-end">.</span>
          </h1>
          <p className="role">
            <span>{t('role')}</span> · <b>{t('founder')}</b>
          </p>
          <p className="pitch lead">{t('pitch')}</p>
          <div className="cta">
            <a className="btn btn-primary" href="#projects">{t('btn_projects')}</a>
            <a className="btn btn-ghost" href="/Mohammed-Yassir-Mesbahi-CV.pdf" download>
              {t('btn_cv')}
            </a>
          </div>
        </div>

        <ul className="stats">
          <li><strong>5</strong><span>{t('stat1')}</span></li>
          <li><strong>3</strong><span>{t('stat2')}</span></li>
          <li><strong>2024–26</strong><span>{t('stat3')}</span></li>
        </ul>
      </div>
    </section>
  );
}

export default memo(Hero);
