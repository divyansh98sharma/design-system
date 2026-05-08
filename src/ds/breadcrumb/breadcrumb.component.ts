import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'ds-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];

  /** When true, collapsed items expand inside a popover anchored to the "..." button. */
  @Input() collapseWithPopover = true;

  @Output() itemClick = new EventEmitter<{ item: BreadcrumbItem; index: number }>();

  overflowOpen = false;

  private host = inject(ElementRef<HTMLElement>);

  /** Right-pointing chevron used between items. */
  readonly CHEVRON = `M5.5 4l3.5 4-3.5 4`;

  /** Three horizontal dots used inside the overflow trigger. */
  readonly ELLIPSIS = `M4 8a1 1 0 1 1 2 0A1 1 0 0 1 4 8zm4 0a1 1 0 1 1 2 0A1 1 0 0 1 8 8zm4 0a1 1 0 1 1 2 0A1 1 0 0 1 12 8`;

  /** True when at least four items exist (Level 4+ in Figma). */
  get isOverflow(): boolean {
    return this.items.length > 3;
  }

  get firstItem(): BreadcrumbItem | null {
    return this.items[0] ?? null;
  }

  get lastItem(): BreadcrumbItem | null {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }

  /** Items shown inline when no overflow (everything except the last item). */
  get inlineAncestors(): BreadcrumbItem[] {
    return this.items.slice(0, -1);
  }

  /** Items hidden behind the "..." in overflow mode. */
  get hiddenAncestors(): BreadcrumbItem[] {
    return this.isOverflow ? this.items.slice(1, -1) : [];
  }

  trackByIndex(index: number): number {
    return index;
  }

  onItemClick(item: BreadcrumbItem, index: number, event: MouseEvent): void {
    event.preventDefault();
    this.itemClick.emit({ item, index });
  }

  toggleOverflow(): void {
    this.overflowOpen = !this.overflowOpen;
  }

  closeOverflow(): void {
    this.overflowOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.overflowOpen) return;
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.overflowOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.overflowOpen = false;
  }
}
