import React from "react";

/** Mint-ticked list of what a phase includes. */
export function CheckList({ items = [], onDark = false, style, ...rest }) {
  return (
    <ul {...rest} style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", font: "var(--type-body)", color: onDark ? "var(--text-on-dark-muted)" : "var(--text-body)" }}>
          <span aria-hidden="true" style={{ flex: "0 0 auto", inlineSize: 18, blockSize: 18, marginBlockStart: 3, borderRadius: "var(--radius-pill)", background: "var(--green-500)", color: "var(--teal-900)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "var(--weight-bold)" }}>✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
