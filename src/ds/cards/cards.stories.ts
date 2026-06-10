import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { CardsComponent } from './cards.component';

const meta: Meta<CardsComponent> = {
  title: 'Components/Cards',
  component: CardsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Card surface matching the CODE-A-TON Library Figma spec.\n\n' +
          'Three visual variants: `default`, `selected` (mint border + shadow), and `grouping`. Set `interactive=true` to make the host clickable + keyboard-activatable.\n\n' +
          'Use content projection slots: `[ds-card-header]`, `[ds-card-divider]`, `[ds-card-footer]` (and `[ds-card-meta]`, `[ds-card-footer-meta]` for sub-styling).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'selected', 'grouping'],
      table: { defaultValue: { summary: 'default' } },
    },
    interactive: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    ariaLabel: { control: 'text' },
    cardClick: { table: { category: 'Events' } },
  },
  args: {
    variant: 'default',
    interactive: false,
    cardClick: fn(),
  },
};

export default meta;
type Story = StoryObj<CardsComponent>;

export const Playground: Story = { name: 'Playground' };

export const Variants: Story = {
  name: 'Variants',
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,minmax(180px,260px));gap:16px;padding:16px;background:#f7f7f7;border-radius:8px">
        <ds-card>
          <header ds-card-header><strong>Default</strong></header>
          <p style="margin:0;color:#4b586b">Card body content goes here.</p>
        </ds-card>
        <ds-card variant="selected">
          <header ds-card-header><strong>Selected</strong></header>
          <p style="margin:0;color:#4b586b">Mint border, soft shadow.</p>
        </ds-card>
        <ds-card variant="grouping">
          <header ds-card-header><strong>Grouping</strong></header>
          <p style="margin:0;color:#4b586b">Used for nested card groups.</p>
        </ds-card>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  name: 'Interactive (clickable)',
  render: () => ({
    props: { onClick: fn() },
    template: `
      <ds-card [interactive]="true" ariaLabel="Open patient" (cardClick)="onClick()" style="display:block;max-width:320px">
        <header ds-card-header>
          <strong>Taylor Michael</strong>
          <span ds-card-meta>38yo M</span>
        </header>
        <div ds-card-divider></div>
        <p style="margin:0;font-size:12px;color:#4b586b">Last visit: 2026-04-22 at 10:00</p>
        <footer ds-card-footer>
          <span ds-card-footer-meta>Updated</span>
          <span>2 hours ago</span>
        </footer>
      </ds-card>
    `,
  }),
};

export const PatientCard: Story = {
  name: 'Patient card example',
  render: () => ({
    template: `
      <ds-card variant="selected" style="display:block;max-width:320px">
        <header ds-card-header>
          <strong>Taylor Michael</strong>
          <span ds-card-meta>38yo M</span>
        </header>
        <div ds-card-divider></div>
        <p style="margin:0;font-size:12px;color:#4b586b">Sample card body content.</p>
        <footer ds-card-footer>
          <span ds-card-footer-meta>Date</span>
          <span>04-22-2026 at 10:00</span>
        </footer>
      </ds-card>
    `,
  }),
};
