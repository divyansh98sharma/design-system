import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStep, WizardTabTheme } from './tabs.types';

/**
 * Wizard Tabs — breadcrumb-style stepper with chevron/arrow shapes.
 *
 * Each step is an arrow-shaped tile.  The active step is highlighted with
 * the theme colour; all others show a neutral grey background.
 *
 * - **Primary theme**: active bg teal-650, white text; step badge border teal-800.
 * - **Secondary theme**: active bg orange-200, black text; step badge border orange-900.
 *
 * The arrow shape is achieved with CSS `clip-path` so no image assets are
 * needed.  An optional `required` flag on each step shows a red asterisk.
 */
@Component({
  selector: 'ds-wizard-tabs',
  standalone: true,
  imports: [CommonModule],
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

  /** Visual theme: `primary` (teal) or `secondary` (orange). */
  @Input() theme: WizardTabTheme = 'primary';

  /** Emits the clicked step's key. */
  @Output() stepChange = new EventEmitter<string>();

  readonly themes: Record<WizardTabTheme, {
    activeBg: string;
    activeBadgeBorder: string;
    activeBadgeText: string;
    activeText: string;
    containerBg: string;
    containerBorder: string;
  }> = {
    primary: {
      activeBg         : 'var(--prim-teal-650)',
      activeBadgeBorder: 'var(--prim-teal-800)',
      activeBadgeText  : 'var(--prim-teal-800)',
      activeText       : 'var(--prim-color-white)',
      containerBg      : 'var(--prim-neutral-250)',
      containerBorder  : 'var(--prim-neutral-300)',
    },
    secondary: {
      activeBg         : 'var(--prim-orange-200)',
      activeBadgeBorder: 'var(--prim-orange-900)',
      activeBadgeText  : 'var(--prim-orange-900)',
      activeText       : 'var(--prim-color-black)',
      containerBg      : 'var(--prim-neutral-250)',
      containerBorder  : 'var(--prim-neutral-300)',
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
