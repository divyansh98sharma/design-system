import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    maxCharacters: { control: 'number' },
    showCounter: { control: 'boolean' },
  },
  args: { placeholder: 'Enter text...', rows: 4, disabled: false, error: false, valueChange: fn() },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Playground: Story = { name: 'Playground' };
export const WithCounter: Story = { name: 'With counter', args: { maxCharacters: 100, showCounter: true } };
