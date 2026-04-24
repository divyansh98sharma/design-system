import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleButtonGroupComponent } from './toggle-button-group.component';

// ─── Shared icon SVGs ─────────────────────────────────────────────────────────

const ICON_LIST = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="4" x2="13" y2="4"/><line x1="3" y1="8" x2="13" y2="8"/><line x1="3" y1="12" x2="13" y2="12"/></svg>`;

const ICON_GRID = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="5" height="5" rx="0.5"/><rect x="9" y="2" width="5" height="5" rx="0.5"/><rect x="2" y="9" width="5" height="5" rx="0.5"/><rect x="9" y="9" width="5" height="5" rx="0.5"/></svg>`;

const ICON_COLUMNS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="5" height="12" rx="0.5"/><rect x="9" y="2" width="5" height="12" rx="0.5"/></svg>`;

const ICON_ROWS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="5" rx="0.5"/><rect x="2" y="9" width="12" height="5" rx="0.5"/></svg>`;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<ToggleButtonGroupComponent> = {
  title: 'Components/Toggle Button Group',
  component: ToggleButtonGroupComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A connected group of toggle buttons — similar to a segmented control or radio group. ' +
          'Supports **3 color themes**, **3 sizes**, **single and multiple selection** modes, ' +
          'count badges, user-supplied icons, and disabled states. ' +
          'The selected button automatically shows a checkmark icon (label buttons) or a filled background (icon-only buttons).',
      },
    },
  },
  argTypes: {
    options: {
      description:
        'Array of `ToggleButtonItem` objects defining the buttons. Each item may have `value`, `label`, `count`, `icon`, and `disabled` fields.',
      control: 'object',
      table: { defaultValue: { summary: '[]' } },
    },
    color: {
      description:
        'Color theme for the group border and selected-state fill: ' +
        '`primary` (teal), `secondary` (orange), `error` (red).',
      control: 'select',
      options: ['primary', 'secondary', 'error'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      description: '**sm** — 24 px height · **md** — 32 px (default) · **lg** — 40 px.',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    multiple: {
      description:
        'When `true`, multiple buttons can be active simultaneously (checkbox-style). ' +
        'When `false` (default), selection is mutually exclusive (radio-style).',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      description: 'Disables all buttons in the group.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    value: {
      description:
        'Currently selected value (`string`) or values (`string[]` when `multiple = true`). ' +
        'Two-way bindable via `(valueChange)`.',
      control: 'text',
      table: { defaultValue: { summary: "''" } },
    },
    valueChange: {
      description: 'Emits the new selected value or array of values on each toggle.',
      table: { category: 'Events' },
    },
  },
  args: {
    options: [
      { value: 'a', label: 'Day' },
      { value: 'b', label: 'Week' },
      { value: 'c', label: 'Month' },
    ],
    color: 'primary',
    size: 'md',
    multiple: false,
    disabled: false,
    value: 'a',
  },
};

export default meta;
type Story = StoryObj<ToggleButtonGroupComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: { story: 'Use the Controls panel to interactively configure every prop.' },
    },
  },
};

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: {
      description: {
        story:
          'All 3 color themes shown in their default `md` size with one item pre-selected.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;border:1px solid #e1e1e1;border-radius:8px;">
        <ds-toggle-button-group color="primary"   size="md" value="b"
          [options]="[{value:'a',label:'Day'},{value:'b',label:'Week'},{value:'c',label:'Month'}]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="secondary" size="md" value="b"
          [options]="[{value:'a',label:'Day'},{value:'b',label:'Week'},{value:'c',label:'Month'}]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="error"     size="md" value="b"
          [options]="[{value:'a',label:'Day'},{value:'b',label:'Week'},{value:'c',label:'Month'}]">
        </ds-toggle-button-group>
      </div>
    `,
  }),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    docs: {
      description: { story: '`sm` = 24 px · `md` = 32 px · `lg` = 40 px — all with a 3-button group.' },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <ds-toggle-button-group color="primary" size="sm" value="b"
          [options]="[{value:'a',label:'Small'},{value:'b',label:'Week'},{value:'c',label:'Month'}]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="primary" size="md" value="b"
          [options]="[{value:'a',label:'Medium'},{value:'b',label:'Week'},{value:'c',label:'Month'}]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="primary" size="lg" value="b"
          [options]="[{value:'a',label:'Large'},{value:'b',label:'Week'},{value:'c',label:'Month'}]">
        </ds-toggle-button-group>
      </div>
    `,
  }),
};

