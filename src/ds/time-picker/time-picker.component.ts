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

export type TimePickerMode = 'single' | 'range';

@Component({
  selector: 'ds-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements ControlValueAccessor {
  @Input() mode: TimePickerMode = 'single';
  @Input() value = '';
  @Input() rangeStart = '';
  @Input() rangeEnd = '';
  @Input() open = false;
  @Input() label = 'Time';

  @Output() valueChange = new EventEmitter<string>();
  @Output() rangeChange = new EventEmitter<{ start: string; end: string }>();
  @Output() openChange = new EventEmitter<boolean>();

  private onChange: (v: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  toggle(): void { this.open = !this.open; this.openChange.emit(this.open); }
  onTimeChange(v: string): void { this.value = v; this.valueChange.emit(v); this.onChange(v); }
  onRangeChange(): void { this.rangeChange.emit({ start: this.rangeStart, end: this.rangeEnd }); }

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
