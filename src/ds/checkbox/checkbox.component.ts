import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export type CheckboxState = 'default' | 'hover';

@Component({
  selector: 'ds-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  // ── ControlValueAccessor ──────────────────────────────────────────────────

  private onChange: (v: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: boolean): void { this.checked = !!v; }
  registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }

  // ── Interaction ───────────────────────────────────────────────────────────

  toggle(): void {
    if (this.disabled) return;
    if (this.indeterminate) {
      // First click on indeterminate → goes to checked
      this.indeterminate = false;
      this.checked = true;
    } else {
      this.checked = !this.checked;
    }
    this.onChange(this.checked);
    this.onTouched();
    this.checkedChange.emit(this.checked);
  }

  get hasLabel(): boolean {
    return this.label !== '';
  }

  get boxClasses(): Record<string, boolean> {
    return {
      'ds-checkbox__box': true,
      'ds-checkbox__box--checked': this.checked && !this.indeterminate,
      'ds-checkbox__box--indeterminate': this.indeterminate,
      'ds-checkbox__box--disabled': this.disabled,
    };
  }
}
