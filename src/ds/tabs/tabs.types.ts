/**
 * Shared types used by all four tab components.
 */

/** Colour theme that controls the active-indicator and header colours. */
export type TabTheme = 'primary' | 'secondary';

/** Variant for wizard tabs (fewer themes needed). */
export type WizardTabTheme = 'primary' | 'secondary';

/** A single tab / step definition. */
export interface TabItem {
  /** Unique key — also emitted on `tabChange`. */
  key: string;
  /** Display label. */
  label: string;
  /**
   * Optional numeric count shown in parentheses next to the label
   * (used by Header Tabs and Standard Tabs).
   */
  count?: number;
}

/** A single wizard step definition. */
export interface WizardStep {
  /** Unique key — also emitted on `stepChange`. */
  key: string;
  /** Step display name. */
  label: string;
  /** When true a red asterisk is shown after the label. */
  required?: boolean;
}

// ─── Theme colour maps ────────────────────────────────────────────────────────
// Values point at design-token CSS variables. Components can either read these
// keys for inline styles or just consume the var() strings directly in SCSS.
export const TAB_THEME_COLORS: Record<
  TabTheme,
  {
    base   : string; // active border / underline / header bg
    base5  : string; // unselected tab bg (standard tabs)
    base30 : string; // unselected tab border (standard tabs)
    base80 : string; // header active tab bg
    text   : string; // text color on colored header backgrounds
  }
> = {
  primary: {
    base  : 'var(--prim-teal-650)',
    base5 : 'var(--prim-teal-50)',
    base30: 'var(--prim-teal-650)',
    base80: 'var(--prim-teal-800)',
    text  : 'var(--prim-color-white)',
  },
  secondary: {
    base  : 'var(--prim-orange-200)',
    base5 : 'var(--prim-orange-75)',
    base30: 'var(--prim-orange-200)',
    base80: 'var(--prim-orange-900)',
    text  : 'var(--prim-color-black)',
  },
};
