import { Meta, StoryObj } from '@storybook/angular';
import {
  HealowConnectComponent,
  HealowConnectState,
} from './healow-connect.component';

const meta: Meta<HealowConnectComponent> = {
  title    : 'Design System/Button/Healow Connect',
  component: HealowConnectComponent,
  tags     : ['autodocs'],
  argTypes : {
    state: {
      control : 'select',
      options : [
        'default',
        'call-in-progress',
        'call-in-progress-hover',
        'disabled',
        'call-in-progress-disabled',
      ] satisfies HealowConnectState[],
      description: 'Visual state of the button.',
    },
    connectClick: { action: 'connectClick' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<HealowConnectComponent>;

export const Default: Story = {
  args: { state: 'default' },
};

export const CallInProgress: Story = {
  name: 'Call In Progress',
  args: { state: 'call-in-progress' },
};

export const CallInProgressHover: Story = {
  name: 'Call In Progress — Hover',
  args: { state: 'call-in-progress-hover' },
};

export const Disabled: Story = {
  args: { state: 'disabled' },
};

export const CallInProgressDisabled: Story = {
  name: 'Call In Progress — Disabled',
  args: { state: 'call-in-progress-disabled' },
};

/** All states rendered side-by-side */
export const AllStates: Story = {
  name  : 'All States',
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <ds-healow-connect state="default"></ds-healow-connect>
        <ds-healow-connect state="call-in-progress"></ds-healow-connect>
        <ds-healow-connect state="call-in-progress-hover"></ds-healow-connect>
        <ds-healow-connect state="disabled"></ds-healow-connect>
        <ds-healow-connect state="call-in-progress-disabled"></ds-healow-connect>
      </div>
    `,
  }),
};
