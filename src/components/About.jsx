import { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "../lib/motion";
import "./about-section.css";

const TAGS = [
  'about_tag_web',
  'about_tag_mobile',
  'about_tag_php',
  'about_tag_laravel',
  'about_tag_react',
  'about_tag_mysql',
  'about_tag_oop',
  'about_tag_solid',
  'about_tag_mvc',
];

function About({ t }) {
  return (
    <section className="about-section" id="about">
      <div className="wrap">
        <motion.div
          className="about-grid"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {/* Heading */}
          <header className="about-head">
            <motion.p className="eyebrow" variants={fadeUp}>{t('about_eyebrow')}</motion.p>
            <motion.h2 variants={fadeUp}>{t('about_title')}</motion.h2>
          </header>

          {/* Dominant introduction — read first, longest measure allowed */}
          <motion.div className="about-intro" variants={fadeUp}>
            <p className="about-intro__text">{t('about_intro')}</p>
          </motion.div>

          {/* Philosophy — an accent beat, not a competing headline */}
          <motion.aside className="about-philosophy" variants={fadeUp}>
            <p className="about-label">{t('about_philosophy_label')}</p>
            <p className="about-philosophy__text">{t('about_philosophy')}</p>
          </motion.aside>

          {/* Profile metadata */}
          <motion.dl className="about-meta" variants={fadeUp}>
            <div><dt>{t('about_base')}</dt><dd>{t('about_base_v')}</dd></div>
            <div><dt>{t('about_focus')}</dt><dd>{t('about_focus_detail')}</dd></div>
            <div><dt>{t('about_edu')}</dt><dd>{t('about_edu_v')}</dd></div>
          </motion.dl>

          {/* Technical stack narrative + its tags, kept together */}
          <motion.div className="about-tech" variants={fadeUp}>
            <p className="about-label">{t('about_tech_label')}</p>
            <p className="about-body">{t('about_technical')}</p>
          </motion.div>

          {/* Learning direction */}
          <motion.div className="about-learning" variants={fadeUp}>
            <p className="about-label">{t('about_learn_label')}</p>
            <p className="about-body">{t('about_learning')}</p>
          </motion.div>

          {/* Technical tags — their own rail so both text columns stay balanced */}
          <motion.ul className="about-tags" variants={fadeUp}>
            {TAGS.map((tag) => <li key={tag}>{t(tag)}</li>)}
          </motion.ul>
        </motion.div>

        {/* Supporting row — brand venture and study journey */}
        <div className="about-cards">
          <motion.article
            className="card card--mym card-spotlight"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <span className="spotlight-glow" aria-hidden="true" />
            <span className="tag tag--amber">{t('about_mym_tag')}</span>
            <h3>{t('about_mym_title')}</h3>
            <p className="about-body">{t('about_mym_desc')}</p>
            <p className="about-mym-status">{t('about_mym_status')}</p>
          </motion.article>

          <motion.article
            className="card card-spotlight"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <span className="spotlight-glow" aria-hidden="true" />
            <h3>{t('about_journey')}</h3>
            <ul className="timeline">
              <li><strong>{t('journey_1')}</strong><span>{t('journey_1_d')}</span></li>
              <li><strong>{t('journey_2')}</strong><span>{t('journey_2_d')}</span></li>
              <li><strong>{t('journey_3')}</strong><span>{t('journey_3_d')}</span></li>
              <li><strong>{t('journey_4')}</strong><span>{t('journey_4_d')}</span></li>
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default memo(About);