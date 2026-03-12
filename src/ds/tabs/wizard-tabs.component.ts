import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { WizardStep, WizardTabTheme } from './tabs.types';

/**
 * Wizard Tabs — breadcrumb-style stepper with chevron/arrow shapes.
 *
 * Each step is an arrow-shaped tile.  The active step is highlighted with
 * the theme colour; all others show a neutral grey background.
 *
 * - **User theme**: active bg `#0378a7`, white text; step badge border `#023c54`.
 * - **Admin theme**: active bg `#e88842`, black text; step badge border `#744421`.
 *
 * The arrow shape is achieved with CSS `clip-path` so no image assets are
 * needed.  An optional `required` flag on each step shows a red asterisk.
 */
@Component({
  selector: 'ds-wizard-tabs',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './wizard-tabs.component.html',
  styleUrl: './wizard-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardTabsComponent {
  /** Steps to display. */
  @Input() steps: WizardStep[] = [
    { key: 'step1', label: 'Tab 1' },
    { key: 'step2', label: 'Tab 2' },
    { key: 'step3', label: 'Tab 3' },
    { key: 'step4', label: 'Tab 4' },
    { key: 'step5', label: 'Tab 5' },
  ];

  /** Key of the currently active step. */
  @Input() activeStep: string = 'step1';

  /** Visual theme: `user` (blue) or `admin` (orange). */
  @Input() theme: WizardTabTheme = 'user';

  /** Emits the clicked step's key. */
  @Output() stepChange = new EventEmitter<string>();

  readonly themes = {
    user : {
      activeBg         : '#0378a7',
      activeBadgeBorder: '#023c54',
      activeBadgeText  : '#023c54',
      activeText       : '#ffffff',
      containerBg      : '#f5f5f5',
      containerBorder  : '#e6e6e6',
    },
    admin: {
      activeBg         : '#e88842',
      activeBadgeBorder: '#744421',
      activeBadgeText  : '#744421',
      activeText       : '#000000',
      containerBg      : '#f9f9f9',
      containerBorder  : '#dbdbdb',
    },
  };

  get colors() {
    return this.themes[this.theme];
  }

  isActive(key: string): boolean {
    return this.activeStep === key;
  }

  select(key: string): void {
    if (this.activeStep !== key) {
      this.stepChange.emit(key);
    }
  }
}
