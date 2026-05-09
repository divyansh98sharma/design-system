import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-hyperlink',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hyperlink.component.html',
  styleUrl: './hyperlink.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HyperlinkComponent {
  @Input() label = 'Hyperlink';
  @Input() href?: string;
  @Input() target: '_self' | '_blank' = '_self';
  @Input() disabled = false;

  @Output() linkClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.linkClick.emit(event);
  }
}
