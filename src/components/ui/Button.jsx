import { motion } from "framer-motion";
import useAnimationBudget from "../../hooks/useAnimationBudget";
import { memo } from "react";

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-ghost",
};

function Button({
  as: Component = "button",
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const { shouldLimitMotion } = useAnimationBudget();
  const classes = `${variantClasses[variant] ?? variantClasses.primary} ${className}`.trim();

  if (shouldLimitMotion) {
    return (
      <Component href={href} className={classes} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Component href={href} className={classes} {...props}>
        {children}
      </Component>
    </motion.div>
  );
}

export default memo(Button);
