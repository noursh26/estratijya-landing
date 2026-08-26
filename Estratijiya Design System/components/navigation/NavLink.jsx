import React from "react";

/** Top-bar navigation link. Underline grows from the start edge on hover. */
export function NavLink({ children, href = "#", active = false, onDark = true, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const lit = active || hover;
  return (
    <a
      {...rest}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        paddingBlock: "var(--space-2)",
        font: "var(--type-small)",
        fontWeight: "var(--weight-medium)",
        textDecoration: "none",
        color: lit ? (onDark ? "var(--text-on-dark)" : "var(--text-heading)") : (onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)"),
        transition: "color var(--dur-fast) var(--ease-in-out)",
        ...style,
      }}
    >
      {children}
      <span aria-hidden="true" style={{ position: "absolute", insetInlineStart: 0, insetBlockEnd: 0, blockSize: 1, inlineSize: lit ? "100%" : 0, background: "var(--green-500)", transition: `inline-size var(--dur-base) var(--ease-out)` }} />
    </a>
  );
}
