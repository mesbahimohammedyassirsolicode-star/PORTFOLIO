import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../lib/motion";

export default function ProjectModal({ proj, onClose, t }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!proj) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [proj, onClose]);

  return (
    <AnimatePresence>
      {proj && (
        <motion.div
          className="modal-scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={proj.title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="modal-close" ref={closeRef} onClick={onClose} aria-label={t('lbl_close')}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="modal-media">
              <img src={proj.img} alt={proj.imgAlt} />
            </div>

            <div className="modal-body">
              <div>
                <span className="project__cat">{proj.catLabel}</span>
                <h3 style={{ marginTop: '.6rem' }}>{proj.title}</h3>
              </div>

              <dl className="modal-rows">
                <div><dt>{t('lbl_problem')}</dt><dd>{t(proj.problemKey)}</dd></div>
                <div><dt>{t('lbl_solution')}</dt><dd>{t(proj.solutionKey)}</dd></div>
                <div><dt>{t('lbl_result')}</dt><dd>{t(proj.resultKey)}</dd></div>
              </dl>

              <ul className="project__stack">
                {proj.stack.map((s) => <li key={s}>{s}</li>)}
              </ul>

              <div className="project__links">
                <a href={proj.repo} target="_blank" rel="noopener noreferrer">{t('lnk_code')} ↗</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}