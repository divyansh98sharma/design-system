import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * On / Off toggle switch — 50 × 24 px pill.
 *
 * Three states:
 * - **Off** — white track, gray `#bcbcbc` border, gray thumb on the left.
 * - **On**  — teal `#007b95` track and border, white thumb on the right.
 * - **Disabled** — gray `#e1e1e1` track, gray `#bcbcbc` border + thumb, non-interactive.
 */
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

  /** Prevents user interaction. */
  @Input() disabled = false;

  /** Optional accessible label for screen readers. */
  @Input() ariaLabel = 'Toggle';

  /** Emits the new on/off state when toggled. */
  @Output() onToggle = new EventEmitter<boolean>();

  handleClick(): void {
    if (this.disabled) return;
    this.on = !this.on;
    this.onToggle.emit(this.on);
  }

  get hostClasses(): Record<string, boolean> {
    return {
      'ds-toggle': true,
      'ds-toggle--on': this.on && !this.disabled,
      'ds-toggle--off': !this.on && !this.disabled,
      'ds-toggle--disabled': this.disabled,
    };
  }
}
