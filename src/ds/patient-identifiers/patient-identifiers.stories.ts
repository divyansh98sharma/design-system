import type { Meta, StoryObj } from '@storybook/angular';
import { PatientIdentifiersComponent } from './patient-identifiers.component';

const meta: Meta<PatientIdentifiersComponent> = {
  title: 'Components/Patient Identifiers',
  component: PatientIdentifiersComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text' },
    demographics: { control: 'text' },
    identifiers: { control: 'object' },
    background: { control: 'select', options: ['white', 'colored'] },
  },
  args: {
    name: 'Taylor Michael',
    demographics: '38yo M',
    identifiers: [
      { label: 'MRN', value: '12345' },
      { label: 'DOB', value: '04-22-1986' },
    ],
    background: 'white',
  },
};

export default meta;
type Story = StoryObj<PatientIdentifiersComponent>;

export const Playground: Story = { name: 'Playground' };
export const Colored: Story = { name: 'Colored background', args: { background: 'colored' } };
