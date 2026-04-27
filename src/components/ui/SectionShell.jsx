import { motion } from "framer-motion";
import useAnimationBudget from "../../hooks/useAnimationBudget";

export default function SectionShell({ id, className = "", children, amount = 0.2 }) {
  const { shouldLimitMotion } = useAnimationBudget();
  const sectionClassName = `section ${className}`.trim();

  if (shouldLimitMotion) {
    return (
      <section id={id} className={sectionClassName}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={sectionClassName}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.38, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
