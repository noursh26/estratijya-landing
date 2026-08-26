import React from "react";

/** The big section numeral ("01" … "08") that opens every Estratijiya section. */
export function SectionNumber({ value, onDark = false, size = "md", style, ...rest }) {
  const dims = size === "lg" ? { font: "var(--text-md)", box: 48 } : { font: "var(--text-sm)", box: 36 };
  return (
    <span
      {...rest}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dims.box,
        height: dims.box,
        borderRadius: "var(--radius-pill)",
        border: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`,
        color: onDark ? "var(--green-500)" : "var(--text-accent)",
        fontFamily: "var(--font-core)",
        fontWeight: "var(--weight-bold)",
        fontSize: dims.font,
        letterSpacing: "var(--tracking-none)",
        lineHeight: 1,
        ...style,
      }}
    >
      {value}
    </span>
  );
}
