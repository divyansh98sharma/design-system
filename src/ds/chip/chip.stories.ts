import type { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pill-shaped tag / chip — used for status labels, categories, AI metadata, or filtering.\n\n' +
          '**11 colour states:** `red` · `orange` · `yellow` · `green` · `blue` · `purple` · `white` · `gray` · `ai` · `action` · `selected`\n\n' +
          '**2 sizes:** `sm` (2 px y-padding) · `lg` (4 px y-padding)\n\n' +
          '**Anatomy** (icon and counter optional): `[icon] label [counter]`',
      },
    },
  },
  argTypes: {
    state: {
      description: 'Colour state.',
      control: 'select',
      options: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white', 'gray', 'ai', 'action', 'selected'],
      table: { defaultValue: { summary: 'gray' } },
    },
    size: {
      description: 'Vertical size.',
      control: 'inline-radio',
      options: ['sm', 'lg'],
      table: { defaultValue: { summary: 'sm' } },
    },
    label: { description: 'Text label.', control: 'text' },
    showIcon: { description: 'Show the leading icon.', control: 'boolean' },
    iconPath: { description: 'Custom SVG path (viewBox 0 0 24 24). Leave null for default.', control: 'text' },
    showCounter: { description: 'Show the trailing counter pill.', control: 'boolean' },
    counterLabel: { description: 'Counter text.', control: 'text' },
    chipClick: { table: { category: 'Events' } },
  },
  args: {
    state: 'gray',
    size: 'sm',
    label: 'Chip Label',
    showIcon: true,
    iconPath: null,
    showCounter: false,
    counterLabel: '999',
  },
};

export default meta;
type Story = StoryObj<ChipComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = { name: 'Playground' };

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  parameters: {
    docs: {
      description: { story: 'Every colour state, in both `sm` and `lg` sizes.' },
    },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:auto auto;gap:8px;align-items:start">
        <ds-chip state="red"      size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="red"      size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="orange"   size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="orange"   size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="yellow"   size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="yellow"   size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="green"    size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="green"    size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="blue"     size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="blue"     size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="purple"   size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="purple"   size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="white"    size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="white"    size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="gray"     size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="gray"     size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="ai"       size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="ai"       size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="action"   size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="action"   size="lg" label="Chip Label"></ds-chip>
        <ds-chip state="selected" size="sm" label="Chip Label"></ds-chip>
        <ds-chip state="selected" size="lg" label="Chip Label"></ds-chip>
      </div>
    `,
  }),
};

// ─── With Counter ─────────────────────────────────────────────────────────────

export const WithCounter: Story = {
  name: 'With Counter',
  parameters: {
    docs: { story: { description: 'Trailing counter pill — useful for filter badges.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
        <ds-chip state="ai"       size="sm" label="Chip Label" [showCounter]="true" counterLabel="999"></ds-chip>
        <ds-chip state="action"   size="sm" label="Chip Label" [showCounter]="true" counterLabel="42"></ds-chip>
        <ds-chip state="selected" size="lg" label="Chip Label" [showCounter]="true" counterLabel="7"></ds-chip>
      </div>
    `,
  }),
};

// ─── Status palette ───────────────────────────────────────────────────────────

export const StatusPalette: Story = {
  name: 'Status Palette (label only)',
  parameters: {
    docs: { description: { story: 'Compact label-only chips for status display.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <ds-chip state="green"  label="Confirmed"   [showIcon]="false"></ds-chip>
        <ds-chip state="blue"   label="In Progress" [showIcon]="false"></ds-chip>
        <ds-chip state="yellow" label="On Hold"     [showIcon]="false"></ds-chip>
        <ds-chip state="red"    label="Cancelled"   [showIcon]="false"></ds-chip>
        <ds-chip state="gray"   label="Inactive"    [showIcon]="false"></ds-chip>
        <ds-chip state="ai"     label="AI Reviewed" [showIcon]="false"></ds-chip>
      </div>
    `,
  }),
};

// ─── Individual state stories ─────────────────────────────────────────────────

export const Red: Story      = { args: { state: 'red',      label: 'Chip Label' } };
export const Orange: Story   = { args: { state: 'orange',   label: 'Chip Label' } };
export const Yellow: Story   = { args: { state: 'yellow',   label: 'Chip Label' } };
export const Green: Story    = { args: { state: 'green',    label: 'Chip Label' } };
export const Blue: Story     = { args: { state: 'blue',     label: 'Chip Label' } };
export const Purple: Story   = { args: { state: 'purple',   label: 'Chip Label' } };
export const White: Story    = { args: { state: 'white',    label: 'Chip Label' } };
export const Gray: Story     = { args: { state: 'gray',     label: 'Chip Label' } };
export const Ai: Story       = { name: 'AI', args: { state: 'ai', label: 'Chip Label' } };
export const Action: Story   = { args: { state: 'action',   label: 'Chip Label' } };
export const Selected: Story = { args: { state: 'selected', label: 'Chip Label' } };
