import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-usability-tip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usability-tip.component.html',
  styleUrl: './usability-tip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsabilityTipComponent {
  @Input() text = 'Tip';
}
