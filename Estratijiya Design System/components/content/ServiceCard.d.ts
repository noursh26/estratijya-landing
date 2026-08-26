import * as React from "react";

/**
 * One of the brand's services, as a linked tile.
 * @startingPoint section="Content" subtitle="Service tiles, standard and featured" viewport="700x300"
 */
export interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  /** Link label; the arrow is added automatically. */
  action?: string;
  /** Mint-filled tile — reserved for the one flagship service per grid. */
  featured?: boolean;
  onDark?: boolean;
  style?: React.CSSProperties;
}

export declare function ServiceCard(props: ServiceCardProps): JSX.Element;
