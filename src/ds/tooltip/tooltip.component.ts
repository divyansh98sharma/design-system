import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition =
  | 'top-left'    | 'top-center'    | 'top-right'
  | 'right-top'   | 'right-center'  | 'right-bottom'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'left-top'    | 'left-center'   | 'left-bottom';

@Component({
  selector: 'ds-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  /** Text content displayed inside the tooltip. */
  @Input() text = 'A simple text popup tip.';

  /** One of 12 caret positions from the Figma spec. */
  @Input() position: TooltipPosition = 'top-left';

  /** Whether the tooltip is visible. */
  @Input() visible = false;

  private el = inject(ElementRef);

  get bubbleClasses(): Record<string, boolean> {
    return {
      'ds-tooltip': true,
      [`ds-tooltip--${this.position}`]: true,
    };
  }
}
