import React from "react";

/** Numbered proof-of-work block: big index, title, what was actually done. */
export function DeliverableCard({ index, title, body, onDark = false, style, ...rest }) {
  return (
    <div {...rest} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", paddingBlock: "var(--space-6)", paddingInline: 0, borderBlockStart: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`, ...style }}>
      <span style={{ fontFamily: "var(--font-core)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-2xl)", lineHeight: 1, color: "var(--green-500)" }}>{index}</span>
      <span style={{ fontFamily: "var(--font-core)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-md)", lineHeight: "var(--leading-snug)", color: onDark ? "var(--text-on-dark)" : "var(--text-heading)" }}>{title}</span>
      <p style={{ font: "var(--type-body)", color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)" }}>{body}</p>
    </div>
  );
}
