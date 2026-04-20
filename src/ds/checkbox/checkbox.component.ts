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

@Component({
  selector: 'ds-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  /** Whether the checkbox is checked. */
  @Input() checked = false;

  /** Shows a dash instead of a checkmark — used when a group is partially selected. */
  @Input() indeterminate = false;

  /** Prevents user interaction and applies muted styles. */
  @Input() disabled = false;

  /** Label text displayed next to the checkbox. Set to empty string to hide the label. */
  @Input() label = 'Label';

  /** Emits the new checked state on every change. */
  @Output() checkedChange = new EventEmitter<boolean>();

  private onChange: (v: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  get hasLabel(): boolean {
    return this.label !== '';
  }

  toggle(): void {
    if (this.disabled) return;
    this.checked = this.indeterminate ? true : !this.checked;
    this.indeterminate = false;
    this.checkedChange.emit(this.checked);
    this.onChange(this.checked);
    this.onTouched();
  }

  // ControlValueAccessor

  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (v: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
