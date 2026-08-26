import * as React from "react";

/**
 * The standard section opener — numeral + eyebrow + heading + lede.
 * @startingPoint section="Layout" subtitle="Numbered section opener" viewport="700x220"
 */
export interface SectionHeaderProps {
  /** Two-digit section number, e.g. "04". */
  number?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  onDark?: boolean;
  align?: "start" | "center";
  style?: React.CSSProperties;
}

export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
