import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

/** Label layout relative to the field. */
export type InputFieldAlignment = 'vertical' | 'horizontal';

/**
 * Input Field — versatile 24 px search/select input matching the design system.
 *
 * Features:
 * - Optional label (vertical or horizontal layout)
 * - Optional required asterisk on the label
 * - Optional info icon on the label
 * - Optional leading search icon
 * - Editable text area with italic placeholder
 * - Optional chevron-down indicator (marks field as a select/dropdown)
 * - Optional support text below the field
 * - Optional error text with inline error icon
 * - Focus ring: `box-shadow 0 0 0 2px #0378a7`
 *
 * Implements `ControlValueAccessor` so it can be used with `ngModel` /
 * reactive forms.
 */
@Component({
  selector: 'ds-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, InputText],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  /** Text shown above or to the left of the field. */
  @Input() label = 'Label';

  /** Hides the label entirely when false. */
  @Input() showLabel = true;

  /** Shows a red asterisk after the label text. */
  @Input() required = false;

  /** Shows an info icon (ℹ) after the label. */
  @Input() showInfo = false;

  /** Label–field layout direction. */
  @Input() alignment: InputFieldAlignment = 'vertical';

  /** Placeholder shown in the input when empty. */
  @Input() placeholder = 'Text';

  /** Shows the search (magnifier) icon on the left. */
  @Input() showSearchIcon = true;

  /** Shows a chevron-down on the right (use for dropdown/select fields). */
  @Input() showChevron = true;

  /** Support text rendered below the field. */
  @Input() supportText = '';

  /** Inline error message; when set shows the alert icon + message. */
  @Input() errorText = '';

  /** Disables the input. */
  @Input() disabled = false;

  /** Emits the current value on every keystroke. */
  @Output() valueChange = new EventEmitter<string>();

  /** Internal model value. */
  value = '';

  // ─── ControlValueAccessor ─────────────────────────────────────────────────
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  handleInput(v: string): void {
    this.value = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }

  handleBlur(): void { this.onTouched(); }
}
