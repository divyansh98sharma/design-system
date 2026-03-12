import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButton } from 'primeng/radiobutton';

@Component({
  selector: 'ds-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButton],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent {
  /** The value this radio represents. */
  @Input() value: unknown = '';

  /** The currently selected value in the group (bind to the same variable across all radios). */
  @Input() model: unknown = null;

  /** Label text displayed next to the radio. */
  @Input() label = 'Label';

  /** Group name — all radios with the same name form one group. */
  @Input() name = 'radio-group';

  /** Prevents user interaction. */
  @Input() disabled = false;

  /** Emits the selected value when this radio is selected. */
  @Output() modelChange = new EventEmitter<unknown>();

  handleChange(event: { value: unknown }): void {
    this.model = event.value;
    this.modelChange.emit(event.value);
  }

  get hasLabel(): boolean {
    return this.label !== '';
  }
}
