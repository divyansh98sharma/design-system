import { Meta, StoryObj } from '@storybook/angular';
import { SogiComponent } from './sogi.component';

const meta: Meta<SogiComponent> = {
  title    : 'Components/Button/SOGI',
  component: SogiComponent,
  tags     : ['autodocs'],
  argTypes : {
    sogiClick: { action: 'sogiClick' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<SogiComponent>;

/** Single SOGI badge — no configurable props. */
export const Default: Story = {};

/** Shown against a white background to appreciate the gradient. */
export const OnWhiteBackground: Story = {
  name      : 'On White Background',
  parameters: {
    backgrounds: { default: 'white' },
  },
};

/** Shown in context with other patient-info badges. */
export const InContext: Story = {
  name  : 'In Context',
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;background:#f5f5f5;padding:8px;border-radius:4px;">
        <span style="font-size:12px;color:#333;">Patient flags:</span>
        <ds-sogi></ds-sogi>
      </div>
    `,
  }),
};
