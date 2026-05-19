import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface FloatingToolbarItem {
  /** Stable identifier emitted on click and used to mark the active item. */
  id: string;
  /** Text shown under the icon. */
  label: string;
  /** Inline SVG markup for the icon. Rendered at 24×24. */
  icon?: string;
}

/**
 * Floating Toolbar — narrow vertical strip that docks against the right edge
 * of a modal or panel.
 *
 * Width 52 px · light teal background `#e6f4f3` · rounded left corners only
 * with a `-4px 0 8px` shadow.
 *
 * Each item shows a 24 px icon over a 12 px label. The currently active item
 * is highlighted with the primary teal `#007b95`. An optional **More** link
 * sits at the bottom for overflow actions.
 */
@Component({
  selector: 'ds-floating-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-toolbar.component.html',
  styleUrl: './floating-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingToolbarComponent {
  @Input() items: FloatingToolbarItem[] = [];

  /** ID of the currently active item — receives the highlight background. */
  @Input() activeId: string | null = null;

  /** Show the "More" link at the bottom. */
  @Input() showMore = true;

  /** Label for the bottom link. */
  @Input() moreLabel = 'More';

  /** Emits the item id when an item is clicked. */
  @Output() itemClick = new EventEmitter<string>();

  /** Emits when the "More" link is clicked. */
  @Output() moreClick = new EventEmitter<void>();

  private sanitizer = inject(DomSanitizer);

  trustIcon(svg: string | undefined): SafeHtml | null {
    return svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : null;
  }

  isActive(id: string): boolean {
    return this.activeId === id;
  }

  onItemClick(id: string): void {
    this.itemClick.emit(id);
  }
}
