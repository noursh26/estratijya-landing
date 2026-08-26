import React from "react";

/** Hairline rule. Horizontal by default; the brand's only divider. */
export function Divider({ onDark = false, inset = 0, vertical = false, style, ...rest }) {
  return (
    <div
      {...rest}
      style={{
        background: onDark ? "var(--border-on-dark)" : "var(--border-subtle)",
        ...(vertical
          ? { width: 1, alignSelf: "stretch", marginBlock: inset }
          : { height: 1, width: "100%", marginInline: inset }),
        ...style,
      }}
    />
  );
}
