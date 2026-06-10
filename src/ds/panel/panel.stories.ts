import type { Meta, StoryObj } from '@storybook/angular';
import { PanelComponent } from './panel.component';

const meta: Meta<PanelComponent> = {
  title: 'Components/Panel',
  component: PanelComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: { title: { control: 'text' }, bordered: { control: 'boolean' } },
  args: { title: 'Panel Title', bordered: true },
};

export default meta;
type Story = StoryObj<PanelComponent>;

export const Playground: Story = { name: 'Playground' };
