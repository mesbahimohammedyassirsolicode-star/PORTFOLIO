import useAnimationBudget from "../../hooks/useAnimationBudget";
import { memo } from "react";

function GlassCard({ className = "", children, ...props }) {
  const { shouldLimitMotion } = useAnimationBudget();
  const classes = `glass gradient-border ${className}`.trim();

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
    <article className={classes} data-limit-motion={shouldLimitMotion ? "true" : "false"} {...staticProps}>
      {children}
    </article>
  );
}

export default memo(GlassCard);
