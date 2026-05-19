import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

export type CardVariant = 'grouping' | 'content';
export type CardState = 'default' | 'selected';

/**
 * Card — container component used either as a passive grouping shell or as a
 * selectable summary card with header, optional checkbox, chip slot, meta row,
 * body, and footer.
 *
 * Content projection slots (use `<ng-template #dsCardX>`):
 * - `dsCardChip`   — chip rendered to the right of the header
 * - `dsCardMeta`   — meta-data row beneath the header
 * - `dsCardBody`   — main body content
 * - `dsCardFooter` — footer (e.g. "Date Label MM/DD/YYYY at 00:00")
 */
@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  /** `grouping` — passive slot · `content` — full header/body/footer card. */
  @Input() variant: CardVariant = 'content';

  /** `default` — grey border · `selected` — cyan border + glow. */
  @Input() state: CardState = 'default';

  /** Header text (content variant). */
  @Input() title = '';

  /** Optional secondary header text rendered after the title (e.g. "(38 yo M)"). */
  @Input() subtitle = '';

  /** Show a leading checkbox in the header. */
  @Input() showCheckbox = false;

  /** Checkbox value when shown. */
  @Input() checked = false;

  /** Show a trailing chevron-down in the header. */
  @Input() showChevron = false;

  /** Make the card hoverable (cursor + shadow on hover). */
  @Input() hoverable = false;

  /** Selectable — clicking the card toggles `state` between default/selected. */
  @Input() selectable = false;

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<CardState>();
  @Output() cardClick = new EventEmitter<MouseEvent>();

  @ContentChild('dsCardChip')   chipTpl?: TemplateRef<unknown>;
  @ContentChild('dsCardMeta')   metaTpl?: TemplateRef<unknown>;
  @ContentChild('dsCardBody')   bodyTpl?: TemplateRef<unknown>;
  @ContentChild('dsCardFooter') footerTpl?: TemplateRef<unknown>;

  onClick(e: MouseEvent): void {
    this.cardClick.emit(e);
    if (this.selectable) {
      const next: CardState = this.state === 'selected' ? 'default' : 'selected';
      this.state = next;
      this.stateChange.emit(next);
    }
  }

  onCheckboxToggle(e: Event): void {
    e.stopPropagation();
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
