import type { Meta, StoryObj } from '@storybook/angular';
import { CalendarComponent } from './calendar.component';

const meta: Meta<CalendarComponent> = {
  title: 'Components/Calendar',
  component: CalendarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Date or date-range picker. Renders a labeled trigger that opens a popover ' +
          'containing the month grid, with optional **jump-to-date** shortcut panel ' +
          '(past / future quick ranges) and an optional time picker.',
      },
    },
  },
  argTypes: {
    mode: {
      description: '`single` — pick one date · `range` — pick start + end dates (renders two triggers).',
      control: 'inline-radio',
      options: ['single', 'range'],
      table: { defaultValue: { summary: 'single' } },
    },
    labelPosition: {
      description: '`top` — label above the trigger · `left` — label inline beside the trigger.',
      control: 'inline-radio',
      options: ['top', 'left'],
      table: { defaultValue: { summary: 'top' } },
    },
    label: { description: 'Trigger label (single mode).' },
    startLabel: { description: 'Trigger label for the start field (range mode).' },
    endLabel: { description: 'Trigger label for the end field (range mode).' },
    placeholder: { description: 'Placeholder shown when no date is set.' },
    withJumpToDate: {
      description: 'Show the side panel with quick-range shortcuts (Yesterday, Last Week, etc.).',
      control: 'boolean',
    },
    withTimePicker: {
      description: 'Reserved — append time picker controls to the popover.',
      control: 'boolean',
    },
    value: { control: false },
    rangeValue: { control: false },
    pastShortcuts: { control: false },
    futureShortcuts: { control: false },
    valueChange: { action: 'valueChange' },
    rangeChange: { action: 'rangeChange' },
  },
};

export default meta;
type Story = StoryObj<CalendarComponent>;

export const Single: Story = {
  args: {
    mode: 'single',
    labelPosition: 'top',
    label: 'Date',
    placeholder: 'MM/DD/YYYY',
    withJumpToDate: false,
  },
};

export const SingleWithShortcuts: Story = {
  args: {
    ...Single.args,
    withJumpToDate: true,
  },
};

export const SingleLabelLeft: Story = {
  args: {
    ...Single.args,
    labelPosition: 'left',
  },
};

export const Range: Story = {
  args: {
    mode: 'range',
    labelPosition: 'top',
    startLabel: 'From Date',
    endLabel: 'To Date',
    placeholder: 'MM/DD/YYYY',
    withJumpToDate: true,
  },
};
