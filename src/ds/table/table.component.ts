import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ─── Public types ─────────────────────────────────────────────────────────────

/** Data types supported by table columns. */
export type TableColumnType =
  | 'text'
  | 'date'
  | 'numeric'
  | 'dropdown'
  | 'button'
  | 'chip'
  | 'actions';

/** Sort direction. */
export type SortDirection = 'asc' | 'desc' | null;

/** Column definition. */
export interface TableColumn {
  /** Unique key matching a property in the row data object. */
  key: string;
  /** Display header label. */
  label: string;
  /** Render type for cell content. */
  type: TableColumnType;
  /** Whether this column is user-sortable. */
  sortable?: boolean;
  /** Optional fixed pixel width. */
  width?: number;
}

/** Per-row action emitted by the table. */
export interface TableRowAction {
  action: 'add' | 'edit' | 'delete';
  rowIndex: number;
  row: Record<string, unknown>;
}

/** Sort change event. */
export interface TableSortEvent {
  columnKey: string;
  direction: SortDirection;
}

/** Pagination state emitted when the page or page size changes. */
export interface TablePageEvent {
  page: number;
  pageSize: number;
}

/**
 * Table — configurable 1600 px data grid.
 *
 * Features:
 * - Toolbar with left and right action slots (projected via ng-content)
 * - Optional checkbox column (row selection)
 * - Optional expand column (expand-row toggle)
 * - Optional lock column (row lock indicator)
 * - Sortable column headers with up/down indicators and 3-dot overflow menu
 * - Row action column: + Add, ✏ Edit, 🗑 Delete
 * - Pagination footer: rows-per-page selector + first/prev/next/last navigation
 * - Chip and date/numeric rendering helpers
 */
@Component({
  selector: 'ds-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  // ─── Column config ────────────────────────────────────────────────────────

  /** Column definitions (ordered). */
  @Input() columns: TableColumn[] = [];

  // ─── Fixed utility columns ────────────────────────────────────────────────

  /** Show checkbox column for row selection. */
  @Input() showCheckbox = true;

  /** Show expand column (row drill-down toggle). */
  @Input() showExpand = true;

  /** Show lock column (lock indicator per row). */
  @Input() showLock = false;

  /** Show per-row action column (add / edit / delete). */
  @Input() showActions = true;

  // ─── Data ─────────────────────────────────────────────────────────────────

  /** Row data objects.  Keys must match `TableColumn.key` values. */
  @Input() rows: Record<string, unknown>[] = [];

  // ─── Selection state ──────────────────────────────────────────────────────

  /** Keys of selected rows (uses row index as key). */
  @Input() selectedRows: Set<number> = new Set();

  // ─── Sort state ───────────────────────────────────────────────────────────

  /** Currently sorted column key. */
  @Input() sortKey = '';

  /** Current sort direction. */
  @Input() sortDirection: SortDirection = null;

  // ─── Pagination ───────────────────────────────────────────────────────────

  /** Current page (1-based). */
  @Input() page = 1;

  /** Number of rows per page. */
  @Input() pageSize = 10;

  /** Total number of rows across all pages (for server-side pagination). */
  @Input() totalRows = 0;

  /** Options shown in the rows-per-page selector. */
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];

  // ─── Outputs ──────────────────────────────────────────────────────────────

  /** Emits when a column header sort is clicked. */
  @Output() sortChange = new EventEmitter<TableSortEvent>();

  /** Emits when page or page size changes. */
  @Output() pageChange = new EventEmitter<TablePageEvent>();

  /** Emits for row-level actions (add / edit / delete). */
  @Output() rowAction = new EventEmitter<TableRowAction>();

  /** Emits the updated selection Set when a checkbox is toggled. */
  @Output() selectionChange = new EventEmitter<Set<number>>();

  /** Emits the row index that was expanded/collapsed. */
  @Output() expandRow = new EventEmitter<number>();

  // ─── Internal state ───────────────────────────────────────────────────────

  expandedRows = new Set<number>();
  allSelected  = false;

  // ─── Derived ──────────────────────────────────────────────────────────────

  get totalPages(): number {
    const total = this.totalRows || this.rows.length;
    return Math.max(1, Math.ceil(total / this.pageSize));
  }

  get pageRows(): Record<string, unknown>[] {
    if (this.totalRows > 0) {
      // Server-side: rows are already the current page
      return this.rows;
    }
    const start = (this.page - 1) * this.pageSize;
    return this.rows.slice(start, start + this.pageSize);
  }

  get startRow(): number {
    return (this.page - 1) * this.pageSize + 1;
  }

  get endRow(): number {
    const total = this.totalRows || this.rows.length;
    return Math.min(this.page * this.pageSize, total);
  }

  get displayTotal(): number {
    return this.totalRows || this.rows.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      this.allSelected = false;
      this.expandedRows.clear();
    }
  }

  // ─── Selection ────────────────────────────────────────────────────────────

  toggleAll(checked: boolean): void {
    this.allSelected = checked;
    const next = new Set<number>();
    if (checked) {
      this.pageRows.forEach((_, i) => next.add((this.page - 1) * this.pageSize + i));
    }
    this.selectedRows = next;
    this.selectionChange.emit(this.selectedRows);
  }

  toggleRow(globalIndex: number): void {
    const next = new Set(this.selectedRows);
    next.has(globalIndex) ? next.delete(globalIndex) : next.add(globalIndex);
    this.selectedRows = next;
    this.allSelected  = this.pageRows.every((_, i) =>
      next.has((this.page - 1) * this.pageSize + i));
    this.selectionChange.emit(this.selectedRows);
  }

  // ─── Expand ───────────────────────────────────────────────────────────────

  toggleExpand(index: number): void {
    this.expandedRows.has(index) ? this.expandedRows.delete(index) : this.expandedRows.add(index);
    this.expandRow.emit(index);
  }

  // ─── Sort ─────────────────────────────────────────────────────────────────

  onSort(col: TableColumn): void {
    if (!col.sortable) return;
    let direction: SortDirection;
    if (this.sortKey !== col.key) {
      direction = 'asc';
    } else if (this.sortDirection === 'asc') {
      direction = 'desc';
    } else {
      direction = null;
    }
    this.sortKey       = direction ? col.key : '';
    this.sortDirection = direction;
    this.sortChange.emit({ columnKey: col.key, direction });
  }

  sortIcon(col: TableColumn): 'asc' | 'desc' | 'none' {
    if (this.sortKey !== col.key || !this.sortDirection) return 'none';
    return this.sortDirection;
  }

  // ─── Pagination ───────────────────────────────────────────────────────────

  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.pageChange.emit({ page: this.page, pageSize: this.pageSize });
  }

  onPageSizeChange(size: number): void {
    this.pageSize = Number(size);
    this.page     = 1;
    this.pageChange.emit({ page: this.page, pageSize: this.pageSize });
  }

  pageNumbers(): number[] {
    const range: number[] = [];
    const total = this.totalPages;
    const cur   = this.page;
    const delta = 2;
    for (let i = Math.max(1, cur - delta); i <= Math.min(total, cur + delta); i++) {
      range.push(i);
    }
    return range;
  }

  // ─── Cell helpers ─────────────────────────────────────────────────────────

  cellValue(row: Record<string, unknown>, key: string): string {
    const v = row[key];
    return v === null || v === undefined ? '' : String(v);
  }

  isRowSelected(globalIndex: number): boolean {
    return this.selectedRows.has(globalIndex);
  }

  globalIndex(pageRowIndex: number): number {
    return (this.page - 1) * this.pageSize + pageRowIndex;
  }
}
