import React from "react";

/** One numbered step of the method; expands to reveal its detail on tap. */
export function StepCard({ index, title, detail, expanded = false, onToggle, onDark = true, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      {...rest}
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        padding: "var(--space-6)",
        borderRadius: "var(--radius-card)",
        cursor: onToggle ? "pointer" : "default",
        transition: "var(--transition-hover)",
        background: expanded ? (onDark ? "rgba(100,216,147,.10)" : "var(--surface-accent-soft)") : (onDark ? "var(--surface-raised-on-dark)" : "var(--surface-card)"),
        border: `1px solid ${expanded ? "var(--green-500)" : hover ? (onDark ? "var(--border-on-dark-strong)" : "var(--green-300)") : (onDark ? "var(--border-on-dark)" : "var(--border-subtle)")}`,
        color: onDark ? "var(--text-on-dark)" : "var(--text-body)",
        ...style,
      }}
    >
      <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--green-500)" }}>Step {index}</span>
      <span style={{ fontFamily: "var(--font-core)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-lg)", lineHeight: "var(--leading-snug)" }}>{title}</span>
      <div style={{ display: "grid", gridTemplateRows: expanded ? "1fr" : "0fr", overflow: "hidden", transition: `grid-template-rows var(--dur-base) var(--ease-out)` }}>
        <p style={{ font: "var(--type-body)", color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)", minHeight: 0 }}>{detail}</p>
      </div>
    </div>
  );
}
