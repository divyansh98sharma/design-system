import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ModalTheme = 'primary' | 'secondary';

/**
 * Modal size — maps to recommended width × height from the design spec:
 * - `small`   → 420 × 420 px
 * - `medium`  → 720 × 620 px
 * - `large`   → 1000 × 620 px
 * - `xlarge`  → 1240 × 620 px
 * - `xxlarge` → 1340 × 620 px
 */
export type ModalSize = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

/** Configuration for a footer action button. */
export interface ModalAction {
  /** Button label. */
  label: string;
  /** Optional value emitted on click (falls back to `label`). */
  value?: string;
  /**
   * Button style:
   * - `'primary'` — themed filled button (matches modal theme colour).
   * - `'secondary'` — neutral gray button.
   */
  variant?: 'primary' | 'secondary';
}

/**
 * Modal dialog component — themed header, scrollable body, fixed footer.
 *
 * **2 colour themes:** `primary` (teal) · `secondary` (orange).
 *
 * **5 sizes:** `small` (420×420) · `medium` (720×620) · `large` (1000×620) · `xlarge` (1240×620) · `xxlarge` (1340×620).
 *
 * Structure:
 * - **Header** — 36 px, themed background, semibold heading, close ×.
 * - **Body** — flex-1, white, scrollable; project content via `<ng-content>`.
 * - **Footer** — 40 px, white bg, top border; left & right button areas.
 *
 * Shadow: `0 0 6 px rgba(0, 0, 0, 0.3)`.
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
  /** Colour theme applied to the header bar and primary action buttons. */
  @Input() theme: ModalTheme = 'primary';

  /** Size variant — controls width and height. */
  @Input() size: ModalSize = 'medium';

  /** Heading text displayed in the header bar. */
  @Input() heading = 'Heading';

  /**
   * When `true`, shows a yellow "dirty flag" warning indicator in the header,
   * signalling unsaved changes.
   */
  @Input() showDirtyFlag = false;

  /**
   * Footer buttons on the **left** side (typically secondary / cancel actions).
   * Pass an empty array to hide the left section.
   */
  @Input() footerLeftActions: ModalAction[] = [{ label: 'Cancel', variant: 'secondary' }];

  /**
   * Footer buttons on the **right** side (typically save / primary actions).
   * First item with `variant: 'primary'` gets the themed filled style.
   */
  @Input() footerRightActions: ModalAction[] = [
    { label: 'Save', variant: 'primary' },
    { label: 'Close', variant: 'secondary' },
  ];

  /** Emits when the header close (×) button is clicked. */
  @Output() closed = new EventEmitter<void>();

  /** Emits the action `value` (or `label`) when a footer button is clicked. */
  @Output() actionClick = new EventEmitter<string>();

  onAction(action: ModalAction): void {
    this.actionClick.emit(action.value ?? action.label);
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }

  get modalClasses(): Record<string, boolean> {
    return {
      'ds-modal': true,
      [`ds-modal--${this.theme}`]: true,
      [`ds-modal--${this.size}`]: true,
    };
  }
}
