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
          'Single-line yellow warning strip — background `#fff9eb`, border `#fbce2a`, radius 4 px.\n\n' +
          'Anatomy: `[bold prefix] [body text] [× close]`\n\n' +
          'Switch `type` between `note` and `disclaimer` to flip the prefix label, or pass a custom `label` to override.',
      },
    },
  },
  argTypes: {
    type: {
      description: 'Prefix style.',
      control: 'inline-radio',
      options: ['note', 'disclaimer'],
      table: { defaultValue: { summary: 'note' } },
    },
    label: {
      description: 'Custom prefix label. Leave null to use the type default.',
      control: 'text',
    },
    text: { description: 'Body text.', control: 'text' },
    showClose: { description: 'Show the trailing close × button.', control: 'boolean' },
    closed: { table: { category: 'Events' } },
  },
  args: {
    type: 'note',
    label: null,
    text: 'Body text',
    showClose: true,
  },
};

export default meta;
type Story = StoryObj<DisclaimerComponent>;

export const Playground: Story = { name: 'Playground' };

export const Note: Story = {
  args: { type: 'note', text: 'Body text' },
};

export const Disclaimer: Story = {
  args: { type: 'disclaimer', text: 'Body text' },
};

export const BothTypes: Story = {
  name: 'Both Types',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
        <ds-disclaimer type="note"       text="Body text"></ds-disclaimer>
        <ds-disclaimer type="disclaimer" text="Body text"></ds-disclaimer>
      </div>
    `,
  }),
};

export const NoClose: Story = {
  name: 'No close',
  args: { type: 'disclaimer', text: 'Body text', showClose: false },
};
