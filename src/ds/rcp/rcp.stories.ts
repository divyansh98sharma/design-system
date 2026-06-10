import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { RcpComponent } from './rcp.component';

const meta: Meta<RcpComponent> = {
  title: 'Components/Right Chart Panel',
  component: RcpComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    activeTab: { control: 'select', options: ['rcp', 'dashboard', 'insights', 'collapsed'] },
    collapsed: { control: 'boolean' },
    tabs: { control: 'object' },
    tabChange: { table: { category: 'Events' } },
    collapseToggle: { table: { category: 'Events' } },
  },
  args: { activeTab: 'rcp', collapsed: false, tabChange: fn(), collapseToggle: fn() },
};

export default meta;
type Story = StoryObj<RcpComponent>;

export const Playground: Story = { name: 'Playground' };
export const Collapsed: Story = { name: 'Collapsed', args: { collapsed: true } };
