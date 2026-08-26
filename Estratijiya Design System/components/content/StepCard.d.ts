import * as React from "react";

/**
 * A numbered method step that expands on tap.
 * @startingPoint section="Content" subtitle="Numbered method steps, expandable" viewport="700x300"
 */
export interface StepCardProps {
  /** Two-digit step number, e.g. "04". */
  index: string;
  title: string;
  detail: string;
  expanded?: boolean;
  /** Omit to render a static, non-interactive card. */
  onToggle?: () => void;
  onDark?: boolean;
  style?: React.CSSProperties;
}

export declare function StepCard(props: StepCardProps): JSX.Element;
