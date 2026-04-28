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
  const classes = `${variantClasses[variant] ?? variantClasses.primary} btn-interactive ${className}`.trim();

  return (
    <Component href={href} className={classes} {...props}>
      {children}
    </Component>
  );
}

export default memo(Button);
