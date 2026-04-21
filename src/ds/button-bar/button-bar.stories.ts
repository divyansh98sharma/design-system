import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonBarComponent, ButtonBarAction } from './button-bar.component';

const DEFAULT_LEFT: ButtonBarAction[] = [
  { label: 'Button', trailingIcon: 'chevron-down' },
  { label: 'Button', trailingIcon: 'chevron-down' },
];

const DEFAULT_RIGHT: ButtonBarAction[] = [
  { label: 'Button', trailingIcon: 'chevron-down' },
  { label: 'Button', trailingIcon: 'chevron-down' },
];

const meta: Meta<ButtonBarComponent> = {
  title: 'Components/Button Bar',
  component: ButtonBarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compact horizontal toolbar that groups context actions on the left and right of a content area. ' +
          'Optional **Select All** checkbox, **Sort** icon, and **More** menu trigger can be toggled per use.',
      },
    },
  },
  argTypes: {
    leftActions: {
      description: 'Actions rendered on the left side. Each action takes a `label` and optional `trailingIcon`.',
      control: 'object',
    },
    rightActions: {
      description: 'Actions rendered on the right side.',
      control: 'object',
    },
    showSelectAll: {
      description: 'Show the leading Select All checkbox.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    selectAllLabel: { control: 'text' },
    selectAllChecked: { control: 'boolean' },
    selectAllIndeterminate: { control: 'boolean' },
    showSort: {
      description: 'Show the trailing sort icon button after left actions.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    sortLabel: { control: 'text' },
    showMore: {
      description: 'Show the trailing More button after right actions.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    moreLabel: { control: 'text' },
  },
  args: {
    leftActions: DEFAULT_LEFT,
    rightActions: DEFAULT_RIGHT,
    showSelectAll: true,
    selectAllChecked: false,
    selectAllIndeterminate: false,
    selectAllLabel: 'Select All',
    showSort: true,
    sortLabel: 'Sort',
    showMore: true,
    moreLabel: 'More',
  },
};

export default meta;
type Story = StoryObj<ButtonBarComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Use the Controls panel to toggle every section and customise actions.' } },
  },
};

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: { description: { story: 'Full bar matching the Figma spec — Select All, two left actions, sort, two right actions, More.' } },
  },
};

// ─── Without Select All ───────────────────────────────────────────────────────

export const WithoutSelectAll: Story = {
  name: 'Without Select All',
  args: { showSelectAll: false },
};

// ─── Without Sort ─────────────────────────────────────────────────────────────

export const WithoutSort: Story = {
  name: 'Without Sort',
  args: { showSort: false },
};

// ─── Without More ─────────────────────────────────────────────────────────────

export const WithoutMore: Story = {
  name: 'Without More',
  args: { showMore: false },
};

// ─── Left Only ────────────────────────────────────────────────────────────────

export const LeftOnly: Story = {
  name: 'Left actions only',
  args: {
    rightActions: [],
    showMore: false,
  },
};

// ─── Right Only ───────────────────────────────────────────────────────────────

export const RightOnly: Story = {
  name: 'Right actions only',
  args: {
    leftActions: [],
    showSelectAll: false,
    showSort: false,
  },
};

// ─── Custom Actions ───────────────────────────────────────────────────────────

export const CustomActions: Story = {
  name: 'Custom actions',
  args: {
    leftActions: [
      { label: 'Filter', trailingIcon: 'chevron-down' },
      { label: 'Group by', trailingIcon: 'chevron-down' },
    ],
    rightActions: [
      { label: 'Export', trailingIcon: 'chevron-down' },
      { label: 'Share', trailingIcon: 'none' },
    ],
    showSelectAll: true,
    showSort: true,
    showMore: false,
  },
};

// ─── Selected state ───────────────────────────────────────────────────────────

export const Selected: Story = {
  name: 'Select All — checked',
  args: {
    selectAllChecked: true,
  },
};

// ─── Indeterminate ────────────────────────────────────────────────────────────

export const Indeterminate: Story = {
  name: 'Select All — indeterminate',
  args: {
    selectAllChecked: false,
    selectAllIndeterminate: true,
  },
};
