import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { LeftPanelQueueComponent } from './left-panel-queue.component';

const meta: Meta<LeftPanelQueueComponent> = {
  title: 'Components/Left Panel Queue',
  component: LeftPanelQueueComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    collapsed: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    showQuickSelect: { control: 'boolean' },
    collapseToggle: { table: { category: 'Events' } },
  },
  args: { title: 'Queue', collapsed: false, showSearch: true, showQuickSelect: true, collapseToggle: fn() },
};

export default meta;
type Story = StoryObj<LeftPanelQueueComponent>;

export const Playground: Story = { name: 'Playground' };
export const Collapsed: Story = { name: 'Collapsed', args: { collapsed: true } };
