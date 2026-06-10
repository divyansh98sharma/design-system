import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { FacilityLookupComponent, LookupItem } from './facility-lookup.component';

const ITEMS: LookupItem[] = [
  { id: '1', label: 'Sample Item 1', meta: 'meta' },
  { id: '2', label: 'Sample Item 2', meta: 'meta' },
  { id: '3', label: 'Sample Item 3', meta: 'meta' },
];

const meta: Meta<FacilityLookupComponent> = {
  title: 'Components/Facility Lookup',
  component: FacilityLookupComponent,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    items: { control: 'object' },
    open: { control: 'boolean' },
    search: { table: { category: 'Events' } },
    select: { table: { category: 'Events' } },
  },
  args: { label: 'Facility Lookup', placeholder: 'Search Facility Lookup', items: ITEMS, open: true, search: fn(), select: fn() },
};

export default meta;
type Story = StoryObj<FacilityLookupComponent>;

export const Playground: Story = { name: 'Playground' };
