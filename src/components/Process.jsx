import { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "../lib/motion";
import "./process-section.css";

const STEPS = [
  { n: '01', title: 'process_1', label: 'process_1_s', desc: 'process_1_d' },
  { n: '02', title: 'process_2', label: 'process_2_s', desc: 'process_2_d' },
  { n: '03', title: 'process_3', label: 'process_3_s', desc: 'process_3_d' },
  { n: '04', title: 'process_4', label: 'process_4_s', desc: 'process_4_d' },
  { n: '05', title: 'process_5', label: 'process_5_s', desc: 'process_5_d' },
  { n: '06', title: 'process_6', label: 'process_6_s', desc: 'process_6_d' },
];

function Process({ t }) {
  return (
    <section className="process-section" id="process">
      <div className="wrap">
        <div className="section-head">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p className="eyebrow">{t('process_eyebrow')}</p>
            <h2>{t('process_title')}</h2>
          </motion.div>
          <motion.div className="section-head__aside" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p>{t('process_desc')}</p>
          </motion.div>
        </div>

        <motion.ol
          className="flow"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {STEPS.map((s) => (
            <motion.li key={s.n} className="flow__step" variants={fadeUp}>
              <span className="flow__marker" aria-hidden="true">
                <span className="flow__num">{s.n}</span>
              </span>

              <div className="flow__main">
                <h3 className="flow__title">{t(s.title)}</h3>
                <p className="flow__label">{t(s.label)}</p>
              </div>

              <p className="flow__desc">{t(s.desc)}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

export default memo(Process);