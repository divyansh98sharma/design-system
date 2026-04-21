import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Chip / tag colour state — controls background, border and text colour.
 *
 * | State      | Background | Border    | Text      |
 * |------------|------------|-----------|-----------|
 * | `red`      | `#ffefef`  | —         | `#901a1a` |
 * | `orange`   | `#fff3ea`  | —         | `#9b5b2c` |
 * | `yellow`   | `#fff9eb`  | —         | `#7e6715` |
 * | `green`    | `#f1fef8`  | —         | `#01562e` |
 * | `blue`     | `#f1fbff`  | —         | `#02506f` |
 * | `purple`   | `#f7f2ff`  | —         | `#533b91` |
 * | `white`    | `#ffffff`  | —         | `#000000` |
 * | `gray`     | `#f7f7f7`  | —         | `#4b4b4b` |
 * | `ai`       | `#ffffff`  | `#007b95` | `#000000` |
 * | `action`   | `#f7f7f7`  | `#ebebeb` | `#000000` |
 * | `selected` | `#e6f4f3`  | `#0378a7` | `#000000` |
 */
export type ChipState =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'white'
  | 'gray'
  | 'ai'
  | 'action'
  | 'selected';

export type ChipSize = 'sm' | 'lg';

/**
 * Chip / tag — pill-shaped label used for status, categories, filtering, or
 * AI-generated metadata.
 *
 * **Anatomy:** `[icon] label [counter]`
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
  /** Colour state. */
  @Input() state: ChipState = 'gray';

  /** Vertical size — `sm` is 2 px y-padding, `lg` is 4 px. */
  @Input() size: ChipSize = 'sm';

  /** Text label. */
  @Input() label = 'Chip Label';

  /** Show the leading icon. */
  @Input() showIcon = true;

  /**
   * Custom SVG `<path d="…">` data for the icon (`viewBox="0 0 24 24"`).
   * When omitted, a tag icon is used by default and a sparkle icon for
   * the `ai` state.
   */
  @Input() iconPath: string | null = null;

  /** Show the trailing counter pill. */
  @Input() showCounter = false;

  /** Counter label — typically a number. */
  @Input() counterLabel: string | number = '999';

  /** Emits when the chip body is clicked. */
  @Output() chipClick = new EventEmitter<void>();

  get resolvedIconPath(): string {
    if (this.iconPath) return this.iconPath;
    if (this.state === 'ai') {
      return 'M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5z';
    }
    return 'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z';
  }

  get hostClasses(): Record<string, boolean> {
    return {
      'ds-chip': true,
      [`ds-chip--${this.state}`]: true,
      [`ds-chip--${this.size}`]: true,
    };
  }
}
