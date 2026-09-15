import { Link } from "react-router-dom";

export default function Button({
  children,
  variant = "primary",
  to,
  onClick,
  type = "button",
  className = "",
  ...rest
}) {
  const base = "cp-btn";
  const variantClass = `cp-btn-${variant}`;

  if (to) {
    return (
      <Link to={to} className={`${base} ${variantClass} ${className}`} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
