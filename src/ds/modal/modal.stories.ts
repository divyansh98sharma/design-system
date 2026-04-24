import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const BODY_CONTENT = `
  <div style="padding:16px;font-family:'Open Sans',system-ui,sans-serif;font-size:12px;line-height:16px;color:#000">
    <p style="margin:0 0 12px">This is the modal body content area. It is fully scrollable when content exceeds the available height.</p>
    <p style="margin:0 0 12px">Use <code>&lt;ng-content&gt;</code> to project any content — forms, tables, data grids, or rich layouts — into this area.</p>
    <p style="margin:0">Project header action buttons via <code>[header-actions]</code> content slot.</p>
  </div>
`;

const LONG_BODY = `
  <div style="padding:16px;font-family:'Open Sans',system-ui,sans-serif;font-size:12px;line-height:16px;color:#000">
    ${Array(20).fill('<p style="margin:0 0 8px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>').join('')}
  </div>
`;

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Modal dialog shell — themed header, scrollable body, fixed footer.\n\n' +
          '**2 themes:** `primary` (teal) · `secondary` (orange).\n\n' +
          '**5 sizes** (width × height):\n' +
          '- `small` → 420 × 420 px\n' +
          '- `medium` → 720 × 620 px\n' +
          '- `large` → 1000 × 620 px\n' +
          '- `xlarge` → 1240 × 620 px\n' +
          '- `xxlarge` → 1340 × 620 px\n\n' +
          '**Content projection:**\n' +
          '- Default slot → body content.\n' +
          '- `[header-actions]` → buttons/chips in the header bar (between heading and close).\n\n' +
          '**Footer** — `footerLeftActions` (secondary/cancel) and `footerRightActions` (save/primary) are ' +
          'configured via `@Input` arrays of `ModalAction` objects.',
      },
    },
  },
  argTypes: {
    theme: {
      description: 'Colour theme for the header bar and primary action buttons.',
      control: 'select',
      options: ['primary', 'secondary'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      description: 'Width × height size variant.',
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge', 'xxlarge'],
      table: { defaultValue: { summary: 'medium' } },
    },
    heading: {
      description: 'Heading text in the modal header.',
      control: 'text',
      table: { defaultValue: { summary: 'Heading' } },
    },
    showDirtyFlag: {
      description: 'Show a yellow warning icon to indicate unsaved changes.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    footerLeftActions: {
      description: 'Buttons on the left side of the footer (typically Cancel / secondary).',
    },
    footerRightActions: {
      description: 'Buttons on the right side of the footer (typically Save / primary + secondary).',
    },
    closed: {
      description: 'Emits when the header close (×) button is clicked or Escape is pressed.',
      table: { category: 'Events' },
    },
    actionClick: {
      description: 'Emits the action value (or label) when a footer button is clicked.',
      table: { category: 'Events' },
    },
  },
  args: {
    theme: 'primary',
    size: 'medium',
    heading: 'Patient Record',
    showDirtyFlag: false,
    footerLeftActions: [{ label: 'Cancel', variant: 'secondary' }],
    footerRightActions: [
      { label: 'Save', variant: 'primary' },
      { label: 'Close', variant: 'secondary' },
    ],
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Configure all props via the Controls panel.' } },
  },
  render: (args) => ({
    props: { ...args, bodyHtml: BODY_CONTENT },
    template: `
      <ds-modal
        [theme]="theme"
        [size]="size"
        [heading]="heading"
        [showDirtyFlag]="showDirtyFlag"
        [footerLeftActions]="footerLeftActions"
        [footerRightActions]="footerRightActions"
      >
        <div [innerHTML]="bodyHtml"></div>
      </ds-modal>
    `,
  }),
};

// ─── Themes ───────────────────────────────────────────────────────────────────

