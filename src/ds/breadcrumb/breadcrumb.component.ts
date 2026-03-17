import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type BreadcrumbType = 'breadcrumb' | 'navigation';
export type BreadcrumbLevel = 1 | 2 | 3 | 4;

/** A single item in the breadcrumb/navigation trail. */
export interface BreadcrumbItem {
  /** Displayed label for this node. */
  label: string;
  /** Optional route or URL (used for `href` on breadcrumb links). */
  href?: string;
}

/**
 * Breadcrumb & Navigation component.
 *
 * - **breadcrumb**: all ancestor nodes are clickable links with an underline;
 *   used when users can jump back to any previous screen.
 * - **navigation**: plain text trail with no links/underline;
 *   used for orientation-only context where back-navigation isn't supported.
 *
 * When there are more than 3 ancestors the component collapses them behind a
 * "⋯" overflow button that expands to reveal the hidden nodes.
 */
@Component({
  selector: 'ds-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  /**
   * Ordered list of nodes from root → current page.
   * The **last** item is always treated as the active (non-clickable) page.
   */
  @Input() items: BreadcrumbItem[] = [];

  /**
   * `breadcrumb` — ancestor nodes are clickable links (underlined).
   * `navigation` — all nodes are plain text; no interaction.
   */
  @Input() type: BreadcrumbType = 'breadcrumb';

  /** Emits the clicked item index when a breadcrumb ancestor is clicked. */
  @Output() itemClick = new EventEmitter<{ item: BreadcrumbItem; index: number }>();

  /** Controls whether the overflow popover is open. */
  overflowOpen = false;

  /** Chevron SVG path — shared across all separators. */
  readonly CHEVRON = `M5.5 4l3.5 4-3.5 4`;

  /** Ellipsis icon path — shown when nodes are collapsed. */
  readonly ELLIPSIS = `M4 8a1 1 0 1 1 2 0A1 1 0 0 1 4 8zm4 0a1 1 0 1 1 2 0A1 1 0 0 1 8 8zm4 0a1 1 0 1 1 2 0A1 1 0 0 1 12 8`;

  /** Returns true when there are more than 3 ancestor nodes (Level 4+). */
  get isOverflow(): boolean {
    return this.items.length > 3;
  }

  /** Ancestor nodes — everything except the last (current) item. */
  get ancestors(): BreadcrumbItem[] {
    return this.items.slice(0, -1);
  }

  /** The current / active page item. */
  get current(): BreadcrumbItem | null {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }

  /** For overflow mode: the first visible ancestor before the "⋯" button. */
  get firstAncestor(): BreadcrumbItem | null {
    return this.items.length > 0 ? this.items[0] : null;
  }

  /** For overflow mode: nodes hidden inside the popover. */
  get hiddenAncestors(): BreadcrumbItem[] {
    return this.isOverflow ? this.items.slice(1, -1) : [];
  }

  onItemClick(item: BreadcrumbItem, index: number): void {
    if (this.type === 'breadcrumb') {
      this.itemClick.emit({ item, index });
    }
  }

  toggleOverflow(): void {
    this.overflowOpen = !this.overflowOpen;
  }
}
