import * as React from "react";

/**
 * Content container: white paper with a hairline, or a raised panel on dark.
 * @startingPoint section="Core" subtitle="Card tones — paper, dark, accent, outline" viewport="700x260"
 */
export interface CardProps {
  children?: React.ReactNode;
  /** paper = white on light pages; dark = raised panel on teal; accent = mint tint; outline = mint hairline only. */
  tone?: "paper" | "dark" | "accent" | "outline";
  padding?: string;
  radius?: string;
  /** Adds hover lift + pointer cursor. */
  interactive?: boolean;
  outlined?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function Card(props: CardProps): JSX.Element;
