import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface SuggestionChip {
  label: string;
  value?: string;
}

@Component({
  selector: 'ds-ai-chat-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat-field.component.html',
  styleUrl: './ai-chat-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AiChatFieldComponent),
      multi: true,
    },
  ],
})
export class AiChatFieldComponent implements ControlValueAccessor {
  @Input() placeholder = 'What would you like to do?';
  @Input() listeningText = 'Listening....';
  @Input() usingMic = false;
  @Input() disabled = false;
  @Input() suggestions: SuggestionChip[] = [];
  @Input() usabilityTip = '';
  @Input() ariaLabel = 'Chat input';

  @Output() messageSend = new EventEmitter<string>();
  @Output() micToggle = new EventEmitter<boolean>();
  @Output() suggestionClick = new EventEmitter<{ chip: SuggestionChip; index: number }>();

  draft = '';
  focused = false;

  safeAiIcon: SafeHtml;
  safeMicIcon: SafeHtml;
  safeMicActiveIcon: SafeHtml;
  safeSendIcon: SafeHtml;
  safeHandIcon: SafeHtml;
  safeBulbIcon: SafeHtml;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor() {
    const sanitizer = inject(DomSanitizer);
    this.safeAiIcon = sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M8 1.5l1.5 3.3 3.3 1.5-3.3 1.5L8 11.1 6.5 7.8 3.2 6.3l3.3-1.5L8 1.5z"/>
        <path d="M13 11l.7 1.6 1.6.7-1.6.7L13 15.6l-.7-1.6-1.6-.7 1.6-.7L13 11z"/>
      </svg>`);
    this.safeMicIcon = sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="6" y="2" width="4" height="8" rx="2"/>
        <path d="M3.5 7.5a4.5 4.5 0 0 0 9 0M8 12v2"/>
      </svg>`);
    this.safeMicActiveIcon = sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="5" y="5" width="6" height="6" fill="currentColor"/>
      </svg>`);
    this.safeSendIcon = sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M2 8l12-6-4 14-2-6-6-2z"/>
      </svg>`);
    this.safeHandIcon = sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 9V3.5a1.5 1.5 0 1 1 3 0V8"/>
        <path d="M8 8V2.5a1.5 1.5 0 1 1 3 0V8"/>
        <path d="M11 8V4.5a1.5 1.5 0 1 1 3 0V10c0 2.761-2.239 5-5 5H7c-1.5 0-2.4-.6-3-1.5L1.5 9.5C1 8.7 1.2 7.6 2 7.1c.6-.4 1.4-.3 2 .2L5 8"/>
      </svg>`);
    this.safeBulbIcon = sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5.5 11h5M6 13h4M5 9c-1-1-1.5-2.2-1.5-3.5a4.5 4.5 0 1 1 9 0c0 1.3-.5 2.5-1.5 3.5"/>
      </svg>`);
  }

  trackByIndex(index: number): number {
    return index;
  }

  get hasContent(): boolean {
    return this.draft.trim().length > 0;
  }

  get hasSuggestions(): boolean {
    return this.suggestions.length > 0;
  }

  get sendDisabled(): boolean {
    return this.disabled || this.usingMic || !this.hasContent;
  }

  onSubmit(event?: Event): void {
    event?.preventDefault();
    if (this.sendDisabled) return;
    const text = this.draft.trim();
    this.messageSend.emit(text);
    this.draft = '';
    this.onChange(this.draft);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }

  onFocus(): void {
    this.focused = true;
  }

  onBlur(): void {
    this.focused = false;
    this.onTouched();
  }

  onMicClick(): void {
    if (this.disabled) return;
    this.usingMic = !this.usingMic;
    this.micToggle.emit(this.usingMic);
  }

  onSuggestionClick(chip: SuggestionChip, index: number): void {
    this.suggestionClick.emit({ chip, index });
  }

  onDraftChange(value: string): void {
    this.draft = value;
    this.onChange(value);
  }

  writeValue(value: string): void {
    this.draft = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
