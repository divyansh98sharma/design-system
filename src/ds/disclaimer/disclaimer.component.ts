import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type DisclaimerType = 'note' | 'disclaimer';

/**
 * Single-line warning strip — yellow background `#fff9eb`, border `#fbce2a`.
 *
 * Anatomy: `[bold prefix] [body text] [× close]`
 *
 * Set `type` to switch the prefix between "Note" and "Disclaimer", or pass
 * a custom `label` to override.
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
  /** Prefix style — `note` shows "Note", `disclaimer` shows "Disclaimer". */
  @Input() type: DisclaimerType = 'note';

  /** Custom prefix label. Falls back to the capitalised `type`. */
  @Input() label: string | null = null;

  /** Body text. */
  @Input() text = 'Body text';

  /** Show the trailing close × button. */
  @Input() showClose = true;

  /** Emits when the close button is clicked. */
  @Output() closed = new EventEmitter<void>();

  get resolvedLabel(): string {
    if (this.label !== null) return this.label;
    return this.type === 'disclaimer' ? 'Disclaimer' : 'Note';
  }
}
