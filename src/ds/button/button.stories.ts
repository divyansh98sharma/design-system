import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="2" width="5" height="5" rx="1"/>
  <rect x="9" y="2" width="5" height="5" rx="1"/>
  <rect x="2" y="9" width="5" height="5" rx="1"/>
  <rect x="9" y="9" width="5" height="5" rx="1"/>
</svg>`;

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Core interactive button. Supports **3 variants** (filled, outlined, ghost), ' +
          '**6 color themes** derived from Figma design tokens, **3 sizes**, ' +
          'and optional icon placement (left, right, or icon-only).',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Button label text.',
      control: 'text',
      table: { defaultValue: { summary: 'Label' } },
    },
    variant: {
      description:
        '**filled** — solid background. **outlined** — white background with colored border. **ghost** — transparent with colored text.',
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      table: { defaultValue: { summary: 'filled' } },
    },
    color: {
      description:
        'Color theme drawn from the design token palette. `secondary` produces a neutral gray outlined or ghost button.',
      control: 'select',
      options: ['user', 'admin', 'secondary', 'success', 'error', 'sunoh'],
      table: { defaultValue: { summary: 'user' } },
    },
    size: {
      description: '**sm** — 24 px height. **md** — 32 px (default). **lg** — 40 px.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    icon: {
      description: 'Inline SVG string rendered inside the button. Sanitized automatically.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    iconPosition: {
      description:
        '**left** — icon precedes label. **right** — icon follows label. **only** — hides label, renders icon only (square button).',
      control: 'select',
      options: ['left', 'right', 'only'],
      table: { defaultValue: { summary: 'left' } },
    },
    disabled: {
      description: 'Disables interaction and applies the disabled visual state.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    buttonClick: {
      description: 'Emits a `MouseEvent` when the button is clicked (not emitted when disabled).',
      table: { category: 'Events' },
    },
  },
  args: {
    label: 'Label',
    variant: 'filled',
    color: 'user',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Use the Controls panel below to interactively configure every prop.' } },
  },
};

// ─── Overview (matches Figma top row) ────────────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: {
      description: {
        story: 'All 10 top-level variants from the Figma Buttons spec sheet.',
      },
    },
  },
  render: () => ({
    props: { icon: ICON_SVG },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:16px;border:1px solid #e1e1e1;border-radius:8px">
        <ds-button label="Label" variant="filled"   color="user"      size="md"></ds-button>
        <ds-button label="Label" variant="filled"   color="admin"     size="md"></ds-button>
        <ds-button label="Label" variant="outlined" color="secondary" size="md"></ds-button>
        <ds-button label="Label" variant="outlined" color="user"      size="md" [icon]="icon" iconPosition="left"></ds-button>
        <ds-button label="Label" variant="ghost"    color="secondary" size="md"></ds-button>
        <ds-button label="Label" variant="filled"   color="success"   size="md"></ds-button>
        <ds-button label="Label" variant="filled"   color="error"     size="md"></ds-button>
        <ds-button label="Label" variant="filled"   color="sunoh"     size="md"></ds-button>
        <ds-button label="Label" variant="ghost"    color="user"      size="md"></ds-button>
        <ds-button label="Label" variant="ghost"    color="admin"     size="md"></ds-button>
      </div>
    `,
  }),
};

// ─── Filled ───────────────────────────────────────────────────────────────────

