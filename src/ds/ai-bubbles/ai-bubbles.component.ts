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

export interface AiBubbleChip {
  /** Visible chip label. */
  label: string;
  /** Optional opaque value emitted on click. Falls back to label. */
  value?: string;
  /** Optional inline SVG markup rendered before the label. */
  icon?: string;
}

const DEFAULT_HINT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 9V3.5a1.5 1.5 0 1 1 3 0V8" />
  <path d="M8 8V2.5a1.5 1.5 0 1 1 3 0V8" />
  <path d="M11 8V4.5a1.5 1.5 0 1 1 3 0V10c0 2.761-2.239 5-5 5H7c-1.5 0-2.4-.6-3-1.5L1.5 9.5C1 8.7 1.2 7.6 2 7.1c.6-.4 1.4-.3 2 .2L5 8" />
</svg>`;

@Component({
  selector: 'ds-ai-bubbles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-bubbles.component.html',
  styleUrl: './ai-bubbles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiBubblesComponent {
  @Input() chips: AiBubbleChip[] = [];
  @Input() showHintIcon = true;
  @Input() ariaLabel = 'AI suggestions';

  @Input() set hintIcon(svg: string | undefined) {
    const markup = svg ?? DEFAULT_HINT_ICON;
    this.safeHintIcon = this.sanitizer.bypassSecurityTrustHtml(markup);
  }

  @Output() chipClick = new EventEmitter<{ chip: AiBubbleChip; index: number }>();

  safeHintIcon: SafeHtml;
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.safeHintIcon = this.sanitizer.bypassSecurityTrustHtml(DEFAULT_HINT_ICON);
  }

  safeChipIcon(chip: AiBubbleChip): SafeHtml | null {
    return chip.icon ? this.sanitizer.bypassSecurityTrustHtml(chip.icon) : null;
  }

  trackByIndex(index: number): number {
    return index;
  }

  onChipClick(chip: AiBubbleChip, index: number): void {
    this.chipClick.emit({ chip, index });
  }
}
