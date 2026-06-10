import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type PatientSummaryState = 'default' | 'filled' | 'on-card-default' | 'on-card-filled';

@Component({
  selector: 'ds-patient-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-summary.component.html',
  styleUrl: './patient-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientSummaryComponent {
  @Input() state: PatientSummaryState = 'default';
  @Input() title = 'Summary';
  @Input() body = '';
  @Input() emptyMessage = 'No summary yet — generate one with AI.';
  @Input() generateLabel = 'Generate';

  @Output() generate = new EventEmitter<void>();

  get filled(): boolean {
    return this.state === 'filled' || this.state === 'on-card-filled';
  }

  get onCard(): boolean {
    return this.state === 'on-card-default' || this.state === 'on-card-filled';
  }
}
