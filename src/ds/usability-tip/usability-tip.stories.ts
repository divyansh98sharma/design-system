import type { Meta, StoryObj } from '@storybook/angular';
import { UsabilityTipComponent } from './usability-tip.component';

const meta: Meta<UsabilityTipComponent> = {
  title: 'Components/Usability Tip',
  component: UsabilityTipComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: { text: { control: 'text' } },
  args: { text: 'Click and drag or Shift + Click to select multiple cards.' },
};

export default meta;
type Story = StoryObj<UsabilityTipComponent>;

export const Playground: Story = { name: 'Playground' };
