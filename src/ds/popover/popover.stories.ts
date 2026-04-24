import type { Meta, StoryObj } from '@storybook/angular';
import { PopoverComponent, PopoverNotch, PopoverTheme } from './popover.component';

const ALL_NOTCH_POSITIONS: PopoverNotch[] = [
  'none',
  'bottom-left', 'bottom-center', 'bottom-right',
  'top-left',    'top-center',    'top-right',
  'left-top',    'left-center',   'left-bottom',
  'right-top',   'right-center',  'right-bottom',
];

const meta: Meta<PopoverComponent> = {
  title: 'Design System/Popover',
  component: PopoverComponent,
  tags: ['autodocs'],
  decorators: [
    // Add padding so notch arrows are visible
    (storyFn) => {
      const story = storyFn();
      return { ...story, props: { ...story.props } };
    },
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    theme: { control: 'radio', options: ['primary', 'secondary'] as PopoverTheme[] },
    notch: { control: 'select', options: ALL_NOTCH_POSITIONS },
    title:          { control: 'text' },
    body:           { control: 'text' },
    primaryLabel:   { control: 'text' },
    secondaryLabel: { control: 'text' },
    footerDisabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PopoverComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    title:         'Popover Title',
    body:          'Use this popover to provide additional context or actions for the selected item.',
    theme:         'primary',
    notch:         'bottom-right',
    primaryLabel:  'Confirm',
    secondaryLabel:'Cancel',
    footerDisabled: false,
    fields:        [],
    checkboxes:    [],
    radios:        [],
  },
};

// ─── Primary theme ────────────────────────────────────────────────────────────
export const PrimaryTheme: Story = {
  name: 'Primary Theme (Teal)',
  args: {
    title:  'Assign Provider',
    body:   'Select the provider to assign to this patient encounter.',
    theme:  'primary',
    notch:  'bottom-right',
    fields: [{ label: 'Provider', value: '', placeholder: 'Select…' }],
    primaryLabel:   'Assign',
    secondaryLabel: 'Cancel',
  },
};

// ─── Secondary theme ──────────────────────────────────────────────────────────
export const SecondaryTheme: Story = {
  name: 'Secondary Theme (Orange)',
  args: {
    title:  'Configuration',
    body:   'Adjust the admin settings for this module.',
    theme:  'secondary',
    notch:  'bottom-right',
    fields: [
      { label: 'Timeout (s)', value: '30', placeholder: '30' },
      { label: 'Max Retries', value: '3',  placeholder: '3'  },
    ],
    primaryLabel:   'Save',
    secondaryLabel: 'Discard',
  },
};

// ─── With checkboxes ─────────────────────────────────────────────────────────
export const WithCheckboxes: Story = {
  args: {
    title:  'Notification Preferences',
    body:   'Choose which notifications to enable.',
    theme:  'primary',
    notch:  'bottom-left',
    checkboxes: [
      { key: 'email', label: 'Email notifications', checked: true  },
      { key: 'sms',   label: 'SMS notifications',   checked: false },
      { key: 'push',  label: 'Push notifications',  checked: true  },
    ],
    primaryLabel:   'Save',
    secondaryLabel: 'Cancel',
  },
};

// ─── With radio buttons ───────────────────────────────────────────────────────
export const WithRadios: Story = {
  args: {
    title:  'Select Priority',
    theme:  'primary',
    notch:  'top-right',
    radios: [
      { key: 'low',    label: 'Low'    },
      { key: 'medium', label: 'Medium' },
      { key: 'high',   label: 'High'   },
    ],
    selectedRadio:  'medium',
    primaryLabel:   'Apply',
    secondaryLabel: 'Cancel',
  },
};

// ─── No notch ─────────────────────────────────────────────────────────────────
export const NoNotch: Story = {
  args: {
    title: 'Plain Card',
    body:  'This popover has no notch arrow.',
    theme: 'primary',
    notch: 'none',
    primaryLabel:   'OK',
    secondaryLabel: 'Close',
  },
};

// ─── All notch positions ──────────────────────────────────────────────────────
export const NotchBottomCenter: Story = { args: { title: 'Tooltip', notch: 'bottom-center', theme: 'primary', primaryLabel: 'OK', secondaryLabel: 'Close' } };
export const NotchTopLeft:      Story = { args: { title: 'Tooltip', notch: 'top-left',      theme: 'primary', primaryLabel: 'OK', secondaryLabel: 'Close' } };
export const NotchTopCenter:    Story = { args: { title: 'Tooltip', notch: 'top-center',    theme: 'primary', primaryLabel: 'OK', secondaryLabel: 'Close' } };
export const NotchRightCenter:  Story = { args: { title: 'Tooltip', notch: 'right-center',  theme: 'primary', primaryLabel: 'OK', secondaryLabel: 'Close' } };
export const NotchLeftCenter:   Story = { args: { title: 'Tooltip', notch: 'left-center',   theme: 'primary', primaryLabel: 'OK', secondaryLabel: 'Close' } };

// ─── Footer disabled ──────────────────────────────────────────────────────────
export const FooterDisabled: Story = {
  args: {
    title:          'Confirm Action',
    body:           'Buttons are disabled in this state.',
    theme:          'primary',
    notch:          'bottom-right',
    footerDisabled: true,
    primaryLabel:   'Submit',
    secondaryLabel: 'Cancel',
  },
};
