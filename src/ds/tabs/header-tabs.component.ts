import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { TabItem, TabTheme, TAB_THEME_COLORS } from './tabs.types';

/**
 * Header Tabs — a full-width coloured header bar containing a title
 * on the left and embedded tab buttons on the right.
 *
 * - Header bg = `theme.base` (e.g. `#0378a7` for user)
 * - Active tab bg = `theme.base80` (darker shade, e.g. `#023c54`)
 * - Inactive tab bg = `theme.base` (same as header, slightly different)
 * - Title text: white, SemiBold; inactive tab text: white Regular;
 *   active tab text: white SemiBold
 * - Optional header icon slot.
 * - Active tab shows an optional count in `(99)` format.
 *
 * Themes: `user` (blue), `admin` (orange/black text), `green`, `sunoh` (pink).
 */
@Component({
  selector: 'ds-header-tabs',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './header-tabs.component.html',
  styleUrl: './header-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTabsComponent {
  /** Title displayed on the left side of the header. */
  @Input() heading = 'Header Title';

  /** When true, shows a placeholder icon slot before the heading. */
  @Input() showIcon = false;

  /** Tab items. First item is rendered as the active/primary tab. */
  @Input() tabs: TabItem[] = [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
  ];

  /** Key of the currently active tab. */
  @Input() activeTab: string = 'tab1';

  /** Colour theme. */
  @Input() theme: TabTheme = 'user';

  /** Emits the clicked tab's key. */
  @Output() tabChange = new EventEmitter<string>();

  get colors() {
    return TAB_THEME_COLORS[this.theme];
  }

  select(key: string): void {
    if (this.activeTab !== key) {
      this.tabChange.emit(key);
    }
  }
}
