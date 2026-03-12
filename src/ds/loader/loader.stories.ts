import type { Meta, StoryObj } from '@storybook/angular';
import { LoaderComponent } from './loader.component';

const meta: Meta<LoaderComponent> = {
  title: 'Components/Loader',
  component: LoaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Three-dot loading indicator. ' +
          'Display this any time the system is delayed or processing a request.\n\n' +
          '> **Note:** For bulk file uploads or long operations with measurable progress, use a **Progress Bar** instead.\n\n' +
          'Four colour themes match the design system: `user` (blue), `admin` (orange), `green`, and `sunoh` (pink). ' +
          'The optional `Loading...` label can be hidden for compact contexts.',
      },
    },
  },
  argTypes: {
    theme: {
      description: 'Colour of the animated dots.',
      control: 'select',
      options: ['user', 'admin', 'green', 'sunoh'],
      table: { defaultValue: { summary: 'user' } },
    },
    showLabel: {
      description: 'Whether to render the label text below the dots.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    label: {
      description: 'Custom label string.',
      control: 'text',
      table: { defaultValue: { summary: 'Loading...' } },
    },
  },
  args: {
    theme: 'user',
    showLabel: true,
    label: 'Loading...',
  },
};

export default meta;
type Story = StoryObj<LoaderComponent>;

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
    docs: { description: { story: 'All four colour themes with and without the label.' } },
  },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(4,100px);gap:32px;padding:16px">
        <div style="display:flex;flex-direction:column;align-items:center;gap:24px">
          <ds-loader theme="user"  [showLabel]="true"></ds-loader>
          <ds-loader theme="user"  [showLabel]="false"></ds-loader>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:24px">
          <ds-loader theme="admin" [showLabel]="true"></ds-loader>
          <ds-loader theme="admin" [showLabel]="false"></ds-loader>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:24px">
          <ds-loader theme="green" [showLabel]="true"></ds-loader>
          <ds-loader theme="green" [showLabel]="false"></ds-loader>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:24px">
          <ds-loader theme="sunoh" [showLabel]="true"></ds-loader>
          <ds-loader theme="sunoh" [showLabel]="false"></ds-loader>
        </div>
      </div>
    `,
  }),
};

// ─── Themes ───────────────────────────────────────────────────────────────────

export const Themes: Story = {
  name: 'All Themes',
  render: () => ({
    template: `
      <div style="display:flex;gap:32px;align-items:flex-start">
        <ds-loader theme="user"></ds-loader>
        <ds-loader theme="admin"></ds-loader>
        <ds-loader theme="green"></ds-loader>
        <ds-loader theme="sunoh"></ds-loader>
      </div>
    `,
  }),
};

// ─── No Label ────────────────────────────────────────────────────────────────

export const NoLabel: Story = {
  name: 'Without Label',
  parameters: {
    docs: { description: { story: 'Compact variant — dots only, no text. Useful inside buttons or tight layouts.' } },
  },
  args: { showLabel: false },
};

// ─── Custom Label ────────────────────────────────────────────────────────────

export const CustomLabel: Story = {
  name: 'Custom Label',
  parameters: { docs: { description: { story: 'Override the label text for contextual messages.' } } },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px">
        <ds-loader theme="user" label="Uploading file…"></ds-loader>
        <ds-loader theme="admin" label="Processing request…"></ds-loader>
        <ds-loader theme="green" label="Saving changes…"></ds-loader>
      </div>
    `,
  }),
};
