import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PsacComponent } from './psac.component';

const meta: Meta<PsacComponent> = {
  title: 'Components/PSAC',
  component: PsacComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    type: { control: 'select', options: ['psac', 'confidential', 'empty'] },
    stopType: { control: 'select', options: ['soft', 'hard', 'none'] },
    title: { control: 'text' },
    body: { control: 'text' },
    acknowledgeLabel: { control: 'text' },
    bypassLabel: { control: 'text' },
    acknowledge: { table: { category: 'Events' } },
    bypass: { table: { category: 'Events' } },
  },
  args: {
    type: 'psac',
    stopType: 'soft',
    title: 'Patient Safety Alert',
    body: 'This patient has an active safety concern.',
    acknowledge: fn(),
    bypass: fn(),
  },
};

export default meta;
type Story = StoryObj<PsacComponent>;

export const Playground: Story = { name: 'Playground' };
export const Confidential: Story = { name: 'Confidential', args: { type: 'confidential', title: 'Confidential record' } };
export const HardStop: Story = { name: 'Hard stop', args: { stopType: 'hard' } };
export const Empty: Story = { name: 'Empty state', args: { type: 'empty' } };
