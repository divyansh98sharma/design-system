import type { Meta, StoryObj } from '@storybook/angular';
import { TopNavComponent } from './top-nav.component';

const DEFAULT_LINKS = [
  { letter: 'P',  count: 12,  style: 'red'    as const },
  { letter: 'N',  count: '00', style: 'yellow' as const },
  { letter: 'E',  count: '00', style: 'yellow' as const, selected: true },
  { letter: 'S',  count: 2,   style: 'gray'   as const },
  { letter: 'D',  count: 36,  style: 'red'    as const },
  { letter: 'R',  count: '00', style: 'yellow' as const },
  { letter: 'T',  count: 5,   style: 'red'    as const },
  { letter: 'L',  count: 25,  style: 'red'    as const },
  { letter: 'M',  count: '00', style: 'yellow' as const },
  { letter: 'TV', count: '00', style: 'yellow' as const },
];

const meta: Meta<TopNavComponent> = {
  title: 'Components/TopNav',
  component: TopNavComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Application top navigation bar — dark teal (`#02506f`) spanning full width.\n\n' +
          '**Left section:** main menu toggle (chevron + hamburger + chevron) · logo · patient lookup · radio indicators.\n\n' +
          '**Right section:** up to ~10 attribute links — each shows a letter code and a **jellybean** count badge.\n\n' +
          '**Jellybean colour styles:**\n' +
          '- `red` (`#ff9387 → #ff7260`) — urgent / action needed.\n' +
          '- `yellow` (`#ffea61 → #d6b522`) — pending / attention.\n' +
          '- `gray` (`#f2f2f2 → #cccccc`) — normal / no action.\n\n' +
          'A `selected` flag on a link renders a **white** border around the jellybean instead of the default blue.',
      },
    },
  },
  argTypes: {
    showLinks: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showProvider: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showRefreshButton: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    menuToggle: { table: { category: 'Events' } },
    patientLookup: { table: { category: 'Events' } },
    linkClick: { table: { category: 'Events' } },
    refreshClick: { table: { category: 'Events' } },
  },
  args: {
    showLinks: true,
    showProvider: false,
    showRefreshButton: false,
    links: DEFAULT_LINKS,
  },
};

export default meta;
type Story = StoryObj<TopNavComponent>;

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Full top nav — configure via Controls panel.' } },
  },
};

export const WithLinks: Story = {
  name: 'With Attribute Links',
  parameters: {
    docs: {
      description: {
        story: 'Default 10 attribute links (P through TV) with their jellybean count badges.',
      },
    },
  },
  args: {
    showLinks: true,
    links: DEFAULT_LINKS,
  },
};

export const NoLinks: Story = {
  name: 'No Links',
  parameters: {
    docs: { description: { story: 'Left side only — no right-side attribute links.' } },
  },
  args: { showLinks: false },
};

export const AllRedLinks: Story = {
  name: 'All Urgent (red)',
  parameters: {
    docs: { description: { story: 'All links showing red (urgent) jellybean badges.' } },
  },
  args: {
    links: DEFAULT_LINKS.map(l => ({ ...l, style: 'red' as const })),
  },
};

export const WithRefresh: Story = {
  name: 'With Refresh Button',
  args: { showRefreshButton: true },
};
