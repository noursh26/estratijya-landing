import React from "react";

/** The section opener: numeral, eyebrow, heading, optional lede. */
export function SectionHeader({ number, eyebrow, title, lede, onDark = false, align = "start", style, ...rest }) {
  return (
    <header {...rest} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", alignItems: align === "center" ? "center" : "flex-start", textAlign: align, maxInlineSize: align === "center" ? "var(--measure)" : undefined, marginInline: align === "center" ? "auto" : undefined, ...style }}>
      {(number || eyebrow) && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          {number ? (
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", inlineSize: 36, blockSize: 36, borderRadius: "var(--radius-pill)", border: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`, fontFamily: "var(--font-core)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-sm)", color: "var(--green-500)" }}>{number}</span>
          ) : null}
          {eyebrow ? (
            <span style={{ font: "var(--type-eyebrow)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: onDark ? "var(--green-500)" : "var(--text-accent)" }}>{eyebrow}</span>
          ) : null}
        </div>
      )}
      <h2 style={{ font: "var(--type-h2)", letterSpacing: "var(--tracking-tight)", color: onDark ? "var(--text-on-dark)" : "var(--text-heading)", margin: 0, textWrap: "balance" }}>{title}</h2>
      {lede ? <p style={{ font: "var(--type-body-lg)", color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)", maxInlineSize: "var(--measure)" }}>{lede}</p> : null}
    </header>
  );
}
