/* @ds-bundle: {"format":4,"namespace":"EstratijiyaDesignSystem_92e519","components":[{"name":"CheckList","sourcePath":"components/content/CheckList.jsx"},{"name":"DeliverableCard","sourcePath":"components/content/DeliverableCard.jsx"},{"name":"PartnerChip","sourcePath":"components/content/PartnerChip.jsx"},{"name":"ServiceCard","sourcePath":"components/content/ServiceCard.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"StepCard","sourcePath":"components/content/StepCard.jsx"},{"name":"ValueRow","sourcePath":"components/content/ValueRow.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"SectionNumber","sourcePath":"components/core/SectionNumber.jsx"},{"name":"LangToggle","sourcePath":"components/navigation/LangToggle.jsx"},{"name":"NavLink","sourcePath":"components/navigation/NavLink.jsx"},{"name":"SectionHeader","sourcePath":"components/navigation/SectionHeader.jsx"}],"sourceHashes":{"components/content/CheckList.jsx":"4c83b0952508","components/content/DeliverableCard.jsx":"9b57587a4f9b","components/content/PartnerChip.jsx":"b02c34ee0d54","components/content/ServiceCard.jsx":"553f72b29f89","components/content/StatBlock.jsx":"a900a1ee6ed5","components/content/StepCard.jsx":"d627cae44f3f","components/content/ValueRow.jsx":"362edfe2ebfb","components/core/Button.jsx":"aa5ea6e052a6","components/core/Card.jsx":"1234dc46fa45","components/core/Divider.jsx":"ccd27c22bcad","components/core/Eyebrow.jsx":"b1a529112e9f","components/core/Logo.jsx":"a1b82ec524c1","components/core/SectionNumber.jsx":"25bb495ab50b","components/navigation/LangToggle.jsx":"9a9f5aed9fe7","components/navigation/NavLink.jsx":"f9dbb43aca55","components/navigation/SectionHeader.jsx":"29698084f098","ui_kits/website/App.jsx":"d4bbd89567c4","ui_kits/website/SectionsBottom.jsx":"a03c91d685a7","ui_kits/website/SectionsTop.jsx":"1ccff5f3bbe1","ui_kits/website/copy.js":"82a57b6f56c4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EstratijiyaDesignSystem_92e519 = window.EstratijiyaDesignSystem_92e519 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/CheckList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Mint-ticked list of what a phase includes. */
function CheckList({
  items = [],
  onDark = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("ul", _extends({}, rest, {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }), items.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "flex-start",
      font: "var(--type-body)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flex: "0 0 auto",
      inlineSize: 18,
      blockSize: 18,
      marginBlockStart: 3,
      borderRadius: "var(--radius-pill)",
      background: "var(--green-500)",
      color: "var(--teal-900)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: "var(--weight-bold)"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, item))));
}
Object.assign(__ds_scope, { CheckList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CheckList.jsx", error: String((e && e.message) || e) }); }

// components/content/DeliverableCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Numbered proof-of-work block: big index, title, what was actually done. */
function DeliverableCard({
  index,
  title,
  body,
  onDark = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      paddingBlock: "var(--space-6)",
      paddingInline: 0,
      borderBlockStart: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`,
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-2xl)",
      lineHeight: 1,
      color: "var(--green-500)"
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--text-md)",
      lineHeight: "var(--leading-snug)",
      color: onDark ? "var(--text-on-dark)" : "var(--text-heading)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)"
    }
  }, body));
}
Object.assign(__ds_scope, { DeliverableCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/DeliverableCard.jsx", error: String((e && e.message) || e) }); }

// components/content/PartnerChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Client name in the partners marquee — set in type, no logos supplied. */
function PartnerChip({
  name,
  onDark = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "10px 20px",
      borderRadius: "var(--radius-chip)",
      border: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`,
      font: "var(--type-small)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
      ...style
    }
  }), name);
}
Object.assign(__ds_scope, { PartnerChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PartnerChip.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** A service tile: title, one-line promise, "Learn more" affordance. */
function ServiceCard({
  title,
  description,
  href,
  action = "Learn more",
  featured = false,
  onDark = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({}, rest, {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      padding: "var(--space-8)",
      borderRadius: "var(--radius-card)",
      textDecoration: "none",
      transition: "var(--transition-hover)",
      background: featured ? "var(--surface-accent)" : onDark ? "var(--surface-raised-on-dark)" : "var(--surface-card)",
      color: featured ? "var(--text-on-accent)" : onDark ? "var(--text-on-dark)" : "var(--text-body)",
      border: `1px solid ${featured ? "transparent" : hover ? onDark ? "var(--border-on-dark-strong)" : "var(--green-300)" : onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`,
      boxShadow: featured || onDark ? "none" : hover ? "var(--shadow-card-hover)" : "var(--shadow-card)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--text-xl)",
      lineHeight: "var(--leading-snug)",
      color: featured ? "var(--text-on-accent)" : onDark ? "var(--text-on-dark)" : "var(--text-heading)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: featured ? "rgba(3,27,28,.78)" : onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)"
    }
  }, description), /*#__PURE__*/React.createElement("span", {
    style: {
      marginBlockStart: "auto",
      paddingBlockStart: "var(--space-4)",
      font: "var(--type-small)",
      fontWeight: "var(--weight-semibold)",
      color: featured ? "var(--text-on-accent)" : "var(--green-600)",
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)"
    }
  }, action, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: hover ? "translateX(3px)" : "none",
      transition: `transform var(--dur-fast) var(--ease-out)`
    }
  }, "\u2192")));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hero metric: oversized numeral with a quiet label under it. */
