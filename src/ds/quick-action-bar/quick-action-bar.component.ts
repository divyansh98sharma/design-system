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

export interface QuickAction {
  id: string;
  label: string;
  icon?: string;
  ariaLabel?: string;
}

@Component({
  selector: 'ds-quick-action-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-action-bar.component.html',
  styleUrl: './quick-action-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionBarComponent {
  @Input() actions: QuickAction[] = [];

  @Output() actionClick = new EventEmitter<string>();

  private sanitizer = inject(DomSanitizer);

  trackById(_: number, a: QuickAction): string { return a.id; }
  safeIcon(svg: string): SafeHtml { return this.sanitizer.bypassSecurityTrustHtml(svg); }
}
