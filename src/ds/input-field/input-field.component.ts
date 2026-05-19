import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/** Label layout relative to the field. */
export type InputFieldAlignment = 'vertical' | 'horizontal';

/** A value chip shown inside the input (multi-select pattern). */
export interface InputFieldChip {
  label: string;
  icon?: string;
}

/**
 * Input Field — 24 px underline-style field matching the Figma spec.
 *
 * A single border-bottom row containing optional leading adornments
 * (search icon, country code), an editable input, and any combination of
 * trailing adornments (chips with overflow counter, inline error, chevron,
 * calendar, favorite, filter, "Me"/assign-to-self, lookup dots, referral).
 *
 * Implements `ControlValueAccessor` for use with `ngModel` / reactive forms.
 */
@Component({
  selector: 'ds-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  // ─── Label ──────────────────────────────────────────────────────────────
  @Input() label = 'Label';
  @Input() showLabel = true;
  @Input() required = false;
  @Input() showInfo = false;
  @Input() alignment: InputFieldAlignment = 'vertical';

  // ─── Input ──────────────────────────────────────────────────────────────
  @Input() placeholder = 'Search';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() inputType: 'text' | 'email' | 'number' | 'search' | 'tel' | 'url' = 'text';

  // ─── Leading adornments ────────────────────────────────────────────────
  @Input() showSearchIcon = true;
  @Input() showCountryCode = false;
  @Input() countryCode = '+1';

  // ─── Trailing adornments ───────────────────────────────────────────────
  @Input() showChevron = false;
  @Input() showCalendar = false;
  @Input() showFavorite = false;
  @Input() showFilter = false;
  @Input() showReferral = false;
  @Input() showLookup = false;
  @Input() assignToSelf = false;
  @Input() assignToSelfLabel = 'Me';

  /** When > 0 chips.length, shows the chips + a "+N" counter chip for the overflow. */
  @Input() chips: InputFieldChip[] = [];
  /** Max number of chips to show before collapsing to "+N". 0 = show all. */
  @Input() maxVisibleChips = 1;

  // ─── State / feedback ──────────────────────────────────────────────────
  @Input() supportText = '';
  @Input() errorText = '';
  @Input() showInlineErrorIcon = true;

  // ─── Outputs ───────────────────────────────────────────────────────────
  @Output() valueChange = new EventEmitter<string>();
  @Output() chevronClick = new EventEmitter<void>();
  @Output() calendarClick = new EventEmitter<void>();
  @Output() favoriteClick = new EventEmitter<void>();
  @Output() filterClick = new EventEmitter<void>();
  @Output() lookupClick = new EventEmitter<void>();
  @Output() referralClick = new EventEmitter<void>();
  @Output() assignToSelfClick = new EventEmitter<void>();
  @Output() chipRemoved = new EventEmitter<number>();

  /** Internal model. */
  value = '';

  // ─── ControlValueAccessor ───────────────────────────────────────────────
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  handleInput(v: string): void {
    this.value = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }

  handleBlur(): void { this.onTouched(); }

  get visibleChips(): InputFieldChip[] {
    if (!this.maxVisibleChips) return this.chips;
    return this.chips.slice(0, this.maxVisibleChips);
  }

  get overflowChipCount(): number {
    if (!this.maxVisibleChips) return 0;
    return Math.max(0, this.chips.length - this.maxVisibleChips);
  }

  get hasError(): boolean {
    return !!this.errorText;
  }
}
