import type { Meta, StoryObj } from '@storybook/angular';
import { FeedbackLoopComponent, FeedbackTag } from './feedback-loop.component';

const DEFAULT_TAGS: FeedbackTag[] = [
  { id: 'ui', label: 'UI / Design' },
  { id: 'performance', label: 'Performance' },
  { id: 'usability', label: 'Usability' },
  { id: 'bug', label: 'Bug' },
  { id: 'missing', label: 'Missing Feature' },
  { id: 'other', label: 'Other' },
];

const meta: Meta<FeedbackLoopComponent> = {
  title: 'Components/Feedback Loop',
  component: FeedbackLoopComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Popover-style feedback widget. A 24×24 trigger icon anchors a 566 px popover containing:\n\n' +
          '- **Header** — teal `#007b95` bar with bold title, description, and close icon.\n' +
          '- **Tag chips** — pill-shaped multi-select for categorising feedback.\n' +
          '- **Textarea** — labelled input with format toolbar and circular min-character indicator.\n' +
          '- **PHI note** — italic reminder not to include sensitive data.\n' +
          '- **Footer** — contact-opt-in checkbox plus Submit / Cancel actions.',
      },
    },
  },
  argTypes: {
    open: { description: 'Whether the popover is visible.', control: 'boolean' },
    title: { description: 'Header title.', control: 'text' },
    description: { description: 'Header description.', control: 'text' },
    tags: { description: 'Tag chips.', control: 'object' },
    selectedTagIds: { description: 'IDs of selected tags.', control: 'object' },
    textareaLabel: { description: 'Label above the textarea.', control: 'text' },
    placeholder: { description: 'Textarea placeholder.', control: 'text' },
    text: { description: 'Textarea value.', control: 'text' },
    minCharacters: { description: 'Minimum character count shown in the ring.', control: 'number' },
    phiNote: { description: 'Italic note below the textarea.', control: 'text' },
    contactCheckboxLabel: { description: 'Footer checkbox label.', control: 'text' },
    contactOptIn: { description: 'Checkbox state.', control: 'boolean' },
    submitLabel: { description: 'Submit button label.', control: 'text' },
    cancelLabel: { description: 'Cancel button label.', control: 'text' },
    triggerAriaLabel: { description: 'ARIA label for the trigger button.', control: 'text' },
    openChange: { table: { category: 'Events' } },
    selectedTagIdsChange: { table: { category: 'Events' } },
    textChange: { table: { category: 'Events' } },
    contactOptInChange: { table: { category: 'Events' } },
    feedbackSubmit: { table: { category: 'Events' } },
    cancelled: { table: { category: 'Events' } },
  },
  args: {
    open: false,
    title: 'What can be improved?',
    description: 'Your feedback helps us improve the experience for you.',
    tags: DEFAULT_TAGS,
    selectedTagIds: ['ui'],
    textareaLabel: 'Label',
    placeholder: 'Share your experience briefly',
    text: '',
    minCharacters: 100,
    phiNote: 'Remember not to include any PHI data.',
    contactCheckboxLabel: 'You may contact me for more feedback.',
    contactOptIn: true,
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    triggerAriaLabel: 'Give feedback',
  },
};

export default meta;
type Story = StoryObj<FeedbackLoopComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Configure the full widget via the Controls panel.' } },
  },
};

// ─── Trigger (closed) ─────────────────────────────────────────────────────────

export const TriggerOnly: Story = {
  name: 'Trigger (closed)',
  parameters: {
    docs: { description: { story: 'Just the 24×24 trigger button. Click it to open the popover.' } },
  },
  args: { open: false },
};

// ─── Popover open ─────────────────────────────────────────────────────────────

export const PopoverOpen: Story = {
  name: 'Popover — open',
  parameters: {
    docs: { description: { story: 'Popover in its default open state, with one tag pre-selected.' } },
  },
  args: { open: true },
};

// ─── Empty textarea ───────────────────────────────────────────────────────────

export const EmptyState: Story = {
  name: 'Empty state',
  parameters: {
    docs: { description: { story: 'No tag selected, empty textarea — ring is at 0 progress.' } },
  },
  args: {
    open: true,
    selectedTagIds: [],
    text: '',
  },
};

// ─── Partly filled ────────────────────────────────────────────────────────────

export const PartlyFilled: Story = {
  name: 'Partly filled',
  parameters: {
    docs: { description: { story: 'Textarea has some text — ring shows partial progress toward the minimum.' } },
  },
  args: {
    open: true,
    selectedTagIds: ['usability', 'bug'],
    text: 'The button on the settings page felt unresponsive when I tried to save my preferences.',
  },
};

// ─── Goal met ─────────────────────────────────────────────────────────────────

export const GoalMet: Story = {
  name: 'Goal met',
  parameters: {
    docs: { description: { story: 'Text exceeds the minimum character count — ring is fully filled.' } },
  },
  args: {
    open: true,
    selectedTagIds: ['performance'],
    text: 'Loading the patient list takes about 6 seconds after login, which is noticeably slower than last month. It happens consistently on Chrome and Safari regardless of how many records are in the list.',
  },
};
