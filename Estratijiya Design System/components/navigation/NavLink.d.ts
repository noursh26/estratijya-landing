import * as React from "react";

/** Header navigation link with a growing mint underline. */
export interface NavLinkProps {
  children?: React.ReactNode;
  href?: string;
  active?: boolean;
  onDark?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function NavLink(props: NavLinkProps): JSX.Element;
