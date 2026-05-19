import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { AiChatFieldComponent, SuggestionChip } from './ai-chat-field.component';

const SUGGESTIONS: SuggestionChip[] = [
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
];

const TIP = 'Click and drag or Shift + Click to select multiple procedure cards at once.';

const LONG_DRAFT = `This text area will scroll if the text is too long. ${'This text area will scroll if the text is too long. '.repeat(15)}`;

const meta: Meta<AiChatFieldComponent> = {
  title: 'Components/AI Chat Field',
  component: AiChatFieldComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Standalone AI chat input field. Supports typed input, voice (mic) mode, suggestion chips, and a usability tip footer. Implements `ControlValueAccessor` for form binding.\n\n' +
          'States are derived from inputs + interaction:\n' +
          '- **Default**: gray border, placeholder visible\n' +
          '- **Hover/Focused**: teal border, focus shadow\n' +
          '- **Filled**: gray border, content typed\n' +
          '- **Using Mic** (`usingMic=true`): "Listening...." text, square stop button\n' +
          '- **Scrolling**: textarea grows up to 240px then scrolls\n' +
          '- **With suggestions**: pill chip row + optional usability tip below the input',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    listeningText: { control: 'text' },
    usingMic: { control: 'boolean' },
    disabled: { control: 'boolean' },
    suggestions: { control: 'object' },
    usabilityTip: { control: 'text' },
    messageSend: { table: { category: 'Events' } },
    micToggle: { table: { category: 'Events' } },
    suggestionClick: { table: { category: 'Events' } },
  },
  args: {
    placeholder: 'What would you like to do?',
    listeningText: 'Listening....',
    usingMic: false,
    disabled: false,
    suggestions: [],
    usabilityTip: '',
    messageSend: fn(),
    micToggle: fn(),
    suggestionClick: fn(),
  },
};

export default meta;
type Story = StoryObj<AiChatFieldComponent>;

export const Playground: Story = { name: 'Playground' };

export const Default: Story = { name: 'Default' };

export const States: Story = {
  name: 'All states',
  parameters: { docs: { description: { story: 'Visual stack of every state.' } } },
  render: () => ({
    props: { suggestions: SUGGESTIONS, tip: TIP, longDraft: LONG_DRAFT },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:447px">
        <ds-ai-chat-field placeholder="What would you like to do?"></ds-ai-chat-field>
        <ds-ai-chat-field placeholder="What would you like to do?" [usingMic]="true"></ds-ai-chat-field>
        <ds-ai-chat-field placeholder="What would you like to do?" [ngModel]="longDraft"></ds-ai-chat-field>
        <ds-ai-chat-field placeholder="What would you like to do?" [suggestions]="suggestions" [usabilityTip]="tip"></ds-ai-chat-field>
      </div>
    `,
  }),
};

export const UsingMic: Story = {
  name: 'Using mic',
  args: { usingMic: true, listeningText: 'Listening....' },
};

export const WithSuggestions: Story = {
  name: 'With suggestions + tip',
  args: { suggestions: SUGGESTIONS, usabilityTip: TIP },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
};
