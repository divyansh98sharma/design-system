import type { Meta, StoryObj } from '@storybook/angular';
import { LabelComponent } from './label.component';

const meta: Meta<LabelComponent> = {
  title: 'Components/Label',
  component: LabelComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Standalone label for form fields and filter rows. Inter Regular `#4b586b` text at 12/16 (default) or 14/20 (large), with optional red required asterisk, info icon, and caret-down affordance.\n\nUse `fixedWidth` in filter sections — text wraps inside a fixed 100 px width and truncates to two lines per Figma guidance.',
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
    size: { control: 'select', options: ['default', 'large'] },
    required: { control: 'boolean' },
    showInfo: { control: 'boolean' },
    showCaret: { control: 'boolean' },
    for: { control: 'text' },
    fixedWidth: { control: 'boolean' },
    infoTooltip: { control: 'text' },
    infoClick: { table: { category: 'Events' } },
    caretClick: { table: { category: 'Events' } },
  },
  args: {
    text: 'Label',
    size: 'default',
    required: false,
    showInfo: false,
    showCaret: false,
    for: null,
    fixedWidth: false,
    infoTooltip: '',
  },
};

export default meta;
type Story = StoryObj<LabelComponent>;

export const Playground: Story = { name: 'Playground' };

export const Default: Story = {
  name: 'Default',
  args: { text: 'Label' },
};

export const Required: Story = {
  name: 'Required',
  args: { text: 'First name', required: true },
};

export const WithInfo: Story = {
  name: 'With info icon',
  args: { text: 'Date of birth', required: true, showInfo: true, infoTooltip: 'Used to verify your identity.' },
};

export const WithCaret: Story = {
  name: 'With caret',
  args: { text: 'Sort by', showCaret: true },
};

export const Large: Story = {
  name: 'Large size',
  args: { text: 'Patient details', size: 'large' },
};

export const AllAffordances: Story = {
  name: 'Required + info + caret',
  args: {
    text: 'Assigned provider',
    required: true,
    showInfo: true,
    showCaret: true,
    infoTooltip: 'The clinician responsible for this patient.',
  },
};

export const FilterFixedWidth: Story = {
  name: 'Filter — fixed 100 px width',
  parameters: {
    docs: {
      description: {
        story: '`fixedWidth` applies the filter-row style — text wraps inside 100 px and truncates to two lines.',
      },
    },
  },
  args: {
    text: 'Primary diagnosis code description',
    fixedWidth: true,
  },
};

export const Matrix: Story = {
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display: grid; gap: 16px; align-items: start;">
        <ds-label text="Default"></ds-label>
        <ds-label text="Required" [required]="true"></ds-label>
        <ds-label text="With info" [showInfo]="true" infoTooltip="Info tooltip"></ds-label>
        <ds-label text="With caret" [showCaret]="true"></ds-label>
        <ds-label text="Everything" [required]="true" [showInfo]="true" [showCaret]="true"></ds-label>
        <ds-label text="Large variant" size="large"></ds-label>
        <ds-label text="A very long label that would otherwise overflow its filter column" [fixedWidth]="true"></ds-label>
      </div>
    `,
  }),
};
