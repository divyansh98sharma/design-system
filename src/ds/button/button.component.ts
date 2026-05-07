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

export type ButtonType = 'primary' | 'secondary' | 'white' | 'error' | 'warning';
export type ButtonStyle = 'default' | 'divided';
export type ButtonSize = 'sm' | 'md' | 'lg';

const CHEVRON_DOWN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>`;

@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() type: ButtonType = 'primary';
  @Input() btnStyle: ButtonStyle = 'default';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() iconOnly = false;
  @Input() alertIndicator = false;
  @Input() counter: number | string | null = null;

  @Input() set icon(svg: string | undefined) {
    this.safeIcon = svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : undefined;
  }
  @Input() set trailingIcon(svg: string | undefined) {
    this.safeTrailingIcon = svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : undefined;
  }
  @Input() set dividerIcon(svg: string | undefined) {
    const markup = svg ?? CHEVRON_DOWN_SVG;
    this.safeDividerIcon = this.sanitizer.bypassSecurityTrustHtml(markup);
  }

  safeIcon?: SafeHtml;
  safeTrailingIcon?: SafeHtml;
  safeDividerIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(CHEVRON_DOWN_SVG);

  @ContentChild('dsLeadingIcon') leadingIconTemplate?: TemplateRef<unknown>;
  @ContentChild('dsTrailingIcon') trailingIconTemplate?: TemplateRef<unknown>;
  @ContentChild('dsDividerIcon') dividerIconTemplate?: TemplateRef<unknown>;

  @Output() buttonClick = new EventEmitter<MouseEvent>();
  @Output() dividerClick = new EventEmitter<MouseEvent>();

  private sanitizer = inject(DomSanitizer);

  get isDivided(): boolean {
    return this.btnStyle === 'divided';
  }

  get hasLeading(): boolean {
    return !!(this.safeIcon || this.leadingIconTemplate);
  }

  get hasTrailing(): boolean {
    return !!(this.safeTrailingIcon || this.trailingIconTemplate);
  }

  get hasCounter(): boolean {
    return this.counter !== null && this.counter !== undefined && this.counter !== '';
  }

  get effectiveType(): ButtonType {
    return this.type;
  }

  get hostClass(): string {
    const stateType = this.disabled ? 'disabled' : this.type;
    return [
      'ds-button',
      `ds-button--${stateType}`,
      `ds-button--${this.btnStyle}`,
      `ds-button--${this.size}`,
      this.iconOnly ? 'ds-button--icon-only' : '',
      this.disabled ? 'ds-button--is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onMainClick(event: MouseEvent): void {
    if (this.disabled) return;
    this.buttonClick.emit(event);
  }

  onDividerClick(event: MouseEvent): void {
    if (this.disabled) return;
    event.stopPropagation();
    this.dividerClick.emit(event);
  }
}
