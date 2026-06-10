import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FeedbackLoopComponent, FeedbackChip } from './feedback-loop.component';

const CHIPS: FeedbackChip[] = [
  { id: 'a', label: 'Chip Label' },
  { id: 'b', label: 'Chip Label' },
  { id: 'c', label: 'Chip Label' },
  { id: 'd', label: 'Chip Label' },
  { id: 'e', label: 'Chip Label' },
  { id: 'f', label: 'Chip Label' },
  { id: 'g', label: 'Chip Label' },
  { id: 'h', label: 'Chip Label' },
];

const meta: Meta<FeedbackLoopComponent> = {
  title: 'Components/Feedback Loop',
  component: FeedbackLoopComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    chips: { control: 'object' },
    selectedChipIds: { control: 'object' },
    textareaPlaceholder: { control: 'text' },
    minCharacters: { control: 'number' },
    maxCharacters: { control: 'number' },
    warningText: { control: 'text' },
    contactLabel: { control: 'text' },
    contactChecked: { control: 'boolean' },
    chipToggle: { table: { category: 'Events' } },
    submitFeedback: { table: { category: 'Events' } },
    cancel: { table: { category: 'Events' } },
  },
  args: {
    title: 'What can be improved?',
    subtitle: 'Your feedback helps us improve the experience for you.',
    chips: CHIPS,
    selectedChipIds: ['a'],
    textareaPlaceholder: 'Share your experience briefly',
    maxCharacters: 100,
    warningText: 'Remember not to include any PHI data.',
    contactLabel: 'You may contact me for more feedback.',
    contactChecked: true,
    chipToggle: fn(),
    submitFeedback: fn(),
    cancel: fn(),
  },
};

export default meta;
type Story = StoryObj<FeedbackLoopComponent>;

export const Playground: Story = { name: 'Playground' };
