import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { LabelComponent } from './label.component';

const meta: Meta<LabelComponent> = {
  title: 'Components/Label',
  component: LabelComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: ['default', 'large'] },
    required: { control: 'boolean' },
    showInfo: { control: 'boolean' },
    showCaret: { control: 'boolean' },
    infoTooltip: { control: 'text' },
    infoClick: { table: { category: 'Events' } },
    caretClick: { table: { category: 'Events' } },
  },
  args: {
    label: 'Label',
    size: 'default',
    required: false,
    showInfo: false,
    showCaret: false,
    infoClick: fn(),
    caretClick: fn(),
  },
};

export default meta;
type Story = StoryObj<LabelComponent>;

export const Playground: Story = { name: 'Playground' };
export const WithRequired: Story = { name: 'Required *', args: { required: true } };
export const WithInfo: Story = { name: 'With info icon', args: { showInfo: true, infoTooltip: 'Helpful info' } };
export const WithCaret: Story = { name: 'With caret', args: { showCaret: true } };
export const Large: Story = { name: 'Large size', args: { size: 'large' } };
