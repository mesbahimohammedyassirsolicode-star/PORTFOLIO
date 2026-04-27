import { motion, useReducedMotion } from "framer-motion";

export default function SectionShell({ id, className = "", children, amount = 0.2 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`section ${className}`.trim()}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={shouldReduceMotion ? { duration: 0.2 } : { duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
