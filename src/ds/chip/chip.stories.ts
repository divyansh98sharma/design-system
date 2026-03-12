import type { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pill-shaped tag / chip — used for status labels, categories, and filtering.\n\n' +
          '**6 states** set border + background colour:\n' +
          '`default` · `active` · `error` · `warning` · `in-process` · `ai`\n\n' +
          '**Anatomy** (all optional): `[badge] [icon] label [×]`\n\n' +
          '- **Badge** — 16 × 16 filled circle with a single letter (e.g. provider "P").\n' +
          '- **Icon** — 16 × 16 SVG; pass custom `iconPath` or use state defaults.\n' +
          '- **Label** — primary text, 12 px regular.\n' +
          '- **Close** — × button emitting `closed`.',
      },
    },
  },
  argTypes: {
    state: {
      description: 'Colour state.',
      control: 'select',
      options: ['default', 'active', 'error', 'warning', 'in-process', 'ai'],
      table: { defaultValue: { summary: 'default' } },
    },
    label: { description: 'Text label.', control: 'text' },
    showBadge: { description: 'Show the left badge circle.', control: 'boolean' },
    badgeLetter: { description: 'Letter inside the badge.', control: 'text' },
    badgeColor: { description: 'Badge background colour.', control: 'color' },
    showIcon: { description: 'Show the icon.', control: 'boolean' },
    iconPath: { description: 'Custom SVG path (viewBox 0 0 24 24). Leave null for state default.', control: 'text' },
    showClose: { description: 'Show the close × button.', control: 'boolean' },
    closed: { table: { category: 'Events' } },
    chipClick: { table: { category: 'Events' } },
  },
  args: {
    state: 'default',
    label: 'Label',
    showBadge: true,
    badgeLetter: 'P',
    badgeColor: '#0378a7',
    showIcon: true,
    iconPath: null,
    showClose: true,
  },
};

export default meta;
type Story = StoryObj<ChipComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = { name: 'Playground' };

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  parameters: {
    docs: {
      description: {
        story: 'All 6 chip states: default (gray), active (green), error (red), warning (yellow), in-process (blue), and AI (purple).',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
        <ds-chip state="default"    label="Label"        [showBadge]="true" [showIcon]="true" [showClose]="true"></ds-chip>
        <ds-chip state="active"     label="Active"       [showBadge]="true" [showIcon]="true" [showClose]="true"></ds-chip>
        <ds-chip state="error"      label="Cancelled"    [showBadge]="true" [showIcon]="true" [showClose]="true"></ds-chip>
        <ds-chip state="warning"    label="Warning"      [showBadge]="true" [showIcon]="true" [showClose]="true"></ds-chip>
        <ds-chip state="in-process" label="Notification" [showBadge]="true" [showIcon]="true" [showClose]="true"></ds-chip>
        <ds-chip state="ai"         label="AI Tag"       [showBadge]="true" [showIcon]="true" [showClose]="true"></ds-chip>
      </div>
    `,
  }),
};

// ─── Anatomy variants ─────────────────────────────────────────────────────────

export const AnatomyVariants: Story = {
  name: 'Anatomy Variants',
  parameters: {
    docs: {
      description: {
        story: 'The badge, icon, and close button are all individually optional.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <span style="font-size:11px;color:#666;width:120px">Full</span>
          <ds-chip state="default" label="Label" [showBadge]="true" [showIcon]="true" [showClose]="true"></ds-chip>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <span style="font-size:11px;color:#666;width:120px">No badge</span>
          <ds-chip state="default" label="Label" [showBadge]="false" [showIcon]="true" [showClose]="true"></ds-chip>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <span style="font-size:11px;color:#666;width:120px">No icon</span>
          <ds-chip state="default" label="Label" [showBadge]="true" [showIcon]="false" [showClose]="true"></ds-chip>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <span style="font-size:11px;color:#666;width:120px">No close</span>
          <ds-chip state="default" label="Label" [showBadge]="true" [showIcon]="true" [showClose]="false"></ds-chip>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <span style="font-size:11px;color:#666;width:120px">Label only</span>
          <ds-chip state="default" label="Label" [showBadge]="false" [showIcon]="false" [showClose]="false"></ds-chip>
        </div>
      </div>
    `,
  }),
};

// ─── Status palette ───────────────────────────────────────────────────────────

export const StatusPalette: Story = {
  name: 'Status Palette (label only)',
  parameters: {
    docs: {
      description: { story: 'Compact label-only chips for status display in tables or lists.' },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <ds-chip state="active"     label="Confirmed"   [showBadge]="false" [showIcon]="false" [showClose]="false"></ds-chip>
        <ds-chip state="in-process" label="In Progress" [showBadge]="false" [showIcon]="false" [showClose]="false"></ds-chip>
        <ds-chip state="warning"    label="On Hold"     [showBadge]="false" [showIcon]="false" [showClose]="false"></ds-chip>
        <ds-chip state="error"      label="Cancelled"   [showBadge]="false" [showIcon]="false" [showClose]="false"></ds-chip>
        <ds-chip state="default"    label="Inactive"    [showBadge]="false" [showIcon]="false" [showClose]="false"></ds-chip>
        <ds-chip state="ai"         label="AI Reviewed" [showBadge]="false" [showIcon]="false" [showClose]="false"></ds-chip>
      </div>
    `,
  }),
};

// ─── Individual state stories ─────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { state: 'default', label: 'Label' },
};

export const Active: Story = {
  name: 'Active',
  args: { state: 'active', label: 'Active' },
};

export const Error: Story = {
  name: 'Error',
  args: { state: 'error', label: 'Cancelled' },
};

export const Warning: Story = {
  name: 'Warning',
  args: { state: 'warning', label: 'Warning' },
};

export const InProcess: Story = {
  name: 'In Process',
  args: { state: 'in-process', label: 'Notification' },
};

export const Ai: Story = {
  name: 'AI',
  args: { state: 'ai', label: 'AI Tag', badgeColor: '#7d58da' },
};
