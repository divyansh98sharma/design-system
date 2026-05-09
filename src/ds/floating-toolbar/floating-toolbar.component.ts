import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface FloatingToolbarItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'ds-floating-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-toolbar.component.html',
  styleUrl: './floating-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingToolbarComponent {
  @Input() items: FloatingToolbarItem[] = [];
  @Input() selectedId?: string;
  @Input() moreLabel?: string;

  @Output() itemSelect = new EventEmitter<string>();
  @Output() moreClick = new EventEmitter<void>();

  private sanitizer = inject(DomSanitizer);

  trackById(_: number, item: FloatingToolbarItem): string {
    return item.id;
  }

  safeIcon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
