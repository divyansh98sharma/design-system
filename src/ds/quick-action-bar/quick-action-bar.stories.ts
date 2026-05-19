import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { QuickActionBarComponent, QuickAction } from './quick-action-bar.component';

const ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/></svg>`;

const ACTIONS: QuickAction[] = [
  { id: 'a', label: 'Action', icon: ICON },
  { id: 'b', label: 'Action', icon: ICON },
  { id: 'c', label: 'Action', icon: ICON },
];

const meta: Meta<QuickActionBarComponent> = {
  title: 'Components/Quick Action Bar',
  component: QuickActionBarComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: { actions: { control: 'object' }, actionClick: { table: { category: 'Events' } } },
  args: { actions: ACTIONS, actionClick: fn() },
};

export default meta;
type Story = StoryObj<QuickActionBarComponent>;

export const Playground: Story = { name: 'Playground' };
