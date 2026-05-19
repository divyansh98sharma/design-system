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
  selector: 'ds-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() on = false;
  @Input() disabled = false;
  @Input() ariaLabel = 'Toggle';

  @Output() change = new EventEmitter<boolean>();

  private onChange: (value: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  toggle(): void {
    if (this.disabled) return;
    this.on = !this.on;
    this.onChange(this.on);
    this.onTouched();
    this.change.emit(this.on);
  }

  writeValue(value: boolean): void {
    this.on = !!value;
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
