import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ScdtComponent } from './scdt.component';

const meta: Meta<ScdtComponent> = {
  title: 'Components/SCDT',
  component: ScdtComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['modal', 'popover'] },
    title: { control: 'text' },
    body: { control: 'text' },
    dismiss: { table: { category: 'Events' } },
  },
  args: { variant: 'modal', title: 'SCDT', body: 'Body content', dismiss: fn() },
};

export default meta;
type Story = StoryObj<ScdtComponent>;

export const Playground: Story = { name: 'Playground' };
export const Popover: Story = { name: 'Popover variant', args: { variant: 'popover' } };
