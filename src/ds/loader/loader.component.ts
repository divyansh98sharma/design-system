import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoaderTheme = 'user' | 'admin' | 'green' | 'sunoh';

@Component({
  selector: 'ds-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() theme: LoaderTheme = 'user';
  @Input() showLabel = false;
  @Input() label = 'Loading…';

  get dotsClass(): Record<string, boolean> {
    return {
      'ds-loader__dots': true,
      [`ds-loader__dots--${this.theme}`]: true,
    };
  }
}
