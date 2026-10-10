import { memo } from "react";

// Marquee tech list
const TECH = ['React', 'Laravel', 'Kotlin', 'MySQL', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Git', 'n8n', 'Figma'];

function Hero({ t }) {
  return (
    <>
      <section className="hero" id="home" data-spy="">
        <div className="wrap hero-grid">
          {/* Left: text */}
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
            <ul className="stats">
              <li><strong>5</strong><span>{t('stat1')}</span></li>
              <li><strong>3</strong><span>{t('stat2')}</span></li>
              <li><strong>2024–26</strong><span>{t('stat3')}</span></li>
            </ul>
          </div>

          {/* Right: phone mockup (decorative) */}
          <div className="phone-wrap" aria-hidden="true">
            <div className="phone">
              <div className="ph-head"><b>MYM</b><span>9:41</span></div>
              <div className="ph-card">
                <small>Today</small>
                <strong>128</strong>
                <small>orders · +12%</small>
              </div>
              <div className="ph-row"><i /><div><u /><u /></div></div>
              <div className="ph-row"><i /><div><u /><u /></div></div>
              <div className="ph-row"><i /><div><u /><u /></div></div>
              <div className="ph-tabs"><i /><i /><i /><i /></div>
            </div>
            <p className="caption">{t('caption')}</p>
          </div>
        </div>
      </section>

      {/* Scrolling marquee */}
      <div className="marquee" role="group" aria-label="Technologies">
        <div className="track">
          <ul>
            {TECH.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <ul aria-hidden="true">
            {TECH.map((item) => <li key={item + '-dup'}>{item}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}

export default memo(Hero);
