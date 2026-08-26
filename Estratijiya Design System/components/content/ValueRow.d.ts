import * as React from "react";

/** Claim + consequence pair, used for values and differentiators. */
export interface ValueRowProps {
  /** The claim, in bold: "We start from the cause". */
  label: string;
  /** The consequence, plain: "not from the request". */
  body: string;
  onDark?: boolean;
  align?: "start" | "center" | "end";
  style?: React.CSSProperties;
}

export declare function ValueRow(props: ValueRowProps): JSX.Element;
