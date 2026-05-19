import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ButtonBarComponent, ButtonBarItem } from './button-bar.component';

const ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>`;
const SORT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v10M2 6l3-3 3 3M11 13V3M14 10l-3 3-3-3"/></svg>`;
const SETTINGS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><circle cx="3.5" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="12.5" cy="8" r="1.2"/></svg>`;

const LEFT: ButtonBarItem[] = [
  { id: 'edit', label: 'Button', icon: ICON },
  { id: 'duplicate', label: 'Button', icon: ICON },
  { id: 'sort', icon: SORT, ariaLabel: 'Sort', separatorBefore: true },
  { id: 'settings', icon: SETTINGS, ariaLabel: 'Settings' },
];

const RIGHT: ButtonBarItem[] = [
  { id: 'export', label: 'Button', icon: ICON },
  { id: 'share', label: 'Button', icon: ICON },
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
          'Bulk-action toolbar matching the CODE-A-TON Library Figma spec.\n\n' +
          'Mint background with a left group (select-all checkbox + actions) and a right group (actions + "More" button).\n' +
          'Items support optional `separatorBefore: true` to insert a 1px white divider before the item.',
      },
    },
  },
  argTypes: {
    leftItems: { control: 'object' },
    rightItems: { control: 'object' },
    showSelectAll: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    selectAllChecked: { control: 'boolean' },
    selectAllLabel: { control: 'text' },
    showMore: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    moreLabel: { control: 'text' },
    itemClick: { table: { category: 'Events' } },
    selectAllChange: { table: { category: 'Events' } },
    moreClick: { table: { category: 'Events' } },
  },
  args: {
    leftItems: LEFT,
    rightItems: RIGHT,
    showSelectAll: true,
    selectAllChecked: false,
    selectAllLabel: 'Select All',
    showMore: true,
    moreLabel: 'More',
    itemClick: fn(),
    selectAllChange: fn(),
    moreClick: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonBarComponent>;

export const Playground: Story = { name: 'Playground' };
export const Default: Story = { name: 'Default' };
export const NoSelectAll: Story = {
  name: 'Without select-all',
  args: { showSelectAll: false },
};
export const NoMore: Story = {
  name: 'Without more button',
  args: { showMore: false },
};
export const LeftOnly: Story = {
  name: 'Left items only',
  args: { rightItems: [], showMore: false },
};
