import React from "react";

/** A service tile: title, one-line promise, "Learn more" affordance. */
export function ServiceCard({ title, description, href, action = "Learn more", featured = false, onDark = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      {...rest}
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        padding: "var(--space-8)",
        borderRadius: "var(--radius-card)",
        textDecoration: "none",
        transition: "var(--transition-hover)",
        background: featured ? "var(--surface-accent)" : onDark ? "var(--surface-raised-on-dark)" : "var(--surface-card)",
        color: featured ? "var(--text-on-accent)" : onDark ? "var(--text-on-dark)" : "var(--text-body)",
        border: `1px solid ${featured ? "transparent" : hover ? (onDark ? "var(--border-on-dark-strong)" : "var(--green-300)") : (onDark ? "var(--border-on-dark)" : "var(--border-subtle)")}`,
        boxShadow: featured || onDark ? "none" : hover ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        ...style,
      }}
    >
      <span style={{ fontFamily: "var(--font-core)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-xl)", lineHeight: "var(--leading-snug)", color: featured ? "var(--text-on-accent)" : onDark ? "var(--text-on-dark)" : "var(--text-heading)" }}>{title}</span>
      <p style={{ font: "var(--type-body)", color: featured ? "rgba(3,27,28,.78)" : onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)" }}>{description}</p>
      <span style={{ marginBlockStart: "auto", paddingBlockStart: "var(--space-4)", font: "var(--type-small)", fontWeight: "var(--weight-semibold)", color: featured ? "var(--text-on-accent)" : "var(--green-600)", display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}>
        {action}<span style={{ transform: hover ? "translateX(3px)" : "none", transition: `transform var(--dur-fast) var(--ease-out)` }}>→</span>
      </span>
    </a>
  );
}
