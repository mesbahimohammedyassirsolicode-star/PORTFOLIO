import { motion } from "framer-motion";

export default function GlassCard({ className = "", children, ...props }) {
  return (
    <motion.article
      className={`glass gradient-border ${className}`.trim()}
      whileHover={{
        y: -8,
        boxShadow: "0 30px 70px rgba(2, 6, 23, 0.62)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.article>
  );
}
