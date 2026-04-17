import {
  Component,
  ContentChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
  TemplateRef,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  imports: [CommonModule, NgTemplateOutlet],
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

  /** Custom icon/image template — use <ng-template #dsIcon> inside <ds-button> */
  @ContentChild('dsIcon') customIconTemplate?: TemplateRef<unknown>;

  get isIconOnly(): boolean {
    return this.iconPosition === 'only';
  }

  get hasIcon(): boolean {
    return !!(this.safeIcon || this.customIconTemplate);
  }

  /** Structural classes forwarded to the inner <button> via styleClass. */
  get styleClass(): string {
    const variantClass =
      this.variant === 'outlined' ? 'p-button-outlined'
      : this.variant === 'ghost' ? 'p-button-text'
      : '';

    const sizeClass =
      this.size === 'sm' ? 'p-button-sm'
      : this.size === 'lg' ? 'p-button-lg'
      : '';

    return [
      variantClass,
      `p-button-${this.color}`,
      sizeClass,
      this.isIconOnly ? 'p-button-icon-only' : '',
      this.disabled ? 'p-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** Color theme class applied to the <p-button> host via [ngClass]. */
  get themeClass(): Record<string, boolean> {
    return { [`p-button-${this.color}`]: true };
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
