import * as React from "react";

/** Numbered "what we actually delivered" block, separated by a top hairline. */
export interface DeliverableCardProps {
  /** Two-digit index, e.g. "02". */
  index: string;
  title: string;
  body: string;
  onDark?: boolean;
  style?: React.CSSProperties;
}

export declare function DeliverableCard(props: DeliverableCardProps): JSX.Element;
