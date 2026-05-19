import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { CptLookupComponent, LookupItem } from './cpt-lookup.component';

const ITEMS: LookupItem[] = [
  { id: '1', label: 'Sample Item 1', meta: 'meta' },
  { id: '2', label: 'Sample Item 2', meta: 'meta' },
  { id: '3', label: 'Sample Item 3', meta: 'meta' },
];

const meta: Meta<CptLookupComponent> = {
  title: 'Components/CPT Lookup',
  component: CptLookupComponent,
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
  args: { label: 'CPT Lookup', placeholder: 'Search CPT Lookup', items: ITEMS, open: true, search: fn(), select: fn() },
};

export default meta;
type Story = StoryObj<CptLookupComponent>;

export const Playground: Story = { name: 'Playground' };
