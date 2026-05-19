import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PanelOrientation = 'left' | 'right' | 'filters';

@Component({
  selector: 'ds-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  /**
   * Side / variant.
   * - `left`    — 154 px frame, shadow projects right
   * - `right`   — 154 px frame, shadow projects left
   * - `filters` — 300 px wider variant for filter UIs, shadow projects right
   */
  @Input() orientation: PanelOrientation = 'left';

  /** Optional override for the panel width (any valid CSS length). */
  @Input() width?: string;

  get hostClasses(): Record<string, boolean> {
    return {
      'ds-panel': true,
      [`ds-panel--${this.orientation}`]: true,
    };
  }
}
