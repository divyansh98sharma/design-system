import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ScdtVariant = 'modal' | 'popover';

@Component({
  selector: 'ds-scdt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scdt.component.html',
  styleUrl: './scdt.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScdtComponent {
  @Input() variant: ScdtVariant = 'modal';
  @Input() title = 'Smart Configuration Default Tool';
  @Input() body = '';

  @Output() dismiss = new EventEmitter<void>();
}
