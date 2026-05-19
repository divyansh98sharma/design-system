import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type HyperlinkSize = 'sm' | 'md';
export type HyperlinkTarget = '_self' | '_blank' | '_parent' | '_top';

/**
 * Hyperlink — inline navigational text link.
 *
 * Medium-weight, underlined, 12 px Inter teal (`#02506f`). Renders as an `<a>`
 * when `href` is set; otherwise as a `<button>` that emits `linkClick`.
 */
@Component({
  selector: 'ds-hyperlink',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hyperlink.component.html',
  styleUrl: './hyperlink.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HyperlinkComponent {
  /** Link text (ignored when content is projected). */
  @Input() label = 'Hyperlink';

  /** URL. Leave empty to render as a button. */
  @Input() href: string | null = null;

  /** Anchor target. */
  @Input() target: HyperlinkTarget = '_self';

  /** Optional `rel` attribute (auto-sets `noopener noreferrer` when target=`_blank`). */
  @Input() rel: string | null = null;

  /** Size variant. */
  @Input() size: HyperlinkSize = 'sm';

  /** Disabled state. */
  @Input() disabled = false;

  /** Emits when the link is activated (button mode or anchor click). */
  @Output() linkClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.linkClick.emit(event);
  }

  get resolvedRel(): string | null {
    if (this.rel !== null) return this.rel;
    return this.target === '_blank' ? 'noopener noreferrer' : null;
  }
}
