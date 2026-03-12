import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

export type ButtonVariant = 'filled' | 'outlined' | 'ghost';
export type ButtonColor =
  | 'user'
  | 'admin'
  | 'secondary'
  | 'success'
  | 'error'
  | 'sunoh';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'left' | 'right' | 'only';

@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label = 'Label';
  @Input() variant: ButtonVariant = 'filled';
  @Input() color: ButtonColor = 'user';
  @Input() size: ButtonSize = 'md';
  /** Inline SVG markup for the icon */
  @Input() set icon(svg: string | undefined) {
    this.safeIcon = svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : undefined;
  }

  safeIcon?: SafeHtml;
  private sanitizer = inject(DomSanitizer);
  @Input() iconPosition: IconPosition = 'left';
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get isIconOnly(): boolean {
    return this.iconPosition === 'only';
  }

  get classes(): Record<string, boolean> {
    return {
      'ds-btn': true,
      [`ds-btn--${this.variant}`]: true,
      [`ds-btn--${this.color}`]: true,
      [`ds-btn--${this.size}`]: true,
      'ds-btn--icon-only': this.isIconOnly,
      'ds-btn--disabled': this.disabled,
    };
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
