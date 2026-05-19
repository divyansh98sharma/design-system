import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AI_PANEL_ICONS } from './ai-panel-icons';
import { AiPanelAction } from './ai-panel.types';

/**
 * AI Panel — the shell for an AI Insights panel: gradient header with
 * leading sparkles icon, scrollable body slot, and a footer toolbar of
 * icon buttons.
 *
 * Compose body content with `<ds-ai-panel-section>` and
 * `<ds-ai-panel-tile>`, or project arbitrary markup via the default slot.
 */
@Component({
  selector: 'ds-ai-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-panel.component.html',
  styleUrl: './ai-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiPanelComponent {
  /** Title shown next to the AI sparkles icon. */
  @Input() title = 'Patient';

  /** Suffix shown after `title` (e.g. "Insights"). Defaults to "Insights". */
  @Input() titleSuffix = 'Insights';

  /** Show the leading AI sparkles icon. */
  @Input() showAiIcon = true;

  /** Right-aligned header action buttons (24 × 24 icons). */
  @Input() headerActions: AiPanelAction[] = [
    { iconPath: AI_PANEL_ICONS.help, label: 'Help' },
    { iconPath: AI_PANEL_ICONS.refresh, label: 'Refresh' },
    { iconPath: AI_PANEL_ICONS.settings, label: 'Settings' },
  ];

  /**
   * Footer toolbar buttons (24 × 24 icons), justified across the row.
   * Pass `[]` to hide the footer entirely.
   */
  @Input() footerActions: AiPanelAction[] = [
    { iconPath: AI_PANEL_ICONS.swapHoriz, label: 'Swap' },
    { iconPath: AI_PANEL_ICONS.person, label: 'Patient' },
    { iconPath: AI_PANEL_ICONS.list, label: 'List' },
    { iconPath: AI_PANEL_ICONS.phone, label: 'Call' },
    { iconPath: AI_PANEL_ICONS.autorenew, label: 'Sync' },
    { iconPath: AI_PANEL_ICONS.openInNew, label: 'Expand' },
  ];

  /** Emits when a header action button is clicked. */
  @Output() headerActionClick = new EventEmitter<{
    action: AiPanelAction;
    index: number;
  }>();

  /** Emits when a footer action button is clicked. */
  @Output() footerActionClick = new EventEmitter<{
    action: AiPanelAction;
    index: number;
  }>();

  protected readonly sparklesPath = AI_PANEL_ICONS.sparkles;

  trackByIndex(index: number): number {
    return index;
  }
}
