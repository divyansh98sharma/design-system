import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SOGI badge — a pill-shaped label with a rainbow pride gradient.
 *
 * Displays the acronym "SOGI" (Sexual Orientation & Gender Identity) in
 * white text over a multi-stop gradient. Used in the Patient Info banner
 * to indicate that SOGI data is collected for this patient.
 */
@Component({
  selector: 'ds-sogi',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="ds-sogi"
      type="button"
      aria-label="SOGI — Sexual Orientation &amp; Gender Identity"
      (click)="sogiClick.emit()"
    >
      SOGI
    </button>
  `,
  styles: [`
    :host { display: inline-block; }

    .ds-sogi {
      display        : inline-flex;
      align-items    : center;
      justify-content: center;
      min-height     : var(--sogi-height);
      max-height     : var(--sogi-height);
      padding        : var(--spacing-x-small) var(--spacing-small);
      border-radius  : var(--radius-pill);
      border         : none;
      background-image: var(--sogi-gradient);
      color      : var(--color-white);
      font-family: var(--font-family-base);
      font-size  : var(--font-size-12);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-16);
      white-space: nowrap;
      cursor     : pointer;

      &:focus-visible {
        outline       : 2px solid var(--color-white);
        outline-offset: 2px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SogiComponent {
  /** Emits when the SOGI badge is clicked. */
  @Output() sogiClick = new EventEmitter<void>();
}
