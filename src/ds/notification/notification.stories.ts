import type { Meta, StoryObj } from '@storybook/angular';
import { NotificationComponent } from './notification.component';

const BODY = 'This window cannot be saved. Check your internet connection and try again. If this issue persists, please contact eClinicalWorks Support.';
const LONG_BODY =
  'This notification includes a longer description that spans multiple lines. It details the action that was performed, the entity affected, and the next steps the user should take. Keywords such as file names and action labels should be bolded in the actual implementation, e.g. click <strong>Save</strong>.';

const meta: Meta<NotificationComponent> = {
  title: 'Components/Notification',
  component: NotificationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Notification card — **540 px wide**, height responsive to content (up to ~12 lines).\n\n' +
          '**4 types** drive the circular icon-badge colour:\n' +
          '- `communication` — teal `#007b95`\n' +
          '- `confirmation` — green `#018145`\n' +
          '- `warning` — yellow `#fbce2a`\n' +
          '- `error` — red `#d82727`\n\n' +
          '**Usage notes from design spec:**\n' +
          '- Bold keywords: names, actions the user can take.\n' +
          '- Italicise element names within action phrases (e.g. click *Save*).\n' +
          '- The suppress checkbox disables the alert for **180 days** when checked.\n' +
          '- Use scrolling when body text exceeds 7 single-line rows.',
      },
    },
  },
  argTypes: {
    type: {
      description: 'Visual type — drives the circular icon-badge colour and glyph.',
      control: 'select',
      options: ['communication', 'confirmation', 'warning', 'error'],
      table: { defaultValue: { summary: 'communication' } },
    },
    windowName: {
      description: 'Window / screen name in the heading.',
      control: 'text',
      table: { defaultValue: { summary: '{Window Name}' } },
    },
    description: {
      description: 'Brief description shown after the window name, separated by a dash.',
      control: 'text',
      table: { defaultValue: { summary: '{Brief Description}' } },
    },
    bodyText: {
      description: 'Body text. Supports inline `<strong>` and `<em>` for bolded / italicised keywords.',
      control: 'text',
    },
    showCheckbox: {
      description: 'Show the suppress-alert checkbox in the footer.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    checkboxLabel: {
      description: 'Label for the suppress checkbox.',
      control: 'text',
      table: { defaultValue: { summary: 'Do not show this again' } },
    },
    actions: {
      description: 'Footer action buttons. First `variant: primary` renders filled teal; others render neutral gray.',
    },
    actionClick: {
      description: 'Emits the action value (or label) when a button is clicked.',
      table: { category: 'Events' },
    },
    suppress: {
      description: 'Emits the checkbox state when toggled.',
      table: { category: 'Events' },
    },
  },
  args: {
    type: 'communication',
    windowName: '{Window Name}',
    description: '{Brief Description}',
    bodyText: BODY,
    showCheckbox: false,
    checkboxLabel: 'Label',
    actions: [
      { label: 'Button', variant: 'primary' },
      { label: 'Button', variant: 'secondary' },
    ],
  },
};

export default meta;
type Story = StoryObj<NotificationComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Configure all props via the Controls panel.' } },
  },
};

// ─── Types overview ───────────────────────────────────────────────────────────

export const Types: Story = {
  name: 'Types',
  parameters: {
    docs: {
      description: {
        story: 'All 4 types — the circular icon badge changes colour per type.',
      },
    },
  },
  render: () => ({
    props: {
      body: BODY,
      actions: [
        { label: 'Button', variant: 'primary' },
        { label: 'Button', variant: 'secondary' },
      ],
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <ds-notification type="communication" windowName="{Window Name}" description="{Brief Description}" [bodyText]="body" [actions]="actions"></ds-notification>
        <ds-notification type="confirmation"  windowName="{Window Name}" description="{Brief Description}" [bodyText]="body" [actions]="actions"></ds-notification>
        <ds-notification type="warning"       windowName="{Window Name}" description="{Brief Description}" [bodyText]="body" [actions]="actions"></ds-notification>
        <ds-notification type="error"         windowName="{Window Name}" description="{Brief Description}" [bodyText]="body" [actions]="actions"></ds-notification>
      </div>
    `,
  }),
};

// ─── With checkbox ────────────────────────────────────────────────────────────

export const WithCheckbox: Story = {
  name: 'With Suppress Checkbox',
  parameters: {
    docs: {
      description: {
        story:
          'When `showCheckbox` is true, a checkbox appears at the left of the footer. Checking it suppresses the alert for **180 days**.',
      },
    },
  },
  args: {
    type: 'warning',
    windowName: 'Maintenance',
    description: 'Scheduled downtime',
    bodyText: 'The system will be unavailable on Sunday 02:00–04:00 UTC for planned maintenance.',
    showCheckbox: true,
    checkboxLabel: 'Do not show this again',
    actions: [{ label: 'Dismiss', variant: 'primary' }],
  },
};

// ─── Long body ────────────────────────────────────────────────────────────────

export const LongBody: Story = {
  name: 'Long Body Text',
  parameters: {
    docs: { description: { story: 'Body text supports inline `<strong>` / `<em>` for emphasis.' } },
  },
  args: {
    type: 'communication',
    windowName: 'Report',
    description: 'Export complete',
    bodyText: LONG_BODY,
    actions: [
      { label: 'Download', variant: 'primary' },
      { label: 'Dismiss', variant: 'secondary' },
    ],
  },
};

// ─── Error ────────────────────────────────────────────────────────────────────

export const ErrorNotification: Story = {
  name: 'Error',
  parameters: { docs: { description: { story: 'Error type — red icon badge.' } } },
  args: {
    type: 'error',
    windowName: 'Upload',
    description: 'File type not allowed',
    bodyText:
      'The file you uploaded is not supported. Only PDF, PNG, and JPG files are accepted. Please try again with a supported file type.',
    actions: [
      { label: 'Retry', variant: 'primary' },
      { label: 'Cancel', variant: 'secondary' },
    ],
  },
};
