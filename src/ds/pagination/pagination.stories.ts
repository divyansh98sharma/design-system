import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
  title: 'Components/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compact pagination row with a page-size selector, "of N" totals, navigation buttons (first/prev/next/last), and an editable current-page input.',
      },
    },
  },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    pageSize: { control: { type: 'number', min: 1 } },
    totalItems: { control: { type: 'number', min: 0 } },
    pageSizeOptions: { control: 'object' },
    itemLabel: { control: 'text' },
    showPageSize: { control: 'boolean' },
    pageChange: { table: { category: 'Events' } },
    pageSizeChange: { table: { category: 'Events' } },
  },
  args: {
    page: 1,
    pageSize: 15,
    totalItems: 90,
    pageSizeOptions: [10, 15, 25, 50, 100],
    itemLabel: 'cards',
    showPageSize: true,
  },
};

export default meta;
type Story = StoryObj<PaginationComponent>;

export const Playground: Story = {};

export const Default: Story = {
  args: { page: 1, pageSize: 15, totalItems: 90 },
};

export const MidRange: Story = {
  args: { page: 3, pageSize: 15, totalItems: 90 },
};

export const LastPage: Story = {
  args: { page: 6, pageSize: 15, totalItems: 90 },
};

export const SinglePage: Story = {
  args: { page: 1, pageSize: 50, totalItems: 12 },
};

export const NoPageSize: Story = {
  args: { showPageSize: false, page: 2, pageSize: 15, totalItems: 90 },
};

export const Rows: Story = {
  args: { itemLabel: 'rows', page: 1, pageSize: 25, totalItems: 412 },
};
