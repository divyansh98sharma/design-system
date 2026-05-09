import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FeedbackChip {
  id: string;
  label: string;
}

@Component({
  selector: 'ds-feedback-loop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-loop.component.html',
  styleUrl: './feedback-loop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackLoopComponent {
  @Input() title = 'What can be improved?';
  @Input() subtitle = 'Your feedback helps us improve the experience for you.';
  @Input() chips: FeedbackChip[] = [];
  @Input() selectedChipIds: string[] = [];
  @Input() textareaPlaceholder = 'Share your experience briefly';
  @Input() textareaValue = '';
  @Input() minCharacters = 0;
  @Input() maxCharacters = 100;
  @Input() warningText = 'Remember not to include any PHI data.';
  @Input() contactLabel = 'You may contact me for more feedback.';
  @Input() contactChecked = false;
  @Input() submitLabel = 'Submit';
  @Input() cancelLabel = 'Cancel';

  @Output() chipToggle = new EventEmitter<string>();
  @Output() textareaChange = new EventEmitter<string>();
  @Output() contactChange = new EventEmitter<boolean>();
  @Output() submitFeedback = new EventEmitter<{
    chipIds: string[];
    text: string;
    contactConsent: boolean;
  }>();
  @Output() cancel = new EventEmitter<void>();

  isSelected(id: string): boolean {
    return this.selectedChipIds.includes(id);
  }

  trackById(_: number, chip: FeedbackChip): string {
    return chip.id;
  }

  get charCount(): number {
    return this.textareaValue.length;
  }

  get canSubmit(): boolean {
    return this.charCount >= this.minCharacters && this.charCount <= this.maxCharacters;
  }

  onChipClick(id: string): void {
    this.chipToggle.emit(id);
  }

  onTextChange(value: string): void {
    this.textareaValue = value;
    this.textareaChange.emit(value);
  }

  onContactToggle(): void {
    this.contactChecked = !this.contactChecked;
    this.contactChange.emit(this.contactChecked);
  }

  onSubmit(): void {
    if (!this.canSubmit) return;
    this.submitFeedback.emit({
      chipIds: this.selectedChipIds,
      text: this.textareaValue,
      contactConsent: this.contactChecked,
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
