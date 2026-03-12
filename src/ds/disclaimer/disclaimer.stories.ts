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
          '**3 layouts:**\n' +
          '- `disclaimer` + `labelPosition: "left"` — *Disclaimer:* inline with text, close ×.\n' +
          '- `disclaimer` + `labelPosition: "top"` — *Disclaimer:* on its own row, italic text below, close ×.\n' +
          '- `ai-disclaimer` — AI warning text + **Acknowledge for AI Assistant** button (no close).\n\n' +
          '**Typography:** "Disclaimer:" label is **bold italic** · body text is *italic* · AI text is regular.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Layout variant.',
      control: 'select',
      options: ['disclaimer', 'ai-disclaimer'],
      table: { defaultValue: { summary: 'disclaimer' } },
    },
    labelPosition: {
      description: 'Position of the "Disclaimer:" label (disclaimer variant only).',
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
    aiText: {
      description: 'Main body for the AI disclaimer variant.',
      control: 'text',
    },
    aiNote: {
      description: 'Bold note appended after aiText (AI variant).',
      control: 'text',
    },
    acknowledgeLabel: {
      description: 'Label on the acknowledge button (AI variant).',
      control: 'text',
      table: { defaultValue: { summary: 'Acknowledge for AI Assistant' } },
    },
    closed: {
      description: 'Emits when the close button is clicked.',
      table: { category: 'Events' },
    },
    acknowledge: {
      description: 'Emits when the acknowledge button is clicked (AI variant).',
      table: { category: 'Events' },
    },
  },
  args: {
    variant: 'disclaimer',
    labelPosition: 'left',
    text: 'This content is for informational purposes only and does not constitute medical advice.',
    line2: '',
    aiText:
      'This feature uses artificial intelligence. AI-generated results may contain errors or inaccuracies.',
    aiNote: 'Always verify AI-generated content with a qualified professional.',
    acknowledgeLabel: 'Acknowledge for AI Assistant',
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
        story: 'All three disclaimer layouts: label-left, label-top, and AI disclaimer.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <!-- Label Left -->
        <ds-disclaimer
          variant="disclaimer"
          labelPosition="left"
          text="This content is for informational purposes only and does not constitute medical advice."
        ></ds-disclaimer>

        <!-- Label Top -->
        <ds-disclaimer
          variant="disclaimer"
          labelPosition="top"
          text="Changing this setting will affect all users in your organisation."
          line2="Please review the change log before proceeding."
        ></ds-disclaimer>

        <!-- AI Disclaimer -->
        <ds-disclaimer
          variant="ai-disclaimer"
          aiText="This feature uses artificial intelligence. AI-generated results may contain errors or inaccuracies."
          aiNote="Always verify AI-generated content with a qualified professional."
          acknowledgeLabel="Acknowledge for AI Assistant"
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

// ─── AI Disclaimer ────────────────────────────────────────────────────────────

export const AiDisclaimer: Story = {
  name: 'AI Disclaimer',
  parameters: {
    docs: {
      description: {
        story:
          'AI variant — full-width text block with a bold closing note and an "Acknowledge" secondary button.',
      },
    },
  },
  args: {
    variant: 'ai-disclaimer',
    aiText:
      'This feature uses artificial intelligence to assist with clinical decision support. Results are suggestions only and should not replace professional clinical judgment.',
    aiNote: 'Always verify AI-generated content with a qualified professional.',
    acknowledgeLabel: 'Acknowledge for AI Assistant',
  },
};