export const Themes: Story = {
  name: 'Themes',
  parameters: {
    docs: {
      description: {
        story: 'Both colour themes applied to the modal header and primary footer button.',
      },
    },
  },
  render: () => ({
    props: {
      bodyHtml: BODY_CONTENT,
      leftActions: [{ label: 'Cancel', variant: 'secondary' }],
      rightActions: [{ label: 'Save', variant: 'primary' }, { label: 'Close', variant: 'secondary' }],
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-start">
        <ds-modal theme="primary"   size="small" heading="Primary Theme"   [footerLeftActions]="leftActions" [footerRightActions]="rightActions">
          <div [innerHTML]="bodyHtml"></div>
        </ds-modal>
        <ds-modal theme="secondary" size="small" heading="Secondary Theme" [footerLeftActions]="leftActions" [footerRightActions]="rightActions">
          <div [innerHTML]="bodyHtml"></div>
        </ds-modal>
      </div>
    `,
  }),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    docs: {
      description: {
        story: 'All 5 size variants: small (420×420), medium (720×620), large (1000×620), xlarge (1240×620), xxlarge (1340×620).',
      },
    },
  },
  render: () => ({
    props: {
      bodyHtml: BODY_CONTENT,
      leftActions: [{ label: 'Cancel', variant: 'secondary' }],
      rightActions: [{ label: 'Save', variant: 'primary' }],
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px">
        <div>
          <p style="font-size:11px;font-family:'Open Sans',sans-serif;margin:0 0 4px;color:#666">Small — 420 × 420</p>
          <ds-modal theme="primary" size="small" heading="Small Modal" [footerLeftActions]="leftActions" [footerRightActions]="rightActions">
            <div [innerHTML]="bodyHtml"></div>
          </ds-modal>
        </div>
        <div>
          <p style="font-size:11px;font-family:'Open Sans',sans-serif;margin:0 0 4px;color:#666">Medium — 720 × 620</p>
          <ds-modal theme="primary" size="medium" heading="Medium Modal" [footerLeftActions]="leftActions" [footerRightActions]="rightActions">
            <div [innerHTML]="bodyHtml"></div>
          </ds-modal>
        </div>
      </div>
    `,
  }),
};

// ─── With Dirty Flag ──────────────────────────────────────────────────────────

export const WithDirtyFlag: Story = {
  name: 'With Dirty Flag',
  parameters: {
    docs: {
      description: {
        story: 'The yellow ⚠ dirty flag icon appears when `showDirtyFlag=true`, indicating unsaved changes.',
      },
    },
  },
  args: {
    theme: 'primary',
    size: 'medium',
    heading: 'Edit Patient Record',
    showDirtyFlag: true,
    footerLeftActions: [{ label: 'Discard', variant: 'secondary' }],
    footerRightActions: [
      { label: 'Save Changes', variant: 'primary' },
      { label: 'Cancel', variant: 'secondary' },
    ],
  },
  render: (args) => ({
    props: { ...args, bodyHtml: BODY_CONTENT },
    template: `
      <ds-modal
        [theme]="theme"
        [size]="size"
        [heading]="heading"
        [showDirtyFlag]="showDirtyFlag"
        [footerLeftActions]="footerLeftActions"
        [footerRightActions]="footerRightActions"
      >
        <div [innerHTML]="bodyHtml"></div>
      </ds-modal>
    `,
  }),
};

// ─── Scrollable Body ──────────────────────────────────────────────────────────

export const ScrollableBody: Story = {
  name: 'Scrollable Body',
  parameters: {
    docs: {
      description: {
        story:
          'When body content exceeds the available height, it scrolls independently while the header and footer stay fixed.',
      },
    },
  },
  render: () => ({
    props: {
      bodyHtml: LONG_BODY,
      leftActions: [{ label: 'Cancel', variant: 'secondary' }],
      rightActions: [{ label: 'Save', variant: 'primary' }],
    },
    template: `
      <ds-modal
        theme="primary"
        size="medium"
        heading="Long Content Modal"
        [footerLeftActions]="leftActions"
        [footerRightActions]="rightActions"
      >
        <div [innerHTML]="bodyHtml"></div>
      </ds-modal>
    `,
  }),
};

// ─── Secondary theme ──────────────────────────────────────────────────────────

export const SecondaryTheme: Story = {
  name: 'Secondary Theme',
  parameters: {
    docs: { description: { story: 'Secondary theme — orange header and primary button.' } },
  },
  args: {
    theme: 'secondary',
    size: 'medium',
    heading: 'System Configuration',
    footerLeftActions: [{ label: 'Cancel', variant: 'secondary' }],
    footerRightActions: [
      { label: 'Apply', variant: 'primary' },
      { label: 'Close', variant: 'secondary' },
    ],
  },
  render: (args) => ({
    props: { ...args, bodyHtml: BODY_CONTENT },
    template: `
      <ds-modal
        [theme]="theme"
        [size]="size"
        [heading]="heading"
        [footerLeftActions]="footerLeftActions"
        [footerRightActions]="footerRightActions"
      >
        <div [innerHTML]="bodyHtml"></div>
      </ds-modal>
    `,
  }),
};
