import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface AiInsightTileAction {
  /** Inline SVG markup for icon. Optional — if absent, only text renders. */
  icon?: string;
  /** Optional text label rendered after the icon (or alone). */
  text?: string;
  /** Opaque id emitted via `actionClick`. */
  id: string;
  /** Accessible label for icon-only actions. */
  ariaLabel?: string;
}

export interface AiInsightTile {
  id: string;
  title: string;
  /** Optional projected body text or HTML rendered inside the tile slot. */
  body?: string;
  /** Action buttons rendered on the tile header row. */
  actions?: AiInsightTileAction[];
  /** Action buttons rendered along the tile bottom edge. */
  bottomActions?: AiInsightTileAction[];
}

export interface AiInsightSection {
  id: string;
  title: string;
  expanded?: boolean;
  /** Section-level header actions, mirrors tile actions visually. */
  actions?: AiInsightTileAction[];
  tiles?: AiInsightTile[];
}

export interface FooterAction {
  id: string;
  icon: string;
  ariaLabel: string;
}

@Component({
  selector: 'ds-ai-insights-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-insights-panel.component.html',
  styleUrl: './ai-insights-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiInsightsPanelComponent {
  @Input() title = 'Title';
  @Input() titleSuffix = ' Insights';
  @Input() sections: AiInsightSection[] = [];
  @Input() headerActions: FooterAction[] = [];
  @Input() footerActions: FooterAction[] = [];

  @Output() sectionToggle = new EventEmitter<{ section: AiInsightSection; expanded: boolean }>();
  @Output() actionClick = new EventEmitter<{ scope: 'header' | 'footer' | 'section' | 'tile' | 'tile-bottom'; sectionId?: string; tileId?: string; actionId: string }>();

  private sanitizer = inject(DomSanitizer);

  trackByIndex(index: number): number {
    return index;
  }

  trackById<T extends { id: string }>(_: number, item: T): string {
    return item.id;
  }

  safeIcon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  toggleSection(section: AiInsightSection): void {
    section.expanded = !section.expanded;
    this.sectionToggle.emit({ section, expanded: !!section.expanded });
  }

  onHeaderAction(actionId: string): void {
    this.actionClick.emit({ scope: 'header', actionId });
  }

  onFooterAction(actionId: string): void {
    this.actionClick.emit({ scope: 'footer', actionId });
  }

  onSectionAction(section: AiInsightSection, actionId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.actionClick.emit({ scope: 'section', sectionId: section.id, actionId });
  }

  onTileAction(section: AiInsightSection, tile: AiInsightTile, actionId: string, scope: 'tile' | 'tile-bottom'): void {
    this.actionClick.emit({ scope, sectionId: section.id, tileId: tile.id, actionId });
  }
}
