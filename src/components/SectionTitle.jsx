import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
    >
      <span className="mb-3 inline-block text-xs font-semibold tracking-[0.2em] text-blue-300 uppercase">
        {eyebrow}
      </span>
      <h2 className="max-w-[23ch] text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl leading-7 text-slate-400">{subtitle}</p> : null}
    </motion.div>
  );
}
