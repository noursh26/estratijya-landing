import * as React from "react";

/** A client name in the partners rail. Type only — no partner logos were supplied. */
export interface PartnerChipProps {
  name: string;
  onDark?: boolean;
  style?: React.CSSProperties;
}

export declare function PartnerChip(props: PartnerChipProps): JSX.Element;
