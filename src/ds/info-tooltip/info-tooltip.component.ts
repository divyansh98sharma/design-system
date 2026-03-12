import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipPosition, TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'ds-info-tooltip',
  standalone: true,
  imports: [CommonModule, TooltipModule, TooltipComponent],
  templateUrl: './info-tooltip.component.html',
  styleUrl: './info-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoTooltipComponent {
  @Input() tooltipText = 'A simple text popup tip.';
  @Input() position: TooltipPosition = 'top-left';

  hovered = false;

  onMouseEnter(): void { this.hovered = true; }
  onMouseLeave(): void { this.hovered = false; }
  onFocus(): void { this.hovered = true; }
  onBlur(): void { this.hovered = false; }

  get bubbleStyle(): Record<string, string> {
    const map: Record<TooltipPosition, Record<string, string>> = {
      'top-left':     { bottom: '100%', left: '0', marginBottom: '6px' },
      'top-center':   { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '6px' },
      'top-right':    { bottom: '100%', right: '0', marginBottom: '6px' },
      'bottom-left':  { top: '100%', left: '0', marginTop: '6px' },
      'bottom-center':{ top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '6px' },
      'bottom-right': { top: '100%', right: '0', marginTop: '6px' },
      'left-top':     { right: '100%', top: '0', marginRight: '6px' },
      'left-center':  { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '6px' },
      'left-bottom':  { right: '100%', bottom: '0', marginRight: '6px' },
      'right-top':    { left: '100%', top: '0', marginLeft: '6px' },
      'right-center': { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '6px' },
      'right-bottom': { left: '100%', bottom: '0', marginLeft: '6px' },
    };
    return { position: 'absolute', zIndex: '1000', ...map[this.position] };
  }
}
