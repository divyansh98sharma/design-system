import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
  title: 'Components/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    pageSize: { control: 'number' },
    pageSizeOptions: { control: 'object' },
    page: { control: 'number' },
    totalItems: { control: 'number' },
    itemLabel: { control: 'text' },
    pageChange: { table: { category: 'Events' } },
    pageSizeChange: { table: { category: 'Events' } },
  },
  args: { pageSize: 15, page: 1, totalItems: 90, itemLabel: 'cards', pageChange: fn(), pageSizeChange: fn() },
};

export default meta;
type Story = StoryObj<PaginationComponent>;

export const Playground: Story = { name: 'Playground' };
