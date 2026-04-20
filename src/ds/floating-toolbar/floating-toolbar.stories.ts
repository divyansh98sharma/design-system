import type { Meta, StoryObj } from '@storybook/angular';
import { FloatingToolbarComponent, FloatingToolbarItem } from './floating-toolbar.component';

const ICON_EDIT = `
<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
</svg>`;

const ICON_PRINT = `
<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-1-9H6v4h12V3z"/>
</svg>`;

const ICON_SHARE = `
<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
</svg>`;

const ICON_DOWNLOAD = `
<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
</svg>`;

const ICON_FLAG = `
<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
</svg>`;

const SAMPLE_ITEMS: FloatingToolbarItem[] = [
  { id: 'edit',     label: 'Edit',     icon: ICON_EDIT },
  { id: 'print',    label: 'Print',    icon: ICON_PRINT },
  { id: 'share',    label: 'Share',    icon: ICON_SHARE },
  { id: 'download', label: 'Download', icon: ICON_DOWNLOAD },
  { id: 'flag',     label: 'Flag',     icon: ICON_FLAG },
];

const meta: Meta<FloatingToolbarComponent> = {
  title: 'Components/FloatingToolbar',
  component: FloatingToolbarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Narrow vertical strip that docks against the right edge of a modal or panel. ' +
          '52 px wide · light teal background · rounded left corners. ' +
          'The active item is highlighted with the primary teal `#007b95`. ' +
          'An optional **More** link at the bottom emits `moreClick` for overflow actions.',
      },
    },
  },
  argTypes: {
    items: { control: 'object' },
    activeId: { control: 'text' },
    showMore: { control: 'boolean' },
    moreLabel: { control: 'text' },
    itemClick: { table: { category: 'Events' } },
    moreClick: { table: { category: 'Events' } },
  },
  args: {
    items: SAMPLE_ITEMS,
    activeId: 'print',
    showMore: true,
    moreLabel: 'More',
  },
};

export default meta;
type Story = StoryObj<FloatingToolbarComponent>;

export const Playground: Story = { name: 'Playground' };

export const NoActive: Story = {
  name: 'No active item',
  args: { activeId: null },
};

export const NoMore: Story = {
  name: 'Without More link',
  args: { activeId: 'edit', showMore: false },
};
