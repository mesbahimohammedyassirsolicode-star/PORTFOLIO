import { motion } from "framer-motion";

export default function SectionShell({ id, className = "", children, amount = 0.2 }) {
  return (
    <motion.section
      id={id}
      className={`section ${className}`.trim()}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
