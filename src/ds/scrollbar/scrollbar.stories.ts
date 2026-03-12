import type { Meta, StoryObj } from '@storybook/angular';
import { ScrollbarComponent } from './scrollbar.component';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ';

const LONG_LOREM = LOREM.repeat(6);

const meta: Meta<ScrollbarComponent> = {
  title: 'Components/Scrollbar',
  component: ScrollbarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Scrollable wrapper that applies the design-system scrollbar style via `::-webkit-scrollbar` pseudo-elements.\n\n' +
          '**Spec:**\n' +
          '- Track: `#ebebeb` (secondary/base-40), 1 px padding.\n' +
          '- Thumb: `#969696` (secondary/base-70), radius 4 px.\n' +
          '- Width / height: **12 px**.\n' +
          '- Arrow buttons at both ends: 10 × 10 px chevron SVGs.\n\n' +
          '**Usage:** Wrap any content that may overflow with `<ds-scrollbar>`. ' +
          'Set `height` (vertical) or `width` (horizontal) to constrain the visible area.\n\n' +
          '> **Note:** Webkit scrollbar styling is supported in Chromium, Safari, and Edge. ' +
          'Firefox uses `scrollbar-width` / `scrollbar-color` which provides limited styling.',
      },
    },
  },
  argTypes: {
    orientation: {
      description: 'Scroll direction.',
      control: 'select',
      options: ['vertical', 'horizontal'],
      table: { defaultValue: { summary: 'vertical' } },
    },
    height: {
      description: 'CSS height for the vertical scrollable container.',
      control: 'text',
      table: { defaultValue: { summary: '200px' } },
    },
    width: {
      description: 'CSS width for the horizontal scrollable container.',
      control: 'text',
      table: { defaultValue: { summary: '100%' } },
    },
  },
  args: {
    orientation: 'vertical',
    height: '150px',
    width: '300px',
  },
};

export default meta;
type Story = StoryObj<ScrollbarComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Configure orientation and dimensions via the Controls panel.' } },
  },
  render: (args) => ({
    props: { ...args, content: LONG_LOREM },
    template: `
      <ds-scrollbar [orientation]="orientation" [height]="height" [width]="width">
        <div style="padding:8px;font-size:12px;font-family:'Open Sans',sans-serif;white-space:pre-wrap;width:600px">{{ content }}</div>
      </ds-scrollbar>
    `,
  }),
};

// ─── Vertical ─────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  name: 'Vertical',
  parameters: {
    docs: {
      description: {
        story: 'Vertical scroll — 12 px wide scrollbar with up/down chevron arrows.',
      },
    },
  },
  render: () => ({
    props: { content: LONG_LOREM },
    template: `
      <ds-scrollbar orientation="vertical" height="150px" width="400px">
        <div style="padding:8px;font-size:12px;font-family:'Open Sans',sans-serif">{{ content }}</div>
      </ds-scrollbar>
    `,
  }),
};

// ─── Horizontal ───────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  name: 'Horizontal',
  parameters: {
    docs: {
      description: {
        story: 'Horizontal scroll — 12 px tall scrollbar with left/right chevron arrows.',
      },
    },
  },
  render: () => ({
    template: `
      <ds-scrollbar orientation="horizontal" width="300px">
        <div style="padding:8px;font-size:12px;font-family:'Open Sans',sans-serif;white-space:nowrap;width:800px">
          This is a wide content block that requires horizontal scrolling to be fully visible.
          The scrollbar appears at the bottom with left and right arrow buttons.
        </div>
      </ds-scrollbar>
    `,
  }),
};

// ─── Both orientations ────────────────────────────────────────────────────────

export const BothOrientations: Story = {
  name: 'Both Orientations',
  parameters: {
    docs: {
      description: {
        story: 'Vertical and horizontal scrollbars shown together for comparison.',
      },
    },
  },
  render: () => ({
    props: { content: LONG_LOREM },
    template: `
      <div style="display:flex;gap:24px;align-items:flex-start">
        <div>
          <p style="font-size:11px;font-family:'Open Sans',sans-serif;margin:0 0 4px;color:#666">Vertical (12 px wide)</p>
          <ds-scrollbar orientation="vertical" height="150px" width="300px">
            <div style="padding:8px;font-size:12px;font-family:'Open Sans',sans-serif">{{ content }}</div>
          </ds-scrollbar>
        </div>
        <div>
          <p style="font-size:11px;font-family:'Open Sans',sans-serif;margin:0 0 4px;color:#666">Horizontal (12 px tall)</p>
          <ds-scrollbar orientation="horizontal" width="300px">
            <div style="padding:8px;font-size:12px;font-family:'Open Sans',sans-serif;white-space:nowrap;width:700px">
              Wide content — scroll left and right to see the chevron arrow buttons at each end of the track.
            </div>
          </ds-scrollbar>
        </div>
      </div>
    `,
  }),
};

// ─── In a card ────────────────────────────────────────────────────────────────

export const InCard: Story = {
  name: 'In a Card',
  parameters: {
    docs: {
      description: {
        story:
          'Typical usage inside a card or panel with a fixed height. ' +
          'Content taller than the container triggers the styled scrollbar.',
      },
    },
  },
  render: () => ({
    props: { content: LONG_LOREM },
    template: `
      <div style="width:400px;border:1px solid #e1e1e1;border-radius:4px;overflow:hidden">
        <div style="background:#0378a7;color:#fff;padding:8px 12px;font-size:12px;font-family:'Open Sans',sans-serif;font-weight:600">
          Patient Notes
        </div>
        <ds-scrollbar orientation="vertical" height="160px" width="100%">
          <div style="padding:12px;font-size:12px;font-family:'Open Sans',sans-serif;line-height:16px">{{ content }}</div>
        </ds-scrollbar>
      </div>
    `,
  }),
};
