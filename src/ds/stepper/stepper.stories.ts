import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { StepperComponent } from './stepper.component';

const meta: Meta<StepperComponent> = {
  title: 'Components/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    valueChange: { table: { category: 'Events' } },
  },
  args: { value: 1, min: 0, max: 99, step: 1, disabled: false, valueChange: fn() },
};

export default meta;
type Story = StoryObj<StepperComponent>;

export const Playground: Story = { name: 'Playground' };
export const Bounded: Story = { name: 'Bounded 0-10', args: { min: 0, max: 10, value: 3 } };
export const Disabled: Story = { name: 'Disabled', args: { disabled: true } };
