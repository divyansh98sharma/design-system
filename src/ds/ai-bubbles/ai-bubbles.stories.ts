import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';
import { AiBubblesComponent, AiBubbleChip } from './ai-bubbles.component';

const SPARKLE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M8 2v4M8 10v4M2 8h4M10 8h4"/>
  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
</svg>`;

const ONE: AiBubbleChip[] = [{ label: 'Chip Label', icon: SPARKLE_ICON }];
const TWO: AiBubbleChip[] = [
  { label: 'Chip Label', icon: SPARKLE_ICON },
  { label: 'Chip Label', icon: SPARKLE_ICON },
];
const THREE: AiBubbleChip[] = [
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
];
const FOUR: AiBubbleChip[] = [
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
];
const FIVE: AiBubbleChip[] = [
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
];

const meta: Meta<AiBubblesComponent> = {
  title: 'Components/AI Bubbles',
  component: AiBubblesComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Inline AI suggestion chip group matching the CODE-A-TON Library Figma spec.\n\n' +
          '- Leading hand-pointing icon hints that the chips are clickable suggestions.\n' +
          '- Each chip is a pill button with a 1px `#007b95` border on white background.\n' +
          '- Chips can include an optional leading icon (typical for 1–2 chip layouts).',
      },
    },
  },
  argTypes: {
    chips: {
      description: 'Array of `{ label, value?, icon? }` items rendered as chips.',
      control: 'object',
    },
    showHintIcon: {
      description: 'Show the leading hand-pointing icon to the left of the chips.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    hintIcon: {
      description: 'Inline SVG override for the leading hint icon.',
      control: 'text',
    },
    ariaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'AI suggestions' } },
    },
    chipClick: {
      description: 'Emits `{ chip, index }` when a chip is clicked.',
      table: { category: 'Events' },
    },
  },
  args: {
    chips: TWO,
    showHintIcon: true,
    ariaLabel: 'AI suggestions',
    chipClick: fn(),
  },
};

export default meta;
type Story = StoryObj<AiBubblesComponent>;

export const Playground: Story = { name: 'Playground' };

export const Counts: Story = {
  name: 'Chip Counts',
  parameters: {
    docs: { description: { story: 'All five Figma variants (1, 2, 3, 4, 5 chips).' } },
  },
  render: () => ({
    props: { one: ONE, two: TWO, three: THREE, four: FOUR, five: FIVE },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;border:1px solid #e1e1e1;border-radius:8px">
        <ds-ai-bubbles [chips]="one"></ds-ai-bubbles>
        <ds-ai-bubbles [chips]="two"></ds-ai-bubbles>
        <ds-ai-bubbles [chips]="three"></ds-ai-bubbles>
        <ds-ai-bubbles [chips]="four"></ds-ai-bubbles>
        <ds-ai-bubbles [chips]="five"></ds-ai-bubbles>
      </div>
    `,
  }),
};

export const OneChip: Story = { name: 'One chip', args: { chips: ONE } };
export const TwoChip: Story = { name: 'Two chips', args: { chips: TWO } };
export const ThreeChip: Story = { name: 'Three chips', args: { chips: THREE } };
export const FourChip: Story = { name: 'Four chips', args: { chips: FOUR } };
export const FiveChip: Story = { name: 'Five chips', args: { chips: FIVE } };

export const NoHintIcon: Story = {
  name: 'Without hint icon',
  args: { chips: THREE, showHintIcon: false },
};

export const ChipClickEmits: Story = {
  name: 'Interaction: Chip click emits',
  args: { chips: [{ label: 'Click me' }, { label: 'Other' }] },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button', { name: /click me/i });
    await userEvent.click(chip);
    await expect(args.chipClick).toHaveBeenCalledWith({
      chip: { label: 'Click me' },
      index: 0,
    });
  },
};
