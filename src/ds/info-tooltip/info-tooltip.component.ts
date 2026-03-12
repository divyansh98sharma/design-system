import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipPosition } from '../tooltip/tooltip.component';
import { TooltipComponent } from '../tooltip/tooltip.component';

/**
 * Info icon (ⓘ) that reveals a tooltip bubble on hover.
 *
 * The `position` input controls where the tooltip bubble appears relative
 * to the icon — matching all 12 Figma caret positions.
 */
@Component({
  selector: 'ds-info-tooltip',
  standalone: true,
  imports: [CommonModule, TooltipComponent],
  templateUrl: './info-tooltip.component.html',
  styleUrl: './info-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoTooltipComponent {
  /** Tooltip text shown on hover. */
  @Input() tooltipText = 'A simple text popup tip.';

  /**
   * Where the tooltip bubble appears relative to the info icon.
   * Matches the 12-position Figma spec (same as `ds-tooltip`).
   * Default: `top-left` (bubble above-right of icon, caret at top-left).
   */
  @Input() position: TooltipPosition = 'top-left';

  /** Internal hover state. */
  hovered = false;

  onMouseEnter(): void { this.hovered = true; }
  onMouseLeave(): void { this.hovered = false; }
  onFocus(): void { this.hovered = true; }
  onBlur(): void { this.hovered = false; }

  /**
   * Maps the tooltip position to the inline style that positions the bubble
   * correctly relative to the icon. The icon is 16 × 16 px.
   */
  get bubbleStyle(): Record<string, string> {
    const gap = '8px';
    const styles: Record<string, string> = {
      position: 'absolute',
      zIndex: '100',
      pointerEvents: 'none',
    };

    switch (this.position) {
      // Bubble BELOW icon (caret on top edge) ─────────────────────────────────
      case 'top-left':
        return { ...styles, top: `calc(100% + ${gap})`, left: '0' };
      case 'top-center':
        return { ...styles, top: `calc(100% + ${gap})`, left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { ...styles, top: `calc(100% + ${gap})`, right: '0' };

      // Bubble ABOVE icon (caret on bottom edge) ───────────────────────────────
      case 'bottom-left':
        return { ...styles, bottom: `calc(100% + ${gap})`, left: '0' };
      case 'bottom-center':
        return { ...styles, bottom: `calc(100% + ${gap})`, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { ...styles, bottom: `calc(100% + ${gap})`, right: '0' };

      // Bubble to the RIGHT of icon (caret on left edge) ───────────────────────
      case 'left-top':
        return { ...styles, left: `calc(100% + ${gap})`, top: '0' };
      case 'left-center':
        return { ...styles, left: `calc(100% + ${gap})`, top: '50%', transform: 'translateY(-50%)' };
      case 'left-bottom':
        return { ...styles, left: `calc(100% + ${gap})`, bottom: '0' };

      // Bubble to the LEFT of icon (caret on right edge) ───────────────────────
      case 'right-top':
        return { ...styles, right: `calc(100% + ${gap})`, top: '0' };
      case 'right-center':
        return { ...styles, right: `calc(100% + ${gap})`, top: '50%', transform: 'translateY(-50%)' };
      case 'right-bottom':
        return { ...styles, right: `calc(100% + ${gap})`, bottom: '0' };
    }
  }
}
