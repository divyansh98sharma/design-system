import type { Meta, StoryObj } from '@storybook/angular';
import {
  LeftNavComponent,
  DEFAULT_LEFT_NAV_ITEMS,
  LeftNavItem,
} from './left-nav.component';

const meta: Meta<LeftNavComponent> = {
  title    : 'Components/Left Nav',
  component: LeftNavComponent,
  tags     : ['autodocs'],
  argTypes : {
    activeItem: {
      control : 'select',
      options : [
        null,
        ...DEFAULT_LEFT_NAV_ITEMS.map(i => i.key),
      ],
      description: 'Key of the currently active navigation item.',
    },
    itemClick : { action: 'itemClick'  },
    logout    : { action: 'logout'     },
    menuToggle: { action: 'menuToggle' },
  },
  parameters: {
    layout: 'fullscreen',
    docs  : { story: { height: '640px' } },
  },
};

export default meta;
type Story = StoryObj<LeftNavComponent>;

// ─── Default ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    items     : DEFAULT_LEFT_NAV_ITEMS,
    activeItem: null,
  },
};

// ─── With active item ─────────────────────────────────────────────────────────
export const ActiveItem: Story = {
  name: 'Active Item — Documents',
  args: {
    items     : DEFAULT_LEFT_NAV_ITEMS,
    activeItem: 'documents',
  },
};

// ─── Active — first item ──────────────────────────────────────────────────────
export const ActiveMenu: Story = {
  name: 'Active Item — Menu',
  args: {
    items     : DEFAULT_LEFT_NAV_ITEMS,
    activeItem: 'menu',
  },
};

// ─── Custom subset of items ───────────────────────────────────────────────────
const CUSTOM_ITEMS: LeftNavItem[] = DEFAULT_LEFT_NAV_ITEMS.slice(0, 6);

export const FewItems: Story = {
  name: 'Custom — 6 Items',
  args: {
    items     : CUSTOM_ITEMS,
    activeItem: 'admin',
  },
};

// ─── Single item ─────────────────────────────────────────────────────────────
export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    items     : [DEFAULT_LEFT_NAV_ITEMS[0]],
    activeItem: DEFAULT_LEFT_NAV_ITEMS[0].key,
  },
};

// ─── No active item ───────────────────────────────────────────────────────────
export const NoActiveItem: Story = {
  name: 'No Active Item',
  args: {
    items     : DEFAULT_LEFT_NAV_ITEMS,
    activeItem: null,
  },
};
