import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
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
          'Date picker grid matching the CODE-A-TON Library Figma spec.\n\n' +
          '- Single-date or range mode (`mode` input).\n' +
          '- Implements `ControlValueAccessor` so it binds to `formControlName`.\n' +
          '- Optional footer with Cancel/Apply buttons.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range'],
      table: { defaultValue: { summary: 'single' } },
    },
    showFooter: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    cancelLabel: { control: 'text' },
    applyLabel: { control: 'text' },
    dateSelect: { table: { category: 'Events' } },
    rangeSelect: { table: { category: 'Events' } },
    apply: { table: { category: 'Events' } },
    cancel: { table: { category: 'Events' } },
  },
  args: {
    mode: 'single',
    showFooter: false,
    dateSelect: fn(),
    rangeSelect: fn(),
    apply: fn(),
    cancel: fn(),
  },
};

export default meta;
type Story = StoryObj<CalendarComponent>;

export const Playground: Story = { name: 'Playground' };

export const SingleDate: Story = {
  name: 'Single date',
  args: { mode: 'single' },
};

export const RangeMode: Story = {
  name: 'Date range',
  args: { mode: 'range' },
};

export const WithFooter: Story = {
  name: 'With Cancel/Apply footer',
  args: { mode: 'single', showFooter: true },
};
