import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FloatingToolbarComponent, FloatingToolbarItem } from './floating-toolbar.component';

const ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>`;

const ITEMS: FloatingToolbarItem[] = [
  { id: 'a', label: 'Text', icon: ICON },
  { id: 'b', label: 'Text', icon: ICON },
  { id: 'c', label: 'Text', icon: ICON },
  { id: 'd', label: 'Text', icon: ICON },
  { id: 'e', label: 'Text', icon: ICON },
];

const meta: Meta<FloatingToolbarComponent> = {
  title: 'Components/Floating Toolbar',
  component: FloatingToolbarComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object' },
    selectedId: { control: 'text' },
    moreLabel: { control: 'text' },
    itemSelect: { table: { category: 'Events' } },
    moreClick: { table: { category: 'Events' } },
  },
  args: {
    items: ITEMS,
    selectedId: 'b',
    moreLabel: 'More',
    itemSelect: fn(),
    moreClick: fn(),
  },
};

export default meta;
type Story = StoryObj<FloatingToolbarComponent>;

export const Playground: Story = { name: 'Playground' };
