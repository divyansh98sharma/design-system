import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type ToggleTheme = 'user' | 'admin' | 'green' | 'sunoh';

@Component({
  selector: 'ds-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent {
  /** Whether the toggle is on. */
  @Input() on = false;

  /** Colour theme. */
  @Input() theme: ToggleTheme = 'user';

  /** Prevents user interaction. */
  @Input() disabled = false;

  /** Emits the new on/off state. */
  @Output() onToggle = new EventEmitter<boolean>();

  handleChange(event: { checked: boolean }): void {
    this.on = event.checked;
    this.onToggle.emit(event.checked);
  }

  get hostClasses(): Record<string, boolean> {
    return {
      'ds-toggle': true,
      [`ds-toggle--${this.theme}`]: true,
      'ds-toggle--disabled': this.disabled,
    };
  }
}
