import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toolbar } from 'primeng/toolbar';

/**
 * Jellybean badge colour gradient style.
 *
 * | Style    | Gradient                    | Meaning         |
 * |----------|-----------------------------|-----------------|
 * | `red`    | `#ff9387` → `#ff7260`       | Urgent / action needed |
 * | `yellow` | `#ffea61` → `#d6b522`       | Pending / attention  |
 * | `gray`   | `#f2f2f2` → `#cccccc`       | Normal / no action  |
 */
export type JellybeanStyle = 'red' | 'yellow' | 'gray';

/**
 * A single navigation attribute link displayed in the top nav right section.
 *
 * Each link shows a short letter code + a "jellybean" count badge with a
 * colour-coded gradient.
 */
export interface TopNavLink {
  /** Short letter code shown to the left of the badge (e.g. `"P"`, `"TV"`). */
  letter: string;
  /** Count value shown inside the jellybean badge. */
  count: number | string;
  /** Gradient colour of the badge. */
  style: JellybeanStyle;
  /** When true, the jellybean uses a white border instead of blue (e.g. selected state). */
  selected?: boolean;
  /** Optional tooltip / accessible label for the link. */
  label?: string;
}

/**
 * Top navigation bar component.
 *
 * Dark teal (`#02506f`) header spanning the full application width.
 *
 * **Left section:**
 * - Collapsible main-menu toggle (chevron + hamburger + chevron)
 * - Application logo ("eClinicalWorks")
 * - Patient lookup input (with caret)
 * - Radio / status indicators
 *
 * **Right section (optional):**
 * - Up to ~10 attribute links (letter code + jellybean count badge)
 * - Each badge can be `red` (urgent), `yellow` (pending), or `gray` (normal)
 *
 * Default links match the Figma spec: P, N, E, S, D, R, T, L, M, TV.
 */
@Component({
  selector: 'ds-top-nav',
  standalone: true,
  imports: [CommonModule, Toolbar],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavComponent {
  /** Show the right-side attribute links. */
  @Input() showLinks = true;

  /** Show the provider avatar next to the menu toggle. */
  @Input() showProvider = false;

  /** Show the refresh button (leftmost link column). */
  @Input() showRefreshButton = false;

  /**
   * Navigation attribute links.
   * Default links match the Figma spec.
   */
  @Input() links: TopNavLink[] = [
    { letter: 'P',  count: 12,  style: 'red' },
    { letter: 'N',  count: '00', style: 'yellow' },
    { letter: 'E',  count: '00', style: 'yellow', selected: true },
    { letter: 'S',  count: 2,   style: 'gray' },
    { letter: 'D',  count: 36,  style: 'red' },
    { letter: 'R',  count: '00', style: 'yellow' },
    { letter: 'T',  count: 5,   style: 'red' },
    { letter: 'L',  count: 25,  style: 'red' },
    { letter: 'M',  count: '00', style: 'yellow' },
    { letter: 'TV', count: '00', style: 'yellow' },
  ];

  /** Emits when the hamburger menu toggle is clicked. */
  @Output() menuToggle = new EventEmitter<void>();

  /** Emits when the patient lookup area is clicked. */
  @Output() patientLookup = new EventEmitter<void>();

  /** Emits the link when a nav attribute link is clicked. */
  @Output() linkClick = new EventEmitter<TopNavLink>();

  /** Emits when the refresh button is clicked. */
  @Output() refreshClick = new EventEmitter<void>();
}
