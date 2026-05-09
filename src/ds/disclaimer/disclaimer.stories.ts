import type { Meta, StoryObj } from '@storybook/angular';
import { DisclaimerComponent } from './disclaimer.component';

const meta: Meta<DisclaimerComponent> = {
  title: 'Components/Disclaimer',
  component: DisclaimerComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    type: { control: 'select', options: ['note', 'disclaimer'] },
    text: { control: 'text' },
    label: { control: 'text' },
    showClose: { control: 'boolean' },
  },
  args: { type: 'note', text: 'Body text', showClose: true },
};

export default meta;
type Story = StoryObj<DisclaimerComponent>;

export const Playground: Story = { name: 'Playground' };
export const Note: Story = { name: 'Note', args: { type: 'note', text: 'This is a note.' } };
export const Disclaimer: Story = { name: 'Disclaimer', args: { type: 'disclaimer', text: 'Read carefully before use.' } };
export const NoClose: Story = { name: 'No close button', args: { showClose: false } };
