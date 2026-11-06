import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "btn btn-primary",
  outline: "btn btn-outline",
  ghost: "btn btn-ghost",
};

export default function Button({ variant = "primary", to, href, icon, className = "", children, ...rest }) {
  const classes = `${VARIANTS[variant] || VARIANTS.primary}${className ? ` ${className}` : ""}`;
  const content = (
    <>
      {icon && <i className={`fa-solid ${icon}`} aria-hidden="true"></i>}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
