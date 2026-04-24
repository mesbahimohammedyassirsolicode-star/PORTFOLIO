import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </motion.div>
  );
}
