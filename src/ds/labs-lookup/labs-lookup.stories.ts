import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { LabsLookupComponent, LookupItem } from './labs-lookup.component';

const ITEMS: LookupItem[] = [
  { id: '1', label: 'Sample Item 1', meta: 'meta' },
  { id: '2', label: 'Sample Item 2', meta: 'meta' },
  { id: '3', label: 'Sample Item 3', meta: 'meta' },
];

const meta: Meta<LabsLookupComponent> = {
  title: 'Components/Labs DI Procedure Lookup',
  component: LabsLookupComponent,
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
  args: { label: 'Labs DI Procedure Lookup', placeholder: 'Search Labs DI Procedure Lookup', items: ITEMS, open: true, search: fn(), select: fn() },
};

export default meta;
type Story = StoryObj<LabsLookupComponent>;

export const Playground: Story = { name: 'Playground' };
