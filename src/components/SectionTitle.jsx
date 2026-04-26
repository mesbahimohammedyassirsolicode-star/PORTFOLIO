import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      className="mb-9"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
    >
      <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-slate-300 uppercase">
        {eyebrow}
      </span>
      <h2 className="max-w-[23ch] text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl leading-7 text-slate-400 md:text-lg">{subtitle}</p> : null}
    </motion.div>
  );
}
