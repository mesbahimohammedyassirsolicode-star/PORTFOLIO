import { motion } from "framer-motion";
import useAnimationBudget from "../../hooks/useAnimationBudget";
import { memo } from "react";

function GlassCard({ className = "", children, ...props }) {
  const { shouldLimitMotion } = useAnimationBudget();
  const classes = `glass gradient-border ${className}`.trim();

  if (shouldLimitMotion) {
    const staticProps = { ...props };
    delete staticProps.initial;
    delete staticProps.animate;
    delete staticProps.whileInView;
    delete staticProps.whileHover;
    delete staticProps.whileTap;
    delete staticProps.variants;
    delete staticProps.viewport;
    delete staticProps.transition;
    delete staticProps.style;

    return (
      <article className={classes} {...staticProps}>
        {children}
      </article>
    );
  }

  return (
    <motion.article
      className={classes}
      whileHover={{
        y: -2,
        scale: 1.004,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.article>
  );
}

export default memo(GlassCard);
