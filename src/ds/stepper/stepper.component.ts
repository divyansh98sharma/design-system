import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ds-stepper',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true,
    },
  ],
})
export class StepperComponent implements ControlValueAccessor {
  @Input() value = 1;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() ariaLabel = 'Number stepper';

  @Output() valueChange = new EventEmitter<number>();

  private onChange: (value: number) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  get canDecrement(): boolean {
    return !this.disabled && (this.min === null || this.value > this.min);
  }

  get canIncrement(): boolean {
    return !this.disabled && (this.max === null || this.value < this.max);
  }

  decrement(): void {
    if (!this.canDecrement) return;
    this.setValue(this.value - this.step);
  }

  increment(): void {
    if (!this.canIncrement) return;
    this.setValue(this.value + this.step);
  }

  onInputChange(raw: string): void {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    this.setValue(parsed);
  }

  private setValue(next: number): void {
    let bounded = next;
    if (this.min !== null && bounded < this.min) bounded = this.min;
    if (this.max !== null && bounded > this.max) bounded = this.max;
    this.value = bounded;
    this.valueChange.emit(bounded);
    this.onChange(bounded);
    this.onTouched();
  }

  writeValue(v: number): void {
    if (typeof v === 'number') this.value = v;
  }
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
}
