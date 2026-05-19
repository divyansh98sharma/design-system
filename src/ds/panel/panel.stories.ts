import type { Meta, StoryObj } from '@storybook/angular';
import { PanelComponent } from './panel.component';

const meta: Meta<PanelComponent> = {
  title: 'Components/Panel',
  component: PanelComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Side-aligned panel container with directional drop shadow. Three variants: `left` and `right` (compact 154 px frames) and `filters` (300 px frame for filter UIs).',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['left', 'right', 'filters'],
    },
    width: { control: 'text' },
  },
  args: {
    orientation: 'left',
  },
};

export default meta;
type Story = StoryObj<PanelComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height:280px;display:flex;align-items:flex-start;background:#fafafa;padding:24px">
        <ds-panel [orientation]="orientation" [width]="width">
          <div style="height:140px"></div>
        </ds-panel>
      </div>
    `,
  }),
};

export const Left: Story = {
  args: { orientation: 'left' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:240px;display:flex;background:#fafafa;padding:24px">
        <ds-panel [orientation]="orientation">
          <p style="margin:0;font:400 12px/16px Inter,sans-serif;color:#4b4b4b">Left panel content</p>
        </ds-panel>
      </div>
    `,
  }),
};

export const Right: Story = {
  args: { orientation: 'right' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:240px;display:flex;justify-content:flex-end;background:#fafafa;padding:24px">
        <ds-panel [orientation]="orientation">
          <p style="margin:0;font:400 12px/16px Inter,sans-serif;color:#4b4b4b">Right panel content</p>
        </ds-panel>
      </div>
    `,
  }),
};

export const Filters: Story = {
  args: { orientation: 'filters' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:360px;display:flex;background:#fafafa;padding:24px">
        <ds-panel [orientation]="orientation">
          <div style="display:flex;flex-direction:column;gap:8px;font:400 12px/16px Inter,sans-serif;color:#4b586b">
            <label>Label
              <input style="display:block;width:100%;border:none;border-bottom:0.5px solid #4b586b;padding:4px 0;font:inherit" placeholder="Search" />
            </label>
            <label>Label
              <input style="display:block;width:100%;border:none;border-bottom:0.5px solid #4b586b;padding:4px 0;font:inherit" placeholder="Search" />
            </label>
            <div style="display:flex;gap:8px;background:#e6f4f3;padding:8px 12px;border-radius:8px">
              <button style="flex:1;background:#fbfbfb;border:0;padding:4px 8px;border-radius:4px;font:inherit">Save Filters</button>
              <button style="flex:1;background:#007b95;color:#fff;border:0;padding:4px 8px;border-radius:4px;font:inherit">Filter</button>
              <button style="flex:1;background:#fbfbfb;border:0;padding:4px 8px;border-radius:4px;font:inherit">Cancel</button>
            </div>
          </div>
        </ds-panel>
      </div>
    `,
  }),
};

export const CustomWidth: Story = {
  args: { orientation: 'left', width: '220px' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:200px;display:flex;background:#fafafa;padding:24px">
        <ds-panel [orientation]="orientation" [width]="width">
          <p style="margin:0;font:400 12px/16px Inter,sans-serif;color:#4b4b4b">Custom 220px panel</p>
        </ds-panel>
      </div>
    `,
  }),
};
