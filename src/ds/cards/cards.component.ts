import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'selected' | 'grouping';

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  @Input() variant: CardVariant = 'default';
  @Input() interactive = false;
  @Input() ariaLabel?: string;

  @Output() cardClick = new EventEmitter<void>();

  @HostBinding('class.ds-card--selected') get isSelected() { return this.variant === 'selected'; }
  @HostBinding('class.ds-card--grouping') get isGrouping() { return this.variant === 'grouping'; }
  @HostBinding('class.ds-card--interactive') get isInteractive() { return this.interactive; }
  @HostBinding('attr.role') get role() { return this.interactive ? 'button' : null; }
  @HostBinding('attr.tabindex') get tabindex() { return this.interactive ? '0' : null; }
  @HostBinding('attr.aria-label') get hostAriaLabel() { return this.ariaLabel ?? null; }

  @HostListener('click')
  onClick(): void {
    if (this.interactive) this.cardClick.emit();
  }

  @HostListener('keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (!this.interactive) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cardClick.emit();
    }
  }
}
