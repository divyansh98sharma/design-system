import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** A single chip rendered inside an AI Bubbles row. */
export interface AiBubbleChip {
  /** Visible text label. */
  label: string;
  /**
   * Optional SVG `<path d="…">` data for the chip's leading icon.
   * Use `viewBox="0 0 24 24"` paths — the icon is rendered at 16 × 16 px.
   * Omit to render label only.
   */
  iconPath?: string | null;
}

/**
 * AI Bubbles — a horizontal row of pill-shaped suggestion chips, optionally
 * preceded by a hand-pointing leading icon that hints at the AI's
 * recommendation.
 *
 * Each chip is a button that emits `chipSelected` with the chip object and
 * its index when clicked. Use this for AI-generated quick-reply suggestions,
 * follow-up questions, or one-tap prompts.
 *
 * **Anatomy:** `[leading-icon] chip₁ chip₂ … chipₙ`
 */
@Component({
  selector: 'ds-ai-bubbles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-bubbles.component.html',
  styleUrl: './ai-bubbles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiBubblesComponent {
  /** Chips to render, in display order. */
  @Input() chips: AiBubbleChip[] = [{ label: 'Chip Label' }];

  /** Show the leading hand-pointing icon. */
  @Input() showLeadingIcon = true;

  /**
   * Custom SVG `<path d="…">` for the leading icon (viewBox 0 0 24 24).
   * Defaults to a hand-pointing cursor when null.
   */
  @Input() leadingIconPath: string | null = null;

  /** ARIA label applied to the row container. */
  @Input() ariaLabel = 'AI suggestions';

  /** Emits when any chip is activated. */
  @Output() chipSelected = new EventEmitter<{ chip: AiBubbleChip; index: number }>();

  /** Hand-pointing cursor (Lucide MousePointer). */
  private readonly defaultLeadingIcon =
    'M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z';

  get resolvedLeadingIcon(): string {
    return this.leadingIconPath ?? this.defaultLeadingIcon;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
