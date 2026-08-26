import * as React from "react";

/** Oversized metric + label, as used in the site hero strip. */
export interface StatBlockProps {
  /** The number itself, already formatted, e.g. "12". */
  value: string | number;
  label: string;
  /** Small mint glyph before the number, e.g. "+". */
  prefix?: string;
  onDark?: boolean;
  align?: "start" | "center";
  style?: React.CSSProperties;
}

export declare function StatBlock(props: StatBlockProps): JSX.Element;
