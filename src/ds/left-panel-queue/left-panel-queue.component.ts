import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LeftPanelQueueChip {
  id: string;
  label: string;
  counter?: string | number;
  iconPath?: string;
}

export interface LeftPanelQueueButton {
  id: string;
  label: string;
  showCaret?: boolean;
}

/**
 * Left Panel Queue — 464 px patient/queue side panel.
 *
 * Composition (top → bottom):
 * - Quick Select chip tray (wrap, max 58 px)
 * - Button Bar (select-all + 2 custom buttons + sort)
 * - Search input
 * - Queue slot (`<ng-content>`, 626 px tall)
 * - Pagination row
 *
 * The right edge hosts a 12 px visual vertical scrollbar track.
 */
@Component({
  selector: 'ds-left-panel-queue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './left-panel-queue.component.html',
  styleUrl: './left-panel-queue.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftPanelQueueComponent {
  /** Header title above the panel. Hidden when empty. */
  @Input() title = 'Left Panel Queue';

  /** Toggle quick-select chip tray. */
  @Input() showQuickSelect = true;

  /** Chips rendered in the quick-select tray. */
  @Input() chips: LeftPanelQueueChip[] = [];

  /** Toggle the button bar (select-all + buttons). */
  @Input() showButtonBar = true;

  /** Select-all checkbox state. */
  @Input() selectAll = false;

  /** Two dropdown-style buttons in the button bar. */
  @Input() buttons: LeftPanelQueueButton[] = [
    { id: 'btn1', label: 'Button', showCaret: true },
    { id: 'btn2', label: 'Button', showCaret: true },
  ];

  /** Toggle search input. */
  @Input() showSearch = true;

  /** Search input label. */
  @Input() searchLabel = 'Label';

  /** Search input placeholder. */
  @Input() searchPlaceholder = 'Search';

  /** Search input value (bound). */
  @Input() searchValue = '';

  /** Toggle pagination row. */
  @Input() showPagination = true;

  /** Page size options. */
  @Input() pageSizeOptions: number[] = [15, 30, 50, 100];

  /** Current page size. */
  @Input() pageSize = 15;

  /** Total number of items (displayed as "of X cards"). */
  @Input() totalItems = 90;

  /** Current page (1-based). */
  @Input() currentPage = 1;

  /** Total pages. */
  @Input() totalPages = 6;

  /** Toggle the visual scrollbar on the right edge. */
  @Input() showScrollbar = true;

  @Output() chipClick = new EventEmitter<LeftPanelQueueChip>();
  @Output() selectAllChange = new EventEmitter<boolean>();
  @Output() buttonClick = new EventEmitter<LeftPanelQueueButton>();
  @Output() sortClick = new EventEmitter<void>();
  @Output() searchValueChange = new EventEmitter<string>();
  @Output() searchChevronClick = new EventEmitter<void>();
  @Output() searchFavoriteClick = new EventEmitter<void>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() currentPageChange = new EventEmitter<number>();

  onSelectAllChange(v: boolean): void {
    this.selectAll = v;
    this.selectAllChange.emit(v);
  }

  onChipClick(chip: LeftPanelQueueChip): void {
    this.chipClick.emit(chip);
  }

  onButtonClick(btn: LeftPanelQueueButton): void {
    this.buttonClick.emit(btn);
  }

  onSortClick(): void {
    this.sortClick.emit();
  }

  onSearchInput(v: string): void {
    this.searchValue = v;
    this.searchValueChange.emit(v);
  }

  onChevronClick(): void {
    this.searchChevronClick.emit();
  }

  onFavoriteClick(): void {
    this.searchFavoriteClick.emit();
  }

  onPageSizeChange(v: number | string): void {
    const n = typeof v === 'string' ? parseInt(v, 10) : v;
    this.pageSize = n;
    this.pageSizeChange.emit(n);
  }

  onPageInput(v: string): void {
    const n = Math.max(1, Math.min(this.totalPages, parseInt(v, 10) || 1));
    this.currentPage = n;
    this.currentPageChange.emit(n);
  }

  goFirst(): void {
    if (this.currentPage === 1) return;
    this.currentPage = 1;
    this.currentPageChange.emit(1);
  }

  goPrev(): void {
    if (this.currentPage <= 1) return;
    this.currentPage -= 1;
    this.currentPageChange.emit(this.currentPage);
  }

  goNext(): void {
    if (this.currentPage >= this.totalPages) return;
    this.currentPage += 1;
    this.currentPageChange.emit(this.currentPage);
  }

  goLast(): void {
    if (this.currentPage === this.totalPages) return;
    this.currentPage = this.totalPages;
    this.currentPageChange.emit(this.totalPages);
  }

  get isFirstPage(): boolean { return this.currentPage <= 1; }
  get isLastPage(): boolean { return this.currentPage >= this.totalPages; }

  trackChip = (_: number, c: LeftPanelQueueChip) => c.id;
  trackBtn = (_: number, b: LeftPanelQueueButton) => b.id;
}
