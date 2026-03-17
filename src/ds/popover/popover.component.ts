import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'primeng/popover';

/** Theme tokens for the popover. */
export type PopoverTheme = 'user' | 'admin';

/**
 * 13 supported notch (caret) positions.
 * 'none' disables the notch entirely.
 */
export type PopoverNotch =
  | 'none'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'top-left'    | 'top-center'    | 'top-right'
  | 'left-top'    | 'left-center'   | 'left-bottom'
  | 'right-top'   | 'right-center'  | 'right-bottom';

/** A labeled text field inside the popover content area. */
export interface PopoverField {
  label: string;
  value: string;
  placeholder?: string;
}

/** A checkbox option inside the popover content area. */
export interface PopoverCheckbox {
  key: string;
  label: string;
  checked: boolean;
}

/** A radio button option inside the popover content area. */
export interface PopoverRadio {
  key: string;
  label: string;
}

/**
 * Popover — 378 px wide card with title, body, optional fields / checkboxes /
 * radio buttons, a footer with two action buttons, and a CSS notch (caret)
 * in one of 13 positions.
 *
 * Themes:
 * - `user`  — `#0378a7` title colour, `#81bbd3` footer border
 * - `admin` — `#e88842` title colour, `#f1b984` footer border
 *
 * Notch positions: none | bottom-* | top-* | left-* | right-*
 */
@Component({
  selector: 'ds-popover',
  standalone: true,
  imports: [CommonModule, FormsModule, PopoverModule],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
  // ─── Content ──────────────────────────────────────────────────────────────

  /** Title shown at the top of the card. */
  @Input() title = 'Popover Title';

  /** Body copy shown below the title. */
  @Input() body = '';

  /** Optional labeled text fields in the content area. */
  @Input() fields: PopoverField[] = [];

  /** Optional checkboxes in the content area. */
  @Input() checkboxes: PopoverCheckbox[] = [];

  /** Optional radio buttons in the content area. */
  @Input() radios: PopoverRadio[] = [];

  /** Key of the currently selected radio option. */
  @Input() selectedRadio = '';

  // ─── Appearance ───────────────────────────────────────────────────────────

  /** Colour theme: user (blue) or admin (orange). */
  @Input() theme: PopoverTheme = 'user';

  /** Notch / caret position. */
  @Input() notch: PopoverNotch = 'bottom-right';

  // ─── Footer ───────────────────────────────────────────────────────────────

  /** Label for the primary (filled) button. */
  @Input() primaryLabel = 'Confirm';

  /** Label for the secondary (outline) button. */
  @Input() secondaryLabel = 'Cancel';

  /** Disables both footer buttons. */
  @Input() footerDisabled = false;

  // ─── Outputs ──────────────────────────────────────────────────────────────

  /** Emits when the primary button is clicked. */
  @Output() primaryClick = new EventEmitter<void>();

  /** Emits when the secondary button is clicked. */
  @Output() secondaryClick = new EventEmitter<void>();

  /** Emits the updated fields array whenever any field value changes. */
  @Output() fieldsChange = new EventEmitter<PopoverField[]>();

  /** Emits the updated checkboxes array whenever a checkbox is toggled. */
  @Output() checkboxesChange = new EventEmitter<PopoverCheckbox[]>();

  /** Emits the new selected radio key when a radio is chosen. */
  @Output() radioChange = new EventEmitter<string>();

  // ─── Theme helpers ────────────────────────────────────────────────────────

  get themeColor(): string {
    return this.theme === 'admin' ? 'var(--popover-admin-color)' : 'var(--popover-user-color)';
  }

  get footerBorderColor(): string {
    return this.theme === 'admin' ? 'var(--popover-admin-border)' : 'var(--popover-user-border)';
  }

  // ─── Event handlers ───────────────────────────────────────────────────────

  onFieldChange(index: number, value: string): void {
    this.fields[index] = { ...this.fields[index], value };
    this.fieldsChange.emit([...this.fields]);
  }

  onCheckboxChange(index: number, checked: boolean): void {
    this.checkboxes[index] = { ...this.checkboxes[index], checked };
    this.checkboxesChange.emit([...this.checkboxes]);
  }

  onRadioChange(key: string): void {
    this.selectedRadio = key;
    this.radioChange.emit(key);
  }
}
