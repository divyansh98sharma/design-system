import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItem, TabTheme, TAB_THEME_COLORS } from './tabs.types';

/**
 * Floating Tabs — minimal tab bar with a coloured underline indicator.
 *
 * No background box or border on the tabs themselves — they "float" above
 * a bottom border. The selected tab shows a theme-coloured 1 px underline
 * and SemiBold text; unselected tabs use Regular weight.
 *
 * The entire row sits on a full-width `#e1e1e1` bottom border.
 *
 * Themes: `user` (blue), `admin` (orange), `green`, `sunoh` (pink).
 */
@Component({
  selector: 'ds-floating-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-tabs.component.html',
  styleUrl: './floating-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingTabsComponent {
  /** Tab items to render. */
  @Input() tabs: TabItem[] = [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
    { key: 'tab3', label: 'Tab 3' },
  ];

  /** Key of the currently selected tab. */
  @Input() activeTab: string = 'tab1';

  /** Colour theme for the active underline. */
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
