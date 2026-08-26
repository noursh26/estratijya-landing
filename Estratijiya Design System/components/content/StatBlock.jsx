import React from "react";

/** Hero metric: oversized numeral with a quiet label under it. */
export function StatBlock({ value, label, prefix, onDark = true, align = "start", style, ...rest }) {
  return (
    <div {...rest} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", alignItems: align === "center" ? "center" : "flex-start", textAlign: align === "center" ? "center" : "start", ...style }}>
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: 2, fontFamily: "var(--font-core)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-4xl)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)", color: onDark ? "var(--text-on-dark)" : "var(--text-heading)" }}>
        {prefix ? <span style={{ color: "var(--green-500)", fontSize: "var(--text-2xl)" }}>{prefix}</span> : null}
        {value}
      </span>
      <span style={{ font: "var(--type-small)", color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)" }}>{label}</span>
    </div>
  );
}
