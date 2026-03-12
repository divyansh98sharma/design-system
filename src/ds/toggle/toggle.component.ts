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

export type ToggleTheme = 'user' | 'admin' | 'green' | 'sunoh';

/**
 * On/Off toggle switch.
 *
 * - **On**: pill is filled with the theme colour and shows a checkmark.
 * - **Off**: pill is white with a gray border and shows an × icon.
 * - Four colour themes match the Figma spec: `user` (blue), `admin` (orange),
 *   `green`, and `sunoh` (pink).
 * - Disabled state prevents interaction without changing the colour theme.
 */
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
  /** Whether the toggle is in the ON state. */
  @Input() on = false;

  /**
   * Colour theme for the ON state.
   * `user` (blue) · `admin` (orange) · `green` · `sunoh` (pink)
   */
  @Input() theme: ToggleTheme = 'user';

  /** Prevents interaction. */
  @Input() disabled = false;

  /** Emits the new `on` boolean on every change. */
  @Output() onToggle = new EventEmitter<boolean>();

  // ── ControlValueAccessor ──────────────────────────────────────────────────

  private onChange: (v: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: boolean): void { this.on = !!v; }
  registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }

  // ── Interaction ───────────────────────────────────────────────────────────

  toggle(): void {
    if (this.disabled) return;
    this.on = !this.on;
    this.onChange(this.on);
    this.onTouched();
    this.onToggle.emit(this.on);
  }

  get pillClasses(): Record<string, boolean> {
    return {
      'ds-toggle__pill': true,
      'ds-toggle__pill--on': this.on,
      [`ds-toggle__pill--${this.theme}`]: true,
      'ds-toggle__pill--disabled': this.disabled,
    };
  }
}
