import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AI_PANEL_ICONS } from './ai-panel-icons';
import { AiPanelInlineAction } from './ai-panel.types';

/**
 * A collapsible section inside an `<ds-ai-panel>` body.
 *
 * Renders a clickable header (chevron + title) and a content slot below it.
 * Right-aligned `actions` are rendered inline with the header but stop the
 * click from propagating, so consumers can mix toggle-on-header with action
 * buttons safely.
 */
@Component({
  selector: 'ds-ai-panel-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-panel-section.component.html',
  styleUrls: ['./ai-panel.component.scss', './ai-panel-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiPanelSectionComponent {
  /** Section title shown next to the chevron. */
  @Input() title = 'Section Title';

  /** Whether the section content is currently expanded. */
  @Input() expanded = true;

  /** Show the leading chevron icon (toggles via header click). */
  @Input() showChevron = true;

  /** Inline actions rendered to the right of the title. */
  @Input() actions: AiPanelInlineAction[] = [];

  /** Emits when the user toggles the section (via header click). */
  @Output() toggle = new EventEmitter<boolean>();

  /** Emits when an inline action is activated. */
  @Output() actionClick = new EventEmitter<{
    action: AiPanelInlineAction;
    index: number;
  }>();

  protected readonly chevronRight = AI_PANEL_ICONS.chevronRight;
  protected readonly chevronDown = AI_PANEL_ICONS.chevronDown;
  protected readonly arrowForward = AI_PANEL_ICONS.arrowForward;

  onHeaderClick(): void {
    this.expanded = !this.expanded;
    this.toggle.emit(this.expanded);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
