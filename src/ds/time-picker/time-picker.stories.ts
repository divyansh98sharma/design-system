import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { TimePickerComponent } from './time-picker.component';

const meta: Meta<TimePickerComponent> = {
  title: 'Components/Time Picker',
  component: TimePickerComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    mode: { control: 'select', options: ['single', 'range'] },
    label: { control: 'text' },
    valueChange: { table: { category: 'Events' } },
    rangeChange: { table: { category: 'Events' } },
  },
  args: { mode: 'single', label: 'Time', valueChange: fn(), rangeChange: fn() },
};

export default meta;
type Story = StoryObj<TimePickerComponent>;

export const Playground: Story = { name: 'Playground' };
export const Range: Story = { name: 'Range', args: { mode: 'range' } };
