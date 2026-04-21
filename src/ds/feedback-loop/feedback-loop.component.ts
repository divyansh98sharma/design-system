import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FeedbackTag {
  id: string;
  label: string;
}

export interface FeedbackSubmitEvent {
  tagIds: string[];
  text: string;
  contactOptIn: boolean;
}

/**
 * Feedback Loop — popover-style widget with tag chips, textarea, and footer actions.
 *
 * Anchors to a 24×24 trigger icon button. Clicking the trigger opens a 566 px popover
 * with teal header (title + description + close), tag chips (multi-select), labelled
 * textarea with format-toolbar + circular character-count indicator, italic PHI note,
 * divider, and a footer row with contact-opt-in checkbox + Submit / Cancel.
 */
@Component({
  selector: 'ds-feedback-loop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-loop.component.html',
  styleUrl: './feedback-loop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackLoopComponent {
  /** Controls whether the popover is visible. Two-way bindable via `[(open)]`. */
  @Input() open = false;

  /** Header title. */
  @Input() title = 'What can be improved?';

  /** Header description. */
  @Input() description = 'Your feedback helps us improve the experience for you.';

  /** Tag chips shown above the textarea. */
  @Input() tags: FeedbackTag[] = [];

  /** IDs of selected tag chips. */
  @Input() selectedTagIds: string[] = [];

  /** Textarea label. */
  @Input() textareaLabel = 'Label';

  /** Textarea placeholder. */
  @Input() placeholder = 'Share your experience briefly';

  /** Current textarea value. */
  @Input() text = '';

  /** Minimum character count displayed in the circular indicator. */
  @Input() minCharacters = 100;

  /** Italic note shown under the textarea. */
  @Input() phiNote = 'Remember not to include any PHI data.';

  /** Footer checkbox label. */
  @Input() contactCheckboxLabel = 'You may contact me for more feedback.';

  /** Whether the contact-opt-in checkbox is checked. */
  @Input() contactOptIn = true;

  /** Submit button label. */
  @Input() submitLabel = 'Submit';

  /** Cancel button label. */
  @Input() cancelLabel = 'Cancel';

  /** Accessible label for the trigger button. */
  @Input() triggerAriaLabel = 'Give feedback';

  /** Emits when `open` changes (two-way binding). */
  @Output() openChange = new EventEmitter<boolean>();

  /** Emits the selected tag id array whenever it changes. */
  @Output() selectedTagIdsChange = new EventEmitter<string[]>();

  /** Emits the textarea value whenever it changes. */
  @Output() textChange = new EventEmitter<string>();

  /** Emits when the contact-opt-in checkbox changes. */
  @Output() contactOptInChange = new EventEmitter<boolean>();

  /** Emits when the Submit button is clicked. */
  @Output() feedbackSubmit = new EventEmitter<FeedbackSubmitEvent>();

  /** Emits when the Cancel button or close icon is clicked. */
  @Output() cancelled = new EventEmitter<void>();

  @ViewChild('popoverRef') popoverRef?: ElementRef<HTMLElement>;
  @ViewChild('triggerRef') triggerRef?: ElementRef<HTMLElement>;

  toggleOpen(): void {
    this.setOpen(!this.open);
  }

  closePopover(): void {
    if (!this.open) return;
    this.setOpen(false);
    this.cancelled.emit();
  }

  toggleTag(id: string): void {
    const has = this.selectedTagIds.includes(id);
    this.selectedTagIds = has
      ? this.selectedTagIds.filter((t) => t !== id)
      : [...this.selectedTagIds, id];
    this.selectedTagIdsChange.emit(this.selectedTagIds);
  }

  isTagSelected(id: string): boolean {
    return this.selectedTagIds.includes(id);
  }

  onTextInput(value: string): void {
    this.text = value;
    this.textChange.emit(value);
  }

  onContactOptInToggle(): void {
    this.contactOptIn = !this.contactOptIn;
    this.contactOptInChange.emit(this.contactOptIn);
  }

  submit(): void {
    this.feedbackSubmit.emit({
      tagIds: [...this.selectedTagIds],
      text: this.text,
      contactOptIn: this.contactOptIn,
    });
    this.setOpen(false);
  }

  cancel(): void {
    this.setOpen(false);
    this.cancelled.emit();
  }

  get charCount(): number {
    return this.text.length;
  }

  get charProgress(): number {
    if (this.minCharacters <= 0) return 1;
    return Math.min(1, this.charCount / this.minCharacters);
  }

  get charDashOffset(): number {
    const circumference = 2 * Math.PI * 10;
    return circumference * (1 - this.charProgress);
  }

  get charRemaining(): number {
    return Math.max(0, this.minCharacters - this.charCount);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closePopover();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open) return;
    const target = event.target as Node;
    const inPopover = this.popoverRef?.nativeElement.contains(target);
    const inTrigger = this.triggerRef?.nativeElement.contains(target);
    if (!inPopover && !inTrigger) {
      this.setOpen(false);
    }
  }

  private setOpen(next: boolean): void {
    if (this.open === next) return;
    this.open = next;
    this.openChange.emit(next);
  }
}
