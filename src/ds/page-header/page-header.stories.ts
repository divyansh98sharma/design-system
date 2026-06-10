import type { Meta, StoryObj } from '@storybook/angular';
import { PageHeaderComponent } from './page-header.component';

const meta: Meta<PageHeaderComponent> = {
  title: 'Components/Page Header',
  component: PageHeaderComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { title: { control: 'text' }, subtitle: { control: 'text' } },
  args: { title: 'Page Title', subtitle: 'Optional subtitle' },
};

export default meta;
type Story = StoryObj<PageHeaderComponent>;

export const Playground: Story = { name: 'Playground' };