// ─── With Count Badges ────────────────────────────────────────────────────────

export const WithCountBadges: Story = {
  name: 'With Count Badges',
  parameters: {
    docs: {
      description: {
        story: 'Add a numeric `count` to any option to display a parenthetical badge — e.g. "Unread (12)".',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <ds-toggle-button-group color="primary" size="md" value="all"
          [options]="[
            {value:'all',   label:'All',     count:99},
            {value:'unread',label:'Unread',  count:12},
            {value:'read',  label:'Read',    count:87}
          ]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="secondary" size="md" value="unread"
          [options]="[
            {value:'all',   label:'All',     count:99},
            {value:'unread',label:'Unread',  count:12},
            {value:'read',  label:'Read',    count:87}
          ]">
        </ds-toggle-button-group>
      </div>
    `,
  }),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'With Icons',
  parameters: {
    docs: {
      description: {
        story: 'Provide an inline SVG via `icon` on each option — displayed alongside the label.',
      },
    },
  },
  render: () => ({
    props: {
      iconList: ICON_LIST,
      iconGrid: ICON_GRID,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <ds-toggle-button-group color="primary" size="md" value="list"
          [options]="[
            {value:'list',    label:'List',    icon: iconList},
            {value:'grid',    label:'Grid',    icon: iconGrid}
          ]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="secondary" size="md" value="list"
          [options]="[
            {value:'list',    label:'List',    icon: iconList},
            {value:'grid',    label:'Grid',    icon: iconGrid}
          ]">
        </ds-toggle-button-group>
      </div>
    `,
  }),
};

// ─── Icon Only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: 'Icon Only',
  parameters: {
    docs: {
      description: {
        story: 'Omit `label` and supply only `icon` for compact icon-only toggle buttons.',
      },
    },
  },
  render: () => ({
    props: {
      iconList:    ICON_LIST,
      iconGrid:    ICON_GRID,
      iconColumns: ICON_COLUMNS,
      iconRows:    ICON_ROWS,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <div style="display:flex;gap:16px;align-items:center">
          <ds-toggle-button-group color="primary" size="sm" value="list"
            [options]="[{value:'list',icon:iconList},{value:'grid',icon:iconGrid}]">
          </ds-toggle-button-group>

          <ds-toggle-button-group color="primary" size="md" value="list"
            [options]="[{value:'list',icon:iconList},{value:'grid',icon:iconGrid}]">
          </ds-toggle-button-group>

          <ds-toggle-button-group color="primary" size="lg" value="list"
            [options]="[{value:'list',icon:iconList},{value:'grid',icon:iconGrid}]">
          </ds-toggle-button-group>
        </div>

        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <ds-toggle-button-group color="primary"   size="md" value="list"
            [options]="[{value:'list',icon:iconList},{value:'grid',icon:iconGrid},{value:'cols',icon:iconColumns},{value:'rows',icon:iconRows}]">
          </ds-toggle-button-group>

          <ds-toggle-button-group color="secondary" size="md" value="grid"
            [options]="[{value:'list',icon:iconList},{value:'grid',icon:iconGrid},{value:'cols',icon:iconColumns},{value:'rows',icon:iconRows}]">
          </ds-toggle-button-group>

          <ds-toggle-button-group color="error"     size="md" value="rows"
            [options]="[{value:'list',icon:iconList},{value:'grid',icon:iconGrid},{value:'cols',icon:iconColumns},{value:'rows',icon:iconRows}]">
          </ds-toggle-button-group>
        </div>
      </div>
    `,
  }),
};

// ─── Multiple Selection ───────────────────────────────────────────────────────

export const MultipleSelection: Story = {
  name: 'Multiple Selection',
  parameters: {
    docs: {
      description: {
        story:
          'Set `multiple="true"` to allow any number of buttons to be active simultaneously. ' +
          'Bind `value` to a `string[]`.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <ds-toggle-button-group color="primary" size="md" [multiple]="true" [value]="['b','d']"
          [options]="[
            {value:'a',label:'Mon'},
            {value:'b',label:'Tue'},
            {value:'c',label:'Wed'},
            {value:'d',label:'Thu'},
            {value:'e',label:'Fri'}
          ]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="secondary" size="md" [multiple]="true" [value]="['b','d']"
          [options]="[
            {value:'a',label:'Mon'},
            {value:'b',label:'Tue'},
            {value:'c',label:'Wed'},
            {value:'d',label:'Thu'},
            {value:'e',label:'Fri'}
          ]">
        </ds-toggle-button-group>
      </div>
    `,
  }),
};

