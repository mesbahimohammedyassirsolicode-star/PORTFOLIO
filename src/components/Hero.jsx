import { memo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/motion';
import useAnimationBudget from '../hooks/useAnimationBudget';
import HeroScene from './hero/HeroScene';
import './hero-section.css';

function Hero({ t, start = true }) {
  const { shouldLimitMotion } = useAnimationBudget();
  const animate = !shouldLimitMotion;

  const stats = [
    { value: 5, label: t('kpi_1') },
    { value: 3, label: t('kpi_2') },
    { text: t('kpi_3_v'), label: t('kpi_3') },
    { text: t('kpi_4_v'), label: t('kpi_4') },
  ];

  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div className="hero-layout">
          {/* ---------- Copy ---------- */}
          <motion.div
            className="hero-copy"
            variants={stagger(0.08)}
            initial="hidden"
            animate={start ? 'show' : 'hidden'}
          >
            <motion.p className="hero-badge" variants={fadeUp}>
              <span className="dot" aria-hidden="true" />
              {t('hero_badge')}
            </motion.p>

            <motion.h1 variants={fadeUp}>
              Mohammed
              <br />
              Yassir <span className="grad">Mesbahi</span>
            </motion.h1>

            <motion.p className="hero-role" variants={fadeUp}>{t('hero_role')}</motion.p>
            <motion.p className="hero-pitch" variants={fadeUp}>{t('hero_pitch')}</motion.p>

            <motion.div className="hero-cta" variants={fadeUp}>
              <a className="btn btn--primary" href="#projects">
                {t('hero_cta_projects')}
                <span className="btn-ico" aria-hidden="true">→</span>
              </a>
              <a className="btn btn--ghost" href="#solid">{t('hero_cta_solid')}</a>
              <a className="btn btn--amber" href="#contact">{t('hero_cta_contact')}</a>
            </motion.div>
          </motion.div>

          {/* ---------- Scene ---------- */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0 }}
            animate={start ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: 'linear' }}
          >
            <HeroScene t={t} animate={animate} />
          </motion.div>
        </div>

        {/* ---------- Stat rail ---------- */}
        <motion.ul
          className="hero-stats"
          variants={stagger(0.06)}
          initial="hidden"
          animate={start ? 'show' : 'hidden'}
        >
          {stats.map((s) => (
            <motion.li key={s.label} variants={fadeUp}>
              <strong>{s.text ?? s.value}</strong>
              <span>{s.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default memo(Hero);