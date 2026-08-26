import * as React from "react";

/** The circled section numeral that opens each Estratijiya section. */
export interface SectionNumberProps {
  /** Two-digit string, e.g. "01". */
  value: string;
  onDark?: boolean;
  size?: "md" | "lg";
  style?: React.CSSProperties;
}

export declare function SectionNumber(props: SectionNumberProps): JSX.Element;
