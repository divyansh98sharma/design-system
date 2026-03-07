import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipComponent } from './tooltip.component';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip bubble with **12 caret positions** matching the Figma spec. ' +
          'The caret (arrow) is drawn with a pure CSS border-triangle — no image assets required.\n\n' +
          '**Position naming**: `{edge}-{alignment}` where _edge_ is the side the caret appears on, ' +
          'and _alignment_ is where it sits along that edge.\n\n' +
          '```\n' +
          'top-left | top-center | top-right       → bubble below trigger\n' +
          'bottom-left | bottom-center | bottom-right → bubble above trigger\n' +
          'left-top | left-center | left-bottom     → bubble to the right\n' +
          'right-top | right-center | right-bottom  → bubble to the left\n' +
          '```\n\n' +
          'In a real page, wrap your trigger with `position:relative` and absolutely position `<ds-tooltip>` next to it.',
      },
    },
  },
  argTypes: {
    text: {
      description: 'Text content inside the bubble.',
      control: 'text',
      table: { defaultValue: { summary: 'A simple text popup tip.' } },
    },
    position: {
      description: 'Which edge & alignment the caret arrow appears on.',
      control: 'select',
      options: [
        'top-left', 'top-center', 'top-right',
        'right-top', 'right-center', 'right-bottom',
        'bottom-left', 'bottom-center', 'bottom-right',
        'left-top', 'left-center', 'left-bottom',
      ],
      table: { defaultValue: { summary: 'top-left' } },
    },
    visible: {
      description: 'Controls bubble visibility.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    text: 'A simple text popup tip.',
    position: 'top-left',
    visible: true,
  },
};

export default meta;
type Story = StoryObj<TooltipComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Configure all props interactively via the Controls panel.' } },
  },
};

// ─── All 12 positions ─────────────────────────────────────────────────────────

export const AllPositions: Story = {
  name: 'All 12 Positions',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Every caret position from the Figma spec, rendered with identical text.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:24px">

        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px;margin:0 0 16px">Top edge (bubble below trigger)</p>
          <div style="display:flex;gap:24px;flex-wrap:wrap">
            <ds-tooltip position="top-left"   text="Top Left"></ds-tooltip>
            <ds-tooltip position="top-center" text="Top Center"></ds-tooltip>
            <ds-tooltip position="top-right"  text="Top Right"></ds-tooltip>
          </div>
        </div>

        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px;margin:0 0 16px">Bottom edge (bubble above trigger)</p>
          <div style="display:flex;gap:24px;flex-wrap:wrap">
            <ds-tooltip position="bottom-left"   text="Bottom Left"></ds-tooltip>
            <ds-tooltip position="bottom-center" text="Bottom Center"></ds-tooltip>
            <ds-tooltip position="bottom-right"  text="Bottom Right"></ds-tooltip>
          </div>
        </div>

        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px;margin:0 0 16px">Left edge (bubble to the right)</p>
          <div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap">
            <ds-tooltip position="left-top"    text="Left Top" style="margin-top:10px"></ds-tooltip>
            <ds-tooltip position="left-center" text="Left Center" style="padding:16px 8px"></ds-tooltip>
            <ds-tooltip position="left-bottom" text="Left Bottom" style="margin-bottom:10px"></ds-tooltip>
          </div>
        </div>

        <div>
          <p style="font-size:11px;font-weight:600;color:#969696;text-transform:uppercase;letter-spacing:.5px;margin:0 0 16px">Right edge (bubble to the left)</p>
          <div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap">
            <ds-tooltip position="right-top"    text="Right Top" style="margin-top:10px"></ds-tooltip>
            <ds-tooltip position="right-center" text="Right Center" style="padding:16px 8px"></ds-tooltip>
            <ds-tooltip position="right-bottom" text="Right Bottom" style="margin-bottom:10px"></ds-tooltip>
          </div>
        </div>
      </div>
    `,
  }),
};

// ─── Long text ────────────────────────────────────────────────────────────────

export const LongText: Story = {
  name: 'Long Text',
  parameters: { docs: { description: { story: 'Tooltip wraps at `max-width: 512px`.' } } },
  args: {
    text: 'This is a longer tooltip with more context. The bubble wraps at 512 px and the caret remains anchored to the specified position.',
    position: 'top-left',
  },
};

// ─── Hover trigger example ────────────────────────────────────────────────────

export const HoverTrigger: Story = {
  name: 'Hover Trigger Pattern',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Example of a hover-triggered tooltip using Angular template variables. ' +
          'In production, use a directive or position the `<ds-tooltip>` absolutely relative to its trigger.',
      },
    },
  },
  render: () => ({
    props: { show: false },
    template: `
      <div style="position:relative;display:inline-block">
        <button
          style="padding:6px 12px;border:1px solid #e1e1e1;border-radius:4px;cursor:pointer;font-size:12px"
          (mouseenter)="show=true"
          (mouseleave)="show=false"
        >Hover me</button>
        <div style="position:absolute;bottom:calc(100% + 8px);left:0">
          <ds-tooltip position="bottom-left" text="Tooltip on hover!" [visible]="show"></ds-tooltip>
        </div>
      </div>
    `,
  }),
};
