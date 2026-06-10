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
  selector: 'ds-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() value = '';
  @Input() rows = 4;
  @Input() disabled = false;
  @Input() error = false;
  @Input() minCharacters = 0;
  @Input() maxCharacters?: number;
  @Input() showCounter = false;

  @Output() valueChange = new EventEmitter<string>();

  private onChange: (v: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  get charCount(): number { return this.value.length; }

  onInput(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
    this.onChange(value);
  }

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
}
