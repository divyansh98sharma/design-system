import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type DisclaimerType = 'note' | 'disclaimer';

@Component({
  selector: 'ds-disclaimer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerComponent {
  @Input() type: DisclaimerType = 'note';
  @Input() text = 'Body text';
  @Input() showClose = true;
  @Input() label?: string;

  @Output() closed = new EventEmitter<void>();

  get prefix(): string {
    return this.label ?? (this.type === 'note' ? 'Note:' : 'Disclaimer:');
  }
}
