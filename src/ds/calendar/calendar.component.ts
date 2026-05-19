import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type CalendarMode = 'single' | 'range';
export type CalendarLabelPosition = 'top' | 'left';
export type CalendarShortcutDirection = 'past' | 'future';

export interface CalendarShortcut {
  /** Display label (e.g. "Yesterday", "Last Week"). */
  label: string;
  /** Days from today (negative = past, positive = future). */
  offsetDays: number;
}

export interface CalendarRange {
  start: Date | null;
  end: Date | null;
}

interface DayCell {
  date: Date;
  day: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  inRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const DEFAULT_PAST_SHORTCUTS: CalendarShortcut[] = [
  { label: 'Yesterday', offsetDays: -1 },
  { label: 'Last Week', offsetDays: -7 },
  { label: '2 Weeks ago', offsetDays: -14 },
  { label: '3 Weeks ago', offsetDays: -21 },
  { label: '4 Weeks ago', offsetDays: -28 },
  { label: '2 Months ago', offsetDays: -60 },
  { label: '4 Months ago', offsetDays: -120 },
];

const DEFAULT_FUTURE_SHORTCUTS: CalendarShortcut[] = [
  { label: 'Tomorrow', offsetDays: 1 },
  { label: 'Next Week', offsetDays: 7 },
  { label: 'In 2 Weeks', offsetDays: 14 },
  { label: 'In 3 Weeks', offsetDays: 21 },
  { label: 'In 4 Weeks', offsetDays: 28 },
  { label: 'In 2 Months', offsetDays: 60 },
  { label: 'In 4 Months', offsetDays: 120 },
];

/**
 * Calendar — date or date-range picker with optional jump-to-date shortcuts
 * and time picker. Inline trigger renders a labeled input that opens a
 * popover containing the date grid.
 *
 * Modes:
 * - `single` — pick a single date.
 * - `range`  — pick a start + end date (renders two adjacent triggers).
 */
@Component({
  selector: 'ds-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  // ─── Inputs ───────────────────────────────────────────────────────────────

  @Input() mode: CalendarMode = 'single';
  @Input() labelPosition: CalendarLabelPosition = 'top';
  @Input() label = 'Date';
  @Input() startLabel = 'From Date';
  @Input() endLabel = 'To Date';
  @Input() placeholder = 'MM/DD/YYYY';
  @Input() withJumpToDate = false;
  @Input() withTimePicker = false;
  @Input() pastShortcuts: CalendarShortcut[] = DEFAULT_PAST_SHORTCUTS;
  @Input() futureShortcuts: CalendarShortcut[] = DEFAULT_FUTURE_SHORTCUTS;

  /** Optional initial value for `single` mode. */
  @Input() set value(v: Date | null) {
    this._value = v;
    if (v) {
      this.viewMonth = v.getMonth();
      this.viewYear = v.getFullYear();
    }
  }
  get value(): Date | null { return this._value; }

  /** Optional initial value for `range` mode. */
  @Input() set rangeValue(v: CalendarRange) {
    this._range = { ...v };
    const anchor = v.start ?? v.end;
    if (anchor) {
      this.viewMonth = anchor.getMonth();
      this.viewYear = anchor.getFullYear();
    }
  }
  get rangeValue(): CalendarRange { return this._range; }

  // ─── Outputs ──────────────────────────────────────────────────────────────

  @Output() valueChange = new EventEmitter<Date | null>();
  @Output() rangeChange = new EventEmitter<CalendarRange>();

  // ─── State ────────────────────────────────────────────────────────────────

  open = false;
  /** Which trigger opened the popover in range mode (start or end). */
  activeRangeField: 'start' | 'end' = 'start';
  shortcutDirection: CalendarShortcutDirection = 'past';

  viewMonth: number = new Date().getMonth();
  viewYear: number = new Date().getFullYear();

  protected weekdays = WEEKDAYS;
  protected months = MONTHS;

  private _value: Date | null = null;
  private _range: CalendarRange = { start: null, end: null };
  private host = inject(ElementRef<HTMLElement>);

  // ─── Outside-click ────────────────────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (this.open && !this.host.nativeElement.contains(e.target as Node)) {
      this.open = false;
    }
  }

  // ─── Trigger ──────────────────────────────────────────────────────────────

