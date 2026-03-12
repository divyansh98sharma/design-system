import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * 12 caret positions matching the Figma spec.
 * Format: `{edge}-{alignment}` where edge is which side the bubble is on,
 * and alignment is where the caret sits along that edge.
 */
export type TooltipPosition =
  | 'top-left'    | 'top-center'    | 'top-right'
  | 'right-top'   | 'right-center'  | 'right-bottom'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'left-top'    | 'left-center'   | 'left-bottom';

/**
 * Standalone tooltip bubble.
 *
 * Wrap any trigger element with `<ds-tooltip>` or use the `dsTooltip`
 * directive for hover-triggered behaviour. This component renders just
 * the bubble itself — placement and visibility are controlled by the parent.
 */
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

  /**
   * Where the caret arrow appears on the bubble.
   * `top-left` means: bubble is below the trigger, caret points up from the left side.
   */
  @Input() position: TooltipPosition = 'top-left';

  /** Whether the tooltip is currently visible. */
  @Input() visible = true;

  get bubbleClasses(): Record<string, boolean> {
    return {
      'ds-tooltip': true,
      [`ds-tooltip--${this.position}`]: true,
    };
  }
}
