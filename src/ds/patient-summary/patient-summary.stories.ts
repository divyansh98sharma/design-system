import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PatientSummaryComponent } from './patient-summary.component';

const meta: Meta<PatientSummaryComponent> = {
  title: 'Components/Patient Summary',
  component: PatientSummaryComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'select', options: ['default', 'filled', 'on-card-default', 'on-card-filled'] },
    title: { control: 'text' },
    body: { control: 'text' },
    emptyMessage: { control: 'text' },
    generateLabel: { control: 'text' },
    generate: { table: { category: 'Events' } },
  },
  args: { state: 'default', title: 'Summary', body: 'Patient is a 38-year-old male...', generate: fn() },
};

export default meta;
type Story = StoryObj<PatientSummaryComponent>;

export const Playground: Story = { name: 'Playground' };
export const Filled: Story = { name: 'Filled', args: { state: 'filled' } };
export const OnCard: Story = { name: 'On card (filled)', args: { state: 'on-card-filled' } };
