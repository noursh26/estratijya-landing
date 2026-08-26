import * as React from "react";

/** The Estratijiya logo — full lockup or mark only, in the three approved tones. */
export interface LogoProps {
  /** green on dark or paper; white on dark/photography; dark on paper only. */
  tone?: "green" | "white" | "dark";
  /** Mark without the wordmark — for avatars, favicons, tight headers. */
  markOnly?: boolean;
  /** Rendered height in px. Lockup min 20px, mark min 16px. */
  height?: number;
  /** Relative path to the assets folder from the consuming page. */
  assetBase?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export declare function Logo(props: LogoProps): JSX.Element;
