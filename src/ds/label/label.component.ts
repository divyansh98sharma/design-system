import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type LabelSize = 'default' | 'large';

@Component({
  selector: 'ds-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() label = 'Label';
  @Input() size: LabelSize = 'default';
  @Input() required = false;
  @Input() showInfo = false;
  @Input() showCaret = false;
  @Input() forId?: string;
  @Input() infoTooltip?: string;

  @Output() infoClick = new EventEmitter<void>();
  @Output() caretClick = new EventEmitter<void>();
}
