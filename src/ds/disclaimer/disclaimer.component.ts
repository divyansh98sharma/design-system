import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/message';

export type DisclaimerVariant = 'disclaimer' | 'ai-disclaimer';
export type DisclaimerLabelPosition = 'left' | 'top';

/**
 * Disclaimer banner component.
 *
 * Yellow warning strip — background `#fff9eb`, border `#fbce2a`.
 *
 * **Three layouts:**
 * - `disclaimer` + `labelPosition: 'left'` — "Disclaimer:" label inline with body text and close button.
 * - `disclaimer` + `labelPosition: 'top'` — "Disclaimer:" label on its own row, italic body text below and close button.
 * - `ai-disclaimer` — AI-specific text block + "Acknowledge for AI Assistant" secondary button.
 *
 * Typography:
 * - "Disclaimer:" label: **bold + italic**.
 * - Body text (`text`): italic for `disclaimer` · regular for `ai-disclaimer`.
 */
@Component({
  selector: 'ds-disclaimer',
  standalone: true,
  imports: [CommonModule, Message],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerComponent {
  /** Layout variant. */
  @Input() variant: DisclaimerVariant = 'disclaimer';

  /**
   * Position of the "Disclaimer:" label — `'left'` (inline) or `'top'` (own row).
   * Only relevant when `variant === 'disclaimer'`.
   */
  @Input() labelPosition: DisclaimerLabelPosition = 'left';

  /** Primary body text. */
  @Input() text = 'This content is for informational purposes only.';

  /** Optional second line of body text (shown below the first line). */
  @Input() line2 = '';

  /** Main text for the AI disclaimer (supports longer paragraphs). */
  @Input() aiText =
    'This feature uses artificial intelligence. AI-generated results may contain errors or inaccuracies.';

  /** Additional bolded note appended after the AI body text. */
  @Input() aiNote = 'Always verify AI-generated content with a qualified professional.';

  /** Label on the acknowledge button (AI variant). */
  @Input() acknowledgeLabel = 'Acknowledge for AI Assistant';

  /** Emits when the close button is clicked. */
  @Output() closed = new EventEmitter<void>();

  /** Emits when the acknowledge button is clicked (AI variant). */
  @Output() acknowledge = new EventEmitter<void>();
}
