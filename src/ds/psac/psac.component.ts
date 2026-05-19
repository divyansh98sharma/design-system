import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type PsacType = 'psac' | 'confidential' | 'empty';
export type PsacStopType = 'soft' | 'hard' | 'none';

@Component({
  selector: 'ds-psac',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './psac.component.html',
  styleUrl: './psac.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PsacComponent {
  @Input() type: PsacType = 'psac';
  @Input() stopType: PsacStopType = 'soft';
  @Input() title = 'Patient Safety Alert';
  @Input() body = 'This patient has an active safety concern.';
  @Input() acknowledgeLabel = 'Acknowledge';
  @Input() bypassLabel = 'Override';

  @Output() acknowledge = new EventEmitter<void>();
  @Output() bypass = new EventEmitter<void>();
}
