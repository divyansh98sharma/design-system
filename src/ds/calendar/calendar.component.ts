import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CalendarMode = 'single' | 'range';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DayCell {
  date: Date;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  iso: string;
}

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

@Component({
  selector: 'ds-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ],
})
export class CalendarComponent implements ControlValueAccessor {
  @Input() mode: CalendarMode = 'single';
  @Input() set selected(value: Date | null) {
    this.singleDate = value ?? null;
    this.syncCursor();
  }
  @Input() set range(value: DateRange | null) {
    this.rangeValue = value ?? { start: null, end: null };
    this.syncCursor();
  }
  @Input() showFooter = false;
  @Input() applyLabel = 'Apply';
  @Input() cancelLabel = 'Cancel';

  @Output() dateSelect = new EventEmitter<Date>();
  @Output() rangeSelect = new EventEmitter<DateRange>();
  @Output() apply = new EventEmitter<Date | DateRange>();
  @Output() cancel = new EventEmitter<void>();

  cursor: Date = this.startOfMonth(new Date());
  singleDate: Date | null = null;
  rangeValue: DateRange = { start: null, end: null };

  readonly weekdays = WEEKDAY_LABELS;

  private onChange: (value: Date | DateRange | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  get monthLabel(): string {
    return `${MONTH_LABELS[this.cursor.getMonth()]} ${this.cursor.getFullYear()}`;
  }

  get cells(): DayCell[] {
    const firstOfMonth = this.startOfMonth(this.cursor);
    const startWeekday = firstOfMonth.getDay();
    const start = new Date(firstOfMonth);
    start.setDate(1 - startWeekday);

    const today = this.toIso(new Date());

    const cells: DayCell[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const iso = this.toIso(d);
      cells.push({
        date: d,
        day: d.getDate(),
        inMonth: d.getMonth() === this.cursor.getMonth(),
        isToday: iso === today,
        isSelected: this.isSelected(d),
        isInRange: this.isInRange(d),
        isRangeStart: this.isRangeBoundary(d, 'start'),
        isRangeEnd: this.isRangeBoundary(d, 'end'),
        iso,
      });
    }
    return cells;
  }

  trackByIso(_: number, cell: DayCell): string {
    return cell.iso;
  }

  prevMonth(): void {
    const next = new Date(this.cursor);
    next.setMonth(next.getMonth() - 1);
    this.cursor = next;
  }

  nextMonth(): void {
    const next = new Date(this.cursor);
    next.setMonth(next.getMonth() + 1);
    this.cursor = next;
  }

  selectCell(cell: DayCell): void {
    if (this.mode === 'single') {
      this.singleDate = cell.date;
      this.dateSelect.emit(cell.date);
      this.onChange(cell.date);
    } else {
      const r = this.rangeValue;
      if (!r.start || (r.start && r.end)) {
        this.rangeValue = { start: cell.date, end: null };
      } else if (cell.date < r.start) {
        this.rangeValue = { start: cell.date, end: r.start };
      } else {
        this.rangeValue = { start: r.start, end: cell.date };
      }
      this.rangeSelect.emit(this.rangeValue);
      this.onChange(this.rangeValue);
    }
    this.onTouched();
  }

  onApply(): void {
    this.apply.emit(this.mode === 'single' ? this.singleDate! : this.rangeValue);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  // ─── ControlValueAccessor ───────────────────────────────────────────────────
  writeValue(value: Date | DateRange | null): void {
    if (this.mode === 'single') {
      this.singleDate = (value as Date | null) ?? null;
    } else if (value && typeof value === 'object' && 'start' in value) {
      this.rangeValue = value as DateRange;
    }
    this.syncCursor();
  }

  registerOnChange(fn: (value: Date | DateRange | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // ─── Helpers ────────────────────────────────────────────────────────────────
  private startOfMonth(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  private toIso(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private syncCursor(): void {
    const ref = this.mode === 'single' ? this.singleDate : this.rangeValue.start;
    if (ref) this.cursor = this.startOfMonth(ref);
  }

  private isSelected(d: Date): boolean {
    if (this.mode === 'single') {
      return !!(this.singleDate && this.toIso(d) === this.toIso(this.singleDate));
    }
    return this.isRangeBoundary(d, 'start') || this.isRangeBoundary(d, 'end');
  }

  private isInRange(d: Date): boolean {
    if (this.mode !== 'range') return false;
    const { start, end } = this.rangeValue;
    if (!start || !end) return false;
    return d > start && d < end;
  }

  private isRangeBoundary(d: Date, end: 'start' | 'end'): boolean {
    if (this.mode !== 'range') return false;
    const ref = this.rangeValue[end];
    return !!(ref && this.toIso(d) === this.toIso(ref));
  }
}
