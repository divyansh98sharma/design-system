import type { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pill-shaped chip per CODE-A-TON Library Figma spec. 12 type variants × 2 sizes (sm/lg). Optional icon and counter.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white', 'gray', 'ai', 'action', 'selected', 'structured'],
    },
    size: { control: 'select', options: ['sm', 'lg'] },
    label: { control: 'text' },
    showIcon: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    counter: { control: 'text' },
    icon: { control: 'text' },
  },
  args: { type: 'gray', size: 'sm', label: 'Chip Label', showIcon: true },
};

export default meta;
type Story = StoryObj<ChipComponent>;

export const Playground: Story = { name: 'Playground' };

export const AllTypes: Story = {
  name: 'All types',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <ds-chip type="red" label="Red"></ds-chip>
        <ds-chip type="orange" label="Orange"></ds-chip>
        <ds-chip type="yellow" label="Yellow"></ds-chip>
        <ds-chip type="green" label="Green"></ds-chip>
        <ds-chip type="blue" label="Blue"></ds-chip>
        <ds-chip type="purple" label="Purple"></ds-chip>
        <ds-chip type="white" label="White"></ds-chip>
        <ds-chip type="gray" label="Gray"></ds-chip>
        <ds-chip type="ai" label="AI Powered"></ds-chip>
        <ds-chip type="action" label="Action"></ds-chip>
        <ds-chip type="selected" label="Selected"></ds-chip>
        <ds-chip type="structured" label="Structured"></ds-chip>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:8px"><ds-chip type="green" size="sm" label="Small"></ds-chip></div>
        <div style="display:flex;gap:8px"><ds-chip type="green" size="lg" label="Large"></ds-chip></div>
      </div>
    `,
  }),
};

export const WithCounter: Story = {
  name: 'With counter',
  args: { type: 'red', showCounter: true, counter: 999 },
};
