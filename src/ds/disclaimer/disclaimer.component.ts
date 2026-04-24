import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type DisclaimerVariant = 'disclaimer';
export type DisclaimerLabelPosition = 'left' | 'top';

/**
 * Disclaimer banner component.
 *
 * Yellow warning strip — uses warning palette tokens.
 *
 * **Two layouts:**
 * - `labelPosition: 'left'` — "Disclaimer:" label inline with body text and close button.
 * - `labelPosition: 'top'` — "Disclaimer:" label on its own row, italic body text below and close button.
 *
 * Typography:
 * - "Disclaimer:" label: **bold + italic**.
 * - Body text (`text`): italic.
 */
@Component({
  selector: 'ds-disclaimer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerComponent {
  /** Layout variant. */
  @Input() variant: DisclaimerVariant = 'disclaimer';

  /** Position of the "Disclaimer:" label — `'left'` (inline) or `'top'` (own row). */
  @Input() labelPosition: DisclaimerLabelPosition = 'left';

  /** Primary body text. */
  @Input() text = 'This content is for informational purposes only.';

  /** Optional second line of body text (shown below the first line). */
  @Input() line2 = '';

  /** Emits when the close button is clicked. */
  @Output() closed = new EventEmitter<void>();
}