function StatBlock({
  value,
  label,
  prefix,
  onDark = true,
  align = "start",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)",
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align === "center" ? "center" : "start",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: 2,
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-4xl)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-tight)",
      color: onDark ? "var(--text-on-dark)" : "var(--text-heading)"
    }
  }, prefix ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--green-500)",
      fontSize: "var(--text-2xl)"
    }
  }, prefix) : null, value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-small)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)"
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/content/StepCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One numbered step of the method; expands to reveal its detail on tap. */
function StepCard({
  index,
  title,
  detail,
  expanded = false,
  onToggle,
  onDark = true,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onClick: onToggle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      padding: "var(--space-6)",
      borderRadius: "var(--radius-card)",
      cursor: onToggle ? "pointer" : "default",
      transition: "var(--transition-hover)",
      background: expanded ? onDark ? "rgba(100,216,147,.10)" : "var(--surface-accent-soft)" : onDark ? "var(--surface-raised-on-dark)" : "var(--surface-card)",
      border: `1px solid ${expanded ? "var(--green-500)" : hover ? onDark ? "var(--border-on-dark-strong)" : "var(--green-300)" : onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`,
      color: onDark ? "var(--text-on-dark)" : "var(--text-body)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--green-500)"
    }
  }, "Step ", index), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--text-lg)",
      lineHeight: "var(--leading-snug)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateRows: expanded ? "1fr" : "0fr",
      overflow: "hidden",
      transition: `grid-template-rows var(--dur-base) var(--ease-out)`
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
      minHeight: 0
    }
  }, detail)));
}
Object.assign(__ds_scope, { StepCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StepCard.jsx", error: String((e && e.message) || e) }); }

// components/content/ValueRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** A value or differentiator: bold claim, then the plain-language consequence. */
function ValueRow({
  label,
  body,
  onDark = true,
  align = "start",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)",
      paddingBlock: "var(--space-4)",
      textAlign: align,
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-md)",
      color: onDark ? "var(--text-on-dark)" : "var(--text-heading)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)"
    }
  }, body));
}
Object.assign(__ds_scope, { ValueRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ValueRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BASE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-2)",
  fontFamily: "var(--font-core)",
  fontWeight: "var(--weight-semibold)",
  borderRadius: "var(--radius-button)",
  border: "1px solid transparent",
  cursor: "pointer",
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "var(--transition-hover)"
};
const SIZES = {
  sm: {
    fontSize: "var(--text-sm)",
    padding: "8px 16px",
    minHeight: 36
  },
  md: {
    fontSize: "var(--text-base)",
    padding: "12px 24px",
    minHeight: 44
  },
  lg: {
    fontSize: "var(--text-md)",
    padding: "16px 32px",
    minHeight: 52
  }
};
function variantStyle(variant, onDark) {
  switch (variant) {
    case "secondary":
      return onDark ? {
        background: "transparent",
        color: "var(--text-on-dark)",
        borderColor: "var(--border-on-dark-strong)"
      } : {
        background: "transparent",
        color: "var(--text-heading)",
        borderColor: "var(--border-strong)"
      };
    case "ghost":
      return onDark ? {
        background: "transparent",
        color: "var(--text-on-dark-muted)"
      } : {
        background: "transparent",
        color: "var(--text-muted)"
      };
    case "dark":
      return {
        background: "var(--surface-ink)",
        color: "var(--text-on-dark)"
      };
    case "primary":
    default:
      return {
        background: "var(--surface-accent)",
        color: "var(--text-on-accent)"
      };
  }
}
function hoverStyle(variant, onDark) {
  switch (variant) {
    case "secondary":
      return onDark ? {
        background: "rgba(237,244,241,.08)",
        borderColor: "var(--border-on-dark-strong)"
      } : {
        background: "rgba(3,27,28,.04)",
        borderColor: "var(--text-heading)"
      };
    case "ghost":
      return onDark ? {
        color: "var(--text-on-dark)"
      } : {
        color: "var(--text-heading)"
      };
    case "dark":
      return {
        background: "var(--teal-700)"
      };
    default:
      return {
        background: "var(--green-600)"
      };
  }
}

/** Estratijiya pill action. Primary = mint on any ground; secondary = hairline outline. */
function Button({
  children,
  variant = "primary",
  size = "md",
  onDark = false,
  disabled = false,
  fullWidth = false,
  iconStart,
  iconEnd,
  href,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href ? "a" : "button";
  const merged = {
    ...BASE,
    ...SIZES[size],
    ...variantStyle(variant, onDark),
    ...(hover && !disabled ? hoverStyle(variant, onDark) : null),
    ...(press && !disabled ? {
      transform: "scale(var(--press-scale))"
    } : null),
    ...(fullWidth ? {
      width: "100%"
    } : null),
    ...(disabled ? {
      opacity: 0.4,
      cursor: "not-allowed"
    } : null),
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    href: href,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: merged
  }), iconStart, children, iconEnd);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Paper card — the brand's content container: white, hairline, soft radius. */
