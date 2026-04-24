import type { Meta, StoryObj } from '@storybook/angular';
import { DisclaimerComponent } from './disclaimer.component';

const meta: Meta<DisclaimerComponent> = {
  title: 'Components/Disclaimer',
  component: DisclaimerComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Yellow warning strip — background `#fff9eb`, border `#fbce2a`, radius 4 px.\n\n' +
          '**2 layouts:**\n' +
          '- `labelPosition: "left"` — *Disclaimer:* inline with text, close ×.\n' +
          '- `labelPosition: "top"` — *Disclaimer:* on its own row, italic text below, close ×.\n\n' +
          '**Typography:** "Disclaimer:" label is **bold italic** · body text is *italic*.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Layout variant.',
      control: 'select',
      options: ['disclaimer'],
      table: { defaultValue: { summary: 'disclaimer' } },
    },
    labelPosition: {
      description: 'Position of the "Disclaimer:" label.',
      control: 'select',
      options: ['left', 'top'],
      table: { defaultValue: { summary: 'left' } },
    },
    text: {
      description: 'Primary body text.',
      control: 'text',
    },
    line2: {
      description: 'Optional second line of body text.',
      control: 'text',
      table: { defaultValue: { summary: '' } },
    },
    closed: {
      description: 'Emits when the close button is clicked.',
      table: { category: 'Events' },
    },
  },
  args: {
    variant: 'disclaimer',
    labelPosition: 'left',
    text: 'This content is for informational purposes only and does not constitute medical advice.',
    line2: '',
  },
};

export default meta;
type Story = StoryObj<DisclaimerComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Configure all props via the Controls panel.' } },
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: {
    docs: {
      description: {
        story: 'Both disclaimer layouts: label-left and label-top.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <ds-disclaimer
          variant="disclaimer"
          labelPosition="left"
          text="This content is for informational purposes only and does not constitute medical advice."
        ></ds-disclaimer>

        <ds-disclaimer
          variant="disclaimer"
          labelPosition="top"
          text="Changing this setting will affect all users in your organisation."
          line2="Please review the change log before proceeding."
        ></ds-disclaimer>
      </div>
    `,
  }),
};

// ─── Label Left ───────────────────────────────────────────────────────────────

export const LabelLeft: Story = {
  name: 'Disclaimer — Label Left',
  parameters: {
    docs: {
      description: { story: '"Disclaimer:" label is inline with the body text. Close button at the right.' },
    },
  },
  args: {
    variant: 'disclaimer',
    labelPosition: 'left',
    text: 'Changing this setting will affect all users in your organisation.',
  },
};

// ─── Label Top ────────────────────────────────────────────────────────────────

export const LabelTop: Story = {
  name: 'Disclaimer — Label Top',
  parameters: {
    docs: {
      description: { story: '"Disclaimer:" label appears on its own row above the italic body text.' },
    },
  },
  args: {
    variant: 'disclaimer',
    labelPosition: 'top',
    text: 'The following information is subject to change without notice.',
    line2: 'Please consult your administrator for the most up-to-date guidance.',
  },
};
