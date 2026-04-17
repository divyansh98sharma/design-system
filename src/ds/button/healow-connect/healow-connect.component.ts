import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Visual state of the Healow Connect button.
 * - `default`                  — idle, grey pill
 * - `call-in-progress`         — active call, green filled pill
 * - `call-in-progress-hover`   — active call hovered, white pill with green border
 * - `disabled`                 — non-interactive, muted grey
 * - `call-in-progress-disabled`— active call but non-interactive
 */
export type HealowConnectState =
  | 'default'
  | 'call-in-progress'
  | 'call-in-progress-hover'
  | 'disabled'
  | 'call-in-progress-disabled';

/**
 * Healow Connect button — pill-shaped control used to initiate or indicate
 * a healow video/telehealth call.  Placed in the Patient Info banner.
 */
@Component({
  selector: 'ds-healow-connect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './healow-connect.component.html',
  styleUrl: './healow-connect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealowConnectComponent {
  /** Controls the visual appearance of the button. */
  @Input() state: HealowConnectState = 'default';

  /** Emits when the button is clicked (not emitted when disabled). */
  @Output() connectClick = new EventEmitter<void>();

  get isDisabled(): boolean {
    return (
      this.state === 'disabled' ||
      this.state === 'call-in-progress-disabled'
    );
  }

  get isCallInProgress(): boolean {
    return (
      this.state === 'call-in-progress' ||
      this.state === 'call-in-progress-hover' ||
      this.state === 'call-in-progress-disabled'
    );
  }

  handleClick(): void {
    if (!this.isDisabled) {
      this.connectClick.emit();
    }
  }
}
