import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'communication' | 'confirmation' | 'warning' | 'error';

/** Footer action button configuration. */
export interface NotificationAction {
  /** Button label. */
  label: string;
  /** Optional emitted value (falls back to `label`). */
  value?: string;
  /** Button variant — `primary` filled teal, `secondary` neutral gray. */
  variant?: 'primary' | 'secondary';
}

/**
 * Notification card — 540 px wide white card with a circular icon badge on
 * the left, a heading/body in the middle, and an optional suppress checkbox
 * plus action buttons in the footer.
 *
 * Four types drive the icon colour only:
 * - `communication` — teal (#007b95)
 * - `confirmation` — green (#018145)
 * - `warning` — yellow (#fbce2a)
 * - `error` — red (#d82727)
 */
@Component({
  selector: 'ds-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  /** Visual type — drives the circular icon badge colour and glyph. */
  @Input() type: NotificationType = 'communication';

  /** Window / screen name shown first in the heading. */
  @Input() windowName = '{Window Name}';

  /** Short description shown after the window name, separated by a dash. */
  @Input() description = '{Brief Description}';

  /** Main body text. Supports inline `<strong>` / `<em>` for bolded or italicised keywords. */
  @Input() bodyText = 'Description of the notification in plain language with keywords {bolded}.';

  /** Action buttons rendered at the right of the footer. */
  @Input() actions: NotificationAction[] = [
    { label: 'Button', variant: 'primary' },
    { label: 'Button', variant: 'secondary' },
  ];

  /** When true, renders a suppress-alert checkbox on the left of the footer. */
  @Input() showCheckbox = false;

  /** Label for the suppress checkbox. */
  @Input() checkboxLabel = 'Do not show this again';

  /** Emits the action value (or label) when an action button is clicked. */
  @Output() actionClick = new EventEmitter<string>();

  /** Emits the checkbox state when toggled. */
  @Output() suppress = new EventEmitter<boolean>();

  suppressChecked = false;

  onAction(action: NotificationAction): void {
    this.actionClick.emit(action.value ?? action.label);
  }

  onSuppressChange(event: Event): void {
    this.suppressChecked = (event.target as HTMLInputElement).checked;
    this.suppress.emit(this.suppressChecked);
  }

  get iconPath(): string {
    switch (this.type) {
      case 'communication':
        return 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z';
      case 'confirmation':
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
      case 'warning':
        return 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z';
      case 'error':
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z';
    }
  }

  get cardClasses(): Record<string, boolean> {
    return {
      'ds-notification': true,
      [`ds-notification--${this.type}`]: true,
    };
  }
}
