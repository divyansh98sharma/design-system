import { Meta, StoryObj } from '@storybook/angular';
import { InputFieldComponent } from './input-field.component';

const meta: Meta<InputFieldComponent> = {
  title: 'Components/Input Field',
  component: InputFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    alignment: { control: 'radio', options: ['vertical', 'horizontal'] },
    label:       { control: 'text' },
    showLabel:   { control: 'boolean' },
    required:    { control: 'boolean' },
    showInfo:    { control: 'boolean' },
    placeholder: { control: 'text' },
    showSearchIcon: { control: 'boolean' },
    showChevron: { control: 'boolean' },
    supportText: { control: 'text' },
    errorText:   { control: 'text' },
    disabled:    { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<InputFieldComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    label:         'Label',
    showLabel:     true,
    required:      false,
    showInfo:      false,
    alignment:     'vertical',
    placeholder:   'Text',
    showSearchIcon: true,
    showChevron:   true,
    supportText:   '',
    errorText:     '',
    disabled:      false,
  },
};

// ─── Vertical (default) ───────────────────────────────────────────────────────
export const Vertical: Story = {
  name: 'Vertical — Default',
  args: {
    label:       'Search',
    placeholder: 'Type to search…',
    alignment:   'vertical',
    showSearchIcon: true,
    showChevron:    false,
  },
};

// ─── Horizontal ───────────────────────────────────────────────────────────────
export const Horizontal: Story = {
  name: 'Horizontal layout',
  args: {
    label:     'Filter',
    alignment: 'horizontal',
    placeholder: 'Select…',
    showSearchIcon: false,
    showChevron: true,
  },
};

// ─── Required ─────────────────────────────────────────────────────────────────
export const Required: Story = {
  args: {
    label:    'Email',
    required: true,
    showInfo: false,
    placeholder: 'Enter email address',
    showSearchIcon: false,
    showChevron:    false,
  },
};

// ─── With info icon ───────────────────────────────────────────────────────────
export const WithInfoIcon: Story = {
  args: {
    label:    'Date of Birth',
    required: true,
    showInfo: true,
    placeholder: 'MM/DD/YYYY',
    showSearchIcon: false,
    showChevron:    false,
  },
};

// ─── No label ─────────────────────────────────────────────────────────────────
export const NoLabel: Story = {
  args: {
    showLabel:   false,
    placeholder: 'Search patients…',
    showSearchIcon: true,
    showChevron:    false,
  },
};

// ─── Select / dropdown variant ────────────────────────────────────────────────
export const SelectVariant: Story = {
  name: 'Select (chevron-down)',
  args: {
    label:          'Provider',
    placeholder:    'Select provider',
    showSearchIcon: false,
    showChevron:    true,
  },
};

// ─── With support text ────────────────────────────────────────────────────────
export const WithSupportText: Story = {
  args: {
    label:       'Username',
    placeholder: 'Enter username',
    supportText: 'Must be at least 6 characters.',
    showSearchIcon: false,
    showChevron:    false,
  },
};

// ─── Error state ──────────────────────────────────────────────────────────────
export const ErrorState: Story = {
  args: {
    label:       'Email',
    placeholder: 'Enter email address',
    errorText:   'Please enter a valid email address.',
    showSearchIcon: false,
    showChevron:    false,
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label:       'Provider',
    placeholder: 'N/A',
    disabled:    true,
    showSearchIcon: false,
    showChevron:    true,
  },
};