function Card({
  children,
  tone = "paper",
  padding = "var(--space-8)",
  radius = "var(--radius-card)",
  interactive = false,
  outlined = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    paper: {
      background: "var(--surface-card)",
      color: "var(--text-body)",
      border: outlined ? "1px solid var(--border-subtle)" : "1px solid transparent",
      boxShadow: "var(--shadow-card)"
    },
    dark: {
      background: "var(--surface-raised-on-dark)",
      color: "var(--text-on-dark)",
      border: outlined ? "1px solid var(--border-on-dark)" : "1px solid transparent",
      boxShadow: "none"
    },
    accent: {
      background: "var(--surface-accent-soft)",
      color: "var(--text-heading)",
      border: outlined ? "1px solid var(--green-300)" : "1px solid transparent",
      boxShadow: "none"
    },
    outline: {
      background: "transparent",
      color: "inherit",
      border: "1px solid var(--border-accent)",
      boxShadow: "none"
    }
  };
  const hovered = interactive && hover;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: radius,
      padding,
      transition: "var(--transition-hover)",
      cursor: interactive ? "pointer" : undefined,
      ...tones[tone],
      ...(hovered ? tone === "dark" ? {
        borderColor: "var(--border-on-dark-strong)",
        background: "rgba(255,255,255,.07)"
      } : {
        boxShadow: "var(--shadow-card-hover)",
        borderColor: "var(--green-300)"
      } : null),
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hairline rule. Horizontal by default; the brand's only divider. */
function Divider({
  onDark = false,
  inset = 0,
  vertical = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      background: onDark ? "var(--border-on-dark)" : "var(--border-subtle)",
      ...(vertical ? {
        width: 1,
        alignSelf: "stretch",
        marginBlock: inset
      } : {
        height: 1,
        width: "100%",
        marginInline: inset
      }),
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small tracked-out label above a heading ("What sets us apart"). */
function Eyebrow({
  children,
  onDark = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "block",
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: onDark ? "var(--green-500)" : "var(--text-accent)",
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SRC = {
  green: "logo-green.png",
  white: "logo-white.png",
  dark: "logo-dark.png"
};
const ICON_SRC = {
  green: "icon-green.png",
  white: "icon-white.png",
  dark: "icon-dark.png"
};

/** The Estratijiya lockup or mark, drawn from the supplied PNG assets. */
function Logo({
  tone = "green",
  markOnly = false,
  height = 32,
  assetBase = "assets",
  alt = "Estratijiya",
  style,
  ...rest
}) {
  const file = markOnly ? ICON_SRC[tone] : SRC[tone];
  return /*#__PURE__*/React.createElement("img", _extends({}, rest, {
    src: `${assetBase}/${file}`,
    alt: alt,
    style: {
      height,
      width: "auto",
      display: "block",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionNumber.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The big section numeral ("01" … "08") that opens every Estratijiya section. */
function SectionNumber({
  value,
  onDark = false,
  size = "md",
  style,
  ...rest
}) {
  const dims = size === "lg" ? {
    font: "var(--text-md)",
    box: 48
  } : {
    font: "var(--text-sm)",
    box: 36
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
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
      ...style
    }
  }), value);
}
Object.assign(__ds_scope, { SectionNumber });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionNumber.jsx", error: String((e && e.message) || e) }); }

// components/navigation/LangToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Arabic ⇄ English switch. The label always shows the language you'd switch TO. */
function LangToggle({
  lang = "en",
  onChange,
  onDark = true,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const next = lang === "en" ? "ar" : "en";
  const label = next === "ar" ? "العربية" : "English";
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    type: "button",
    onClick: () => onChange && onChange(next),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": `Switch to ${next === "ar" ? "Arabic" : "English"}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      minHeight: 36,
      padding: "6px 14px",
      borderRadius: "var(--radius-pill)",
      background: hover ? onDark ? "rgba(237,244,241,.08)" : "rgba(3,27,28,.04)" : "transparent",
      border: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`,
      color: onDark ? "var(--text-on-dark)" : "var(--text-heading)",
      font: "var(--type-small)",
      fontWeight: "var(--weight-medium)",
      cursor: "pointer",
      transition: "var(--transition-hover)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      inlineSize: 6,
      blockSize: 6,
      borderRadius: "var(--radius-pill)",
      background: "var(--green-500)"
    }
  }), label);
}
Object.assign(__ds_scope, { LangToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/LangToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Top-bar navigation link. Underline grows from the start edge on hover. */
function NavLink({
  children,
  href = "#",
  active = false,
  onDark = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lit = active || hover;
  return /*#__PURE__*/React.createElement("a", _extends({}, rest, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      paddingBlock: "var(--space-2)",
      font: "var(--type-small)",
      fontWeight: "var(--weight-medium)",
      textDecoration: "none",
      color: lit ? onDark ? "var(--text-on-dark)" : "var(--text-heading)" : onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
      transition: "color var(--dur-fast) var(--ease-in-out)",
      ...style
    }
  }), children, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      insetInlineStart: 0,
      insetBlockEnd: 0,
      blockSize: 1,
      inlineSize: lit ? "100%" : 0,
      background: "var(--green-500)",
      transition: `inline-size var(--dur-base) var(--ease-out)`
    }
  }));
}
Object.assign(__ds_scope, { NavLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavLink.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The section opener: numeral, eyebrow, heading, optional lede. */
function SectionHeader({
  number,
  eyebrow,
  title,
  lede,
  onDark = false,
  align = "start",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align,
      maxInlineSize: align === "center" ? "var(--measure)" : undefined,
      marginInline: align === "center" ? "auto" : undefined,
      ...style
    }
  }), (number || eyebrow) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, number ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      inlineSize: 36,
      blockSize: 36,
      borderRadius: "var(--radius-pill)",
      border: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-subtle)"}`,
      fontFamily: "var(--font-core)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-sm)",
      color: "var(--green-500)"
    }
  }, number) : null, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: onDark ? "var(--green-500)" : "var(--text-accent)"
    }
  }, eyebrow) : null), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--tracking-tight)",
      color: onDark ? "var(--text-on-dark)" : "var(--text-heading)",
      margin: 0,
      textWrap: "balance"
    }
  }, title), lede ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lg)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
      maxInlineSize: "var(--measure)"
    }
  }, lede) : null);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
