import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const BODY_CONTENT = `
  <div style="padding:16px;font-family:'Inter',system-ui,sans-serif;font-size:12px;line-height:16px;color:#000">
    <p style="margin:0 0 12px">This is the modal body content area. It is fully scrollable when content exceeds the available height.</p>
    <p style="margin:0 0 12px">Use <code>&lt;ng-content&gt;</code> to project any content — forms, tables, data grids, or rich layouts — into this area.</p>
    <p style="margin:0">Project header action buttons via <code>[header-actions]</code> content slot.</p>
  </div>
`;

const LONG_BODY = `
  <div style="padding:16px;font-family:'Inter',system-ui,sans-serif;font-size:12px;line-height:16px;color:#000">
    ${Array(20).fill('<p style="margin:0 0 8px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>').join('')}
  </div>
`;

const meta: Meta<ModalComponent> = {
  title: 'Design System/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large', 'xlarge', 'xxlarge'] },
    heading: { control: 'text' },
    showDirtyFlag: { control: 'boolean' },
    showFloatingToolbar: { control: 'boolean' },
    showToolbarMore: { control: 'boolean' },
    showPatientIdentifier: { control: 'boolean' },
  },
  args: {
    size: 'large',
    heading: 'Modal Title',
    showDirtyFlag: false,
    showFloatingToolbar: false,
    showToolbarMore: true,
    showPatientIdentifier: false,
    footerLeftActions: [],
    footerRightActions: [
      { label: 'Save', variant: 'primary' },
      { label: 'Cancel', variant: 'secondary' },
    ],
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: { ...args, bodyHtml: BODY_CONTENT },
    template: `
      <ds-modal
        [size]="size"
        [heading]="heading"
        [showDirtyFlag]="showDirtyFlag"
        [showFloatingToolbar]="showFloatingToolbar"
        [toolbarItems]="toolbarItems"
        [showToolbarMore]="showToolbarMore"
        [showPatientIdentifier]="showPatientIdentifier"
        [patient]="patient"
        [headerButtons]="headerButtons"
        [footerLeftActions]="footerLeftActions"
        [footerRightActions]="footerRightActions"
      >
        <div [innerHTML]="bodyHtml"></div>
      </ds-modal>
    `,
  }),
};

const toolbarItems = [
  { id: 't1', label: 'Text' },
  { id: 't2', label: 'Text', active: true },
  { id: 't3', label: 'Text' },
  { id: 't4', label: 'Text' },
  { id: 't5', label: 'Text' },
];

const patient = {
  name: 'TAYLOR, Michael “Mikey”',
  demographics: '(38 yo M)',
  dob: '10/01/1987',
  accountNumber: '123456',
};

const headerButtons = [
  { id: 'info', label: 'INFO' },
  { id: 'hub', label: 'HUB' },
];

export const WithFloatingToolbar: Story = {
  name: 'With Floating Toolbar',
  args: {
    showFloatingToolbar: true,
    showPatientIdentifier: true,
    heading: 'Modal Title',
    footerLeftActions: [
      { label: 'Button', variant: 'secondary', showCaret: true },
      { label: 'Button', variant: 'secondary', showCaret: true },
      { label: 'Button', variant: 'secondary', showCaret: true },
      { label: 'Button', variant: 'secondary', showCaret: true },
    ],
    footerRightActions: [
      { label: 'Button', variant: 'primary', showCaret: true },
      { label: 'Button', variant: 'secondary', showCaret: true },
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      bodyHtml: BODY_CONTENT,
      toolbarItems,
      patient,
      headerButtons,
    },
    template: `
      <ds-modal
        [size]="size"
        [heading]="heading"
        [showFloatingToolbar]="showFloatingToolbar"
        [toolbarItems]="toolbarItems"
        [showPatientIdentifier]="showPatientIdentifier"
        [patient]="patient"
        [headerButtons]="headerButtons"
        [footerLeftActions]="footerLeftActions"
        [footerRightActions]="footerRightActions"
      >
        <div [innerHTML]="bodyHtml"></div>
      </ds-modal>
    `,
  }),
};

export const Simple: Story = {
  name: 'Simple (no toolbar / no patient)',
  args: {
    heading: 'Simple Modal',
    footerLeftActions: [{ label: 'Cancel', variant: 'secondary' }],
    footerRightActions: [{ label: 'Save', variant: 'primary' }],
  },
  render: (args) => ({
    props: { ...args, bodyHtml: BODY_CONTENT },
    template: `
      <ds-modal
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

export const Sizes: Story = {
  render: () => ({
    props: {
      bodyHtml: BODY_CONTENT,
      rightActions: [{ label: 'Save', variant: 'primary' }],
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px">
        <ds-modal size="small"  heading="Small"  [footerRightActions]="rightActions"><div [innerHTML]="bodyHtml"></div></ds-modal>
        <ds-modal size="medium" heading="Medium" [footerRightActions]="rightActions"><div [innerHTML]="bodyHtml"></div></ds-modal>
        <ds-modal size="large"  heading="Large"  [footerRightActions]="rightActions"><div [innerHTML]="bodyHtml"></div></ds-modal>
      </div>
    `,
  }),
};

export const ScrollableBody: Story = {
  name: 'Scrollable Body',
  args: { heading: 'Long Content' },
  render: (args) => ({
    props: { ...args, bodyHtml: LONG_BODY },
    template: `
      <ds-modal [size]="size" [heading]="heading"><div [innerHTML]="bodyHtml"></div></ds-modal>
    `,
  }),
};

export const WithDirtyFlag: Story = {
  name: 'With Dirty Flag',
  args: {
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
