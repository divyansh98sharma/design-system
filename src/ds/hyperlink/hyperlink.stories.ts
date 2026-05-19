import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { HyperlinkComponent } from './hyperlink.component';

const meta: Meta<HyperlinkComponent> = {
  title: 'Components/Hyperlink',
  component: HyperlinkComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    target: { control: 'select', options: ['_self', '_blank'] },
    disabled: { control: 'boolean' },
    linkClick: { table: { category: 'Events' } },
  },
  args: {
    label: 'Hyperlink',
    href: 'https://example.com',
    target: '_self',
    disabled: false,
    linkClick: fn(),
  },
};

export default meta;
type Story = StoryObj<HyperlinkComponent>;

export const Playground: Story = { name: 'Playground' };
export const AsButton: Story = { name: 'Button (no href)', args: { href: undefined } };
export const Disabled: Story = { name: 'Disabled', args: { disabled: true } };
