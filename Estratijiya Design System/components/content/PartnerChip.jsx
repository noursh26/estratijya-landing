import React from "react";

/** Client name in the partners marquee — set in type, no logos supplied. */
export function PartnerChip({ name, onDark = true, style, ...rest }) {
  return (
    <span {...rest} style={{ display: "inline-flex", alignItems: "center", padding: "10px 20px", borderRadius: "var(--radius-chip)", border: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`, font: "var(--type-small)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", whiteSpace: "nowrap", color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)", ...style }}>{name}</span>
  );
}
