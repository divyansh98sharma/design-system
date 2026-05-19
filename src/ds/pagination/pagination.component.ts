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
  @Input() pageSize = 15;
  @Input() pageSizeOptions = [10, 15, 25, 50, 100];
  @Input() page = 1;
  @Input() totalItems = 0;
  @Input() itemLabel = 'cards';

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get totalPages(): number {
    if (!this.pageSize) return 1;
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  prev(): void {
    if (this.page > 1) {
      this.page--;
      this.pageChange.emit(this.page);
    }
  }

  next(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.pageChange.emit(this.page);
    }
  }

  first(): void {
    if (this.page !== 1) {
      this.page = 1;
      this.pageChange.emit(this.page);
    }
  }

  last(): void {
    if (this.page !== this.totalPages) {
      this.page = this.totalPages;
      this.pageChange.emit(this.page);
    }
  }

  onSizeChange(value: number): void {
    this.pageSize = Number(value);
    this.page = 1;
    this.pageSizeChange.emit(this.pageSize);
    this.pageChange.emit(this.page);
  }

  onPageInput(value: number): void {
    const n = Math.max(1, Math.min(this.totalPages, Number(value) || 1));
    this.page = n;
    this.pageChange.emit(n);
  }
}
