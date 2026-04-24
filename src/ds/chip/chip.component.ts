import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Chip / tag state — controls background colour and border colour.
 *
 * | State       | Background        | Border             |
 * |-------------|-------------------|--------------------|
 * | `default`   | neutral 250       | neutral 400        |
 * | `active`    | confirmation 900  | confirmation 900   |
 * | `error`     | error 300         | error 700          |
 * | `warning`   | warning 200       | warning 400        |
 */
export type ChipState =
  | 'default'
  | 'active'
  | 'error'
  | 'warning';

/**
 * Chip / tag component — pill-shaped label used for status, categories, or
 * filtering.
 *
 * **Anatomy (all optional):**
 * `[badge] [icon] label [close ×]`
 *
 * - **Badge** — 16 × 16 px filled circle with a single letter (e.g. provider
 *   initial "P").
 * - **Icon** — 16 × 16 px SVG icon; supply a custom `iconPath` or use the
 *   built-in tag icon default.
 * - **Label** — primary text, 12 px regular.
 * - **Close** — 16 × 16 px × button that emits `closed`.
 */
@Component({
  selector: 'ds-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  /** Colour state applied to the chip border and background. */
  @Input() state: ChipState = 'default';

  /** Text label displayed in the chip. */
  @Input() label = 'Label';

  /** Show the left badge circle. */
  @Input() showBadge = true;

  /** Letter rendered inside the badge circle. */
  @Input() badgeLetter = 'P';

  /**
   * Background colour of the badge circle.
   * Defaults to the user/base blue (`#0378a7`).
   */
  @Input() badgeColor = '#0378a7';

  /** Show the icon slot between the badge and label. */
  @Input() showIcon = true;

  /**
   * Custom SVG `<path d="…">` data for the icon.
   * When omitted, a built-in default is used based on the chip `state`.
   * Use `viewBox="0 0 24 24"` paths — the icon is rendered at 16 × 16 px.
   */
  @Input() iconPath: string | null = null;

  /** Show the close × button at the right edge. */
  @Input() showClose = true;

  /** Emits when the close button is clicked. */
  @Output() closed = new EventEmitter<void>();

  /** Emits when the chip body is clicked. */
  @Output() chipClick = new EventEmitter<void>();

  // ─── Computed icon path ────────────────────────────────────────────────────

  get resolvedIconPath(): string {
    if (this.iconPath) return this.iconPath;
    return 'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z';
  }

  get hostClasses(): Record<string, boolean> {
    return {
      'ds-chip': true,
      [`ds-chip--${this.state}`]: true,
    };
  }
}
