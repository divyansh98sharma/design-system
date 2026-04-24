import type { Meta, StoryObj } from '@storybook/angular';
import { FloatingTabsComponent } from './floating-tabs.component';
import { TabTheme } from './tabs.types';

const SAMPLE_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'details',  label: 'Details'  },
  { key: 'notes',    label: 'Notes'    },
  { key: 'history',  label: 'History'  },
];

const THEMES: TabTheme[] = ['primary', 'secondary'];

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
  name: 'Floating — Primary Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'overview',
    theme    : 'primary',
  },
};

export const SecondaryTheme: Story = {
  name: 'Floating — Secondary Theme',
  args: {
    tabs     : SAMPLE_TABS,
    activeTab: 'overview',
    theme    : 'secondary',
  },
};

export const AllThemes: Story = {
  name  : 'Floating — All Themes',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <ds-floating-tabs [tabs]="[{key:'a',label:'Label'},{key:'b',label:'Label'}]" activeTab="a" theme="primary"></ds-floating-tabs>
        <ds-floating-tabs [tabs]="[{key:'a',label:'Label'},{key:'b',label:'Label'}]" activeTab="a" theme="secondary"></ds-floating-tabs>
      </div>
    `,
  }),
};
