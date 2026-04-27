import { memo } from "react";
import { motion } from "framer-motion";
import useAnimationBudget from "../hooks/useAnimationBudget";

function SectionDivider() {
  const { shouldLimitMotion } = useAnimationBudget();
  const divider = (
    <div className="section z-10 py-0">
      <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );

  if (shouldLimitMotion) {
    return divider;
  }

  return (
    <motion.div
      className="section z-10 py-0"
      initial={{ opacity: 0, scaleX: 0.9 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
}

export default memo(SectionDivider);
