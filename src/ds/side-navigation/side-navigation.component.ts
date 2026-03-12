import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';

/** A single node in the side navigation tree. */
export interface SideNavItem {
  /** Unique key used to identify and emit events for this item. */
  key: string;
  /** Display label. */
  label: string;
  /** Optional nested child items. */
  children?: SideNavItem[];
  /** Whether the item's children are currently visible. */
  expanded?: boolean;
}

/**
 * Side Navigation — 320 px wide collapsible tree panel.
 *
 * Features:
 * - Fixed 320 px width, scrollable content area (max-height 824 px)
 * - Heading bar with title and optional settings icon
 * - Built-in search field to filter visible items
 * - Collapsible tree rows with chevron-right / chevron-down indicators
 * - Children are indented 16 px per nesting level
 * - `itemClick` emits the key of any clicked leaf or parent item
 * - `settingsClick` emits when the gear icon is clicked
 */
@Component({
  selector: 'ds-side-navigation',
  standalone: true,
  imports: [CommonModule, FormsModule, TreeModule],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationComponent {
  /** Panel heading text. */
  @Input() heading = 'Navigation';

  /** Show the gear / settings icon in the heading bar. */
  @Input() showSettings = true;

  /** Top-level navigation items. */
  @Input() items: SideNavItem[] = [];

  /** Placeholder for the internal search field. */
  @Input() searchPlaceholder = 'Search…';

  /** Key of the currently active (highlighted) item. */
  @Input() activeKey = '';

  /** Emits the key of the item that was clicked. */
  @Output() itemClick = new EventEmitter<string>();

  /** Emits when the settings gear icon is clicked. */
  @Output() settingsClick = new EventEmitter<void>();

  /** Internal search query. */
  searchQuery = '';

  /** Toggle the expanded state of an item that has children. */
  toggle(item: SideNavItem): void {
    item.expanded = !item.expanded;
  }

  /** Emit the item key and mark it active. */
  select(item: SideNavItem): void {
    this.activeKey = item.key;
    this.itemClick.emit(item.key);
  }

  /**
   * Recursively filter items whose label matches the search query.
   * Parent items are included whenever at least one child matches.
   */
  get filteredItems(): SideNavItem[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.items;
    return this.filterTree(this.items, q);
  }

  private filterTree(items: SideNavItem[], q: string): SideNavItem[] {
    return items.reduce<SideNavItem[]>((acc, item) => {
      const labelMatch = item.label.toLowerCase().includes(q);
      const filteredChildren = item.children
        ? this.filterTree(item.children, q)
        : [];
      if (labelMatch || filteredChildren.length > 0) {
        acc.push({ ...item, children: filteredChildren, expanded: filteredChildren.length > 0 });
      }
      return acc;
    }, []);
  }
}
