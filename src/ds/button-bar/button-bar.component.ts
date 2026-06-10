import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface ButtonBarItem {
  /** Stable id emitted via `itemClick`. */
  id: string;
  /** Visible label. Optional for icon-only items. */
  label?: string;
  /** Inline SVG icon markup. */
  icon?: string;
  /** When true, render a 1px divider before this item. */
  separatorBefore?: boolean;
  /** Accessibility label for icon-only items. */
  ariaLabel?: string;
}

@Component({
  selector: 'ds-button-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './button-bar.component.html',
  styleUrl: './button-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBarComponent {
  @Input() leftItems: ButtonBarItem[] = [];
  @Input() rightItems: ButtonBarItem[] = [];

  @Input() showSelectAll = true;
  @Input() selectAllChecked = false;
  @Input() selectAllLabel = 'Select All';

  @Input() showMore = true;
  @Input() moreLabel = 'More';

  @Output() itemClick = new EventEmitter<{ id: string; group: 'left' | 'right' }>();
  @Output() selectAllChange = new EventEmitter<boolean>();
  @Output() moreClick = new EventEmitter<void>();

  private sanitizer = inject(DomSanitizer);

  trackByIndex(index: number): number {
    return index;
  }

  safeIcon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  onItemClick(id: string, group: 'left' | 'right'): void {
    this.itemClick.emit({ id, group });
  }

  onSelectAllChange(value: boolean): void {
    this.selectAllChecked = value;
    this.selectAllChange.emit(value);
  }

  onMoreClick(): void {
    this.moreClick.emit();
  }
}
