import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type LabelSize = 'default' | 'large';

/**
 * Label — standalone form/field label.
 *
 * Inter Regular text with optional required asterisk, info icon, and caret
 * indicator. Use `fixedWidth` in filter contexts — text truncates to two
 * lines at a fixed 100 px width per Figma guidance.
 */
@Component({
  selector: 'ds-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  /** Label text (ignored when content is projected). */
  @Input() text = 'Label';

  /** Size variant. `default` = 12/16, `large` = 14/20. */
  @Input() size: LabelSize = 'default';

  /** Shows the red required asterisk. */
  @Input() required = false;

  /** Shows an info icon after the label. */
  @Input() showInfo = false;

  /** Shows a caret-down icon after the label (use when label triggers a dropdown). */
  @Input() showCaret = false;

  /** `for` attribute to link the label to a form control. */
  @Input() for: string | null = null;

  /**
   * Apply the 100 px fixed-width filter style — truncates to two lines
   * with ellipsis per Figma guidance.
   */
  @Input() fixedWidth = false;

  /** Tooltip text shown on the info icon. */
  @Input() infoTooltip = '';

  /** Emits when the info icon is clicked. */
  @Output() infoClick = new EventEmitter<void>();

  /** Emits when the caret is clicked. */
  @Output() caretClick = new EventEmitter<void>();
}
