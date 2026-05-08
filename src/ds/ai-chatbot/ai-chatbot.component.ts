import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type ChatRole = 'user' | 'ai';

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

export interface SuggestionChip {
  label: string;
  value?: string;
}

export interface HeaderAction {
  /** Inline SVG markup for the action's icon. */
  icon: string;
  /** Accessible label / tooltip. */
  label: string;
  /** Opaque identifier emitted via `headerActionClick`. */
  id: string;
}

const AI_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M8 1.5l1.5 3.3 3.3 1.5-3.3 1.5L8 11.1 6.5 7.8 3.2 6.3l3.3-1.5L8 1.5z"/>
  <path d="M13 11l.7 1.6 1.6.7-1.6.7L13 15.6l-.7-1.6-1.6-.7 1.6-.7L13 11z"/>
</svg>`;

const MIC_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="6" y="2" width="4" height="8" rx="2"/>
  <path d="M3.5 7.5a4.5 4.5 0 0 0 9 0M8 12v2"/>
</svg>`;

const SEND_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M2 8l12-6-4 14-2-6-6-2z"/>
</svg>`;

@Component({
  selector: 'ds-ai-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chatbot.component.html',
  styleUrl: './ai-chatbot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatbotComponent implements AfterViewChecked {
  @Input() title = 'Heading';
  @Input() messages: ChatMessage[] = [];
  @Input() suggestions: SuggestionChip[] = [];
  @Input() loading = false;
  @Input() placeholder = 'What would you like to do?';
  @Input() showNewChat = true;
  @Input() newChatLabel = 'New chat';
  @Input() headerActions: HeaderAction[] = [];

  @Output() messageSend = new EventEmitter<string>();
  @Output() suggestionClick = new EventEmitter<{ chip: SuggestionChip; index: number }>();
  @Output() newChat = new EventEmitter<void>();
  @Output() headerActionClick = new EventEmitter<string>();
  @Output() micClick = new EventEmitter<void>();

  @ViewChild('slot') slotRef?: ElementRef<HTMLDivElement>;

  draft = '';
  safeAiIcon: SafeHtml;
  safeMicIcon: SafeHtml;
  safeSendIcon: SafeHtml;

  private sanitizer = inject(DomSanitizer);
  private shouldScroll = false;
  private lastMessageCount = 0;

  constructor() {
    this.safeAiIcon = this.sanitizer.bypassSecurityTrustHtml(AI_ICON);
    this.safeMicIcon = this.sanitizer.bypassSecurityTrustHtml(MIC_ICON);
    this.safeSendIcon = this.sanitizer.bypassSecurityTrustHtml(SEND_ICON);
  }

  trackByIndex(index: number): number {
    return index;
  }

  safeIcon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  ngAfterViewChecked(): void {
    if (this.messages.length !== this.lastMessageCount) {
      this.shouldScroll = true;
      this.lastMessageCount = this.messages.length;
    }
    if (this.shouldScroll && this.slotRef) {
      const el = this.slotRef.nativeElement;
      el.scrollTop = el.scrollHeight;
      this.shouldScroll = false;
    }
  }

  onSubmit(event?: Event): void {
    event?.preventDefault();
    const text = this.draft.trim();
    if (!text) return;
    this.messageSend.emit(text);
    this.draft = '';
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }

  onSuggestionClick(chip: SuggestionChip, index: number): void {
    this.suggestionClick.emit({ chip, index });
  }

  onHeaderActionClick(id: string): void {
    this.headerActionClick.emit(id);
  }

  onNewChat(): void {
    this.newChat.emit();
  }

  onMicClick(): void {
    this.micClick.emit();
  }

  get sendDisabled(): boolean {
    return !this.draft.trim();
  }
}
