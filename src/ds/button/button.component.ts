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

  /** All structural + theme classes forwarded to the inner <button> via styleClass. */
  get styleClass(): string {
    return [
      'ds-btn',
      `ds-btn--${this.variant}`,
      `ds-btn--${this.color}`,
      `ds-btn--${this.size}`,
      this.isIconOnly ? 'ds-btn--icon-only' : '',
      this.disabled ? 'ds-btn--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** Color theme class applied to the <p-button> host via [ngClass]. */
  get themeClass(): Record<string, boolean> {
    return { [`ds-btn--${this.color}`]: true };
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
