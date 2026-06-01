import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ButtonComponent } from './button.component';

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="2" width="5" height="5" rx="1"/>
  <rect x="9" y="2" width="5" height="5" rx="1"/>
  <rect x="2" y="9" width="5" height="5" rx="1"/>
  <rect x="9" y="9" width="5" height="5" rx="1"/>
</svg>`;

const ARROW_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 8h10M9 4l4 4-4 4"/>
</svg>`;

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs', 'v1'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Core interactive button driven by Figma CODE-A-TON Library tokens. ' +
          'Five **types** (primary, secondary, white, error, warning), two **styles** ' +
          '(default, divided), three **sizes**, plus optional alert indicator and counter chip.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', table: { defaultValue: { summary: 'Button' } } },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'error', 'warning'],
      table: { defaultValue: { summary: 'primary' } },
    },
    btnStyle: {
      control: 'select',
      options: ['default', 'divided'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    iconOnly: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    alertIndicator: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    counter: { control: 'text' },
    icon: { control: 'text' },
    trailingIcon: { control: 'text' },
    dividerIcon: { control: 'text' },
    buttonClick: { table: { category: 'Events' } },
    dividerClick: { table: { category: 'Events' } },
  },
  args: {
    label: 'Button',
    type: 'primary',
    btnStyle: 'default',
    size: 'md',
    disabled: false,
    iconOnly: false,
    alertIndicator: false,
    counter: null,
    buttonClick: fn(),
    dividerClick: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Playground: Story = { name: 'Playground' };

export const Types: Story = {
  name: 'Types',
  parameters: {
    docs: { description: { story: 'All five button types in default style.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="Primary"   type="primary"></ds-button>
        <ds-button label="Secondary" type="secondary"></ds-button>
        <ds-button label="White"     type="white"></ds-button>
        <ds-button label="Error"     type="error"></ds-button>
        <ds-button label="Warning"   type="warning"></ds-button>
        <ds-button label="Disabled"  type="primary" [disabled]="true"></ds-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="Small"  type="primary" size="sm"></ds-button>
        <ds-button label="Medium" type="primary" size="md"></ds-button>
        <ds-button label="Large"  type="primary" size="lg"></ds-button>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => ({
    props: { icon: ICON_SVG, trailing: ARROW_SVG },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="Leading"   type="primary"   [icon]="icon"></ds-button>
        <ds-button label="Trailing"  type="secondary" [trailingIcon]="trailing"></ds-button>
        <ds-button label="Both"      type="white"     [icon]="icon" [trailingIcon]="trailing"></ds-button>
        <ds-button label="Error"     type="error"     [icon]="icon"></ds-button>
        <ds-button label="Warning"   type="warning"   [icon]="icon"></ds-button>
      </div>
    `,
  }),
};

export const IconOnly: Story = {
  name: 'Icon Only',
  render: () => ({
    props: { icon: ICON_SVG },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="Primary"   type="primary"   [icon]="icon" [iconOnly]="true"></ds-button>
        <ds-button label="Secondary" type="secondary" [icon]="icon" [iconOnly]="true"></ds-button>
        <ds-button label="White"     type="white"     [icon]="icon" [iconOnly]="true"></ds-button>
        <ds-button label="Error"     type="error"     [icon]="icon" [iconOnly]="true"></ds-button>
        <ds-button label="Warning"   type="warning"   [icon]="icon" [iconOnly]="true"></ds-button>
      </div>
    `,
  }),
};

export const AlertIndicator: Story = {
  name: 'Alert Indicator',
  parameters: {
    docs: { description: { story: 'Red dot in top-right signals notification or pending action.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;padding:8px">
        <ds-button label="Primary"   type="primary"   [alertIndicator]="true"></ds-button>
        <ds-button label="Secondary" type="secondary" [alertIndicator]="true"></ds-button>
        <ds-button label="Error"     type="error"     [alertIndicator]="true"></ds-button>
        <ds-button label="Warning"   type="warning"   [alertIndicator]="true"></ds-button>
      </div>
    `,
  }),
};

export const Counter: Story = {
  name: 'With Counter',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="Inbox"   type="primary"   [counter]="3"></ds-button>
        <ds-button label="Notices" type="secondary" [counter]="999"></ds-button>
        <ds-button label="Items"   type="white"     [counter]="42"></ds-button>
      </div>
    `,
  }),
};

export const Divided: Story = {
  name: 'Divided (Split Button)',
  parameters: {
    docs: { description: { story: 'Divided style adds a chevron action segment for menu/split actions. Pass `dividerIcon` to override.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:8px">
        <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
          <ds-button label="Primary"   type="primary"   btnStyle="divided"></ds-button>
          <ds-button label="Secondary" type="secondary" btnStyle="divided"></ds-button>
          <ds-button label="White"     type="white"     btnStyle="divided"></ds-button>
          <ds-button label="Error"     type="error"     btnStyle="divided"></ds-button>
          <ds-button label="Warning"   type="warning"   btnStyle="divided"></ds-button>
          <ds-button label="Disabled"  type="primary"   btnStyle="divided" [disabled]="true"></ds-button>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="Primary"   type="primary"   [disabled]="true"></ds-button>
        <ds-button label="Secondary" type="secondary" [disabled]="true"></ds-button>
        <ds-button label="Divided"   type="primary"   btnStyle="divided" [disabled]="true"></ds-button>
      </div>
    `,
  }),
};

export const ClickEmitsEvent: Story = {
  name: 'Interaction: Click emits event',
  args: { label: 'Click me', type: 'primary', size: 'md', disabled: false },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    await expect(args.buttonClick).toHaveBeenCalledOnce();
  },
};

export const DisabledNotClickable: Story = {
  name: 'Interaction: Disabled button is not clickable',
  args: { label: 'Disabled', type: 'primary', size: 'md', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled/i });
    await expect(button).toBeDisabled();
  },
};
