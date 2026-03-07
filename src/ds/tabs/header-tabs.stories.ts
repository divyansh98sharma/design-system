import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderTabsComponent } from './header-tabs.component';
import { TabTheme } from './tabs.types';

const SAMPLE_TABS = [
  { key: 'tab1', label: 'Label', count: 99 },
  { key: 'tab2', label: 'Label' },
  { key: 'tab3', label: 'Label' },
  { key: 'tab4', label: 'Label' },
];

const THEMES: TabTheme[] = ['user', 'admin', 'green', 'sunoh'];

const meta: Meta<HeaderTabsComponent> = {
  title    : 'Components/Tabs/Header Tabs',
  component: HeaderTabsComponent,
  tags     : ['autodocs'],
  argTypes : {
    theme: {
      control : 'select',
      options : THEMES,
      description: 'Colour theme for the header bar.',
    },
    heading   : { control: 'text' },
    showIcon  : { control: 'boolean' },
    activeTab : { control: 'text' },
    tabChange : { action: 'tabChange' },
  },
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<HeaderTabsComponent>;

export const Default: Story = {
  name: 'Header — User Theme (2 tabs)',
  args: {
    heading  : 'Header Title',
    tabs     : [{ key: 'tab1', label: 'Label' }, { key: 'tab2', label: 'Label' }],
    activeTab: 'tab1',
    theme    : 'user',
    showIcon : false,
  },
};

export const UserWith4Tabs: Story = {
  name: 'Header — User Theme (4 tabs, with count)',
  args: {
    heading  : 'Patient Overview',
    tabs     : SAMPLE_TABS,
    activeTab: 'tab1',
    theme    : 'user',
    showIcon : true,
  },
};

export const AdminTheme: Story = {
  name: 'Header — Admin Theme',
  args: {
    heading  : 'Admin Panel',
    tabs     : SAMPLE_TABS,
    activeTab: 'tab1',
    theme    : 'admin',
  },
};

export const GreenTheme: Story = {
  name: 'Header — Green Theme',
  args: {
    heading  : 'Clinical',
    tabs     : SAMPLE_TABS,
    activeTab: 'tab1',
    theme    : 'green',
  },
};

export const SunohTheme: Story = {
  name: 'Header — Sunoh Theme',
  args: {
    heading  : 'Sunoh Portal',
    tabs     : SAMPLE_TABS,
    activeTab: 'tab1',
    theme    : 'sunoh',
  },
};

export const AllThemes: Story = {
  name  : 'Header — All Themes',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:4px;">
        <ds-header-tabs heading="Header Title" [tabs]="tabs" activeTab="tab1" theme="user"></ds-header-tabs>
        <ds-header-tabs heading="Header Title" [tabs]="tabs" activeTab="tab1" theme="admin"></ds-header-tabs>
        <ds-header-tabs heading="Header Title" [tabs]="tabs" activeTab="tab1" theme="green"></ds-header-tabs>
        <ds-header-tabs heading="Header Title" [tabs]="tabs" activeTab="tab1" theme="sunoh"></ds-header-tabs>
      </div>
    `,
    props: {
      tabs: [
        { key: 'tab1', label: 'Label', count: 99 },
        { key: 'tab2', label: 'Label' },
        { key: 'tab3', label: 'Label' },
      ],
    },
  }),
};
