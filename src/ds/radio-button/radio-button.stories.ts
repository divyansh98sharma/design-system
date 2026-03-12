import type { Meta, StoryObj } from '@storybook/angular';
import { RadioButtonComponent } from './radio-button.component';

const meta: Meta<RadioButtonComponent> = {
  title: 'Components/Radio Button',
  component: RadioButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Single-selection control. In a radio group only one option can be selected at a time. ' +
          'Supports **default**, **hover**, and **disabled** states. ' +
          'Implements `ControlValueAccessor` for Angular forms. ' +
          'For groups, manage the selected `value` in the parent and pass `[checked]="value === item.value"` to each button.',
      },
    },
  },
  argTypes: {
    checked: {
      description: 'Whether this radio button is selected.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      description: 'Prevents interaction and applies muted styles.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      description: 'Label text. Pass an empty string to render only the circle.',
      control: 'text',
      table: { defaultValue: { summary: 'Label' } },
    },
    checkedChange: {
      description: 'Emits `true` when the radio button is selected.',
      table: { category: 'Events' },
    },
  },
  args: {
    checked: false,
    disabled: false,
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<RadioButtonComponent>;

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
    docs: { description: { story: 'All states from the Figma spec.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;border:1px solid #e1e1e1;border-radius:8px;width:fit-content">
        <ds-radio-button [checked]="false" label="Unchecked"></ds-radio-button>
        <ds-radio-button [checked]="true"  label="Checked"></ds-radio-button>
        <ds-radio-button [checked]="false" [disabled]="true" label="Disabled unchecked"></ds-radio-button>
        <ds-radio-button [checked]="true"  [disabled]="true" label="Disabled checked"></ds-radio-button>
        <ds-radio-button [checked]="false" label=""></ds-radio-button>
      </div>
    `,
  }),
};

// ─── Unchecked ────────────────────────────────────────────────────────────────

export const Unchecked: Story = {
  name: 'Unchecked',
  parameters: { docs: { description: { story: 'Default state — empty circle with gray border.' } } },
  args: { checked: false, label: 'Label' },
};

// ─── Checked ──────────────────────────────────────────────────────────────────

export const Checked: Story = {
  name: 'Checked',
  parameters: { docs: { description: { story: 'Blue border with filled inner dot.' } } },
  args: { checked: true, label: 'Label' },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  parameters: { docs: { description: { story: 'Interaction disabled. Label text is muted.' } } },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-radio-button [checked]="false" [disabled]="true" label="Disabled unchecked"></ds-radio-button>
        <ds-radio-button [checked]="true"  [disabled]="true" label="Disabled checked"></ds-radio-button>
      </div>
    `,
  }),
};

// ─── Radio Group ──────────────────────────────────────────────────────────────

export const RadioGroup: Story = {
  name: 'Radio Group (usage pattern)',
  parameters: {
    docs: {
      description: {
        story:
          'Example of a parent-controlled radio group. ' +
          'The parent holds the selected value and passes `[checked]="selected === item.value"` to each button.',
      },
    },
  },
  render: () => ({
    props: {
      selected: 'option-a',
      options: [
        { value: 'option-a', label: 'Option A' },
        { value: 'option-b', label: 'Option B' },
        { value: 'option-c', label: 'Option C' },
      ],
      onSelect(value: string) {
        (this as { selected: string }).selected = value;
      },
    },
    template: `
      <fieldset style="border:none;padding:0;margin:0">
        <legend style="font-size:12px;font-weight:600;margin-bottom:12px">Select an option</legend>
        <div style="display:flex;flex-direction:column;gap:12px">
          @for (opt of options; track opt.value) {
            <ds-radio-button
              [label]="opt.label"
              [checked]="selected === opt.value"
              (checkedChange)="selected = opt.value"
            ></ds-radio-button>
          }
        </div>
      </fieldset>
    `,
  }),
};

// ─── No Label ─────────────────────────────────────────────────────────────────

export const NoLabel: Story = {
  name: 'Without Label',
  parameters: { docs: { description: { story: 'Pass `label=""` to render only the circle.' } } },
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <ds-radio-button [checked]="false" label=""></ds-radio-button>
        <ds-radio-button [checked]="true"  label=""></ds-radio-button>
      </div>
    `,
  }),
};
