import { Meta, StoryObj } from '@storybook/angular';
import { WizardTabsComponent } from './wizard-tabs.component';
import { WizardTabTheme } from './tabs.types';

const TEN_STEPS = Array.from({ length: 10 }, (_, i) => ({
  key  : `step${i + 1}`,
  label: `Tab ${i + 1}`,
  required: i === 0 || i === 2,
}));

const FIVE_STEPS = [
  { key: 'step1', label: 'Patient Info',   required: true  },
  { key: 'step2', label: 'Insurance',      required: false },
  { key: 'step3', label: 'Clinical Notes', required: true  },
  { key: 'step4', label: 'Billing',        required: false },
  { key: 'step5', label: 'Review',         required: false },
];

const THEMES: WizardTabTheme[] = ['user', 'admin'];

const meta: Meta<WizardTabsComponent> = {
  title    : 'Design System/Tabs/Wizard Tabs',
  component: WizardTabsComponent,
  tags     : ['autodocs'],
  argTypes : {
    theme: {
      control : 'select',
      options : THEMES,
      description: 'Colour theme: user (blue) or admin (orange).',
    },
    activeStep : { control: 'text' },
    stepChange : { action: 'stepChange' },
  },
  parameters: {
    layout: 'fullscreen',
    docs  : { story: { height: '80px' } },
  },
};

export default meta;
type Story = StoryObj<WizardTabsComponent>;

export const UserTheme: Story = {
  name: 'Wizard — User Theme (10 steps)',
  args: {
    steps     : TEN_STEPS,
    activeStep: 'step1',
    theme     : 'user',
  },
};

export const AdminTheme: Story = {
  name: 'Wizard — Admin Theme (10 steps)',
  args: {
    steps     : TEN_STEPS,
    activeStep: 'step1',
    theme     : 'admin',
  },
};

export const UserFiveSteps: Story = {
  name: 'Wizard — User (5 steps, with required)',
  args: {
    steps     : FIVE_STEPS,
    activeStep: 'step1',
    theme     : 'user',
  },
};

export const AdminFiveSteps: Story = {
  name: 'Wizard — Admin (5 steps)',
  args: {
    steps     : FIVE_STEPS,
    activeStep: 'step1',
    theme     : 'admin',
  },
};

export const MiddleStepActive: Story = {
  name: 'Wizard — User (middle step active)',
  args: {
    steps     : FIVE_STEPS,
    activeStep: 'step3',
    theme     : 'user',
  },
};

export const BothThemes: Story = {
  name  : 'Wizard — Both Themes',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <ds-wizard-tabs [steps]="steps" activeStep="step1" theme="user"></ds-wizard-tabs>
        <ds-wizard-tabs [steps]="steps" activeStep="step1" theme="admin"></ds-wizard-tabs>
      </div>
    `,
    props: { steps: FIVE_STEPS },
  }),
};
