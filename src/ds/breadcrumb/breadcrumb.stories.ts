import type { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbComponent } from './breadcrumb.component';

const ITEMS_L1 = [{ label: 'Home', href: '/' }];
const ITEMS_L2 = [{ label: 'Home', href: '/' }, { label: 'Category', href: '/cat' }];
const ITEMS_L3 = [{ label: 'Home', href: '/' }, { label: 'Category', href: '/cat' }, { label: 'Current Page' }];
const ITEMS_L4 = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/cat' },
  { label: 'Sub-Category', href: '/cat/sub' },
  { label: 'Current Page' },
];
const ITEMS_L5 = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/cat' },
  { label: 'Sub-Category', href: '/cat/sub' },
  { label: 'Detail', href: '/cat/sub/detail' },
  { label: 'Current Page' },
];

const meta: Meta<BreadcrumbComponent> = {
  title: 'Components/Breadcrumb & Navigation',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays the user\'s location within the application hierarchy.\n\n' +
          '**Breadcrumb** (`type="breadcrumb"`) — ancestor nodes are **clickable links** with an underline; ' +
          'users can jump back to any previous screen.\n\n' +
          '**Navigation** (`type="navigation"`) — plain text trail, **no underline or click**; ' +
          'used for orientation-only context where back-navigation isn\'t supported.\n\n' +
          'When there are more than 3 ancestors the component collapses them behind an overflow **⋯** button that expands on click.',
      },
    },
  },
  argTypes: {
    type: {
      description:
        '`breadcrumb` — ancestors are clickable links (underlined). ' +
        '`navigation` — plain text, no interaction.',
      control: 'select',
      options: ['breadcrumb', 'navigation'],
      table: { defaultValue: { summary: 'breadcrumb' } },
    },
    items: {
      description: 'Ordered list of nodes from root → current page. The last item is always the active page.',
      control: 'object',
    },
    itemClick: {
      description: 'Emits `{ item, index }` when a breadcrumb ancestor is clicked (breadcrumb type only).',
      table: { category: 'Events' },
    },
  },
  args: {
    type: 'breadcrumb',
    items: ITEMS_L3,
  },
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Configure `type` and `items` using the Controls panel.' } },
  },
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of **Breadcrumb** (underlined, clickable ancestors) vs ' +
          '**Navigation** (plain text, non-clickable) across all levels.',
      },
    },
  },
  render: () => ({
    props: {
      itemsL1: ITEMS_L1,
      itemsL2: ITEMS_L2,
      itemsL3: ITEMS_L3,
      itemsL4: ITEMS_L4,
      itemsL5: ITEMS_L5,
    },
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:16px;border:1px solid #e1e1e1;border-radius:8px">
        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;margin:0 0 12px;text-transform:uppercase;letter-spacing:.5px">Breadcrumb (clickable)</p>
          <div style="display:flex;flex-direction:column;gap:16px">
            <ds-breadcrumb type="breadcrumb" [items]="itemsL1"></ds-breadcrumb>
            <ds-breadcrumb type="breadcrumb" [items]="itemsL2"></ds-breadcrumb>
            <ds-breadcrumb type="breadcrumb" [items]="itemsL3"></ds-breadcrumb>
            <ds-breadcrumb type="breadcrumb" [items]="itemsL4"></ds-breadcrumb>
            <ds-breadcrumb type="breadcrumb" [items]="itemsL5"></ds-breadcrumb>
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;margin:0 0 12px;text-transform:uppercase;letter-spacing:.5px">Navigation (display only)</p>
          <div style="display:flex;flex-direction:column;gap:16px">
            <ds-breadcrumb type="navigation" [items]="itemsL1"></ds-breadcrumb>
            <ds-breadcrumb type="navigation" [items]="itemsL2"></ds-breadcrumb>
            <ds-breadcrumb type="navigation" [items]="itemsL3"></ds-breadcrumb>
            <ds-breadcrumb type="navigation" [items]="itemsL4"></ds-breadcrumb>
            <ds-breadcrumb type="navigation" [items]="itemsL5"></ds-breadcrumb>
          </div>
        </div>
      </div>
    `,
  }),
};

// ─── Breadcrumb levels ────────────────────────────────────────────────────────

export const BreadcrumbLevel1: Story = {
  name: 'Breadcrumb — Level 1',
  parameters: { docs: { description: { story: 'Single page — current page shown in **bold**, no ancestors.' } } },
  render: () => ({ props: { items: ITEMS_L1 }, template: `<ds-breadcrumb type="breadcrumb" [items]="items"></ds-breadcrumb>` }),
};

export const BreadcrumbLevel2: Story = {
  name: 'Breadcrumb — Level 2',
  parameters: { docs: { description: { story: 'One ancestor link (underlined) + current page.' } } },
  render: () => ({ props: { items: ITEMS_L2 }, template: `<ds-breadcrumb type="breadcrumb" [items]="items"></ds-breadcrumb>` }),
};

export const BreadcrumbLevel3: Story = {
  name: 'Breadcrumb — Level 3',
  parameters: { docs: { description: { story: 'Two ancestor links + current page.' } } },
  render: () => ({ props: { items: ITEMS_L3 }, template: `<ds-breadcrumb type="breadcrumb" [items]="items"></ds-breadcrumb>` }),
};

export const BreadcrumbLevel4Plus: Story = {
  name: 'Breadcrumb — Level 4+ (overflow)',
  parameters: {
    docs: {
      description: {
        story:
          'When there are more than 3 ancestors, middle nodes are collapsed behind an overflow **⋯** button. ' +
          'Clicking the button reveals the hidden breadcrumb nodes in a popover.',
      },
    },
  },
  render: () => ({ props: { items: ITEMS_L5 }, template: `<ds-breadcrumb type="breadcrumb" [items]="items"></ds-breadcrumb>` }),
};

// ─── Navigation levels ────────────────────────────────────────────────────────

export const NavigationLevel1: Story = {
  name: 'Navigation — Level 1',
  parameters: { docs: { description: { story: 'Single node in bold — no underline, not clickable.' } } },
  render: () => ({ props: { items: ITEMS_L1 }, template: `<ds-breadcrumb type="navigation" [items]="items"></ds-breadcrumb>` }),
};

export const NavigationLevel2: Story = {
  name: 'Navigation — Level 2',
  parameters: { docs: { description: { story: 'Ancestor as plain text (no underline) + current node in bold.' } } },
  render: () => ({ props: { items: ITEMS_L2 }, template: `<ds-breadcrumb type="navigation" [items]="items"></ds-breadcrumb>` }),
};

export const NavigationLevel3: Story = {
  name: 'Navigation — Level 3',
  render: () => ({ props: { items: ITEMS_L3 }, template: `<ds-breadcrumb type="navigation" [items]="items"></ds-breadcrumb>` }),
};

export const NavigationLevel4Plus: Story = {
  name: 'Navigation — Level 4+ (overflow)',
  parameters: {
    docs: {
      description: {
        story:
          'Same overflow collapse as breadcrumb, but the popover items are plain text — no links or underlines.',
      },
    },
  },
  render: () => ({ props: { items: ITEMS_L5 }, template: `<ds-breadcrumb type="navigation" [items]="items"></ds-breadcrumb>` }),
};