export const Filled: Story = {
  name: 'Filled',
  parameters: {
    docs: { description: { story: 'Solid background. Use for primary actions.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="User"    variant="filled" color="user"      size="md"></ds-button>
        <ds-button label="Admin"   variant="filled" color="admin"     size="md"></ds-button>
        <ds-button label="Success" variant="filled" color="success"   size="md"></ds-button>
        <ds-button label="Error"   variant="filled" color="error"     size="md"></ds-button>
        <ds-button label="Sunoh"   variant="filled" color="sunoh"     size="md"></ds-button>
        <ds-button label="Neutral" variant="filled" color="secondary" size="md"></ds-button>
      </div>
    `,
  }),
};

// ─── Outlined ────────────────────────────────────────────────────────────────

export const Outlined: Story = {
  name: 'Outlined',
  parameters: {
    docs: { description: { story: 'White background with a colored border. Use for secondary actions.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="User"      variant="outlined" color="user"      size="md"></ds-button>
        <ds-button label="Secondary" variant="outlined" color="secondary" size="md"></ds-button>
        <ds-button label="Admin"     variant="outlined" color="admin"     size="md"></ds-button>
        <ds-button label="Success"   variant="outlined" color="success"   size="md"></ds-button>
        <ds-button label="Error"     variant="outlined" color="error"     size="md"></ds-button>
        <ds-button label="Sunoh"     variant="outlined" color="sunoh"     size="md"></ds-button>
      </div>
    `,
  }),
};

// ─── Ghost ────────────────────────────────────────────────────────────────────

export const Ghost: Story = {
  name: 'Ghost',
  parameters: {
    docs: { description: { story: 'No background or border — colored text only. Use for tertiary/inline actions.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="User"      variant="ghost" color="user"      size="md"></ds-button>
        <ds-button label="Admin"     variant="ghost" color="admin"     size="md"></ds-button>
        <ds-button label="Secondary" variant="ghost" color="secondary" size="md"></ds-button>
        <ds-button label="Success"   variant="ghost" color="success"   size="md"></ds-button>
        <ds-button label="Error"     variant="ghost" color="error"     size="md"></ds-button>
        <ds-button label="Sunoh"     variant="ghost" color="sunoh"     size="md"></ds-button>
      </div>
    `,
  }),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    docs: { description: { story: '`sm` = 24 px · `md` = 32 px · `lg` = 40 px.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
        <ds-button label="Small"  variant="filled" color="user" size="sm"></ds-button>
        <ds-button label="Medium" variant="filled" color="user" size="md"></ds-button>
        <ds-button label="Large"  variant="filled" color="user" size="lg"></ds-button>
      </div>
    `,
  }),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'With Icons',
  parameters: {
    docs: { description: { story: 'Pass an inline SVG to `icon` and set `iconPosition` to `left` or `right`.' } },
  },
  render: () => ({
    props: { icon: ICON_SVG },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="Icon Left"  variant="filled"   color="user"      size="md" [icon]="icon" iconPosition="left"></ds-button>
        <ds-button label="Icon Right" variant="filled"   color="admin"     size="md" [icon]="icon" iconPosition="right"></ds-button>
        <ds-button label="Outlined"   variant="outlined" color="user"      size="md" [icon]="icon" iconPosition="left"></ds-button>
        <ds-button label="Ghost"      variant="ghost"    color="user"      size="md" [icon]="icon" iconPosition="left"></ds-button>
      </div>
    `,
  }),
};

// ─── Icon Only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: 'Icon Only',
  parameters: {
    docs: { description: { story: 'Set `iconPosition="only"` for square icon buttons. Label is used as `aria-label`.' } },
  },
  render: () => ({
    props: { icon: ICON_SVG },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button variant="filled"   color="user"      size="lg" [icon]="icon" iconPosition="only" label="User"></ds-button>
        <ds-button variant="filled"   color="admin"     size="lg" [icon]="icon" iconPosition="only" label="Admin"></ds-button>
        <ds-button variant="outlined" color="secondary" size="lg" [icon]="icon" iconPosition="only" label="Secondary"></ds-button>
        <ds-button variant="outlined" color="user"      size="lg" [icon]="icon" iconPosition="only" label="User outlined"></ds-button>
        <ds-button variant="filled"   color="success"   size="lg" [icon]="icon" iconPosition="only" label="Success"></ds-button>
        <ds-button variant="filled"   color="error"     size="lg" [icon]="icon" iconPosition="only" label="Error"></ds-button>
        <ds-button variant="filled"   color="sunoh"     size="lg" [icon]="icon" iconPosition="only" label="Sunoh"></ds-button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:12px">
        <ds-button variant="filled"   color="user"      size="sm" [icon]="icon" iconPosition="only" label="User sm"></ds-button>
        <ds-button variant="filled"   color="admin"     size="sm" [icon]="icon" iconPosition="only" label="Admin sm"></ds-button>
        <ds-button variant="outlined" color="secondary" size="sm" [icon]="icon" iconPosition="only" label="Secondary sm"></ds-button>
        <ds-button variant="filled"   color="success"   size="sm" [icon]="icon" iconPosition="only" label="Success sm"></ds-button>
        <ds-button variant="filled"   color="error"     size="sm" [icon]="icon" iconPosition="only" label="Error sm"></ds-button>
        <ds-button variant="filled"   color="sunoh"     size="sm" [icon]="icon" iconPosition="only" label="Sunoh sm"></ds-button>
      </div>
    `,
  }),
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  parameters: {
    docs: { description: { story: 'All variants show the same disabled state: muted border and text, no pointer events.' } },
  },
  render: () => ({
    props: { icon: ICON_SVG },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <ds-button label="Filled"   variant="filled"   color="user"      size="md" [disabled]="true"></ds-button>
        <ds-button label="Outlined" variant="outlined" color="secondary" size="md" [disabled]="true"></ds-button>
        <ds-button label="Ghost"    variant="ghost"    color="user"      size="md" [disabled]="true"></ds-button>
        <ds-button variant="filled" color="user"       size="md" [icon]="icon" iconPosition="only" label="icon" [disabled]="true"></ds-button>
      </div>
    `,
  }),
};
