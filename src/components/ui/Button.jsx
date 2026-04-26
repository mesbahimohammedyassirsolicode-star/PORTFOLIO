import { motion } from "framer-motion";

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-ghost",
};

export default function Button({
  as: Component = "button",
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = `${variantClasses[variant] ?? variantClasses.primary} ${className}`.trim();

  return (
    <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Component href={href} className={classes} {...props}>
        {children}
      </Component>
    </motion.div>
  );
}
