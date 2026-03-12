import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { TableComponent, TableColumn } from './table.component';

// ─── Shared demo data ─────────────────────────────────────────────────────────

const DEMO_COLUMNS: TableColumn[] = [
  { key: 'name',     label: 'Patient Name',   type: 'text',    sortable: true,  width: 180 },
  { key: 'dob',      label: 'Date of Birth',  type: 'date',    sortable: true,  width: 120 },
  { key: 'mrn',      label: 'MRN',            type: 'text',    sortable: false, width: 100 },
  { key: 'provider', label: 'Provider',       type: 'text',    sortable: true,  width: 160 },
  { key: 'status',   label: 'Status',         type: 'chip',    sortable: false, width: 110 },
  { key: 'balance',  label: 'Balance',        type: 'numeric', sortable: true,  width: 100 },
  { key: 'action',   label: 'Quick Action',   type: 'button',  sortable: false, width: 110 },
];

const DEMO_ROWS = Array.from({ length: 47 }, (_, i) => ({
  name:     `Patient ${i + 1}`,
  dob:      `${1940 + (i % 60)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  mrn:      `MRN${String(100000 + i).padStart(6, '0')}`,
  provider: ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'][i % 4],
  status:   ['Active', 'Inactive', 'Pending', 'Closed'][i % 4],
  balance:  `$${(Math.abs(Math.sin(i) * 1000)).toFixed(2)}`,
  action:   'View',
}));

// ─── Toolbar button helper component ─────────────────────────────────────────
@Component({
  selector: 'story-toolbar',
  standalone: true,
  template: `
    <div style="display:flex;gap:8px;align-items:center;" slot="toolbar-left">
      <button style="height:28px;padding:0 12px;font-size:12px;border:1px solid #0378a7;color:#0378a7;background:#fff;border-radius:4px;cursor:pointer;">
        Export
      </button>
      <button style="height:28px;padding:0 12px;font-size:12px;border:1px solid #0378a7;background:#0378a7;color:#fff;border-radius:4px;cursor:pointer;">
        + Add Row
      </button>
    </div>
    <div style="display:flex;gap:8px;align-items:center;" slot="toolbar-right">
      <button style="height:28px;padding:0 12px;font-size:12px;border:1px solid #bcbcbc;color:#4b4b4b;background:#fff;border-radius:4px;cursor:pointer;">
        Columns
      </button>
    </div>
  `,
})
class ToolbarComponent {}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<TableComponent> = {
  title: 'Design System/Table',
  component: TableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [ToolbarComponent] }),
  ],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    showCheckbox: { control: 'boolean' },
    showExpand:   { control: 'boolean' },
    showLock:     { control: 'boolean' },
    showActions:  { control: 'boolean' },
    page:         { control: 'number' },
    pageSize:     { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

// ─── Default ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    columns:      DEMO_COLUMNS,
    rows:         DEMO_ROWS,
    showCheckbox: true,
    showExpand:   true,
    showLock:     false,
    showActions:  true,
    page:         1,
    pageSize:     10,
    pageSizeOptions: [10, 25, 50],
  },
};

// ─── No utility columns ───────────────────────────────────────────────────────
export const Minimal: Story = {
  name: 'Minimal (no utility columns)',
  args: {
    columns:      DEMO_COLUMNS,
    rows:         DEMO_ROWS.slice(0, 5),
    showCheckbox: false,
    showExpand:   false,
    showLock:     false,
    showActions:  false,
    page:         1,
    pageSize:     5,
  },
};

// ─── With lock column ─────────────────────────────────────────────────────────
export const WithLock: Story = {
  name: 'With Lock Column',
  args: {
    columns:      DEMO_COLUMNS,
    rows:         DEMO_ROWS.slice(0, 10),
    showCheckbox: true,
    showExpand:   true,
    showLock:     true,
    showActions:  true,
    page:         1,
    pageSize:     10,
  },
};

// ─── Empty state ──────────────────────────────────────────────────────────────
export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    columns:  DEMO_COLUMNS,
    rows:     [],
    page:     1,
    pageSize: 10,
  },
};

// ─── Many columns ─────────────────────────────────────────────────────────────
export const ManyColumns: Story = {
  name: 'Many Columns (horizontal scroll)',
  args: {
    columns: [
      ...DEMO_COLUMNS,
      { key: 'insurance',   label: 'Insurance',    type: 'text',    sortable: true,  width: 160 },
      { key: 'phone',       label: 'Phone',        type: 'text',    sortable: false, width: 120 },
      { key: 'email',       label: 'Email',        type: 'text',    sortable: false, width: 200 },
      { key: 'lastVisit',   label: 'Last Visit',   type: 'date',    sortable: true,  width: 120 },
      { key: 'nextAppt',    label: 'Next Appt',    type: 'date',    sortable: true,  width: 120 },
    ],
    rows: DEMO_ROWS.slice(0, 10).map((r, i) => ({
      ...r,
      insurance:  ['Aetna', 'BlueCross', 'Cigna', 'UnitedHealth'][i % 4],
      phone:      `(555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i * 7).padStart(4, '0')}`,
      email:      `patient${i + 1}@example.com`,
      lastVisit:  `2025-${String((i % 12) + 1).padStart(2, '0')}-15`,
      nextAppt:   `2026-${String((i % 12) + 1).padStart(2, '0')}-20`,
    })),
    showCheckbox: true,
    showExpand:   true,
    showActions:  true,
    page:         1,
    pageSize:     10,
  },
};

// ─── Sorted state ─────────────────────────────────────────────────────────────
export const SortedAscending: Story = {
  name: 'Pre-sorted: Name Ascending',
  args: {
    columns:       DEMO_COLUMNS,
    rows:          [...DEMO_ROWS].sort((a, b) => a.name.localeCompare(b.name)),
    sortKey:       'name',
    sortDirection: 'asc',
    page:          1,
    pageSize:      10,
  },
};
