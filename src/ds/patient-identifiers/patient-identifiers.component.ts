import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PatientIdentifier {
  label: string;
  value: string;
}

@Component({
  selector: 'ds-patient-identifiers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-identifiers.component.html',
  styleUrl: './patient-identifiers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientIdentifiersComponent {
  @Input() name = 'Taylor Michael';
  @Input() demographics = '38yo M';
  @Input() identifiers: PatientIdentifier[] = [];
  @Input() background: 'white' | 'colored' = 'white';

  trackByIndex(i: number): number { return i; }
}
