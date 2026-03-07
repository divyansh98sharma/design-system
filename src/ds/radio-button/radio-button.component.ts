import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Individual radio button control.
 *
 * For grouped radio buttons where only one can be selected at a time,
 * use `ds-radio-group` (or manage value state in the parent and pass
 * `[checked]="value === item.value"` to each `ds-radio-button`).
 */
@Component({
  selector: 'ds-radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
  ],
})
export class RadioButtonComponent implements ControlValueAccessor {
  /** Whether this radio button is selected. */
  @Input() checked = false;

  /** Prevents user interaction and applies muted styles. */
  @Input() disabled = false;

  /** Label text displayed next to the radio button. Pass empty string to hide. */
  @Input() label = 'Label';

  /** The value this radio button represents (used in radio groups). */
  @Input() value: unknown = null;

  /** Emits when the radio button is selected. */
  @Output() checkedChange = new EventEmitter<boolean>();

  // ── ControlValueAccessor ──────────────────────────────────────────────────

  private onChange: (v: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: unknown): void { this.checked = v === this.value || v === true; }
  registerOnChange(fn: (v: unknown) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }

  // ── Interaction ───────────────────────────────────────────────────────────

  select(): void {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.onChange(this.value ?? true);
    this.onTouched();
    this.checkedChange.emit(true);
  }

  get hasLabel(): boolean {
    return this.label !== '';
  }

  get buttonClasses(): Record<string, boolean> {
    return {
      'ds-radio__button': true,
      'ds-radio__button--checked': this.checked,
      'ds-radio__button--disabled': this.disabled,
    };
  }
}
