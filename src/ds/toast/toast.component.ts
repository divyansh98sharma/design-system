import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToastType = 'confirmation' | 'communication';

/**
 * Toast notification component.
 *
 * Fixed height: **56 px** · Min width: 520 px · Max width: 600 px.
 *
 * Two types:
 * - `confirmation` — green background, checkmark icon, optional **Undo** button.
 * - `communication` — dark gray background, info icon.
 *
 * White text throughout.
 */
@Component({
  selector: 'ds-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  /** Visual type — changes background colour and icon. */
  @Input() type: ToastType = 'confirmation';

  /** Window / screen name shown in bold. */
  @Input() windowName = 'Window Name';

  /** Brief description shown after the window name. */
  @Input() description = 'Action completed successfully.';

  /** Optional second line of body text. */
  @Input() line2 = '';

  /**
   * When true, renders an **Undo** button next to the close icon.
   * Only visible on `confirmation` type.
   */
  @Input() showUndo = false;

  /** Label for the undo button (e.g. "Undo 5 Sec"). */
  @Input() undoLabel = 'Undo 5 Sec';

  /** Emits when the close button is clicked. */
  @Output() closed = new EventEmitter<void>();

  /** Emits when the undo button is clicked. */
  @Output() undoClick = new EventEmitter<void>();

  // ─── Icon paths ───────────────────────────────────────────────────────────

  get iconPath(): string {
    switch (this.type) {
      case 'confirmation':
        // Checkmark
        return 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z';
      case 'communication':
        // Info circle
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z';
    }
  }
}
