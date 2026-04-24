import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';

const meta: Meta<ToggleComponent> = {
  title: 'Components/Toggle',
  component: ToggleComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'On/Off toggle switch with two **colour themes**: `primary` (teal) and `secondary` (orange).\n\n' +
          '- **On**: pill fills with the theme colour; thumb is white with a coloured checkmark.\n' +
          '- **Off**: pill is white with a gray border; thumb is gray with an × icon.\n\n' +
          'Implements `ControlValueAccessor` for use with Angular reactive and template-driven forms.',
      },
    },
  },
  argTypes: {
    on: {
      description: 'Whether the toggle is in the ON state.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    theme: {
      description: 'Colour theme applied to the ON state.',
      control: 'select',
      options: ['primary', 'secondary'],
      table: { defaultValue: { summary: 'primary' } },
    },
    disabled: {
      description: 'Prevents interaction.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    onToggle: {
      description: 'Emits the new `boolean` state on every toggle.',
      table: { category: 'Events' },
    },
  },
  args: {
    on: false,
    theme: 'primary',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ToggleComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Configure all props interactively via the Controls panel.' } },
  },
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'Both themes in ON and OFF states.' } },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:80px 1fr 1fr;gap:12px 24px;align-items:center;padding:16px;border:1px solid #e1e1e1;border-radius:8px;font-size:12px">
        <span style="font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px">Theme</span>
        <span style="font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px">Off</span>
        <span style="font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px">On</span>

        <span>Primary</span>
        <ds-toggle theme="primary"   [on]="false"></ds-toggle>
        <ds-toggle theme="primary"   [on]="true"></ds-toggle>

        <span>Secondary</span>
        <ds-toggle theme="secondary" [on]="false"></ds-toggle>
        <ds-toggle theme="secondary" [on]="true"></ds-toggle>
      </div>
    `,
  }),
};

// ─── Off ──────────────────────────────────────────────────────────────────────

export const Off: Story = {
  name: 'Off state',
  parameters: { docs: { description: { story: 'White pill · gray border · gray × icon on thumb.' } } },
  args: { on: false, theme: 'primary' },
};

// ─── On ───────────────────────────────────────────────────────────────────────

export const On: Story = {
  name: 'On state',
  parameters: { docs: { description: { story: 'Filled pill · white thumb with coloured checkmark.' } } },
  args: { on: true, theme: 'primary' },
};

// ─── Themes ───────────────────────────────────────────────────────────────────

export const Themes: Story = {
  name: 'Themes (ON)',
  parameters: {
    docs: { description: { story: 'Both colour themes in the ON state.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-toggle theme="primary"   [on]="true"></ds-toggle>
        <ds-toggle theme="secondary" [on]="true"></ds-toggle>
      </div>
    `,
  }),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  parameters: { docs: { description: { story: 'Toggle is non-interactive. Appearance is faded (45% opacity).' } } },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-toggle theme="primary" [on]="false" [disabled]="true"></ds-toggle>
        <ds-toggle theme="primary" [on]="true"  [disabled]="true"></ds-toggle>
      </div>
    `,
  }),
};
