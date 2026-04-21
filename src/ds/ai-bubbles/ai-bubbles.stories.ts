import type { Meta, StoryObj } from '@storybook/angular';
import { AiBubblesComponent } from './ai-bubbles.component';

// Sparkles icon path (auto-awesome) — matches the chip component's `ai` state.
const SPARKLES =
  'M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5z';

const meta: Meta<AiBubblesComponent> = {
  title: 'Components/AI Bubbles',
  component: AiBubblesComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Horizontal row of pill-shaped AI suggestion chips, optionally led by a hand-pointing icon. ' +
          'Each chip is a button — clicking emits `chipSelected` with the chip and its index. ' +
          'Use for AI-generated quick replies, follow-up prompts, or one-tap actions.\n\n' +
          '**Anatomy:** `[leading-icon] chip₁ chip₂ … chipₙ`',
      },
    },
  },
  argTypes: {
    chips: { description: 'Chips to render, in display order.', control: 'object' },
    showLeadingIcon: { description: 'Show the leading hand-pointing icon.', control: 'boolean' },
    leadingIconPath: { description: 'Custom SVG path for the leading icon (viewBox 0 0 24 24).', control: 'text' },
    ariaLabel: { description: 'ARIA label applied to the row.', control: 'text' },
    chipSelected: { table: { category: 'Events' } },
  },
  args: {
    chips: [{ label: 'Chip Label', iconPath: SPARKLES }],
    showLeadingIcon: true,
    leadingIconPath: null,
    ariaLabel: 'AI suggestions',
  },
};

export default meta;
type Story = StoryObj<AiBubblesComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = { name: 'Playground' };

// ─── Variants matching Figma "Number of Chips" ────────────────────────────────

const chipsOf = (n: number) =>
  Array.from({ length: n }, () => ({ label: 'Chip Label', iconPath: SPARKLES }));

export const OneChip: Story = {
  name: 'One Chip',
  args: { chips: chipsOf(1) },
};

export const TwoChips: Story = {
  name: 'Two Chips',
  args: { chips: chipsOf(2) },
};

export const ThreeChips: Story = {
  name: 'Three Chips',
  args: { chips: chipsOf(3) },
};

export const FourChips: Story = {
  name: 'Four Chips',
  args: { chips: chipsOf(4) },
};

export const FiveChips: Story = {
  name: 'Five Chips',
  args: { chips: chipsOf(5) },
};

// ─── All variants stacked ─────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: {
    docs: {
      description: {
        story: 'All five Figma variants stacked vertically (1 → 5 chips).',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
        <ds-ai-bubbles [chips]="one"></ds-ai-bubbles>
        <ds-ai-bubbles [chips]="two"></ds-ai-bubbles>
        <ds-ai-bubbles [chips]="three"></ds-ai-bubbles>
        <ds-ai-bubbles [chips]="four"></ds-ai-bubbles>
        <ds-ai-bubbles [chips]="five"></ds-ai-bubbles>
      </div>
    `,
    props: {
      one: chipsOf(1),
      two: chipsOf(2),
      three: chipsOf(3),
      four: chipsOf(4),
      five: chipsOf(5),
    },
  }),
};

// ─── Without leading icon ─────────────────────────────────────────────────────

export const WithoutLeadingIcon: Story = {
  name: 'Without Leading Icon',
  args: { chips: chipsOf(3), showLeadingIcon: false },
};

// ─── Label-only chips ─────────────────────────────────────────────────────────

export const LabelOnly: Story = {
  name: 'Label-Only Chips',
  parameters: {
    docs: {
      description: { story: 'Chips render without an icon when `iconPath` is omitted.' },
    },
  },
  args: {
    chips: [
      { label: 'Suggest a follow-up' },
      { label: 'Summarise this' },
      { label: 'Translate' },
    ],
  },
};

// ─── Realistic content ────────────────────────────────────────────────────────

export const RealisticPrompts: Story = {
  name: 'Realistic Prompts',
  parameters: {
    docs: {
      description: {
        story: 'Example AI quick-reply chips a clinician might see in context.',
      },
    },
  },
  args: {
    chips: [
      { label: 'Order labs', iconPath: SPARKLES },
      { label: 'Add to problem list', iconPath: SPARKLES },
      { label: 'Refer to specialist', iconPath: SPARKLES },
    ],
  },
};
