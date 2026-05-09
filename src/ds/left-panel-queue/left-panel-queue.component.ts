import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-left-panel-queue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-panel-queue.component.html',
  styleUrl: './left-panel-queue.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftPanelQueueComponent {
  @Input() title = 'Queue';
  @Input() collapsed = false;
  @Input() showSearch = true;
  @Input() showQuickSelect = true;

  @Output() collapseToggle = new EventEmitter<boolean>();

  toggle(): void {
    this.collapsed = !this.collapsed;
    this.collapseToggle.emit(this.collapsed);
  }
}
