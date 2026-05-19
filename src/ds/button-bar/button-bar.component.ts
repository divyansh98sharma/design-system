import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../checkbox/checkbox.component';

export interface ButtonBarAction {
  /** Visible label inside the action button. */
  label: string;
  /** Optional unique id echoed back through `actionClick`. */
  id?: string;
  /** Trailing icon — `'chevron-down'` (default), `'chevron-up'`, or `'none'`. */
  trailingIcon?: 'chevron-down' | 'chevron-up' | 'none';
  /** Disables the action. */
  disabled?: boolean;
}

export interface ButtonBarActionEvent {
  side: 'left' | 'right';
  index: number;
  action: ButtonBarAction;
}

@Component({
  selector: 'ds-button-bar',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './button-bar.component.html',
  styleUrl: './button-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBarComponent {
  /** Actions rendered on the left side. */
  @Input() leftActions: ButtonBarAction[] = [];

  /** Actions rendered on the right side. */
  @Input() rightActions: ButtonBarAction[] = [];

  /** Show the leading "Select All" checkbox + divider. */
  @Input() showSelectAll = false;

  /** Label for the Select All checkbox. */
  @Input() selectAllLabel = 'Select All';

  /** Current Select All checked state. */
  @Input() selectAllChecked = false;

  /** Show partial-selection state on the Select All checkbox. */
  @Input() selectAllIndeterminate = false;

  /** Show the trailing sort icon button (after left actions). */
  @Input() showSort = false;

  /** Accessible label for the sort button. */
  @Input() sortLabel = 'Sort';

  /** Show the trailing "More" button (after right actions). */
  @Input() showMore = false;

  /** Label for the More button. */
  @Input() moreLabel = 'More';

  @Output() selectAllChange = new EventEmitter<boolean>();
  @Output() actionClick = new EventEmitter<ButtonBarActionEvent>();
  @Output() sortClick = new EventEmitter<void>();
  @Output() moreClick = new EventEmitter<void>();

  onSelectAllChange(checked: boolean): void {
    this.selectAllChecked = checked;
    this.selectAllChange.emit(checked);
  }

  onActionClick(side: 'left' | 'right', index: number, action: ButtonBarAction): void {
    if (action.disabled) return;
    this.actionClick.emit({ side, index, action });
  }

  trackAction(index: number, action: ButtonBarAction): string {
    return action.id ?? `${index}-${action.label}`;
  }
}
