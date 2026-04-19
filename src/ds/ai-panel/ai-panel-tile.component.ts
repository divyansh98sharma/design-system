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

export type AiPanelTileVariant = 'default' | 'placeholder';

/**
 * A bordered tile inside an `<ds-ai-panel-section>`. Two variants:
 * - `default`     — solid border, optional title row with inline actions,
 *                   arbitrary projected content.
 * - `placeholder` — dashed border with centred placeholder text (used as a
 *                   loading / empty state).
 */
@Component({
  selector: 'ds-ai-panel-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-panel-tile.component.html',
  styleUrls: ['./ai-panel.component.scss', './ai-panel-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiPanelTileComponent {
  /** Tile visual treatment. */
  @Input() variant: AiPanelTileVariant = 'default';

  /** Optional title shown above the projected content. */
  @Input() title = '';

  /** Inline actions rendered to the right of the title. */
  @Input() actions: AiPanelInlineAction[] = [];

  /** Placeholder copy shown when `variant === 'placeholder'`. */
  @Input() placeholderText = 'Empty';

  /** Emits when an inline action is activated. */
  @Output() actionClick = new EventEmitter<{
    action: AiPanelInlineAction;
    index: number;
  }>();

  protected readonly arrowForward = AI_PANEL_ICONS.arrowForward;

  trackByIndex(index: number): number {
    return index;
  }
}
