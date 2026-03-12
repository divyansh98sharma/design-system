import type { Meta, StoryObj } from '@storybook/angular';
import { InfoTooltipComponent } from './info-tooltip.component';

const meta: Meta<InfoTooltipComponent> = {
  title: 'Components/Info Tooltip',
  component: InfoTooltipComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An ⓘ info icon that reveals a tooltip bubble on **hover** or **focus**. ' +
          'The icon turns `user-blue` on interaction.\n\n' +
          'Accepts the same **12 `position` values** as `ds-tooltip` — ' +
          'they control which side the bubble appears on and where the caret sits.\n\n' +
          'Drop-in usage: `<ds-info-tooltip tooltipText="…" position="top-left"></ds-info-tooltip>`',
      },
    },
  },
  argTypes: {
    tooltipText: {
      description: 'Text displayed inside the tooltip bubble on hover.',
      control: 'text',
      table: { defaultValue: { summary: 'A simple text popup tip.' } },
    },
    position: {
      description: 'Caret position — same 12 options as `ds-tooltip`.',
      control: 'select',
      options: [
        'top-left', 'top-center', 'top-right',
        'right-top', 'right-center', 'right-bottom',
        'bottom-left', 'bottom-center', 'bottom-right',
        'left-top', 'left-center', 'left-bottom',
      ],
      table: { defaultValue: { summary: 'top-left' } },
    },
  },
  args: {
    tooltipText: 'A simple text popup tip.',
    position: 'top-left',
  },
};

export default meta;
type Story = StoryObj<InfoTooltipComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'Hover the icon to see the tooltip. Use Controls to change the position and text.',
      },
    },
  },
};

// ─── All 12 positions ─────────────────────────────────────────────────────────

export const AllPositions: Story = {
  name: 'All 12 Positions',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Hover each icon to preview the tooltip bubble at all 12 caret positions. Each cell shows the position label.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:40px">

        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px;margin:0 0 16px">Bubble below icon (top- caret)</p>
          <div style="display:flex;gap:40px;align-items:center">
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="top-left"   tooltipText="Top Left"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">top-left</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="top-center" tooltipText="Top Center"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">top-center</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="top-right"  tooltipText="Top Right"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">top-right</span>
            </div>
          </div>
        </div>

        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px;margin:0 0 16px">Bubble above icon (bottom- caret)</p>
          <div style="display:flex;gap:40px;align-items:center">
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="bottom-left"   tooltipText="Bottom Left"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">bottom-left</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="bottom-center" tooltipText="Bottom Center"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">bottom-center</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="bottom-right"  tooltipText="Bottom Right"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">bottom-right</span>
            </div>
          </div>
        </div>

        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px;margin:0 0 16px">Bubble to the right (left- caret)</p>
          <div style="display:flex;gap:40px;align-items:center">
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="left-top"    tooltipText="Left Top"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">left-top</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="left-center" tooltipText="Left Center"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">left-center</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="left-bottom" tooltipText="Left Bottom"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">left-bottom</span>
            </div>
          </div>
        </div>

        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px;margin:0 0 16px">Bubble to the left (right- caret)</p>
          <div style="display:flex;gap:40px;align-items:center">
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="right-top"    tooltipText="Right Top"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">right-top</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="right-center" tooltipText="Right Center"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">right-center</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <ds-info-tooltip position="right-bottom" tooltipText="Right Bottom"></ds-info-tooltip>
              <span style="font-size:10px;color:#969696">right-bottom</span>
            </div>
          </div>
        </div>

      </div>
    `,
  }),
};

// ─── Inline usage ─────────────────────────────────────────────────────────────

export const InlineUsage: Story = {
  name: 'Inline Usage',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'The info icon sits inline with form labels or descriptive text.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;font-size:12px;font-family:'Open Sans',sans-serif">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-weight:600">API Rate Limit</span>
          <ds-info-tooltip
            position="top-left"
            tooltipText="Maximum number of API calls per minute. Exceeding this limit will throttle your requests."
          ></ds-info-tooltip>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-weight:600">Retention Period</span>
          <ds-info-tooltip
            position="top-left"
            tooltipText="How long your data is stored before automatic deletion."
          ></ds-info-tooltip>
        </div>
      </div>
    `,
  }),
};
