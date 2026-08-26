import React from "react";

/** A value or differentiator: bold claim, then the plain-language consequence. */
export function ValueRow({ label, body, onDark = true, align = "start", style, ...rest }) {
  return (
    <div {...rest} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", paddingBlock: "var(--space-4)", textAlign: align, ...style }}>
      <span style={{ fontFamily: "var(--font-core)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-md)", color: onDark ? "var(--text-on-dark)" : "var(--text-heading)" }}>{label}</span>
      <span style={{ font: "var(--type-body)", color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)" }}>{body}</span>
    </div>
  );
}
