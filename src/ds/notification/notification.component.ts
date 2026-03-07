import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'communication' | 'confirmation' | 'warning' | 'error';
export type NotificationTheme = 'user' | 'admin' | 'green';

/**
 * A notification action button configuration.
 */
export interface NotificationAction {
  /** Button label. */
  label: string;
  /** Optional value emitted when this button is clicked. */
  value?: string;
}

/**
 * Notification banner component.
 *
 * Fixed width: **540 px** · Variable height (responsive to content, up to ~12 lines).
 *
 * Four types: `communication` · `confirmation` · `warning` · `error`
 * Three colour themes: `user` (blue) · `admin` (orange) · `green`
 *
 * - **Bold** keywords: names, actions, element names (e.g. Click **Save**).
 * - Optional **suppress checkbox** (suppresses the alert for 180 days when checked).
 * - Optional **balloon alert** badge dot (for e.g. unread count) at a corner position.
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
  /** Visual type — drives the icon and default sidebar colour. */
  @Input() type: NotificationType = 'communication';

  /** Colour theme — applies to the sidebar and action buttons. */
  @Input() theme: NotificationTheme = 'user';

  /** Window / screen name shown in the heading. */
  @Input() windowName = '{Window Name}';

  /** Brief description shown after the window name (e.g. action or event label). */
  @Input() description = '{Brief Description}';

  /** Main body text. Supports inline `<strong>` for bolded keywords. */
  @Input() bodyText = 'Description of the notification in plain language with keywords {bolded}.';

  /** Action buttons in the footer. Usually one primary button. */
  @Input() actions: NotificationAction[] = [{ label: 'Label' }];

  /** When true, renders a checkbox in the footer to suppress the alert. */
  @Input() showCheckbox = false;

  /** Label for the suppress checkbox. */
  @Input() checkboxLabel = 'Do not show this again';

  /**
   * When set, shows a small badge dot at the given corner of the card.
   * Typically used for unread/count indicators.
   * `null` = no badge.
   */
  @Input() badgePosition:
    | 'top-right' | 'top-left'
    | 'right-top' | 'right-bottom'
    | 'bottom-right' | 'bottom-left'
    | 'left-top' | 'left-bottom'
    | null = null;

  /** Emits the action value (or label) when an action button is clicked. */
  @Output() actionClick = new EventEmitter<string>();

  /** Emits `true` when the suppress checkbox is checked. */
  @Output() suppress = new EventEmitter<boolean>();

  suppressChecked = false;

  onAction(action: NotificationAction): void {
    this.actionClick.emit(action.value ?? action.label);
  }

  onSuppressChange(event: Event): void {
    this.suppressChecked = (event.target as HTMLInputElement).checked;
    this.suppress.emit(this.suppressChecked);
  }

  // ─── Type → icon SVG path ─────────────────────────────────────────────────

  get iconPath(): string {
    switch (this.type) {
      case 'communication':
        // Speech bubble / message icon
        return 'M3 3h14v10H9l-4 4v-4H3V3z M7 8h2 M11 8h2';
      case 'confirmation':
        // Circle check
        return 'M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-1-6l7-7-1.41-1.41L11 13.17l-2.59-2.58L7 12l4 4z';
      case 'warning':
        // Triangle exclamation
        return 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z';
      case 'error':
        // Circle X
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z';
    }
  }

  get iconViewBox(): string {
    switch (this.type) {
      case 'communication': return '0 0 20 20';
      default: return '0 0 24 24';
    }
  }

  get cardClasses(): Record<string, boolean> {
    return {
      'ds-notification': true,
      [`ds-notification--${this.theme}`]: true,
      [`ds-notification--${this.type}`]: true,
      [`ds-notification--badge-${this.badgePosition}`]: !!this.badgePosition,
    };
  }
}
