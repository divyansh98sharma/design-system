import type { Meta, StoryObj } from '@storybook/angular';
import { ToastComponent } from './toast.component';

const meta: Meta<ToastComponent> = {
  title: 'Components/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toast notification — min **520 px** wide, **56 px** tall, max 600 px.\n\n' +
          '**2 types**: `confirmation` (green) · `communication` (dark gray).\n\n' +
          '**Usage notes:**\n' +
          '- Window name is always **bold**; description follows after " - ".\n' +
          '- Optional **line 2** for additional context.\n' +
          '- The **Undo** button (confirmation only) lets users reverse the last action.\n' +
          '- The **×** close button always appears at the right edge.',
      },
    },
  },
  argTypes: {
    type: {
      description: 'Visual type — changes background and icon.',
      control: 'select',
      options: ['confirmation', 'communication'],
      table: { defaultValue: { summary: 'confirmation' } },
    },
    windowName: {
      description: 'Window / screen name (bold).',
      control: 'text',
      table: { defaultValue: { summary: 'Window Name' } },
    },
    description: {
      description: 'Brief description following the window name.',
      control: 'text',
    },
    line2: {
      description: 'Optional second line of body text.',
      control: 'text',
      table: { defaultValue: { summary: '' } },
    },
    showUndo: {
      description: 'Show the Undo button (confirmation type only).',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    undoLabel: {
      description: 'Label for the Undo button.',
      control: 'text',
      table: { defaultValue: { summary: 'Undo 5 Sec' } },
    },
    closed: {
      description: 'Emits when the close button is clicked.',
      table: { category: 'Events' },
    },
    undoClick: {
      description: 'Emits when the undo button is clicked.',
      table: { category: 'Events' },
    },
  },
  args: {
    type: 'confirmation',
    windowName: 'Appointment',
    description: 'Appointment saved successfully.',
    line2: '',
    showUndo: false,
    undoLabel: 'Undo 5 Sec',
  },
};

export default meta;
type Story = StoryObj<ToastComponent>;

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
        story: 'Confirmation (green) and Communication (dark gray) types side by side.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <ds-toast
          type="confirmation"
          windowName="Appointment"
          description="Appointment saved successfully."
          [showUndo]="true"
          undoLabel="Undo 5 Sec"
        ></ds-toast>
        <ds-toast
          type="communication"
          windowName="Inbox"
          description="You have a new message from Dr. Smith."
        ></ds-toast>
      </div>
    `,
  }),
};

// ─── With Undo ────────────────────────────────────────────────────────────────

export const WithUndo: Story = {
  name: 'Confirmation with Undo',
  parameters: {
    docs: {
      description: {
        story: 'The **Undo** button appears only on `confirmation` type when `showUndo` is true.',
      },
    },
  },
  args: {
    type: 'confirmation',
    windowName: 'Prescription',
    description: 'Rx order submitted.',
    showUndo: true,
    undoLabel: 'Undo 5 Sec',
  },
};

// ─── With Two Lines ───────────────────────────────────────────────────────────

export const WithLine2: Story = {
  name: 'With Second Line',
  parameters: {
    docs: {
      description: {
        story: 'An optional second line provides additional context below the primary description.',
      },
    },
  },
  args: {
    type: 'communication',
    windowName: 'Lab Results',
    description: 'New results are available.',
    line2: 'Please review the attached report and follow up with the patient.',
  },
};

// ─── Confirmation ─────────────────────────────────────────────────────────────

export const Confirmation: Story = {
  name: 'Confirmation',
  parameters: {
    docs: { description: { story: 'Success / confirmation toast — green with checkmark.' } },
  },
  args: {
    type: 'confirmation',
    windowName: 'Record',
    description: 'Patient record updated.',
  },
};

// ─── Communication ────────────────────────────────────────────────────────────

export const Communication: Story = {
  name: 'Communication',
  parameters: {
    docs: { description: { story: 'Informational / communication toast — dark gray with info icon.' } },
  },
  args: {
    type: 'communication',
    windowName: 'Reminder',
    description: 'Your session will expire in 5 minutes.',
  },
};
