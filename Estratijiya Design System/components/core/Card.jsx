import React from "react";

/** Paper card — the brand's content container: white, hairline, soft radius. */
export function Card({
  children,
  tone = "paper",
  padding = "var(--space-8)",
  radius = "var(--radius-card)",
  interactive = false,
  outlined = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    paper: { background: "var(--surface-card)", color: "var(--text-body)", border: outlined ? "1px solid var(--border-subtle)" : "1px solid transparent", boxShadow: "var(--shadow-card)" },
    dark: { background: "var(--surface-raised-on-dark)", color: "var(--text-on-dark)", border: outlined ? "1px solid var(--border-on-dark)" : "1px solid transparent", boxShadow: "none" },
    accent: { background: "var(--surface-accent-soft)", color: "var(--text-heading)", border: outlined ? "1px solid var(--green-300)" : "1px solid transparent", boxShadow: "none" },
    outline: { background: "transparent", color: "inherit", border: "1px solid var(--border-accent)", boxShadow: "none" },
  };
  const hovered = interactive && hover;
  return (
    <div
      {...rest}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: radius,
        padding,
        transition: "var(--transition-hover)",
        cursor: interactive ? "pointer" : undefined,
        ...tones[tone],
        ...(hovered
          ? tone === "dark"
            ? { borderColor: "var(--border-on-dark-strong)", background: "rgba(255,255,255,.07)" }
            : { boxShadow: "var(--shadow-card-hover)", borderColor: "var(--green-300)" }
          : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
