/**
 * Shared types used by all four tab components.
 */

/** Colour theme that controls the active-indicator and header colours. */
export type TabTheme = 'user' | 'admin' | 'green' | 'sunoh';

/** Variant for wizard tabs (fewer themes needed). */
export type WizardTabTheme = 'user' | 'admin';

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
export const TAB_THEME_COLORS: Record<
  TabTheme,
  {
    base     : string; // active border / underline / header bg
    base5    : string; // unselected tab bg (standard tabs)
    base30   : string; // unselected tab border (standard tabs)
    base80   : string; // header active tab bg
    text     : string; // text color on colored header backgrounds
  }
> = {
  user : {
    base  : '#0378a7',
    base5 : '#f1fbff',
    base30: '#81bbd3',
    base80: '#023c54',
    text  : '#ffffff',
  },
  admin: {
    base  : '#e88842',
    base5 : '#fff8f2',
    base30: '#f1b984',
    base80: '#c17137',
    text  : '#000000',
  },
  green: {
    base  : '#018145',
    base5 : '#f1fff5',
    base30: '#7bc49a',
    base80: '#014123',
    text  : '#ffffff',
  },
  sunoh: {
    base  : '#fb2b66',
    base5 : '#fff0f4',
    base30: '#fd9bb7',
    base80: '#7e1633',
    text  : '#ffffff',
  },
};
