import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoaderTheme = 'user' | 'admin' | 'green' | 'sunoh';

/**
 * Loading indicator — three animated dots.
 *
 * Display this any time the system is delayed or processing a request.
 * For bulk file uploads, use a Progress Bar instead.
 *
 * Four colour themes match the Figma spec: `user` (blue), `admin` (orange),
 * `green`, and `sunoh` (pink).
 */
@Component({
  selector: 'ds-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  /**
   * Colour theme for the animated dots.
   * `user` (blue) · `admin` (orange) · `green` · `sunoh` (pink)
   */
  @Input() theme: LoaderTheme = 'user';

  /** Whether to show the "Loading…" label below the dots. */
  @Input() showLabel = true;

  /** Custom label text. */
  @Input() label = 'Loading...';

  get dotsClass(): Record<string, boolean> {
    return {
      'ds-loader__dots': true,
      [`ds-loader__dots--${this.theme}`]: true,
    };
  }
}
