import type { Meta, StoryObj } from '@storybook/angular';

import { StandardTabsComponent } from './standard-tabs.component';
import { TabTheme } from './tabs.types';

// ─── Sample data ─────────────────────────────────────────────────────────────
const SAMPLE_TABS = [
  { key: 'medical',   label: 'Medical Summary' },
  { key: 'cdss',      label: 'CDSS' },
  { key: 'rx',        label: 'Rx' },
  { key: 'labs',      label: 'Labs' },
  { key: 'vitals',    label: 'Vitals' },
];

const SAMPLE_TABS_WITH_COUNTS = [
  { key: 'tab1', label: 'Overview', count: 12 },
  { key: 'tab2', label: 'Details' },
  { key: 'tab3', label: 'Notes' },
  { key: 'tab4', label: 'History' },
];

const THEMES: TabTheme[] = ['primary', 'secondary'];

// ─────────────────────────────────────────────────────────────────────────────
//  Standard Tabs
// ─────────────────────────────────────────────────────────────────────────────
const standardMeta: Meta<StandardTabsComponent> = {
  title    : 'Design System/Tabs/Standard Tabs',
  component: StandardTabsComponent,
  tags     : ['autodocs'],
  argTypes : {
    theme: {
      control : 'select',
      options : THEMES,
      description: 'Colour theme for the active border and bottom rule.',
    },
    activeTab : { control: 'text' },
    tabChange : { action: 'tabChange' },
  },
  parameters: { layout: 'padded' },
};

export default standardMeta;
type StandardStory = StoryObj<StandardTabsComponent>;

export const StandardDefault: StandardStory = {
  name: 'Standard — Primary Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'medical',
    theme    : 'primary',
  },
};

export const StandardSecondary: StandardStory = {
  name: 'Standard — Secondary Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'medical',
    theme    : 'secondary',
  },
};

export const StandardWithCounts: StandardStory = {
  name: 'Standard — With Counts',
  args: {
    tabs     : SAMPLE_TABS_WITH_COUNTS,
    activeTab: 'tab1',
    theme    : 'primary',
  },
};

export const StandardAllThemes: StandardStory = {
  name  : 'Standard — All Themes',
  render: () => ({
    props   : {},
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <ds-standard-tabs [tabs]="[{key:'a',label:'Tab A'},{key:'b',label:'Tab B'},{key:'c',label:'Tab C'}]" activeTab="a" theme="primary"></ds-standard-tabs>
        <ds-standard-tabs [tabs]="[{key:'a',label:'Tab A'},{key:'b',label:'Tab B'},{key:'c',label:'Tab C'}]" activeTab="a" theme="secondary"></ds-standard-tabs>
      </div>
    `,
  }),
};
