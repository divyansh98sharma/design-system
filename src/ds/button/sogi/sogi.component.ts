import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

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
      min-height     : 24px;
      max-height     : 24px;
      padding        : 4px 8px;
      border-radius  : 999px;
      border         : none;
      background-image: linear-gradient(
        85.64deg,
        rgb(95, 167, 177)  1.36%,
        rgb(167,  87, 106) 33.51%,
        rgb(206,  53,  66) 51.00%,
        rgb(226, 106,  38) 76.06%,
        rgb(246, 160,   8) 95.91%
      );
      color      : #ffffff;
      font-family: 'Open Sans', sans-serif;
      font-size  : 12px;
      font-weight: 400;
      line-height: 16px;
      white-space: nowrap;
      cursor     : pointer;

      &:focus-visible {
        outline       : 2px solid #ffffff;
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
