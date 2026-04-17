import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
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

  get hasLabel(): boolean {
    return this.label !== '';
  }

  handleChange(event: { checked?: boolean }): void {
    this.checked = !!event.checked;
    this.checkedChange.emit(this.checked);
  }
}
