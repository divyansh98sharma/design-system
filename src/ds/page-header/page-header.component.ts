import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PageHeaderTab {
  key: string;
  label: string;
}

@Component({
  selector: 'ds-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  /** Main page title shown next to the dropdown chevron. */
  @Input() title = 'Page Title';

  /** When true, the title shows a chevron-down affordance. */
  @Input() showTitleDropdown = true;

  /** When true, shows the filter icon button on the left. */
  @Input() showFilter = true;

  /** When true, draws a red alert dot on the filter button. */
  @Input() filterAlert = false;

  /** When true, shows the primary "Create New" action button. */
  @Input() showCreateNew = true;

  /** Label for the primary action button. */
  @Input() createNewLabel = 'Create New';

  /** Optional tab set shown flush-right. */
  @Input() tabs: PageHeaderTab[] = [];

  /** Key of the currently active tab. */
  @Input() activeTab = '';

  /** Emits when the title dropdown is clicked. */
  @Output() titleClick = new EventEmitter<void>();

  /** Emits when the filter button is clicked. */
  @Output() filterClick = new EventEmitter<void>();

  /** Emits when the primary action button is clicked. */
  @Output() createNew = new EventEmitter<void>();

  /** Emits the key of the newly selected tab. */
  @Output() tabChange = new EventEmitter<string>();

  selectTab(key: string): void {
    if (this.activeTab !== key) {
      this.tabChange.emit(key);
    }
  }
}
