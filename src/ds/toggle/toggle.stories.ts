import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';
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
          'On/Off toggle switch matching the CODE-A-TON Library Figma spec.\n\n' +
          '- **Off**: white pill, gray border, gray handle (left).\n' +
          '- **On**: teal (#007b95) pill, white handle (right).\n' +
          '- **Disabled**: gray pill, gray handle, no interaction.\n\n' +
          'Implements `ControlValueAccessor` for use in reactive and template-driven Angular forms.',
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
      description: 'Accessible label announced to screen readers.',
      control: 'text',
      table: { defaultValue: { summary: 'Toggle' } },
    },
    change: {
      description: 'Emits the new boolean state on every toggle.',
      table: { category: 'Events' },
    },
  },
  args: {
    on: false,
    disabled: false,
    ariaLabel: 'Toggle',
    change: fn(),
  },
};

export default meta;
type Story = StoryObj<ToggleComponent>;

export const Playground: Story = { name: 'Playground' };

export const States: Story = {
  name: 'States',
  parameters: {
    docs: { description: { story: 'All three Figma states side-by-side.' } },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:auto 1fr;gap:12px 24px;align-items:center;font-size:12px">
        <span>Off</span>      <ds-toggle [on]="false"></ds-toggle>
        <span>On</span>       <ds-toggle [on]="true"></ds-toggle>
        <span>Disabled</span> <ds-toggle [disabled]="true"></ds-toggle>
      </div>
    `,
  }),
};

export const Off: Story = {
  name: 'Off',
  args: { on: false },
};

export const On: Story = {
  name: 'On',
  args: { on: true },
};

export const Disabled: Story = {
  name: 'Disabled',
  parameters: { docs: { description: { story: 'Disabled state ignores both `on=true` and `on=false`.' } } },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-toggle [on]="false" [disabled]="true"></ds-toggle>
        <ds-toggle [on]="true"  [disabled]="true"></ds-toggle>
      </div>
    `,
  }),
};

export const ClickToggles: Story = {
  name: 'Interaction: Click toggles state',
  args: { on: false, ariaLabel: 'Click toggle' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name: /click toggle/i });
    await userEvent.click(toggle);
    await expect(args.change).toHaveBeenCalledWith(true);
  },
};

export const SpaceTogglesViaKeyboard: Story = {
  name: 'Interaction: Space key toggles',
  args: { on: false, ariaLabel: 'Space toggle' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name: /space toggle/i });
    toggle.focus();
    await expect(toggle).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(args.change).toHaveBeenCalledWith(true);
  },
};

export const EnterTogglesViaKeyboard: Story = {
  name: 'Interaction: Enter key toggles',
  args: { on: false, ariaLabel: 'Enter toggle' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name: /enter toggle/i });
    toggle.focus();
    await expect(toggle).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.change).toHaveBeenCalledWith(true);
  },
};

export const TabOrderSkipsDisabled: Story = {
  name: 'Interaction: Tab skips disabled toggle',
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <button id="before" type="button">Before</button>
        <ds-toggle ariaLabel="Skipped" [disabled]="true"></ds-toggle>
        <button id="after" type="button">After</button>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const before = canvas.getByRole('button', { name: /before/i });
    const after = canvas.getByRole('button', { name: /after/i });
    before.focus();
    await userEvent.tab();
    await expect(after).toHaveFocus();
  },
};

export const DisabledNotClickable: Story = {
  name: 'Interaction: Disabled does not emit',
  args: { on: false, disabled: true, ariaLabel: 'Disabled toggle' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name: /disabled toggle/i });
    await userEvent.click(toggle);
    await expect(args.change).not.toHaveBeenCalled();
  },
};
