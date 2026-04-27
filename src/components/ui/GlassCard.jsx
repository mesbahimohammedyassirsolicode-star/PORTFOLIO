import { motion, useReducedMotion } from "framer-motion";

export default function GlassCard({ className = "", children, ...props }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`glass gradient-border ${className}`.trim()}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              boxShadow: "0 22px 52px rgba(2, 6, 23, 0.56)",
            }
      }
      transition={shouldReduceMotion ? undefined : { duration: 0.22, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.article>
  );
}
