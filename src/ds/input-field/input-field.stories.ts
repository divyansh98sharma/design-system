import type { Meta, StoryObj } from '@storybook/angular';
import { InputFieldComponent } from './input-field.component';

const meta: Meta<InputFieldComponent> = {
  title: 'Components/Input Field',
  component: InputFieldComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Underline-style input field matching the Figma spec. 24 px row with optional leading adornments (search, country code), native input, and any combination of trailing adornments (chips + overflow counter, inline-error warning, chevron, calendar, favorite, filter, "Me" assign-to-self, lookup dots, referral).\n\nImplements `ControlValueAccessor` — use with `ngModel` or reactive forms.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    required: { control: 'boolean' },
    showInfo: { control: 'boolean' },
    alignment: { control: 'select', options: ['vertical', 'horizontal'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    inputType: { control: 'select', options: ['text', 'email', 'number', 'search', 'tel', 'url'] },
    showSearchIcon: { control: 'boolean' },
    showCountryCode: { control: 'boolean' },
    countryCode: { control: 'text' },
    showChevron: { control: 'boolean' },
    showCalendar: { control: 'boolean' },
    showFavorite: { control: 'boolean' },
    showFilter: { control: 'boolean' },
    showReferral: { control: 'boolean' },
    showLookup: { control: 'boolean' },
    assignToSelf: { control: 'boolean' },
    assignToSelfLabel: { control: 'text' },
    chips: { control: 'object' },
    maxVisibleChips: { control: 'number' },
    supportText: { control: 'text' },
    errorText: { control: 'text' },
    showInlineErrorIcon: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    showLabel: true,
    required: false,
    showInfo: false,
    alignment: 'vertical',
    placeholder: 'Search',
    disabled: false,
    readonly: false,
    inputType: 'text',
    showSearchIcon: true,
    showCountryCode: false,
    countryCode: '+1',
    showChevron: false,
    showCalendar: false,
    showFavorite: false,
    showFilter: false,
    showReferral: false,
    showLookup: false,
    assignToSelf: false,
    assignToSelfLabel: 'Me',
    chips: [],
    maxVisibleChips: 1,
    supportText: '',
    errorText: '',
    showInlineErrorIcon: true,
  },
};

export default meta;
type Story = StoryObj<InputFieldComponent>;

export const Playground: Story = { name: 'Playground' };

export const Search: Story = {
  name: 'Search',
  args: { placeholder: 'Search', showSearchIcon: true },
};

export const WithChevron: Story = {
  name: 'Select with chevron',
  args: { placeholder: 'Choose option', showSearchIcon: false, showChevron: true },
};

export const MultiSelect: Story = {
  name: 'Multi-select with chips',
  parameters: {
    docs: {
      description: {
        story: 'Selected values shown as inline chips. Values beyond `maxVisibleChips` collapse into a `+N` counter.',
      },
    },
  },
  args: {
    placeholder: '',
    showSearchIcon: true,
    showChevron: true,
    maxVisibleChips: 1,
    chips: [
      { label: 'Chip Label' },
      { label: 'Option B' },
      { label: 'Option C' },
      { label: 'Option D' },
    ],
  },
};

export const CountryCode: Story = {
  name: 'Phone with country code',
  args: {
    label: 'Phone number',
    placeholder: '(555) 000-0000',
    showSearchIcon: false,
    showCountryCode: true,
    countryCode: '+1',
    inputType: 'tel',
  },
};

export const DatePicker: Story = {
  name: 'Date picker',
  args: {
    label: 'Date of birth',
    placeholder: 'MM / DD / YYYY',
    showSearchIcon: false,
    showCalendar: true,
  },
};

export const FavoriteFilter: Story = {
  name: 'Favorite + Filter',
  args: {
    label: 'Providers',
    placeholder: 'Search providers',
    showSearchIcon: true,
    showFilter: true,
    showFavorite: true,
  },
};

export const AssignToSelf: Story = {
  name: '"Me" assign-to-self',
  args: {
    label: 'Assigned to',
    placeholder: 'Search user',
    showSearchIcon: true,
    assignToSelf: true,
    showChevron: true,
  },
};

export const Required: Story = {
  name: 'Required + info',
  args: { required: true, showInfo: true },
};

export const WithError: Story = {
  name: 'Error state',
  args: {
    errorText: 'This field is required',
    placeholder: '',
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true, placeholder: 'Disabled field' },
};

export const Horizontal: Story = {
  name: 'Horizontal alignment',
  args: { alignment: 'horizontal', label: 'Patient ID', placeholder: 'Enter ID' },
};

export const AllAdornments: Story = {
  name: 'All adornments',
  parameters: {
    docs: { description: { story: 'Maximalist showcase — not a real-world configuration.' } },
  },
  args: {
    label: 'Kitchen sink',
    placeholder: 'Search',
    showSearchIcon: true,
    showFilter: true,
    showCalendar: true,
    showFavorite: true,
    showChevron: true,
    assignToSelf: true,
  },
};
