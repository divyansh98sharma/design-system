import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import {
  AiInsightsPanelComponent,
  AiInsightSection,
  FooterAction,
} from './ai-insights-panel.component';

const HELP_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M6 6a2 2 0 1 1 3 1.7L8 9v.5"/><circle cx="8" cy="11.5" r="0.5" fill="currentColor"/></svg>`;
const EXPAND_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6V3h3M13 6V3h-3M3 10v3h3M13 10v3h-3"/></svg>`;
const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l10 10M13 3L3 13"/></svg>`;
const SPARKLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M8 10v4M2 8h4M10 8h4"/></svg>`;
const STAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2l2 4 4 .5-3 3 1 4-4-2-4 2 1-4-3-3 4-.5z"/></svg>`;
const COPY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M3 11V3a1 1 0 0 1 1-1h7"/></svg>`;
const REFRESH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8a5.5 5.5 0 0 1 9.5-3.8M13.5 8a5.5 5.5 0 0 1-9.5 3.8M11 4h2V2M5 12H3v2"/></svg>`;
const SEND = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l12-6-4 14-2-6-6-2z"/></svg>`;
const SAVE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 14V2h9l3 3v9zM5 2v5h6V2M5 14v-5h6v5"/></svg>`;
const SEARCH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.5"/><path d="m13 13-2.5-2.5"/></svg>`;
const FILTER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h12l-4.5 6v4l-3 1V9z"/></svg>`;
const PIN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1.5v4l-3 3h6l-3-3M8 8.5V14"/></svg>`;
const MORE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><circle cx="3.5" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="12.5" cy="8" r="1.2"/></svg>`;

const SECTIONS: AiInsightSection[] = [
  {
    id: 'summary',
    title: 'Summary',
    expanded: false,
    actions: [
      { id: 'star', icon: STAR, ariaLabel: 'Pin' },
      { id: 'copy', text: 'Button', icon: COPY },
    ],
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    expanded: true,
    actions: [
      { id: 'refresh', icon: REFRESH, ariaLabel: 'Refresh' },
      { id: 'export', text: 'Button' },
    ],
    tiles: [
      {
        id: 'tile-1',
        title: 'Tile Title',
        body: '<p style="margin:0;color:#4b586b">Sample tile body content explaining the recommendation.</p>',
        actions: [
          { id: 'copy', icon: COPY, ariaLabel: 'Copy' },
          { id: 'apply', text: 'Apply', icon: SEND },
        ],
      },
      {
        id: 'tile-2',
        title: 'Tile Title',
        body: '<div style="height:120px;background:#f7f7f7;border:1px dashed #e1e1e1;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#4b586b">Place your image here</div>',
        bottomActions: [
          { id: 'cancel', text: 'Cancel' },
          { id: 'submit', text: 'Submit', icon: SEND },
        ],
      },
    ],
  },
  {
    id: 'history',
    title: 'History',
    expanded: false,
    actions: [{ id: 'view-all', text: 'View all' }],
  },
];

const HEADER_ACTIONS: FooterAction[] = [
  { id: 'help', icon: HELP_ICON, ariaLabel: 'Help' },
  { id: 'expand', icon: EXPAND_ICON, ariaLabel: 'Expand' },
  { id: 'close', icon: CLOSE_ICON, ariaLabel: 'Close' },
];

const FOOTER_ACTIONS: FooterAction[] = [
  { id: 'sparkle', icon: SPARKLE, ariaLabel: 'AI suggest' },
  { id: 'save', icon: SAVE, ariaLabel: 'Save' },
  { id: 'copy', icon: COPY, ariaLabel: 'Copy' },
  { id: 'search', icon: SEARCH, ariaLabel: 'Search' },
  { id: 'filter', icon: FILTER, ariaLabel: 'Filter' },
  { id: 'more', icon: MORE, ariaLabel: 'More' },
];

const meta: Meta<AiInsightsPanelComponent> = {
  title: 'Components/AI Insights Panel',
  component: AiInsightsPanelComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '433×741 panel with gradient title, scrolling collapsible sections, tiles, and an icon-button footer.\n\n' +
          'Sections drive content: each has a header (clickable to toggle) plus optional tile array. ' +
          'Header and footer accept action arrays that emit through `actionClick` with scoped payloads.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    titleSuffix: { control: 'text' },
    sections: { control: 'object' },
    headerActions: { control: 'object' },
    footerActions: { control: 'object' },
    sectionToggle: { table: { category: 'Events' } },
    actionClick: { table: { category: 'Events' } },
  },
  args: {
    title: '{Title}',
    titleSuffix: ' Insights',
    sections: SECTIONS,
    headerActions: HEADER_ACTIONS,
    footerActions: FOOTER_ACTIONS,
    sectionToggle: fn(),
    actionClick: fn(),
  },
};

export default meta;
type Story = StoryObj<AiInsightsPanelComponent>;

export const Playground: Story = { name: 'Playground' };
export const Default: Story = { name: 'Default state' };
export const NoFooter: Story = {
  name: 'Without footer',
  args: { footerActions: [] },
};
export const NoTiles: Story = {
  name: 'Sections without tiles',
  args: {
    sections: [
      { id: 's1', title: 'Section A', expanded: false },
      { id: 's2', title: 'Section B', expanded: true },
      { id: 's3', title: 'Section C', expanded: false },
    ],
  },
};
