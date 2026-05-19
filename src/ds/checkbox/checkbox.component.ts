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
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() label = 'Label';
  @Input() ariaLabel?: string;

  @Output() checkedChange = new EventEmitter<boolean>();

  private onChange: (value: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  get hasLabel(): boolean {
    return this.label !== '';
  }

  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.checkedChange.emit(this.checked);
    this.onChange(this.checked);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
