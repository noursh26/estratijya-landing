import React from "react";

/** Small tracked-out label above a heading ("What sets us apart"). */
export function Eyebrow({ children, onDark = false, style, ...rest }) {
  return (
    <span
      {...rest}
      style={{
        display: "block",
        font: "var(--type-eyebrow)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        color: onDark ? "var(--green-500)" : "var(--text-accent)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
