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

/** A single option within the toggle button group. */
export interface ToggleButtonItem {
  /** Unique value used to track selection state. */
  value: string;
  /** Label text rendered inside the button. Omit for icon-only buttons. */
  label?: string;
  /** Optional numeric badge (e.g. 99 → shows "Label (99)"). */
  count?: number;
  /** Inline SVG string for an icon. Shown for icon-only or icon+label buttons. */
  icon?: string;
  /** Disables this individual button. */
  disabled?: boolean;
}

export type ToggleColor =
  | 'user'
  | 'admin'
  | 'secondary'
  | 'success'
  | 'error'
  | 'sunoh';

export type ToggleSize = 'sm' | 'md' | 'lg';

/** Built-in checkmark SVG shown in the selected state (label buttons). */
const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13,3.5 6,12.5 3,8.5"/></svg>`;

@Component({
  selector: 'ds-toggle-button-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-button-group.component.html',
  styleUrl: './toggle-button-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonGroupComponent {
  /** Array of button options to render. */
  @Input() options: ToggleButtonItem[] = [];

  /** Color theme applied to the selected button and group border. */
  @Input() color: ToggleColor = 'user';

  /** Height / padding scale: `sm` = 24 px, `md` = 32 px, `lg` = 40 px. */
  @Input() size: ToggleSize = 'md';

  /**
   * When `true`, multiple buttons can be selected simultaneously.
   * When `false` (default), behaves like a radio group — selecting one
   * deselects the others.
   */
  @Input() multiple = false;

  /** Disables all buttons in the group. */
  @Input() disabled = false;

  /**
   * Currently selected value(s).
   * Pass a `string` when `multiple = false`, or `string[]` when `multiple = true`.
   */
  @Input() value: string | string[] = '';

  /** Emits the new selected value (or array of values) after each toggle. */
  @Output() valueChange = new EventEmitter<string | string[]>();

  private sanitizer = inject(DomSanitizer);

  /** Pre-sanitised checkmark icon rendered in selected label-buttons. */
  readonly checkIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(CHECK_SVG);

  /** Returns a sanitised SafeHtml for user-supplied icon SVGs. */
  safeIcon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  /** Returns true when the given option value is currently selected. */
  isSelected(value: string): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && (this.value as string[]).includes(value);
    }
    return this.value === value;
  }

  /** Returns true when the option has no label (icon-only button). */
  isIconOnly(item: ToggleButtonItem): boolean {
    return !item.label && !!item.icon;
  }

  /** Called when a button is clicked. Updates the internal selection model. */
  onToggle(item: ToggleButtonItem): void {
    if (this.disabled || item.disabled) return;

    if (this.multiple) {
      const current = Array.isArray(this.value) ? [...(this.value as string[])] : [];
      const idx = current.indexOf(item.value);
      if (idx >= 0) current.splice(idx, 1);
      else current.push(item.value);
      this.value = current;
      this.valueChange.emit([...current]);
    } else {
      this.value = item.value;
      this.valueChange.emit(item.value);
    }
  }

  get groupClasses(): Record<string, boolean> {
    return {
      [`ds-tgl--${this.color}`]: true,
      [`ds-tgl--${this.size}`]: true,
      'ds-tgl--disabled': this.disabled,
    };
  }

  itemClasses(item: ToggleButtonItem): Record<string, boolean> {
    return {
      'ds-tgl__btn--selected': this.isSelected(item.value),
      'ds-tgl__btn--disabled': !!(item.disabled || this.disabled),
      'ds-tgl__btn--icon-only': this.isIconOnly(item),
    };
  }
}
