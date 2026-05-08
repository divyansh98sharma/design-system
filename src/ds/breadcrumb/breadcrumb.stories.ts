import type { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbComponent } from './breadcrumb.component';

const ITEMS_L1 = [{ label: 'Breadcrumb' }];
const ITEMS_L2 = [{ label: 'Breadcrumb', href: '/' }, { label: 'Breadcrumb' }];
const ITEMS_L3 = [
  { label: 'Breadcrumb', href: '/' },
  { label: 'Breadcrumb', href: '/2' },
  { label: 'Breadcrumb' },
];
const ITEMS_L4 = [
  { label: 'Breadcrumb', href: '/' },
  { label: 'Breadcrumb', href: '/2' },
  { label: 'Breadcrumb', href: '/3' },
  { label: 'Breadcrumb' },
];

const meta: Meta<BreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Breadcrumb navigation matching the CODE-A-TON Library Figma spec.\n\n' +
          '- Last item is **bold black** (current page, non-clickable)\n' +
          '- Ancestor items are **subtle text** (`#4b586b`), clickable links\n' +
          '- 4+ items collapse into a mint chip "..." that opens a dark popover (when `collapseWithPopover=true`)\n' +
          'or renders as a static "..." icon when `collapseWithPopover=false`',
      },
    },
  },
  argTypes: {
    items: {
      description: 'Ordered list of nodes from root → current page. Last item is the active page.',
      control: 'object',
    },
    collapseWithPopover: {
      description: 'When 4+ items, show a mint "..." button that reveals collapsed crumbs in a tooltip popover.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    itemClick: {
      description: 'Emits `{ item, index }` when an ancestor link is clicked.',
      table: { category: 'Events' },
    },
  },
  args: {
    items: ITEMS_L3,
    collapseWithPopover: true,
  },
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const Playground: Story = { name: 'Playground' };

export const Levels: Story = {
  name: 'Levels',
  parameters: { docs: { description: { story: 'All five Figma levels stacked.' } } },
  render: () => ({
    props: {
      l1: ITEMS_L1,
      l2: ITEMS_L2,
      l3: ITEMS_L3,
      l4: ITEMS_L4,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:16px;border:1px solid #e1e1e1;border-radius:8px">
        <ds-breadcrumb [items]="l1"></ds-breadcrumb>
        <ds-breadcrumb [items]="l2"></ds-breadcrumb>
        <ds-breadcrumb [items]="l3"></ds-breadcrumb>
        <ds-breadcrumb [items]="l4" [collapseWithPopover]="false"></ds-breadcrumb>
        <ds-breadcrumb [items]="l4" [collapseWithPopover]="true"></ds-breadcrumb>
      </div>
    `,
  }),
};

export const Level1: Story = {
  name: 'Level 1',
  args: { items: ITEMS_L1 },
};

export const Level2: Story = {
  name: 'Level 2',
  args: { items: ITEMS_L2 },
};

export const Level3: Story = {
  name: 'Level 3',
  args: { items: ITEMS_L3 },
};

export const Level4Static: Story = {
  name: 'Level 4+ (static "...")',
  parameters: {
    docs: { description: { story: 'Middle items collapsed under a static three-dot icon. No popover.' } },
  },
  args: { items: ITEMS_L4, collapseWithPopover: false },
};

export const Level4WithPopover: Story = {
  name: 'Level 4+ (popover)',
  parameters: {
    docs: { description: { story: 'Click the mint "..." chip to reveal collapsed crumbs in a dark tooltip.' } },
  },
  args: { items: ITEMS_L4, collapseWithPopover: true },
};
