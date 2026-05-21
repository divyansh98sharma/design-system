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

export type ChipType =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'white'
  | 'gray'
  | 'ai'
  | 'action'
  | 'selected'
  | 'structured';

export type ChipSize = 'sm' | 'lg';

@Component({
  selector: 'ds-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  @Input() type: ChipType = 'gray';
  @Input() size: ChipSize = 'sm';
  @Input() label = 'Chip Label';
  @Input() showIcon = true;
  @Input() showCounter = false;
  @Input() counter: number | string = 999;
  /** Selected state — applies the active treatment (relevant for `type=ai`: full brand gradient + white medium text). */
  @Input() selected = false;

  @Input() set icon(svg: string | undefined) {
    this.safeIcon = svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : null;
  }

  @Output() chipClick = new EventEmitter<void>();

  safeIcon: SafeHtml | null = null;
  private sanitizer = inject(DomSanitizer);

  get hostClass(): string {
    const sel = this.selected ? ' ds-chip--is-selected' : '';
    return `ds-chip ds-chip--${this.type} ds-chip--${this.size}${sel}`;
  }
}
