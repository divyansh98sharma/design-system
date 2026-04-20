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
  | 'warning'
  | 'sunoh'
  | 'white';
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

  /** Render a trailing icon-only segment separated by a vertical divider (Figma "divider" mode). */
  @Input() withDivider = false;
  /** Inline SVG for the divider icon. Defaults to an open-link glyph when omitted. */
  @Input() set dividerIcon(svg: string | undefined) {
    this.safeDividerIcon = svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : undefined;
  }
  safeDividerIcon?: SafeHtml;

  /** Optional numeric badge rendered after the label/icons. Pass `null` or `undefined` to hide. */
  @Input() counter?: number | null;

  /** Show a small red dot at the top-right corner. */
  @Input() alertIndicator = false;

  @Output() buttonClick = new EventEmitter<MouseEvent>();
  @Output() dividerClick = new EventEmitter<MouseEvent>();

  /** Custom icon/image template — use <ng-template #dsIcon> inside <ds-button> */
  @ContentChild('dsIcon') customIconTemplate?: TemplateRef<unknown>;

  get isIconOnly(): boolean {
    return this.iconPosition === 'only';
  }

  get hasIcon(): boolean {
    return !!(this.safeIcon || this.customIconTemplate);
  }

  get hasCounter(): boolean {
    return this.counter !== null && this.counter !== undefined;
  }

  /** Host classes applied to the wrapping <span> when divider mode is on, or to the <button> directly. */
  get rootClasses(): Record<string, boolean> {
    return {
      'ds-button': true,
      [`ds-button--${this.variant}`]: true,
      [`ds-button--${this.color}`]: true,
      [`ds-button--${this.size}`]: true,
      'ds-button--icon-only': this.isIconOnly,
      'ds-button--with-divider': this.withDivider,
      'ds-button--disabled': this.disabled,
    };
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }

  onDividerClick(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.dividerClick.emit(event);
    }
  }
}