function Site() {
  const [lang, setLang] = React.useState("en");
  const [active, setActive] = React.useState("about");
  const copy = window.SITE_COPY[lang];
  React.useEffect(() => {
    document.documentElement.dir = copy.dir;
    document.documentElement.lang = lang;
  }, [lang, copy.dir]);
  const go = id => {
    const el = document.getElementById(id);
    const scroller = document.getElementById("scroller");
    if (el && scroller) scroller.scrollTo({
      top: el.offsetTop - 72,
      behavior: "smooth"
    });
    setActive(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "scroller",
    dir: copy.dir,
    style: {
      height: "100vh",
      overflowY: "auto",
      background: "var(--surface-page)",
      fontFamily: copy.dir === "rtl" ? "var(--font-arabic)" : "var(--font-core)"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    copy: copy,
    lang: lang,
    setLang: setLang,
    active: active,
    go: go
  }), /*#__PURE__*/React.createElement(Hero, {
    copy: copy,
    go: go
  }), /*#__PURE__*/React.createElement(About, {
    copy: copy
  }), /*#__PURE__*/React.createElement(Method, {
    copy: copy
  }), /*#__PURE__*/React.createElement(Services, {
    copy: copy
  }), /*#__PURE__*/React.createElement(Audience, {
    copy: copy
  }), /*#__PURE__*/React.createElement(Results, {
    copy: copy
  }), /*#__PURE__*/React.createElement(Partners, {
    copy: copy
  }), /*#__PURE__*/React.createElement(Contact, {
    copy: copy
  }), /*#__PURE__*/React.createElement(Footer, {
    copy: copy
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Site, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SectionsBottom.jsx
try { (() => {
function Audience({
  copy
}) {
  const a = copy.audience;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...section(false),
      background: "var(--surface-page-alt)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      display: "grid",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    number: a.n,
    eyebrow: a.eyebrow,
    title: a.title,
    lede: a.lede
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-10)",
    radius: "var(--radius-card-lg)",
    style: {
      display: "grid",
      gap: "var(--space-5)",
      borderColor: "var(--green-300)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      justifySelf: "start",
      padding: "6px 14px",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-accent)",
      color: "var(--text-on-accent)",
      font: "var(--type-eyebrow)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase"
    }
  }, a.a.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)"
    }
  }, a.a.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)"
    }
  }, a.a.d), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(CheckList, {
    items: a.a.items
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-10)",
    radius: "var(--radius-card-lg)",
    style: {
      display: "grid",
      gap: "var(--space-5)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      marginBlockStart: 40
    }
  }, a.b.t), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)"
    }
  }, a.b.d), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(CheckList, {
    items: a.b.items
  })))));
}
function Results({
  copy
}) {
  const r = copy.results;
  return /*#__PURE__*/React.createElement("section", {
    id: "results",
    style: section(true)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      display: "grid",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    onDark: true,
    number: r.n,
    eyebrow: r.eyebrow,
    title: r.title,
    lede: r.lede
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--space-8)"
    }
  }, r.items.map(it => /*#__PURE__*/React.createElement(DeliverableCard, {
    key: it.i,
    index: it.i,
    title: it.t,
    body: it.d,
    onDark: true
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-h3)",
      color: "var(--text-on-dark)",
      textAlign: "center",
      marginBlockStart: "var(--space-6)"
    }
  }, r.close)));
}
const PARTNERS = ["Kilani", "Royal Golf", "Tojan", "The Date Room", "Ana Al Madina", "Qusai Ironman", "Leo Designs", "Candles Land", "ARC Design", "DAL", "Petravex", "Bolu Pınar", "Pink & Greens", "Visualiz"];
function Partners({
  copy
}) {
  const p = copy.partners;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...section(false),
      paddingBlock: "var(--section-y-tight)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      display: "grid",
      gap: "var(--space-8)",
      justifyItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    number: p.n,
    title: p.title,
    lede: p.lede,
    align: "center"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBlock: "var(--space-10)",
      display: "flex",
      gap: "var(--space-3)",
      width: "max-content",
      animation: "marquee 38s linear infinite"
    }
  }, [...PARTNERS, ...PARTNERS].map((n, i) => /*#__PURE__*/React.createElement(PartnerChip, {
    key: i,
    name: n,
    onDark: false
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      ...shell,
      font: "var(--type-body-lg)",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, p.close));
}
function Contact({
  copy
}) {
  const c = copy.contact;
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      position: "relative",
      background: "var(--surface-ink)",
      overflow: "hidden",
      paddingBlock: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${A}/signage.png)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.35
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      position: "relative",
      display: "grid",
      gap: "var(--space-6)",
      justifyItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    onDark: true,
    number: c.n,
    title: c.title,
    align: "center"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lg)",
      color: "var(--text-on-dark-muted)",
      maxInlineSize: "58ch"
    }
  }, c.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    href: "mailto:info@estratijiya.com"
  }, c.primary), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onDark: true,
    href: "https://wa.me/971507001576"
  }, c.secondary))));
}
function Footer({
  copy
}) {
  const f = copy.footer;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-ink)",
      borderBlockStart: "1px solid var(--border-on-dark)",
      paddingBlock: "var(--space-16) var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    tone: "white",
    height: 26,
    assetBase: A
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--green-500)",
      fontWeight: "var(--weight-semibold)"
    }
  }, f.tagline), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-on-dark-muted)"
    }
  }, f.address)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: "var(--text-on-dark)",
      font: "var(--type-h4)"
    }
  }, f.links), copy.nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#about",
    style: {
      font: "var(--type-small)",
      color: "var(--text-on-dark-muted)"
    }
  }, n))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: "var(--text-on-dark)",
      font: "var(--type-h4)"
    }
  }, f.touch), [["info@estratijiya.com", "mailto:info@estratijiya.com"], ["+971 50 700 1576", "tel:+971507001576"], ["estratijiya.com", "https://estratijiya.com"], ["WhatsApp: +971 50 700 1576", "https://wa.me/971507001576"]].map(([t, h]) => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: h,
    style: {
      font: "var(--type-small)",
      color: "var(--text-on-dark-muted)"
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      marginBlockStart: "var(--space-12)",
      paddingBlockStart: "var(--space-6)",
      borderBlockStart: "1px solid var(--border-on-dark)",
      font: "var(--type-small)",
      color: "var(--text-on-dark-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, f.rights), /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: "var(--tracking-wider)"
    }
  }, "ESTRATIJIYA \xB7 DUBAI")));
}
Object.assign(window, {
  Audience,
  Results,
  Partners,
  Contact,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SectionsBottom.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SectionsTop.jsx
try { (() => {
const {
  Button,
  Card,
  Divider,
  Logo,
  NavLink,
  LangToggle,
  SectionHeader,
  StatBlock,
  StepCard,
  ServiceCard,
  CheckList,
  DeliverableCard,
  ValueRow,
  PartnerChip
} = window.EstratijiyaDesignSystem_92e519;
const A = "../../assets";
const shell = {
  maxWidth: "var(--container)",
  marginInline: "auto",
  paddingInline: "var(--gutter-lg)"
};
const section = dark => ({
  paddingBlock: "var(--section-y)",
  background: dark ? "var(--surface-dark)" : "var(--surface-page)"
});
function Header({
  copy,
  lang,
  setLang,
  active,
  go
}) {
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const el = document.getElementById("scroller");
    const onScroll = () => setSolid(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const ids = ["about", "services", "results", "contact"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: solid ? "rgba(3,27,28,.86)" : "transparent",
      backdropFilter: solid ? `blur(var(--blur-glass))` : "none",
      borderBottom: `1px solid ${solid ? "var(--border-on-dark)" : "transparent"}`,
      transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-8)",
      paddingBlock: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    tone: "white",
    height: 26,
    assetBase: A
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-8)"
    }
  }, copy.nav.map((label, i) => /*#__PURE__*/React.createElement(NavLink, {
    key: label,
    href: `#${ids[i]}`,
    active: active === ids[i],
    onClick: e => {
      e.preventDefault();
      go(ids[i]);
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(LangToggle, {
    lang: lang,
    onChange: setLang,
    onDark: true
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => go("contact")
  }, copy.cta))));
}
function Hero({
  copy,
  go
}) {
  const h = copy.hero;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--surface-ink)",
      overflow: "hidden",
      paddingBlock: "var(--space-32) var(--space-20)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${A}/cover.png)`,
      backgroundSize: "cover",
      backgroundPosition: "center right",
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-start)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      position: "relative",
      display: "grid",
      gap: "var(--space-8)",
      maxWidth: 1240
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--tracking-wider)",
      color: "var(--green-500)"
    }
  }, h.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--weight-bold) var(--text-6xl)/var(--leading-tight) var(--font-core)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--text-on-dark)",
      maxInlineSize: "18ch",
      margin: 0
    }
  }, h.title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lg)",
      color: "var(--green-500)",
      fontWeight: "var(--weight-semibold)"
    }
  }, h.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go("contact")
  }, h.primary), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onDark: true,
    onClick: () => go("method")
  }, h.secondary)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-10)",
      marginBlockStart: "var(--space-12)",
      flexWrap: "wrap"
    }
  }, h.stats.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: s.label
  }, i > 0 ? /*#__PURE__*/React.createElement(Divider, {
    onDark: true,
    vertical: true,
    style: {
      height: 56
    }
  }) : null, /*#__PURE__*/React.createElement(StatBlock, {
    prefix: s.prefix,
    value: s.value,
    label: s.label,
    onDark: true
  }))))));
}
function About({
  copy
}) {
  const a = copy.about,
    v = copy.vision;
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: section(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      display: "grid",
      gap: "var(--space-24)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    number: a.n,
    eyebrow: a.eyebrow,
    title: /*#__PURE__*/React.createElement(React.Fragment, null, a.titleA, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-accent)"
      }
    }, a.titleB))
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)"
    }
  }, a.lead), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lg)",
      color: "var(--text-muted)",
      maxInlineSize: "var(--measure)"
    }
  }, a.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-media)",
      overflow: "hidden",
      aspectRatio: "4/5",
      background: `url(${A}/city.png) center/cover`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.1fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-media)",
      overflow: "hidden",
      aspectRatio: "4/5",
      background: `url(${A}/corridor.png) center/cover`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    number: v.n,
    eyebrow: v.eyebrow,
    title: v.title
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lg)",
      color: "var(--text-muted)",
      maxInlineSize: "var(--measure)"
    }
  }, v.body)))));
}
function Method({
  copy
}) {
  const m = copy.method;
  const [open, setOpen] = React.useState(m.steps[0].i);
  return /*#__PURE__*/React.createElement("section", {
    id: "method",
    style: section(true)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      display: "grid",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    onDark: true,
    number: m.n,
    eyebrow: m.eyebrow,
    title: m.title,
    lede: m.kicker
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-on-dark-muted)"
    }
  }, m.hint)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--space-4)"
    }
  }, m.steps.map(s => /*#__PURE__*/React.createElement(StepCard, {
    key: s.i,
    index: s.i,
    title: s.t,
    detail: s.d,
    expanded: open === s.i,
    onToggle: () => setOpen(open === s.i ? null : s.i),
    onDark: true
  })))));
}
function Services({
  copy
}) {
  const s = copy.services;
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: section(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      display: "grid",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    number: s.n,
    eyebrow: s.eyebrow,
    title: s.title,
    lede: s.lede
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--space-6)"
    }
  }, s.items.map(it => /*#__PURE__*/React.createElement(ServiceCard, {
    key: it.t,
    title: it.t,
    description: it.d,
    href: "#services"
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "accent",
    padding: "var(--space-12)",
    outlined: false,
    radius: "var(--radius-card-lg)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.4fr",
      gap: "var(--space-10)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-eyebrow)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--green-700)"
    }
  }, s.featured.eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, s.featured.t)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      justifyItems: "start"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lg)",
      color: "var(--text-body)"
    }
  }, s.featured.d), /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    href: "#services"
  }, copy.cta))))));
}
Object.assign(window, {
  Header,
  Hero,
  About,
  Method,
  Services,
  shell,
  section,
  A
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SectionsTop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/copy.js
try { (() => {
window.SITE_COPY = {
  en: {
    dir: "ltr",
    nav: ["About", "Services", "Results", "Contact"],
    cta: "Let's talk",
    hero: {
      eyebrow: "ESTRATIJIYA",
      title: "Once the strategy is built, we walk every step with you through supervision and execution.",
      tagline: "Your growth. Our system.",
      primary: "Let's talk",
      secondary: "See How We Work",
      stats: [{
        prefix: "+",
        value: "40",
        label: "Active clients"
      }, {
        value: "7",
        label: "Integrated divisions"
      }, {
        value: "Dubai",
        label: "Office 501"
      }]
    },
    about: {
      n: "01",
      eyebrow: "What sets us apart",
      titleA: "Growth is no accident.",
      titleB: "It's strategy.",
      lead: "We don't sell scattered services.",
      body: "We study your company and build it from the inside out — operations, sales, marketing, and technology — into one system. Everything connected, everything measurable, and everything still working long after our part is done."
    },
    vision: {
      n: "02",
      eyebrow: "Our vision",
      title: "Every path has its steps, and at the end of each step a point of success.",
      body: "We believe growth never comes by chance. Behind every jump in the numbers is a deliberate strategy and a team watching over every detail."
    },
    method: {
      n: "03",
      eyebrow: "The method",
      kicker: "We draw you the map closest to your goal.",
      title: "We study. We build the strategy. Then we execute.",
      hint: "Tap any step to read the detail",
      steps: [{
        i: "01",
        t: "Discovery & Analysis",
        d: "We understand your current position, competitors, gaps, and strengths."
      }, {
        i: "02",
        t: "Setting goals",
        d: "Strategic, measurable goals within a clear timeframe."
      }, {
        i: "03",
        t: "Building the strategy",
        d: "A roadmap split into phases with precise ownership."
      }, {
        i: "04",
        t: "Building the system",
        d: "We turn the strategy into operating systems the company runs on."
      }, {
        i: "05",
        t: "Execution & follow-up",
        d: "From plan to reality — we track and adjust continuously."
      }, {
        i: "06",
        t: "Review & development",
        d: "We review results and evolve the plans based on the data."
      }]
    },
    services: {
      n: "04",
      eyebrow: "Our services",
      title: "Seven services. One system.",
      lede: "Not a menu to pick from — one integrated journey. When you work with us, we move through every phase together, not one service at a time.",
      items: [{
        t: "Studies & Strategy",
        d: "Set the foundation. We study your reality, define the goal, and design the strategy that gets you there."
      }, {
        t: "Branding",
        d: "Become recognized. We build the visual identity that makes you the first name your customers remember."
      }, {
        t: "Building the System",
        d: "Make it last. We build the operating systems, SOPs, and structure that keep the company running long after we leave."
      }, {
        t: "Supervision & Execution",
        d: "Turn the plan into reality. We supervise the team, manage hiring, and align operations so the strategy actually happens."
      }, {
        t: "IT & AI",
        d: "Save time, remove errors. Automate processes, build custom systems, and bring AI into the parts of your operation that need it most."
      }, {
        t: "Marketing & Sales",
        d: "Fill the funnel. We bring in customers, build the sales journey, and close more deals."
      }],
      featured: {
        eyebrow: "A foundation of success",
        t: "Personal Branding",
        d: "The founder is the first impression. We turn your visibility into a long-term commercial asset — opening doors to partnerships, talent, and the customers you actually want."
      }
    },
    audience: {
      n: "05",
      eyebrow: "Who we work with",
      title: "Start the right way.",
      lede: "Whether you're launching something new or scaling an existing company — we set the right foundation from day one.",
      a: {
        tag: "Highest impact",
        t: "If you're starting a new venture",
        d: "Begin on solid ground before mistakes set in. A clear strategy, an operating system from day one, a personal and commercial brand, and a team that knows where it's headed.",
        items: ["Feasibility study and a detailed business plan", "Operating structure and SOPs before your first client", "A consistent commercial and personal brand", "Full supervision through the first 6 months"]
      },
      b: {
        t: "If you already run a company",
        d: "We analyze what works and what doesn't, reset priorities, and build a phased development plan. We work with your reality in full detail — not idealized assumptions.",
        items: ["Mapping the gaps in your current systems", "Restructuring sales and marketing", "Developing leadership and the team", "A growth plan backed by numbers"]
      }
    },
    results: {
      n: "06",
      eyebrow: "The real work",
      title: "What we actually deliver",
      lede: "In our work with a single client, here's what we delivered:",
      items: [{
        i: "01",
        t: "We built the company's foundation",
        d: "We started by understanding the reality, then set the strategy, then implemented work systems that outlast us."
      }, {
        i: "02",
        t: "Five full hiring stages",
        d: "From job description to final offer — we planned and managed hiring for 15+ roles."
      }, {
        i: "03",
        t: "Full client-management automation",
        d: "We connected the systems, set up HubSpot and Zoho, and automated follow-up from first meeting to closed deal."
      }, {
        i: "04",
        t: "Decisions grounded in numbers",
        d: "Supplier comparisons, technical-spec analysis, financial models, and investment documents."
      }, {
        i: "05",
        t: "A sales funnel from zero",
        d: "We built the sales channels and designed the customer journey from first contact to signed deal."
      }, {
        i: "06",
        t: "Identity, campaigns, and content",
        d: "From visual identity to Google and Meta campaigns, plus monthly content management."
      }],
      close: "And all of this… with one company. At one time."
    },
    partners: {
      n: "07",
      title: "Partners in success",
      lede: "Brands that trusted their growth with us",
      close: "With you from the first idea… to the first client… to the first expansion."
    },
    contact: {
      n: "08",
      title: "Your first step toward growth.",
      body: "The first consultation is always free. Because understanding before execution isn't optional — it's our foundation.",
      primary: "Let's talk",
      secondary: "Message us on WhatsApp ↗"
    },
    footer: {
      tagline: "Your growth. Our system.",
      address: "Office 501, Dubai, UAE",
      links: "Quick links",
      touch: "Get in touch",
      rights: "© 2025 Estratijiya. All rights reserved."
    }
  },
  ar: {
    dir: "rtl",
    nav: ["من نحن", "أقسامنا", "أعمالنا", "تواصل"],
    cta: "لنتحدث",
    hero: {
      eyebrow: "استراتيجية",
      title: "نبدأ من السبب، لا من الطلب — ثم نمشي معك كل خطوة حتى النتيجة.",
      tagline: "نموّك… بنظامنا.",
      primary: "لنتحدث",
      secondary: "كيف نعمل؟",
      stats: [{
        prefix: "+",
        value: "٤٠",
        label: "عميل نشط"
      }, {
        value: "٥",
        label: "أقسام متكاملة"
      }, {
        value: "دبي",
        label: "مكتب ٥٠١"
      }]
    },
    about: {
      n: "٠١",
      eyebrow: "ما الذي يميّزنا",
      titleA: "الشركات العظيمة لا تُبنى بالصدفة…",
      titleB: "بل بالقرارات الصحيحة.",
      lead: "لا نبيع خدمات.",
      body: "نجد الناقص، ونبنيه. نعمل من داخل الشركة مع فريقك، لا بعيداً عنه، ونصل الأقسام كلها بخيطٍ واحد؛ فلا تتناقض الرسالة، ولا يضيع العميل بين يدٍ ويد."
    },
    vision: {
      n: "٠٢",
      eyebrow: "فلسفتنا",
      title: "كل شركةٍ منظومة. وكل منظومةٍ تصنع أنماطاً. وكل نمطٍ يكشف قصة. وكل قصةٍ تبدأ بقرار.",
      body: "نبدأ من حيث لا يُرى العمل… لننتهي عند ما يراه العميل. فكل مرحلةٍ تُجهّز التي بعدها، والترتيب هنا شرطٌ لا تفضيل."
    },
    method: {
      n: "٠٣",
      eyebrow: "كيف نعمل",
      kicker: "أربع خطوات، لا اجتهاد.",
      title: "نُشخّص. نُخطّط. ننفّذ. ونقيس.",
      hint: "اضغط أي خطوة لقراءة التفصيل",
      steps: [{
        i: "٠١",
        t: "نُشخّص",
        d: "لا نبدأ من الطلب، بل من السبب. نسأل «لماذا» حتى نصل إليه — ثم نبني عليه."
      }, {
        i: "٠٢",
        t: "نُخطّط",
        d: "الاستراتيجية قرارٌ مبنيٌّ على ما وجدناه، لا على ما هو شائع."
      }, {
        i: "٠٣",
        t: "الخطة",
        d: "لكل خطوةٍ صاحبها وموعدها ومقياس نجاحها."
      }, {
        i: "٠٤",
        t: "ننفّذ",
        d: "بأيدينا، وبأقسامنا، من أول خطوةٍ إلى آخرها."
      }, {
        i: "٠٥",
        t: "نقيس",
        d: "سجّلنا أرقامك يوم بدأنا، فنعرف ما تحرّك وما لم يتحرّك."
      }, {
        i: "٠٦",
        t: "نُعدّل",
        d: "ما أثمر يُوسَّع، وما تعثّر يُعدَّل — بقرارٍ مبنيٍّ على رقم، لا على انطباع."
      }]
    },
    services: {
      n: "٠٤",
      eyebrow: "أقسامنا الخمسة",
      title: "لا نعرض قائمةً لتختار منها.",
      lede: "نُشخّص، فنجد الفجوة، ثم نملأها. وإن كان الناقص خارج هذه القائمة… نبنيه.",
      items: [{
        t: "الاستراتيجية والدراسات",
        d: "دراسة الحالة · دراسة الجدوى · التموضع · حجم السوق · تحليل المنافسين · الخطط"
      }, {
        t: "العمليات",
        d: "أنظمة التشغيل · توزيع المسؤوليات · الهيكل التنظيمي · الأرشفة والجداول · أدلة العمل"
      }, {
        t: "المبيعات",
        d: "المسار من الفرصة إلى الإغلاق · إدارة علاقات العملاء · ملفات الفريق وأدواته · تدريب البيع"
      }, {
        t: "التسويق والعلامة",
        d: "الهوية البصرية ودليل العلامة · المحتوى · التصوير والفيديو · السوشيال ميديا · الحملات"
      }, {
        t: "التقنية والذكاء الاصطناعي",
        d: "المواقع · المتاجر · التطبيقات · الأنظمة الداخلية · الأتمتة · وكلاء الذكاء الاصطناعي"
      }, {
        t: "المتابعة والقياس",
        d: "رقمٌ قبل، ورقمٌ بعد. وما بينهما قرارُنا التالي."
      }],
      featured: {
        eyebrow: "أساس النجاح",
        t: "العلامة الشخصية",
        d: "المؤسس هو الانطباع الأول. نحوّل حضورك إلى أصلٍ تجاري طويل الأمد — يفتح أبواب الشراكات والكفاءات والعملاء الذين تريدهم فعلاً."
      }
    },
    audience: {
      n: "٠٥",
      eyebrow: "مع من نعمل",
      title: "ابدأ من الطريق الصحيح.",
      lede: "سواء كنت تُطلق شيئاً جديداً أو تُوسّع شركةً قائمة — نضع الأساس الصحيح من اليوم الأول.",
      a: {
        tag: "الأثر الأكبر",
        t: "إن كنت تبدأ مشروعاً جديداً",
        d: "ابدأ على أرضٍ صلبة قبل أن تتراكم الأخطاء: استراتيجية واضحة، ونظام تشغيل من اليوم الأول، وعلامة شخصية وتجارية، وفريق يعرف إلى أين يتّجه.",
        items: ["دراسة جدوى وخطة عمل مفصّلة", "هيكل تشغيلي وأدلة عمل قبل أول عميل", "علامة تجارية وشخصية متّسقة", "إشراف كامل خلال أول ٦ أشهر"]
      },
      b: {
        t: "إن كنت تدير شركةً قائمة",
        d: "نحلّل ما يعمل وما لا يعمل، ونعيد ترتيب الأولويات، ونبني خطة تطويرٍ على مراحل. نعمل مع واقعك بتفاصيله، لا مع افتراضاتٍ مثالية.",
        items: ["رسم الفجوات في أنظمتك الحالية", "إعادة هيكلة المبيعات والتسويق", "تطوير القيادة والفريق", "خطة نموٍّ مسندة بالأرقام"]
      }
    },
    results: {
      n: "٠٦",
      eyebrow: "العمل الفعلي",
      title: "ما نُسلّمه فعلاً",
      lede: "في عملنا مع عميلٍ واحد، هذا ما أنجزناه:",
      items: [{
        i: "٠١",
        t: "بنينا أساس الشركة",
        d: "بدأنا بفهم الواقع، ثم وضعنا الاستراتيجية، ثم نفّذنا أنظمة عملٍ تبقى بعدنا."
      }, {
        i: "٠٢",
        t: "خمس مراحل توظيف كاملة",
        d: "من الوصف الوظيفي إلى العرض النهائي — خطّطنا وأدرنا التوظيف لأكثر من ١٥ دوراً."
      }, {
        i: "٠٣",
        t: "أتمتة كاملة لإدارة العملاء",
        d: "ربطنا الأنظمة، وأعددنا HubSpot و Zoho، وأتمتنا المتابعة من أول اجتماع حتى الإغلاق."
      }, {
        i: "٠٤",
        t: "قرارات مبنية على أرقام",
        d: "مقارنات موردين، وتحليل مواصفات فنية، ونماذج مالية، ووثائق استثمارية."
      }, {
        i: "٠٥",
        t: "مسار مبيعات من الصفر",
        d: "بنينا قنوات البيع وصمّمنا رحلة العميل من أول تواصل حتى التوقيع."
      }, {
        i: "٠٦",
        t: "هوية وحملات ومحتوى",
        d: "من الهوية البصرية إلى حملات جوجل وميتا، مع إدارة محتوى شهرية."
      }],
      close: "وكل هذا… مع شركةٍ واحدة. في وقتٍ واحد."
    },
    partners: {
      n: "٠٧",
      title: "شركاء النجاح",
      lede: "علاماتٌ وثِقت بنموّها معنا",
      close: "معك من أول فكرة… إلى أول عميل… إلى أول توسّع."
    },
    contact: {
      n: "٠٨",
      title: "ابدأ من هنا.",
      body: "جلسة تشخيصٍ مجانية. نجلس معك، ونفهم شركتك من الداخل، ونخرج بصورةٍ واضحة: أين أنت، وما الذي يعوقك، وما الخطوة التالية. ثم تقرّر أنت.",
      primary: "لنتحدث",
      secondary: "واتساب ↗"
    },
    footer: {
      tagline: "نموّك… بنظامنا.",
      address: "مكتب ٥٠١، دبي، الإمارات",
      links: "روابط سريعة",
      touch: "تواصل معنا",
      rights: "© ٢٠٢٥ استراتيجية. جميع الحقوق محفوظة."
    }
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/copy.js", error: String((e && e.message) || e) }); }

__ds_ns.CheckList = __ds_scope.CheckList;

__ds_ns.DeliverableCard = __ds_scope.DeliverableCard;

__ds_ns.PartnerChip = __ds_scope.PartnerChip;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.StepCard = __ds_scope.StepCard;

__ds_ns.ValueRow = __ds_scope.ValueRow;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.SectionNumber = __ds_scope.SectionNumber;

__ds_ns.LangToggle = __ds_scope.LangToggle;

__ds_ns.NavLink = __ds_scope.NavLink;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

})();
