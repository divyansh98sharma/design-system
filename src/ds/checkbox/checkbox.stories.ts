import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Binary selection control. Supports **checked**, **unchecked**, and **indeterminate** states, ' +
          'with **default**, **hover**, and **disabled** visual variants. ' +
          'Implements `ControlValueAccessor` so it works with Angular reactive and template-driven forms.',
      },
    },
  },
  argTypes: {
    checked: {
      description: 'Whether the checkbox is checked.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    indeterminate: {
      description: 'Indeterminate state — shows a dash. Used when a group is partially selected. First click resolves to checked.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      description: 'Prevents interaction and applies muted styles.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      description: 'Label text displayed beside the checkbox. Pass an empty string to hide the label.',
      control: 'text',
      table: { defaultValue: { summary: 'Label' } },
    },
    checkedChange: {
      description: 'Emits the new `boolean` checked state on every toggle.',
      table: { category: 'Events' },
    },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

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
    docs: { description: { story: 'All states from the Figma spec sheet.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;border:1px solid #e1e1e1;border-radius:8px;width:fit-content">
        <ds-checkbox [checked]="false" label="Unchecked"></ds-checkbox>
        <ds-checkbox [checked]="true"  label="Checked"></ds-checkbox>
        <ds-checkbox [indeterminate]="true" label="Indeterminate"></ds-checkbox>
        <ds-checkbox [checked]="false" [disabled]="true" label="Disabled unchecked"></ds-checkbox>
        <ds-checkbox [checked]="true"  [disabled]="true" label="Disabled checked"></ds-checkbox>
        <ds-checkbox label="No label" [label]="''"></ds-checkbox>
      </div>
    `,
  }),
};

// ─── Unchecked ────────────────────────────────────────────────────────────────

export const Unchecked: Story = {
  name: 'Unchecked',
  parameters: { docs: { description: { story: 'Default unchecked state — white box with gray border.' } } },
  args: { checked: false, label: 'Label' },
};

// ─── Checked ──────────────────────────────────────────────────────────────────

export const Checked: Story = {
  name: 'Checked',
  parameters: { docs: { description: { story: 'Blue filled box with white checkmark.' } } },
  args: { checked: true, label: 'Label' },
};

// ─── Indeterminate ────────────────────────────────────────────────────────────

export const Indeterminate: Story = {
  name: 'Indeterminate',
  parameters: {
    docs: {
      description: {
        story: 'Shows a dash (—) when a group of checkboxes is partially selected. Clicking resolves it to checked.',
      },
    },
  },
  args: { indeterminate: true, label: 'Partially selected' },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  parameters: { docs: { description: { story: 'Both unchecked and checked disabled states.' } } },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-checkbox [checked]="false" [disabled]="true" label="Disabled unchecked"></ds-checkbox>
        <ds-checkbox [checked]="true"  [disabled]="true" label="Disabled checked"></ds-checkbox>
      </div>
    `,
  }),
};

// ─── No Label ─────────────────────────────────────────────────────────────────

export const NoLabel: Story = {
  name: 'Without Label',
  parameters: { docs: { description: { story: 'Pass `label=""` to render only the checkbox box.' } } },
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <ds-checkbox [checked]="false" label=""></ds-checkbox>
        <ds-checkbox [checked]="true"  label=""></ds-checkbox>
        <ds-checkbox [indeterminate]="true" label=""></ds-checkbox>
      </div>
    `,
  }),
};
