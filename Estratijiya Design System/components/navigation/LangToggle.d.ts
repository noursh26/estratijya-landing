import * as React from "react";

/** Bilingual switch — Estratijiya ships every surface in Arabic and English. */
export interface LangToggleProps {
  /** The language currently displayed. */
  lang?: "en" | "ar";
  onChange?: (next: "en" | "ar") => void;
  onDark?: boolean;
  style?: React.CSSProperties;
}

export declare function LangToggle(props: LangToggleProps): JSX.Element;
