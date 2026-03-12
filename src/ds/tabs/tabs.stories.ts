import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { StandardTabsComponent } from './standard-tabs.component';
import { FloatingTabsComponent }  from './floating-tabs.component';
import { HeaderTabsComponent }    from './header-tabs.component';
import { WizardTabsComponent }    from './wizard-tabs.component';
import { TabTheme, WizardTabTheme } from './tabs.types';

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

const SAMPLE_WIZARD_STEPS = [
  { key: 'step1', label: 'Patient Info',    required: true  },
  { key: 'step2', label: 'Insurance',       required: false },
  { key: 'step3', label: 'Clinical Notes',  required: true  },
  { key: 'step4', label: 'Billing',         required: false },
  { key: 'step5', label: 'Review',          required: false },
];

const THEMES: TabTheme[]       = ['user', 'admin', 'green', 'sunoh'];
const WIZARD_THEMES: WizardTabTheme[] = ['user', 'admin'];

// ─────────────────────────────────────────────────────────────────────────────
//  1. Standard Tabs
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
  name: 'Standard — User Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'medical',
    theme    : 'user',
  },
};

export const StandardAdmin: StandardStory = {
  name: 'Standard — Admin Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'medical',
    theme    : 'admin',
  },
};

export const StandardGreen: StandardStory = {
  name: 'Standard — Green Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'medical',
    theme    : 'green',
  },
};

export const StandardSunoh: StandardStory = {
  name: 'Standard — Sunoh Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'medical',
    theme    : 'sunoh',
  },
};

export const StandardWithCounts: StandardStory = {
  name: 'Standard — With Counts',
  args: {
    tabs     : SAMPLE_TABS_WITH_COUNTS,
    activeTab: 'tab1',
    theme    : 'user',
  },
};

export const StandardAllThemes: StandardStory = {
  name  : 'Standard — All Themes',
  render: () => ({
    props   : {},
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <ds-standard-tabs [tabs]="[{key:'a',label:'Tab A'},{key:'b',label:'Tab B'},{key:'c',label:'Tab C'}]" activeTab="a" theme="user"></ds-standard-tabs>
        <ds-standard-tabs [tabs]="[{key:'a',label:'Tab A'},{key:'b',label:'Tab B'},{key:'c',label:'Tab C'}]" activeTab="a" theme="admin"></ds-standard-tabs>
        <ds-standard-tabs [tabs]="[{key:'a',label:'Tab A'},{key:'b',label:'Tab B'},{key:'c',label:'Tab C'}]" activeTab="a" theme="green"></ds-standard-tabs>
        <ds-standard-tabs [tabs]="[{key:'a',label:'Tab A'},{key:'b',label:'Tab B'},{key:'c',label:'Tab C'}]" activeTab="a" theme="sunoh"></ds-standard-tabs>
      </div>
    `,
  }),
};
