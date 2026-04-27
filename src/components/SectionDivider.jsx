import { motion, useReducedMotion } from "framer-motion";

export default function SectionDivider() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="section z-10 py-0"
      initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.85 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={shouldReduceMotion ? { duration: 0.2 } : { duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
}
