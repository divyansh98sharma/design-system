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
 * Standard Tabs — classic bordered tab bar with a bottom underline.
 *
 * - **Selected tab**: white bg, 3-sided border (top/left/right) in theme
 *   colour, SemiBold label, rounded-top corners (4 px), flush with content.
 * - **Unselected tab**: light-tinted bg, lighter 3-sided border, Regular
 *   label, theme-coloured underline at bottom.
 * - A full-width theme-coloured rule runs beneath the entire tab bar.
 *
 * Themes: `user` (blue), `admin` (orange), `green`, `sunoh` (pink).
 */
@Component({
  selector: 'ds-standard-tabs',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './standard-tabs.component.html',
  styleUrl: './standard-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardTabsComponent {
  /** Tab items to render. */
  @Input() tabs: TabItem[] = [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
    { key: 'tab3', label: 'Tab 3' },
  ];

  /** Key of the currently selected tab. */
  @Input() activeTab: string = 'tab1';

  /** Colour theme for borders and underlines. */
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
