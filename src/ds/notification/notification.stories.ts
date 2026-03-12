import type { Meta, StoryObj } from '@storybook/angular';
import { NotificationComponent } from './notification.component';

const BODY = 'Description of the notification in plain language with keywords {bolded}.';
const LONG_BODY = 'This notification includes a longer description that spans multiple lines. It details the action that was performed, the entity affected, and the next steps the user should take. Keywords such as file names and action labels should be bolded in the actual implementation.';

const meta: Meta<NotificationComponent> = {
  title: 'Components/Notification',
  component: NotificationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Notification banner — **540 px wide**, height is responsive to content (up to ~12 lines).\n\n' +
          '**4 types**: `communication` · `confirmation` · `warning` · `error` — each has a distinct sidebar icon.\n\n' +
          '**3 colour themes**: `user` (blue) · `admin` (orange) · `green` — applied to the sidebar and action buttons.\n\n' +
          '**Usage notes from design spec:**\n' +
          '- Bold keywords: names, actions the user can take, names of elements.\n' +
          '- Italicise element names within action phrases (e.g. click *Save*).\n' +
          '- The suppress checkbox disables the alert for **180 days** when checked.\n' +
          '- Use a scroll bar when body text exceeds 7 lines (or 6 for a double-line header).',
      },
    },
  },
  argTypes: {
    type: {
      description: 'Visual type — changes the sidebar icon.',
      control: 'select',
      options: ['communication', 'confirmation', 'warning', 'error'],
      table: { defaultValue: { summary: 'communication' } },
    },
    theme: {
      description: 'Colour theme for the sidebar and action buttons.',
      control: 'select',
      options: ['user', 'admin', 'green'],
      table: { defaultValue: { summary: 'user' } },
    },
    windowName: {
      description: 'Window / screen name in the heading (bold).',
      control: 'text',
      table: { defaultValue: { summary: '{Window Name}' } },
    },
    description: {
      description: 'Brief description shown after the window name (bold).',
      control: 'text',
      table: { defaultValue: { summary: '{Brief Description}' } },
    },
    bodyText: {
      description: 'Main notification body text.',
      control: 'text',
    },
    showCheckbox: {
      description: 'Show the "suppress" checkbox in the footer.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    checkboxLabel: {
      description: 'Label for the suppress checkbox.',
      control: 'text',
      table: { defaultValue: { summary: 'Do not show this again' } },
    },
    badgePosition: {
      description: 'Corner position of the balloon alert badge dot. `null` = hidden.',
      control: 'select',
      options: [null, 'top-right', 'top-left', 'right-top', 'right-bottom', 'bottom-right', 'bottom-left', 'left-top', 'left-bottom'],
      table: { defaultValue: { summary: 'null' } },
    },
    actionClick: {
      description: 'Emits the action value (or label) when a button is clicked.',
      table: { category: 'Events' },
    },
    suppress: {
      description: 'Emits `true` when the suppress checkbox is checked.',
      table: { category: 'Events' },
    },
  },
  args: {
    type: 'communication',
    theme: 'user',
    windowName: 'Dashboard',
    description: 'New message received',
    bodyText: BODY,
    showCheckbox: false,
    checkboxLabel: 'Do not show this again',
    actions: [{ label: 'View', value: 'view' }],
    badgePosition: null,
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
        story: 'All 4 notification types — each has a distinct sidebar icon. User theme shown.',
      },
    },
  },
  render: () => ({
    props: { body: BODY, actions: [{ label: 'OK' }] },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <ds-notification type="communication" theme="user" windowName="Inbox" description="New message" [bodyText]="body" [actions]="actions"></ds-notification>
        <ds-notification type="confirmation"  theme="user" windowName="Save"  description="Changes saved" [bodyText]="body" [actions]="actions"></ds-notification>
        <ds-notification type="warning"       theme="user" windowName="Quota" description="Storage limit" [bodyText]="body" [actions]="actions"></ds-notification>
        <ds-notification type="error"         theme="user" windowName="Upload" description="File rejected" [bodyText]="body" [actions]="actions"></ds-notification>
      </div>
    `,
  }),
};

// ─── Themes ───────────────────────────────────────────────────────────────────

export const Themes: Story = {
  name: 'Themes',
  parameters: {
    docs: { description: { story: 'All 3 colour themes. Communication type shown.' } },
  },
  render: () => ({
    props: { body: BODY, actions: [{ label: 'Label' }] },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <ds-notification type="communication" theme="user"  windowName="Dashboard" description="New message" [bodyText]="body" [actions]="actions"></ds-notification>
        <ds-notification type="communication" theme="admin" windowName="Dashboard" description="New message" [bodyText]="body" [actions]="actions"></ds-notification>
        <ds-notification type="communication" theme="green" windowName="Dashboard" description="New message" [bodyText]="body" [actions]="actions"></ds-notification>
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
        story: 'When `showCheckbox` is true, a checkbox appears in the footer. Checking it suppresses the alert for **180 days**.',
      },
    },
  },
  args: {
    type: 'warning',
    theme: 'user',
    windowName: 'Maintenance',
    description: 'Scheduled downtime',
    bodyText: 'The system will be unavailable on Sunday 02:00–04:00 UTC for planned maintenance.',
    showCheckbox: true,
    checkboxLabel: 'Do not show this again',
    actions: [{ label: 'Dismiss' }],
  },
};

// ─── Badge positions ──────────────────────────────────────────────────────────

export const WithBadge: Story = {
  name: 'With Badge (Balloon Alert)',
  parameters: {
    docs: {
      description: {
        story: 'A small red badge dot can appear at any of the 8 corner positions to indicate unread or pending state.',
      },
    },
  },
  render: () => ({
    props: { body: BODY, actions: [{ label: 'View' }] },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px">
        <ds-notification type="communication" theme="user" windowName="Inbox" description="Unread message" [bodyText]="body" [actions]="actions" badgePosition="top-right"></ds-notification>
        <ds-notification type="communication" theme="user" windowName="Inbox" description="Unread message" [bodyText]="body" [actions]="actions" badgePosition="top-left"></ds-notification>
        <ds-notification type="communication" theme="user" windowName="Inbox" description="Unread message" [bodyText]="body" [actions]="actions" badgePosition="right-top"></ds-notification>
      </div>
    `,
  }),
};

// ─── Long body ────────────────────────────────────────────────────────────────

export const LongBody: Story = {
  name: 'Long Body Text',
  parameters: {
    docs: { description: { story: 'Body text exceeding 7 lines will scroll within the card.' } },
  },
  args: {
    type: 'communication',
    theme: 'user',
    windowName: 'Report',
    description: 'Export complete',
    bodyText: LONG_BODY,
    actions: [{ label: 'Download' }, { label: 'Dismiss' }],
  },
};

// ─── Error theme ──────────────────────────────────────────────────────────────

export const ErrorNotification: Story = {
  name: 'Error',
  parameters: { docs: { description: { story: 'Error notification — red-bordered icon, user theme button.' } } },
  args: {
    type: 'error',
    theme: 'user',
    windowName: 'Upload',
    description: 'File type not allowed',
    bodyText: 'The file you uploaded is not supported. Only PDF, PNG, and JPG files are accepted. Please try again with a supported file type.',
    actions: [{ label: 'Retry' }, { label: 'Cancel' }],
  },
};