  openPopover(field: 'start' | 'end' = 'start', e?: MouseEvent): void {
    e?.stopPropagation();
    this.activeRangeField = field;
    this.open = true;
  }

  formatDate(d: Date | null): string {
    if (!d) return this.placeholder;
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${mm}/${dd}/${d.getFullYear()}`;
  }

  // ─── Year list (±10 from current view) ────────────────────────────────────

  get yearOptions(): number[] {
    const span = 10;
    return Array.from({ length: span * 2 + 1 }, (_, i) => this.viewYear - span + i);
  }

  // ─── Month grid ───────────────────────────────────────────────────────────

  get rows(): DayCell[][] {
    const first = new Date(this.viewYear, this.viewMonth, 1);
    const startDay = first.getDay(); // 0 = Sun
    const start = new Date(this.viewYear, this.viewMonth, 1 - startDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const out: DayCell[][] = [];
    for (let r = 0; r < 6; r++) {
      const row: DayCell[] = [];
      for (let c = 0; c < 7; c++) {
        const d = new Date(start);
        d.setDate(start.getDate() + r * 7 + c);
        d.setHours(0, 0, 0, 0);
        row.push(this.toCell(d, today));
      }
      out.push(row);
    }
    return out;
  }

  private toCell(d: Date, today: Date): DayCell {
    const inMonth = d.getMonth() === this.viewMonth;
    const isToday = d.getTime() === today.getTime();
    let isSelected = false;
    let inRange = false;
    let isRangeStart = false;
    let isRangeEnd = false;

    if (this.mode === 'single') {
      isSelected = !!this._value && this.sameDay(d, this._value);
    } else {
      const { start, end } = this._range;
      if (start) isRangeStart = this.sameDay(d, start);
      if (end) isRangeEnd = this.sameDay(d, end);
      isSelected = isRangeStart || isRangeEnd;
      if (start && end) inRange = d > start && d < end;
    }

    return {
      date: d,
      day: d.getDate(),
      inCurrentMonth: inMonth,
      isToday,
      isSelected,
      inRange,
      isRangeStart,
      isRangeEnd,
    };
  }

  private sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  onMonthChange(m: string | number): void { this.viewMonth = +m; }
  onYearChange(y: string | number): void { this.viewYear = +y; }

  // ─── Selection ────────────────────────────────────────────────────────────

  selectDay(cell: DayCell): void {
    if (this.mode === 'single') {
      this._value = cell.date;
      this.valueChange.emit(cell.date);
      this.open = false;
      return;
    }

    // Range mode
    const { start, end } = this._range;
    if (!start || (start && end) || cell.date < start) {
      this._range = { start: cell.date, end: null };
      this.activeRangeField = 'end';
    } else {
      this._range = { start, end: cell.date };
    }
    this.rangeChange.emit({ ...this._range });
  }

  // ─── Footer actions ───────────────────────────────────────────────────────

  clear(): void {
    if (this.mode === 'single') {
      this._value = null;
      this.valueChange.emit(null);
    } else {
      this._range = { start: null, end: null };
      this.rangeChange.emit({ ...this._range });
    }
  }

  goToday(): void {
    const t = new Date();
    this.viewMonth = t.getMonth();
    this.viewYear = t.getFullYear();
    if (this.mode === 'single') {
      this._value = t;
      this.valueChange.emit(t);
    }
  }

  save(): void { this.open = false; }

  // ─── Shortcuts ────────────────────────────────────────────────────────────

  get activeShortcuts(): CalendarShortcut[] {
    return this.shortcutDirection === 'past' ? this.pastShortcuts : this.futureShortcuts;
  }

  setShortcutDirection(d: CalendarShortcutDirection): void {
    this.shortcutDirection = d;
  }

  applyShortcut(s: CalendarShortcut): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(today);
    target.setDate(today.getDate() + s.offsetDays);

    if (this.mode === 'single') {
      this._value = target;
      this.valueChange.emit(target);
    } else {
      const start = s.offsetDays < 0 ? target : today;
      const end = s.offsetDays < 0 ? today : target;
      this._range = { start, end };
      this.rangeChange.emit({ ...this._range });
    }

    this.viewMonth = target.getMonth();
    this.viewYear = target.getFullYear();
  }
}
