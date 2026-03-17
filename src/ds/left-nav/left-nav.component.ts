import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A single left-navigation item — icon path (24 × 24 viewBox SVG) + label.
 */
export interface LeftNavItem {
  /** Unique key used for active-state tracking and event emission. */
  key: string;
  /** Short label displayed below the icon (10 px, white). */
  label: string;
  /**
   * SVG `<path d="…">` data for the icon.
   * Use a 24 × 24 viewBox path — it renders at 24 × 24 px.
   */
  iconPath: string;
  /** When true, the item is highlighted as the active / selected route. */
  active?: boolean;
}

// ─── Default icon paths (Material Design) ────────────────────────────────────

const ICON_MENU       = 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z';
const ICON_STAR       = 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';
const ICON_ADMIN      = 'M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z';
const ICON_PRACTICE   = 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z';
const ICON_CCMR       = 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z';
const ICON_RESIDENTIAL= 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z';
const ICON_REGISTRY   = 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z';
const ICON_REFERRALS  = 'M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z';
const ICON_MESSAGES   = 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z';
const ICON_DOCUMENTS  = 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z';
const ICON_BILLING    = 'M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM6 15h12v2H6zm0-4h12v2H6zm0-4h12v2H6z';
const ICON_RCM        = 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z';
const ICON_PRM        = 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z';
const ICON_AFTER_CARE = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

/** Default navigation items matching the Figma design. */
export const DEFAULT_LEFT_NAV_ITEMS: LeftNavItem[] = [
  { key: 'menu',       label: 'Menu',       iconPath: ICON_MENU },
  { key: 'favorites',  label: 'Favorites',  iconPath: ICON_STAR },
  { key: 'admin',      label: 'Admin',      iconPath: ICON_ADMIN },
  { key: 'practice',   label: 'Practice',   iconPath: ICON_PRACTICE },
  { key: 'ccmr',       label: 'CCMR',       iconPath: ICON_CCMR },
  { key: 'residential',label: 'Residential',iconPath: ICON_RESIDENTIAL },
  { key: 'registry',   label: 'Registry',   iconPath: ICON_REGISTRY },
  { key: 'referrals',  label: 'Referrals',  iconPath: ICON_REFERRALS },
  { key: 'messages',   label: 'Messages',   iconPath: ICON_MESSAGES },
  { key: 'documents',  label: 'Documents',  iconPath: ICON_DOCUMENTS },
  { key: 'billing',    label: 'Billing',    iconPath: ICON_BILLING },
  { key: 'rcm',        label: 'RCM',        iconPath: ICON_RCM },
  { key: 'prm',        label: 'PRM',        iconPath: ICON_PRM },
  { key: 'after-care', label: 'After Care', iconPath: ICON_AFTER_CARE },
];

/**
 * Left navigation sidebar — 60 px wide, dark navy vertical column.
 *
 * Each item is an icon + label stacked vertically. A top scroll button, a
 * scrollable link list, a bottom scroll button, and a Logout row complete
 * the component.
 *
 * The `activeItem` key highlights the corresponding item.
 */
@Component({
  selector: 'ds-left-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftNavComponent {
  /** Navigation items shown in the scrollable list. */
  @Input() items: LeftNavItem[] = DEFAULT_LEFT_NAV_ITEMS;

  /** Key of the currently active / selected item. */
  @Input() activeItem: string | null = null;

  /** Emits the item `key` when a nav item is clicked. */
  @Output() itemClick = new EventEmitter<string>();

  /** Emits when the Logout button is clicked. */
  @Output() logout = new EventEmitter<void>();

  /** Emits when the main menu toggle is clicked. */
  @Output() menuToggle = new EventEmitter<void>();
}
