import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { AiChatbotComponent, ChatMessage, SuggestionChip, HeaderAction } from './ai-chatbot.component';

const HISTORY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M8 4v4l3 1.5"/></svg>`;
const SETTINGS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="2.5"/><path d="M13 8a5 5 0 0 0-.3-1.7l1.3-.9-1-1.7-1.5.6a5 5 0 0 0-1.5-.9l-.2-1.6h-2L7.6 3.4a5 5 0 0 0-1.5.9L4.6 3.7l-1 1.7 1.3.9A5 5 0 0 0 4.6 8c0 .6.1 1.2.3 1.7l-1.3.9 1 1.7 1.5-.6c.4.4.9.7 1.5.9l.2 1.6h2l.2-1.6c.6-.2 1.1-.5 1.5-.9l1.5.6 1-1.7-1.3-.9c.2-.5.3-1.1.3-1.7z"/></svg>`;
const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l10 10M13 3L3 13"/></svg>`;

const HEADER_ACTIONS: HeaderAction[] = [
  { id: 'history', label: 'Chat history', icon: HISTORY_ICON },
  { id: 'settings', label: 'Settings', icon: SETTINGS_ICON },
  { id: 'close', label: 'Close', icon: CLOSE_ICON },
];

const SAMPLE_MESSAGES: ChatMessage[] = [
  { role: 'user', text: 'User Text' },
  { role: 'ai', text: 'Ai Text' },
];

const LONG_MESSAGES: ChatMessage[] = [
  { role: 'user', text: 'How do I create a billing note for a patient from past encounters?' },
  { role: 'ai', text: 'Sure — open the patient chart, click "Billing", then "New Note". I can pull from prior encounters automatically. Do you want me to start now?' },
  { role: 'user', text: 'Yes please.' },
  { role: 'ai', text: 'Pulling encounters from the last 90 days...' },
];

const SUGGESTIONS: SuggestionChip[] = [
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
  { label: 'Chip Label' },
];

const meta: Meta<AiChatbotComponent> = {
  title: 'Components/AI Chatbot',
  component: AiChatbotComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'AI chat panel matching the CODE-A-TON Library Figma spec.\n\n' +
          '- 400×690 panel with header, scrolling message area, suggestion chips, and a multi-line input field.\n' +
          '- Header actions are configurable via the `headerActions` input.\n' +
          '- Auto-scrolls to the latest message when `messages` updates.\n' +
          '- `Enter` submits, `Shift+Enter` inserts newline.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', table: { defaultValue: { summary: 'Heading' } } },
    placeholder: { control: 'text', table: { defaultValue: { summary: 'What would you like to do?' } } },
    showNewChat: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    newChatLabel: { control: 'text', table: { defaultValue: { summary: 'New chat' } } },
    loading: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    messages: { control: 'object' },
    suggestions: { control: 'object' },
    headerActions: { control: 'object' },
    messageSend: { table: { category: 'Events' } },
    suggestionClick: { table: { category: 'Events' } },
    newChat: { table: { category: 'Events' } },
    headerActionClick: { table: { category: 'Events' } },
    micClick: { table: { category: 'Events' } },
  },
  args: {
    title: 'Heading',
    placeholder: 'What would you like to do?',
    showNewChat: true,
    newChatLabel: 'New chat',
    loading: false,
    messages: SAMPLE_MESSAGES,
    suggestions: SUGGESTIONS,
    headerActions: HEADER_ACTIONS,
    messageSend: fn(),
    suggestionClick: fn(),
    newChat: fn(),
    headerActionClick: fn(),
    micClick: fn(),
  },
};

export default meta;
type Story = StoryObj<AiChatbotComponent>;

export const Playground: Story = { name: 'Playground' };

export const Default: Story = {
  name: 'Default state',
  args: {
    messages: SAMPLE_MESSAGES,
    suggestions: SUGGESTIONS,
    loading: true,
  },
};

export const Conversation: Story = {
  name: 'Conversation',
  args: {
    messages: LONG_MESSAGES,
    suggestions: [],
    loading: false,
  },
};

export const Loading: Story = {
  name: 'Loading',
  args: {
    messages: [{ role: 'user', text: 'Tell me a joke.' }],
    suggestions: [],
    loading: true,
  },
};

export const NoSuggestions: Story = {
  name: 'No suggestions',
  args: {
    messages: SAMPLE_MESSAGES,
    suggestions: [],
    loading: false,
  },
};

export const EmptyChat: Story = {
  name: 'Empty chat',
  args: {
    messages: [],
    suggestions: SUGGESTIONS,
    loading: false,
  },
};
