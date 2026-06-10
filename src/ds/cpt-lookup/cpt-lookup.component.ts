import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LookupItem { id: string; label: string; meta?: string; }

@Component({
  selector: 'ds-cpt-lookup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cpt-lookup.component.html',
  styleUrl: './cpt-lookup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CptLookupComponent {
  @Input() label = 'CPT Lookup';
  @Input() placeholder = 'Search CPT Lookup';
  @Input() items: LookupItem[] = [];
  @Input() open = false;
  @Input() emptyMessage = 'No results';
  @Input() value = '';
  @Input() selectedId?: string;

  @Output() search = new EventEmitter<string>();
  @Output() select = new EventEmitter<LookupItem>();
  @Output() openChange = new EventEmitter<boolean>();

  trackById(_: number, item: LookupItem): string { return item.id; }

  onInput(value: string): void { this.value = value; this.search.emit(value); this.openChange.emit(true); }
  onPick(item: LookupItem): void { this.selectedId = item.id; this.value = item.label; this.select.emit(item); this.openChange.emit(false); }
}
