import React from "react";

const BASE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-2)",
  fontFamily: "var(--font-core)",
  fontWeight: "var(--weight-semibold)",
  borderRadius: "var(--radius-button)",
  border: "1px solid transparent",
  cursor: "pointer",
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "var(--transition-hover)",
};

const SIZES = {
  sm: { fontSize: "var(--text-sm)", padding: "8px 16px", minHeight: 36 },
  md: { fontSize: "var(--text-base)", padding: "12px 24px", minHeight: 44 },
  lg: { fontSize: "var(--text-md)", padding: "16px 32px", minHeight: 52 },
};

function variantStyle(variant, onDark) {
  switch (variant) {
    case "secondary":
      return onDark
        ? { background: "transparent", color: "var(--text-on-dark)", borderColor: "var(--border-on-dark-strong)" }
        : { background: "transparent", color: "var(--text-heading)", borderColor: "var(--border-strong)" };
    case "ghost":
      return onDark
        ? { background: "transparent", color: "var(--text-on-dark-muted)" }
        : { background: "transparent", color: "var(--text-muted)" };
    case "dark":
      return { background: "var(--surface-ink)", color: "var(--text-on-dark)" };
    case "primary":
    default:
      return { background: "var(--surface-accent)", color: "var(--text-on-accent)" };
  }
}

function hoverStyle(variant, onDark) {
  switch (variant) {
    case "secondary":
      return onDark
        ? { background: "rgba(237,244,241,.08)", borderColor: "var(--border-on-dark-strong)" }
        : { background: "rgba(3,27,28,.04)", borderColor: "var(--text-heading)" };
    case "ghost":
      return onDark ? { color: "var(--text-on-dark)" } : { color: "var(--text-heading)" };
    case "dark":
      return { background: "var(--teal-700)" };
    default:
      return { background: "var(--green-600)" };
  }
}

/** Estratijiya pill action. Primary = mint on any ground; secondary = hairline outline. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  onDark = false,
  disabled = false,
  fullWidth = false,
  iconStart,
  iconEnd,
  href,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href ? "a" : "button";
  const merged = {
    ...BASE,
    ...SIZES[size],
    ...variantStyle(variant, onDark),
    ...(hover && !disabled ? hoverStyle(variant, onDark) : null),
    ...(press && !disabled ? { transform: "scale(var(--press-scale))" } : null),
    ...(fullWidth ? { width: "100%" } : null),
    ...(disabled ? { opacity: 0.4, cursor: "not-allowed" } : null),
    ...style,
  };
  return (
    <Tag
      {...rest}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={merged}
    >
      {iconStart}
      {children}
      {iconEnd}
    </Tag>
  );
}
