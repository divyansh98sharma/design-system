import type { Meta, StoryObj } from '@storybook/angular';
import { HyperlinkComponent } from './hyperlink.component';

const meta: Meta<HyperlinkComponent> = {
  title: 'Components/Hyperlink',
  component: HyperlinkComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Inline navigational text link. 12 px Inter Medium underlined teal (`#02506f`). Renders as an `<a>` when `href` is set, or as a `<button>` (emitting `linkClick`) when it isn\'t. Disabled state dims the link and blocks interaction.',
      },
    },
  },
  argTypes: {
    label: { description: 'Link text (ignored when projected content is provided).', control: 'text' },
    href: { description: 'URL. Leave null/empty to render as a button.', control: 'text' },
    target: {
      description: 'Anchor target.',
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      table: { defaultValue: { summary: '_self' } },
    },
    rel: { description: 'Override for the `rel` attribute.', control: 'text' },
    size: {
      description: 'Size variant.',
      control: 'select',
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'sm' } },
    },
    disabled: { description: 'Disabled state.', control: 'boolean' },
    linkClick: { description: 'Emits on activation.', table: { category: 'Events' } },
  },
  args: {
    label: 'Hyperlink',
    href: 'https://example.com',
    target: '_blank',
    rel: null,
    size: 'sm',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<HyperlinkComponent>;

export const Playground: Story = {
  name: 'Playground',
};

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: { description: { story: 'Default inline hyperlink — 12 px underlined teal.' } },
  },
  args: { label: 'Hyperlink' },
};

export const AsButton: Story = {
  name: 'Button mode',
  parameters: {
    docs: {
      description: {
        story: 'When `href` is null the component renders as a `<button>` and emits `linkClick`.',
      },
    },
  },
  args: { label: 'Open details', href: null },
};

export const ExternalLink: Story = {
  name: 'External link',
  parameters: {
    docs: {
      description: {
        story: '`target="_blank"` auto-applies `rel="noopener noreferrer"` unless overridden.',
      },
    },
  },
  args: { label: 'Visit docs ↗', href: 'https://example.com', target: '_blank' },
};

export const Medium: Story = {
  name: 'Medium size',
  parameters: {
    docs: { description: { story: '14 px / 20 px line-height variant for headings or prominent inline links.' } },
  },
  args: { label: 'Learn more', size: 'md' },
};

export const Disabled: Story = {
  name: 'Disabled',
  parameters: {
    docs: { description: { story: 'Dimmed, not focusable, no navigation or click event.' } },
  },
  args: { label: 'Unavailable link', disabled: true },
};

export const InParagraph: Story = {
  name: 'In paragraph',
  parameters: {
    docs: { description: { story: 'Common usage — inline inside a body paragraph.' } },
  },
  render: () => ({
    template: `
      <p style="font-family: Inter, sans-serif; font-size: 14px; line-height: 20px; color: #111; max-width: 480px;">
        For step-by-step setup instructions, see the
        <ds-hyperlink href="https://example.com/docs" target="_blank">integration guide</ds-hyperlink>
        or browse the
        <ds-hyperlink href="https://example.com/api" target="_blank">API reference</ds-hyperlink>
        for full endpoint coverage.
      </p>
    `,
  }),
};
