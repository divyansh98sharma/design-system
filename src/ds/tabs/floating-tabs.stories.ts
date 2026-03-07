import { Meta, StoryObj } from '@storybook/angular';
import { FloatingTabsComponent } from './floating-tabs.component';
import { TabTheme } from './tabs.types';

const SAMPLE_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'details',  label: 'Details'  },
  { key: 'notes',    label: 'Notes'    },
  { key: 'history',  label: 'History'  },
];

const THEMES: TabTheme[] = ['user', 'admin', 'green', 'sunoh'];

const meta: Meta<FloatingTabsComponent> = {
  title    : 'Design System/Tabs/Floating Tabs',
  component: FloatingTabsComponent,
  tags     : ['autodocs'],
  argTypes : {
    theme: {
      control : 'select',
      options : THEMES,
      description: 'Colour theme for the active underline.',
    },
    activeTab : { control: 'text' },
    tabChange : { action: 'tabChange' },
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<FloatingTabsComponent>;

export const Default: Story = {
  name: 'Floating — User Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'overview',
    theme    : 'user',
  },
};

export const AdminTheme: Story = {
  name: 'Floating — Admin Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'overview',
    theme    : 'admin',
  },
};

export const GreenTheme: Story = {
  name: 'Floating — Green Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'overview',
    theme    : 'green',
  },
};

export const SunohTheme: Story = {
  name: 'Floating — Sunoh Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'overview',
    theme    : 'sunoh',
  },
};

export const AllThemes: Story = {
  name  : 'Floating — All Themes',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <ds-floating-tabs [tabs]="[{key:'a',label:'Label'},{key:'b',label:'Label'}]" activeTab="a" theme="user"></ds-floating-tabs>
        <ds-floating-tabs [tabs]="[{key:'a',label:'Label'},{key:'b',label:'Label'}]" activeTab="a" theme="admin"></ds-floating-tabs>
        <ds-floating-tabs [tabs]="[{key:'a',label:'Label'},{key:'b',label:'Label'}]" activeTab="a" theme="green"></ds-floating-tabs>
        <ds-floating-tabs [tabs]="[{key:'a',label:'Label'},{key:'b',label:'Label'}]" activeTab="a" theme="sunoh"></ds-floating-tabs>
      </div>
    `,
  }),
};
