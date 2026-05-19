import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LeftPanelQueueComponent } from './left-panel-queue.component';

const meta: Meta<LeftPanelQueueComponent> = {
  title: 'Design System/Left Panel Queue',
  component: LeftPanelQueueComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [LeftPanelQueueComponent],
    }),
  ],
  argTypes: {
    title: { control: 'text' },
    showQuickSelect: { control: 'boolean' },
    showButtonBar: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    showPagination: { control: 'boolean' },
    showScrollbar: { control: 'boolean' },
    selectAll: { control: 'boolean' },
    searchValue: { control: 'text' },
    searchPlaceholder: { control: 'text' },
    pageSize: { control: 'number' },
    totalItems: { control: 'number' },
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<LeftPanelQueueComponent>;

const chips = [
  { id: 'c1', label: 'Chip Label', counter: 999 },
  { id: 'c2', label: 'Chip Label', counter: 999 },
  { id: 'c3', label: 'Chip Label', counter: 999 },
  { id: 'c4', label: 'Chip Label', counter: 999 },
];

export const Playground: Story = {
  args: {
    title: 'Left Panel Queue',
    showQuickSelect: true,
    showButtonBar: true,
    showSearch: true,
    showPagination: true,
    showScrollbar: true,
    chips,
    selectAll: false,
    searchLabel: 'Label',
    searchPlaceholder: 'Search',
    searchValue: '',
    pageSize: 15,
    totalItems: 90,
    currentPage: 1,
    totalPages: 6,
  },
};

export const NoQuickSelect: Story = {
  name: 'Without Quick Select',
  args: {
    ...Playground.args,
    showQuickSelect: false,
  },
};

export const NoSearch: Story = {
  name: 'Without Search',
  args: {
    ...Playground.args,
    showSearch: false,
  },
};

export const NoPagination: Story = {
  name: 'Without Pagination',
  args: {
    ...Playground.args,
    showPagination: false,
  },
};

export const WithQueueContent: Story = {
  name: 'With Queue Content',
  args: { ...Playground.args },
  render: (args) => ({
    props: args,
    template: `
      <ds-left-panel-queue
        [title]="title"
        [showQuickSelect]="showQuickSelect"
        [showButtonBar]="showButtonBar"
        [showSearch]="showSearch"
        [showPagination]="showPagination"
        [showScrollbar]="showScrollbar"
        [chips]="chips"
        [selectAll]="selectAll"
        [searchLabel]="searchLabel"
        [searchPlaceholder]="searchPlaceholder"
        [searchValue]="searchValue"
        [pageSize]="pageSize"
        [totalItems]="totalItems"
        [currentPage]="currentPage"
        [totalPages]="totalPages"
      >
        <div style="padding:16px;display:flex;flex-direction:column;gap:8px">
          <div style="padding:12px;background:#fff;border:1px solid #ebebeb;border-radius:4px">Card 1</div>
          <div style="padding:12px;background:#fff;border:1px solid #ebebeb;border-radius:4px">Card 2</div>
          <div style="padding:12px;background:#fff;border:1px solid #ebebeb;border-radius:4px">Card 3</div>
        </div>
      </ds-left-panel-queue>
    `,
  }),
};