// ─── Group Sizes (2 / 3 / 4 buttons) ─────────────────────────────────────────

export const GroupSizes: Story = {
  name: 'Group Sizes',
  parameters: {
    docs: {
      description: {
        story: 'Supports 2, 3, or 4 buttons per group — the container adapts its width automatically.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <ds-toggle-button-group color="primary" size="md" value="b"
          [options]="[{value:'a',label:'Day'},{value:'b',label:'Week'}]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="primary" size="md" value="b"
          [options]="[{value:'a',label:'Day'},{value:'b',label:'Week'},{value:'c',label:'Month'}]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="primary" size="md" value="c"
          [options]="[
            {value:'a',label:'Day'},
            {value:'b',label:'Week'},
            {value:'c',label:'Month'},
            {value:'d',label:'Year'}
          ]">
        </ds-toggle-button-group>
      </div>
    `,
  }),
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story:
          'Set `disabled` on the group to disable all buttons, or on individual `ToggleButtonItem` ' +
          'objects to disable specific options.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <ds-toggle-button-group color="primary" size="md" value="b" [disabled]="true"
          [options]="[{value:'a',label:'Day'},{value:'b',label:'Week'},{value:'c',label:'Month'}]">
        </ds-toggle-button-group>

        <ds-toggle-button-group color="secondary" size="md" value="a"
          [options]="[
            {value:'a',label:'Day'},
            {value:'b',label:'Week',  disabled:true},
            {value:'c',label:'Month', disabled:true}
          ]">
        </ds-toggle-button-group>
      </div>
    `,
  }),
};

// ─── All Colors × All Sizes Matrix ───────────────────────────────────────────

export const ColorSizeMatrix: Story = {
  name: 'Color × Size Matrix',
  parameters: {
    docs: {
      description: {
        story:
          'Full cross-product of all 3 color themes and 3 sizes, with one button pre-selected in each group.',
      },
    },
  },
  render: () => ({
    template: `
      <table style="border-collapse:separate;border-spacing:12px">
        <thead>
          <tr>
            <th style="text-align:left;font-family:sans-serif;font-size:12px;color:#666;padding-bottom:4px">Color</th>
            <th style="text-align:left;font-family:sans-serif;font-size:12px;color:#666;padding-bottom:4px">sm</th>
            <th style="text-align:left;font-family:sans-serif;font-size:12px;color:#666;padding-bottom:4px">md</th>
            <th style="text-align:left;font-family:sans-serif;font-size:12px;color:#666;padding-bottom:4px">lg</th>
          </tr>
        </thead>
        <tbody>
          @for (color of ['primary','secondary','error']; track color) {
            <tr>
              <td style="font-family:sans-serif;font-size:12px;color:#444;padding-right:8px">{{color}}</td>
              @for (size of ['sm','md','lg']; track size) {
                <td>
                  <ds-toggle-button-group [color]="color" [size]="size" value="b"
                    [options]="[{value:'a',label:'A'},{value:'b',label:'B'},{value:'c',label:'C'}]">
                  </ds-toggle-button-group>
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    `,
  }),
};
