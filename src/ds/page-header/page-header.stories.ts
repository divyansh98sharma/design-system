import type { Meta, StoryObj } from '@storybook/angular';
import { PageHeaderComponent } from './page-header.component';

const meta: Meta<PageHeaderComponent> = {
  title: 'Components/Page Header',
  component: PageHeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Compact 40 px page header bar with an optional filter button (with alert dot), a title with dropdown affordance, a primary "Create New" action, and an optional tab strip aligned to the right.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    showTitleDropdown: { control: 'boolean' },
    showFilter: { control: 'boolean' },
    filterAlert: { control: 'boolean' },
    showCreateNew: { control: 'boolean' },
    createNewLabel: { control: 'text' },
    activeTab: { control: 'text' },
    titleClick: { table: { category: 'Events' } },
    filterClick: { table: { category: 'Events' } },
    createNew: { table: { category: 'Events' } },
    tabChange: { table: { category: 'Events' } },
  },
  args: {
    title: 'Page Title',
    showTitleDropdown: true,
    showFilter: true,
    filterAlert: true,
    showCreateNew: true,
    createNewLabel: 'Create New',
    tabs: [],
    activeTab: '',
  },
};

export default meta;
type Story = StoryObj<PageHeaderComponent>;

export const Playground: Story = {
  parameters: {
    docs: { description: { story: 'Configure all props interactively via the Controls panel.' } },
  },
};

export const Default: Story = {
  name: 'Default',
  args: {
    title: 'Page Title',
    filterAlert: true,
  },
};

export const WithoutFilter: Story = {
  args: { showFilter: false },
};

export const WithoutAction: Story = {
  args: { showCreateNew: false },
};

export const TitleOnly: Story = {
  args: {
    showFilter: false,
    showCreateNew: false,
    showTitleDropdown: false,
  },
};

export const WithTabs: Story = {
  args: {
    title: 'Patients',
    tabs: [
      { key: 'all', label: 'All' },
      { key: 'active', label: 'Active' },
      { key: 'archived', label: 'Archived' },
    ],
    activeTab: 'all',
  },
};

export const NoFilterAlert: Story = {
  args: { filterAlert: false },
};
