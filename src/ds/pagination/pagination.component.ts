import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  /** Current 1-based page index. */
  @Input() page = 1;

  /** Page size (number of items per page). */
  @Input() pageSize = 15;

  /** Total number of items being paginated. */
  @Input() totalItems = 0;

  /** Available choices for the page-size selector. */
  @Input() pageSizeOptions: number[] = [10, 15, 25, 50, 100];

  /** Noun shown next to the total count (e.g. "cards", "rows"). */
  @Input() itemLabel = 'cards';

  /** Hide the page-size selector when false. */
  @Input() showPageSize = true;

  /** Emits the new page (1-based). */
  @Output() pageChange = new EventEmitter<number>();

  /** Emits the new page size. */
  @Output() pageSizeChange = new EventEmitter<number>();

  /** Local input model for the editable current-page box. */
  pageInput = '1';

  ngOnChanges(): void {
    this.pageInput = String(this.page);
  }

  get totalPages(): number {
    if (!this.pageSize || !this.totalItems) return 1;
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get atFirst(): boolean { return this.page <= 1; }
  get atLast(): boolean  { return this.page >= this.totalPages; }

  go(target: number): void {
    const next = Math.min(this.totalPages, Math.max(1, Math.floor(target)));
    if (next !== this.page) this.pageChange.emit(next);
    this.pageInput = String(next);
  }

  first(): void { if (!this.atFirst) this.go(1); }
  prev():  void { if (!this.atFirst) this.go(this.page - 1); }
  next():  void { if (!this.atLast)  this.go(this.page + 1); }
  last():  void { if (!this.atLast)  this.go(this.totalPages); }

  onPageInputCommit(): void {
    const parsed = parseInt(this.pageInput, 10);
    if (Number.isNaN(parsed)) {
      this.pageInput = String(this.page);
      return;
    }
    this.go(parsed);
  }

  onPageSizeChange(value: string | number): void {
    const next = Number(value);
    if (Number.isNaN(next) || next === this.pageSize) return;
    this.pageSizeChange.emit(next);
  }
}
