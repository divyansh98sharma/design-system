import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollerModule } from 'primeng/scroller';

export type ScrollbarOrientation = 'vertical' | 'horizontal';

/**
 * Scrollbar component — applies design-system scrollbar styles to a
 * scrollable container via `<ng-content>`.
 *
 * Uses `::webkit-scrollbar` pseudo-elements to style the native browser
 * scrollbar to match the design spec:
 * - **Track**: `#ebebeb`, 1 px padding.
 * - **Thumb**: `#969696`, radius 4 px.
 * - **Width / height**: 12 px.
 *
 * **Orientations:**
 * - `vertical` — scrolls content vertically; set `height` to constrain the container.
 * - `horizontal` — scrolls content horizontally; set `width` to constrain the container.
 *
 * Note: webkit scrollbar styling is applied via `encapsulation: ViewEncapsulation.None`
 * scoped to the host class, meaning styles are applied to scrollbars inside this component.
 */
@Component({
  selector: 'ds-scrollbar',
  standalone: true,
  imports: [CommonModule, ScrollerModule],
  templateUrl: './scrollbar.component.html',
  styleUrl: './scrollbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollbarComponent {
  /** Scroll direction. */
  @Input() orientation: ScrollbarOrientation = 'vertical';

  /**
   * CSS height of the scrollable container.
   * Useful for `vertical` orientation to constrain the visible area.
   * Example: `'200px'`, `'50vh'`.
   */
  @Input() height = '200px';

  /**
   * CSS width of the scrollable container.
   * Useful for `horizontal` orientation to constrain the visible area.
   * Example: `'300px'`, `'100%'`.
   */
  @Input() width = '100%';

  get containerStyles(): Record<string, string> {
    if (this.orientation === 'vertical') {
      return {
        'height': this.height,
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
      };
    }
    return {
      'width': this.width,
      'overflow-x': 'auto',
      'overflow-y': 'hidden',
    };
  }
}
