import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type RcpTab = 'rcp' | 'dashboard' | 'insights' | 'collapsed';

export interface RcpTabItem {
  id: RcpTab;
  label: string;
}

@Component({
  selector: 'ds-rcp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rcp.component.html',
  styleUrl: './rcp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RcpComponent {
  @Input() tabs: RcpTabItem[] = [
    { id: 'rcp', label: 'Chart' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'insights', label: 'Insights' },
  ];
  @Input() activeTab: RcpTab = 'rcp';
  @Input() collapsed = false;

  @Output() tabChange = new EventEmitter<RcpTab>();
  @Output() collapseToggle = new EventEmitter<boolean>();

  trackById(_: number, t: RcpTabItem): string { return t.id; }

  setTab(id: RcpTab): void {
    this.activeTab = id;
    this.tabChange.emit(id);
  }

  toggle(): void {
    this.collapsed = !this.collapsed;
    this.collapseToggle.emit(this.collapsed);
  }
}
