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
          'On / Off toggle switch — 50 × 24 px pill.\n\n' +
          '**Three states:**\n' +
          '- `Off` — white track, gray `#bcbcbc` border, gray thumb on the left.\n' +
          '- `On` — teal `#007b95` track and border, white thumb on the right.\n' +
          '- `Disabled` — gray `#e1e1e1` track, gray thumb, non-interactive.',
      },
    },
  },
  argTypes: {
    on: {
      description: 'Whether the toggle is in the ON state.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      description: 'Prevents interaction.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    ariaLabel: {
      description: 'Accessible label announced by screen readers.',
      control: 'text',
      table: { defaultValue: { summary: 'Toggle' } },
    },
    onToggle: {
      description: 'Emits the new `boolean` state on every toggle.',
      table: { category: 'Events' },
    },
  },
  args: {
    on: false,
    disabled: false,
    ariaLabel: 'Toggle',
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
  name: 'States',
  parameters: {
    docs: { description: { story: 'All three states side by side.' } },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:80px auto;gap:12px 24px;align-items:center;padding:16px;border:1px solid #e1e1e1;border-radius:8px;font-family:'Inter',system-ui,sans-serif;font-size:12px">
        <span style="color:#969696;text-transform:uppercase;letter-spacing:.5px">Off</span>
        <ds-toggle [on]="false"></ds-toggle>

        <span style="color:#969696;text-transform:uppercase;letter-spacing:.5px">On</span>
        <ds-toggle [on]="true"></ds-toggle>

        <span style="color:#969696;text-transform:uppercase;letter-spacing:.5px">Disabled</span>
        <ds-toggle [on]="false" [disabled]="true"></ds-toggle>
      </div>
    `,
  }),
};

// ─── Off ──────────────────────────────────────────────────────────────────────

export const Off: Story = {
  name: 'Off state',
  parameters: { docs: { description: { story: 'White track · gray border · gray thumb on the left.' } } },
  args: { on: false },
};

// ─── On ───────────────────────────────────────────────────────────────────────

export const On: Story = {
  name: 'On state',
  parameters: { docs: { description: { story: 'Teal `#007b95` track · white thumb on the right.' } } },
  args: { on: true },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  parameters: { docs: { description: { story: 'Gray `#e1e1e1` track · gray thumb. Non-interactive.' } } },
  args: { on: false, disabled: true },
};
