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
              y: -8,
              boxShadow: "0 30px 70px rgba(2, 6, 23, 0.62)",
            }
      }
      transition={shouldReduceMotion ? undefined : { duration: 0.25, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.article>
  );
}
