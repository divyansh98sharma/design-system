import type { Meta, StoryObj } from '@storybook/angular';
import { SideNavigationComponent, SideNavItem } from './side-navigation.component';

const DEMO_ITEMS: SideNavItem[] = [
  {
    key: 'problems',
    label: 'Problems',
    expanded: true,
    children: [
      { key: 'active', label: 'Active' },
      { key: 'chronic', label: 'Chronic' },
      { key: 'resolved', label: 'Resolved' },
    ],
  },
  {
    key: 'medications',
    label: 'Medications',
    children: [
      { key: 'current-meds', label: 'Current' },
      { key: 'past-meds', label: 'Past' },
    ],
  },
  { key: 'allergies', label: 'Allergies' },
  {
    key: 'vitals',
    label: 'Vitals',
    children: [
      { key: 'bp', label: 'Blood Pressure' },
      { key: 'bmi', label: 'BMI' },
      { key: 'temp', label: 'Temperature' },
      { key: 'weight', label: 'Weight' },
    ],
  },
  { key: 'labs', label: 'Lab Results' },
  { key: 'imaging', label: 'Imaging' },
  {
    key: 'encounters',
    label: 'Encounters',
    children: [
      { key: 'office-visits', label: 'Office Visits' },
      { key: 'telehealth', label: 'Telehealth' },
      { key: 'hospital', label: 'Hospital' },
    ],
  },
  { key: 'documents', label: 'Documents' },
  { key: 'immunizations', label: 'Immunizations' },
  { key: 'preventive-care', label: 'Preventive Care' },
];

const meta: Meta<SideNavigationComponent> = {
  title: 'Components/Side Navigation',
  component: SideNavigationComponent,
  tags: ['autodocs'],
  argTypes: {
    heading:           { control: 'text' },
    showSettings:      { control: 'boolean' },
    searchPlaceholder: { control: 'text' },
    activeKey:         { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SideNavigationComponent>;

// ─── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    heading:      'Chart Overview',
    showSettings: true,
    items:        DEMO_ITEMS,
    activeKey:    'active',
  },
};

// ─── No settings icon ─────────────────────────────────────────────────────────
export const NoSettings: Story = {
  name: 'Without Settings Icon',
  args: {
    heading:      'Sections',
    showSettings: false,
    items:        DEMO_ITEMS,
    activeKey:    '',
  },
};

// ─── All collapsed ────────────────────────────────────────────────────────────
export const AllCollapsed: Story = {
  args: {
    heading: 'Navigation',
    items: DEMO_ITEMS.map(i => ({ ...i, expanded: false })),
    activeKey: '',
  },
};

// ─── Flat list (no children) ──────────────────────────────────────────────────
export const FlatList: Story = {
  args: {
    heading: 'Quick Links',
    items: [
      { key: 'summary', label: 'Summary' },
      { key: 'history', label: 'Medical History' },
      { key: 'notes', label: 'Clinical Notes' },
      { key: 'orders', label: 'Orders' },
      { key: 'results', label: 'Results' },
      { key: 'billing', label: 'Billing' },
    ],
    activeKey: 'summary',
  },
};

// ─── Deep nesting ─────────────────────────────────────────────────────────────
export const DeepNesting: Story = {
  args: {
    heading: 'Deep Tree',
    items: [
      {
        key: 'l1',
        label: 'Level 1',
        expanded: true,
        children: [
          {
            key: 'l2',
            label: 'Level 2',
            expanded: true,
            children: [
              { key: 'l3a', label: 'Level 3 — Item A' },
              { key: 'l3b', label: 'Level 3 — Item B' },
            ],
          },
        ],
      },
    ],
    activeKey: 'l3a',
  },
};
