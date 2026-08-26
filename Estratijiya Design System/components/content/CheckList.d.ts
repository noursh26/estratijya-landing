import * as React from "react";

/** Mint-ticked list — what a phase or package includes. */
export interface CheckListProps {
  items?: string[];
  onDark?: boolean;
  style?: React.CSSProperties;
}

export declare function CheckList(props: CheckListProps): JSX.Element;
