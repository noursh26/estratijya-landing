import React from "react";

/** Arabic ⇄ English switch. The label always shows the language you'd switch TO. */
export function LangToggle({ lang = "en", onChange, onDark = true, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const next = lang === "en" ? "ar" : "en";
  const label = next === "ar" ? "العربية" : "English";
  return (
    <button
      {...rest}
      type="button"
      onClick={() => onChange && onChange(next)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Switch to ${next === "ar" ? "Arabic" : "English"}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        minHeight: 36,
        padding: "6px 14px",
        borderRadius: "var(--radius-pill)",
        background: hover ? (onDark ? "rgba(237,244,241,.08)" : "rgba(3,27,28,.04)") : "transparent",
        border: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`,
        color: onDark ? "var(--text-on-dark)" : "var(--text-heading)",
        font: "var(--type-small)",
        fontWeight: "var(--weight-medium)",
        cursor: "pointer",
        transition: "var(--transition-hover)",
        ...style,
      }}
    >
      <span aria-hidden="true" style={{ inlineSize: 6, blockSize: 6, borderRadius: "var(--radius-pill)", background: "var(--green-500)" }} />
      {label}
    </button>
  );
}
