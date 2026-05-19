import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Modal size — maps to recommended width × height from the design spec:
 * - `small`   → 420 × 420 px
 * - `medium`  → 720 × 620 px
 * - `large`   → 900 × 440 px (current Figma default)
 * - `xlarge`  → 1240 × 620 px
 * - `xxlarge` → 1340 × 620 px
 */
export type ModalSize = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

/** Footer action button configuration. */
export interface ModalAction {
  label: string;
  value?: string;
  /** `'primary'` gets the filled teal style; `'secondary'` is gray (default). */
  variant?: 'primary' | 'secondary';
  /** When true the button shows a caret-down icon after the label. */
  showCaret?: boolean;
}

/** Floating-toolbar tool item. */
export interface ModalToolbarItem {
  id: string;
  label: string;
  /** SVG path data (viewBox 0 0 24 24). */
  iconPath?: string;
  /** When true, renders as the currently-active item (teal background). */
  active?: boolean;
}

/** Patient identifier block in the header. */
export interface ModalPatientInfo {
  name: string;
  demographics?: string;
  dob?: string;
  accountNumber?: string;
}

/** Extra header-right action button (e.g. INFO / HUB). */
export interface ModalHeaderButton {
  id: string;
  label: string;
}

/**
 * Modal dialog — rounded container with optional left floating toolbar,
 * header (heading + optional patient identifiers + close ×), projected
 * body, and footer with left/right button sections.
 *
 * Matches Figma node 8208:17580.
 */
@Component({
  selector: 'ds-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  /** Size variant — controls width and height. */
  @Input() size: ModalSize = 'large';

  /** Heading text (14 px Inter Medium). */
  @Input() heading = 'Modal Title';

  /** Show the "unsaved changes" dirty-flag next to the heading. */
  @Input() showDirtyFlag = false;

  /** Show the left floating toolbar strip. */
  @Input() showFloatingToolbar = false;

  /** Items rendered in the floating toolbar. */
  @Input() toolbarItems: ModalToolbarItem[] = [];

  /** Label for the "More" link at the bottom of the toolbar. */
  @Input() toolbarMoreLabel = 'More';

  /** Show the "More" link at the bottom of the floating toolbar. */
  @Input() showToolbarMore = true;

  /** Show the patient identifier block in the header. */
  @Input() showPatientIdentifier = false;

  /** Patient identifier block data. */
  @Input() patient: ModalPatientInfo | null = null;

  /** Extra header right-side buttons (before the close ×). */
  @Input() headerButtons: ModalHeaderButton[] = [];

  /** Footer left-side buttons. */
  @Input() footerLeftActions: ModalAction[] = [];

  /** Footer right-side buttons. First `variant: 'primary'` becomes the filled teal. */
  @Input() footerRightActions: ModalAction[] = [
    { label: 'Save', variant: 'primary' },
    { label: 'Cancel', variant: 'secondary' },
  ];

  @Output() closed = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<string>();
  @Output() toolbarItemClick = new EventEmitter<ModalToolbarItem>();
  @Output() toolbarMoreClick = new EventEmitter<void>();
  @Output() headerButtonClick = new EventEmitter<ModalHeaderButton>();

  onAction(action: ModalAction): void {
    this.actionClick.emit(action.value ?? action.label);
  }

  onToolbarItem(item: ModalToolbarItem): void {
    this.toolbarItemClick.emit(item);
  }

  onToolbarMore(): void {
    this.toolbarMoreClick.emit();
  }

  onHeaderButton(b: ModalHeaderButton): void {
    this.headerButtonClick.emit(b);
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }

  get modalClasses(): Record<string, boolean> {
    return {
      'ds-modal': true,
      [`ds-modal--${this.size}`]: true,
      'ds-modal--with-toolbar': this.showFloatingToolbar,
    };
  }

  trackToolbar = (_: number, i: ModalToolbarItem) => i.id;
  trackAction = (_: number, a: ModalAction) => a.value ?? a.label;
  trackHeaderBtn = (_: number, b: ModalHeaderButton) => b.id;
}
