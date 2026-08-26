import * as React from "react";

/**
 * Pill action button — mint primary, hairline secondary, quiet ghost.
 * @startingPoint section="Core" subtitle="Pill buttons in every variant and size" viewport="700x180"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = mint fill; secondary = hairline outline; ghost = text only; dark = ink fill */
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  /** Set on deep-teal grounds so outline/ghost variants flip to light hairlines. */
  onDark?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): JSX.Element;
