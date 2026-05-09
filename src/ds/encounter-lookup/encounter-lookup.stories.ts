import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { EncounterLookupComponent, LookupItem } from './encounter-lookup.component';

const ITEMS: LookupItem[] = [
  { id: '1', label: 'Sample Item 1', meta: 'meta' },
  { id: '2', label: 'Sample Item 2', meta: 'meta' },
  { id: '3', label: 'Sample Item 3', meta: 'meta' },
];

const meta: Meta<EncounterLookupComponent> = {
  title: 'Components/Encounter Lookup',
  component: EncounterLookupComponent,
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
  args: { label: 'Encounter Lookup', placeholder: 'Search Encounter Lookup', items: ITEMS, open: true, search: fn(), select: fn() },
};

export default meta;
type Story = StoryObj<EncounterLookupComponent>;

export const Playground: Story = { name: 'Playground' };
