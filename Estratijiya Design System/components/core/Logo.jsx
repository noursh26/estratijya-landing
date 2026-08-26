import React from "react";

const SRC = {
  green: "logo-green.png",
  white: "logo-white.png",
  dark: "logo-dark.png",
};
const ICON_SRC = {
  green: "icon-green.png",
  white: "icon-white.png",
  dark: "icon-dark.png",
};

/** The Estratijiya lockup or mark, drawn from the supplied PNG assets. */
export function Logo({ tone = "green", markOnly = false, height = 32, assetBase = "assets", alt = "Estratijiya", style, ...rest }) {
  const file = markOnly ? ICON_SRC[tone] : SRC[tone];
  return (
    <img
      {...rest}
      src={`${assetBase}/${file}`}
      alt={alt}
      style={{ height, width: "auto", display: "block", ...style }}
    />
  );
}
