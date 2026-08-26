import * as React from "react";

/** One-pixel hairline — the only divider in the system. */
export interface DividerProps {
  onDark?: boolean;
  /** Margin along the rule's own axis. */
  inset?: number | string;
  vertical?: boolean;
  style?: React.CSSProperties;
}

export declare function Divider(props: DividerProps): JSX.Element;
