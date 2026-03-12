import type { Meta, StoryObj } from '@storybook/angular';
import { ColorPaletteComponent, ColorGroup } from './color-palette.component';

const meta: Meta<ColorPaletteComponent> = {
  title: 'Foundations/Color Palette',
  component: ColorPaletteComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Complete color palette derived from Figma variables. ' +
          'Each palette maps to CSS custom properties in the format `--color-<group>-<shade>`. ' +
          'Use **semantic tokens** (`--color-brand-primary`, `--color-status-error`, etc.) in components, ' +
          'not primitive tokens directly.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ColorPaletteComponent>;

// ─── Color group data ───────────────────────────────────────────────────────

const GLOBAL: ColorGroup = {
  name: 'Global',
  swatches: [
    { name: 'White',  hex: 'FFFFFF', cssVar: '--color-white' },
    { name: 'Black',  hex: '000000', cssVar: '--color-black' },
    { name: 'Hover',  hex: 'FBF3E6', cssVar: '--color-hover' },
    { name: 'Select', hex: 'F7E7CE', cssVar: '--color-select' },
  ],
};

const USER: ColorGroup = {
  name: 'User (Blue)',
  swatches: [
    { name: 'Base',     hex: '0378A7', cssVar: '--color-user-base' },
    { name: 'Base-5',   hex: 'F1FBFF', cssVar: '--color-user-5' },
    { name: 'Base-10',  hex: 'CDE4ED', cssVar: '--color-user-10' },
    { name: 'Base-20',  hex: 'ABD2E2', cssVar: '--color-user-20' },
    { name: 'Base-30',  hex: '81BBD3', cssVar: '--color-user-30' },
    { name: 'Base-40',  hex: '57A5C4', cssVar: '--color-user-40' },
    { name: 'Base-50',  hex: '2D8EB6', cssVar: '--color-user-50' },
    { name: 'Base-60',  hex: '03648B', cssVar: '--color-user-60' },
    { name: 'Base-70',  hex: '02506F', cssVar: '--color-user-70' },
    { name: 'Base-80',  hex: '023C54', cssVar: '--color-user-80' },
    { name: 'Base-90',  hex: '012837', cssVar: '--color-user-90' },
    { name: 'Base-100', hex: '011821', cssVar: '--color-user-100' },
  ],
};

const ADMIN: ColorGroup = {
  name: 'Admin (Orange)',
  swatches: [
    { name: 'Base',     hex: 'E88842', cssVar: '--color-admin-base' },
    { name: 'Base-5',   hex: 'FFF3EA', cssVar: '--color-admin-5' },
    { name: 'Base-10',  hex: 'FAE7D9', cssVar: '--color-admin-10' },
    { name: 'Base-20',  hex: 'F7D7C0', cssVar: '--color-admin-20' },
    { name: 'Base-30',  hex: 'F3C3A0', cssVar: '--color-admin-30' },
    { name: 'Base-40',  hex: 'F0B081', cssVar: '--color-admin-40' },
    { name: 'Base-50',  hex: 'EC9C62', cssVar: '--color-admin-50' },
    { name: 'Base-60',  hex: 'C17137', cssVar: '--color-admin-60' },
    { name: 'Base-70',  hex: '9B5B2C', cssVar: '--color-admin-70' },
    { name: 'Base-80',  hex: '744421', cssVar: '--color-admin-80' },
    { name: 'Base-90',  hex: '4D2D16', cssVar: '--color-admin-90' },
    { name: 'Base-100', hex: '2E1B0D', cssVar: '--color-admin-100' },
  ],
};

const SECONDARY: ColorGroup = {
  name: 'Secondary (Gray)',
  swatches: [
    { name: 'Base',     hex: 'E1E1E1', cssVar: '--color-secondary-base' },
    { name: 'Base-5',   hex: 'FBFBFB', cssVar: '--color-secondary-5' },
    { name: 'Base-10',  hex: 'F7F7F7', cssVar: '--color-secondary-10' },
    { name: 'Base-20',  hex: 'F5F5F5', cssVar: '--color-secondary-20' },
    { name: 'Base-30',  hex: 'F0F0F0', cssVar: '--color-secondary-30' },
    { name: 'Base-40',  hex: 'EBEBEB', cssVar: '--color-secondary-40' },
    { name: 'Base-50',  hex: 'E6E6E6', cssVar: '--color-secondary-50' },
    { name: 'Base-60',  hex: 'BCBCBC', cssVar: '--color-secondary-60' },
    { name: 'Base-70',  hex: '969696', cssVar: '--color-secondary-70' },
    { name: 'Base-80',  hex: '717171', cssVar: '--color-secondary-80' },
    { name: 'Base-90',  hex: '4B4B4B', cssVar: '--color-secondary-90' },
    { name: 'Base-100', hex: '2D2D2D', cssVar: '--color-secondary-100' },
  ],
};

const WARNING: ColorGroup = {
  name: 'Warning (Yellow)',
  swatches: [
    { name: 'Base',     hex: 'FBCE2A', cssVar: '--color-warning-base' },
    { name: 'Base-5',   hex: 'FFF9EB', cssVar: '--color-warning-5' },
    { name: 'Base-10',  hex: 'FEF5D4', cssVar: '--color-warning-10' },
    { name: 'Base-20',  hex: 'FEEFB8', cssVar: '--color-warning-20' },
    { name: 'Base-30',  hex: 'FDE795', cssVar: '--color-warning-30' },
    { name: 'Base-40',  hex: 'FCDE71', cssVar: '--color-warning-40' },
    { name: 'Base-50',  hex: 'FCD64E', cssVar: '--color-warning-50' },
    { name: 'Base-60',  hex: 'D1AC23', cssVar: '--color-warning-60' },
    { name: 'Base-70',  hex: 'A7891C', cssVar: '--color-warning-70' },
    { name: 'Base-80',  hex: '7E6715', cssVar: '--color-warning-80' },
    { name: 'Base-90',  hex: '54450E', cssVar: '--color-warning-90' },
    { name: 'Base-100', hex: '322908', cssVar: '--color-warning-100' },
  ],
};

const ERROR: ColorGroup = {
  name: 'Error (Red)',
  swatches: [
    { name: 'Base',     hex: 'D82727', cssVar: '--color-error-base' },
    { name: 'Base-5',   hex: 'FFEFEF', cssVar: '--color-error-5' },
    { name: 'Base-10',  hex: 'F7D4D4', cssVar: '--color-error-10' },
    { name: 'Base-20',  hex: 'F2B7B7', cssVar: '--color-error-20' },
    { name: 'Base-30',  hex: 'EC9393', cssVar: '--color-error-30' },
    { name: 'Base-40',  hex: 'E56F6F', cssVar: '--color-error-40' },
    { name: 'Base-50',  hex: 'DF4B4B', cssVar: '--color-error-50' },
    { name: 'Base-60',  hex: 'B42121', cssVar: '--color-error-60' },
    { name: 'Base-70',  hex: '901A1A', cssVar: '--color-error-70' },
    { name: 'Base-80',  hex: '6C1414', cssVar: '--color-error-80' },
    { name: 'Base-90',  hex: '480D0D', cssVar: '--color-error-90' },
    { name: 'Base-100', hex: '2B0808', cssVar: '--color-error-100' },
  ],
};

const GREEN: ColorGroup = {
  name: 'Green (Success)',
  swatches: [
    { name: 'Base',     hex: '018145', cssVar: '--color-green-base' },
    { name: 'Base-5',   hex: 'F1FEF8', cssVar: '--color-green-5' },
    { name: 'Base-10',  hex: 'CCE6DA', cssVar: '--color-green-10' },
    { name: 'Base-20',  hex: 'AAD5C1', cssVar: '--color-green-20' },
    { name: 'Base-30',  hex: '80C0A2', cssVar: '--color-green-30' },
    { name: 'Base-40',  hex: '56AB83', cssVar: '--color-green-40' },
    { name: 'Base-50',  hex: '2B9664', cssVar: '--color-green-50' },
    { name: 'Base-60',  hex: '016C3A', cssVar: '--color-green-60' },
    { name: 'Base-70',  hex: '01562E', cssVar: '--color-green-70' },
    { name: 'Base-80',  hex: '014123', cssVar: '--color-green-80' },
    { name: 'Base-90',  hex: '002B17', cssVar: '--color-green-90' },
    { name: 'Base-100', hex: '001A0E', cssVar: '--color-green-100' },
  ],
};

const AI: ColorGroup = {
  name: 'AI (Purple)',
  swatches: [
    { name: 'Base',     hex: '7D58DA', cssVar: '--color-ai-base' },
    { name: 'Base-5',   hex: 'F7F2FF', cssVar: '--color-ai-5' },
    { name: 'Base-10',  hex: 'E5DEF8', cssVar: '--color-ai-10' },
    { name: 'Base-20',  hex: 'D4C7F3', cssVar: '--color-ai-20' },
    { name: 'Base-30',  hex: 'BEABEC', cssVar: '--color-ai-30' },
    { name: 'Base-40',  hex: 'A890E6', cssVar: '--color-ai-40' },
    { name: 'Base-50',  hex: '9374E0', cssVar: '--color-ai-50' },
    { name: 'Base-60',  hex: '6849B6', cssVar: '--color-ai-60' },
    { name: 'Base-70',  hex: '533B91', cssVar: '--color-ai-70' },
    { name: 'Base-80',  hex: '3F2C6D', cssVar: '--color-ai-80' },
    { name: 'Base-90',  hex: '2A1D49', cssVar: '--color-ai-90' },
    { name: 'Base-100', hex: '19122C', cssVar: '--color-ai-100' },
  ],
};

const SUNOH: ColorGroup = {
  name: 'Sunoh (Pink)',
  swatches: [
    { name: 'Base',     hex: 'FB2B66', cssVar: '--color-sunoh-base' },
    { name: 'Base-5',   hex: 'FFEBF0', cssVar: '--color-sunoh-5' },
    { name: 'Base-10',  hex: 'FED5E0', cssVar: '--color-sunoh-10' },
    { name: 'Base-20',  hex: 'FEB8CC', cssVar: '--color-sunoh-20' },
    { name: 'Base-30',  hex: 'FD95B3', cssVar: '--color-sunoh-30' },
    { name: 'Base-40',  hex: 'FC7299', cssVar: '--color-sunoh-40' },
    { name: 'Base-50',  hex: 'FC4E80', cssVar: '--color-sunoh-50' },
    { name: 'Base-60',  hex: 'D12455', cssVar: '--color-sunoh-60' },
    { name: 'Base-70',  hex: 'A71D44', cssVar: '--color-sunoh-70' },
    { name: 'Base-80',  hex: '7E1633', cssVar: '--color-sunoh-80' },
    { name: 'Base-90',  hex: '540E22', cssVar: '--color-sunoh-90' },
    { name: 'Base-100', hex: '320914', cssVar: '--color-sunoh-100' },
  ],
};

// ─── Stories ────────────────────────────────────────────────────────────────

export const AllColors: Story = {
  name: 'All Colors',
  args: { groups: [GLOBAL, USER, ADMIN, SECONDARY, WARNING, ERROR, GREEN, AI, SUNOH] },
};

export const BrandColors: Story = {
  name: 'Brand Colors',
  args: { groups: [USER, ADMIN] },
};

export const StatusColors: Story = {
  name: 'Status Colors',
  args: { groups: [GREEN, WARNING, ERROR] },
};

export const NeutralColors: Story = {
  name: 'Neutral & Global',
  args: { groups: [GLOBAL, SECONDARY] },
};

export const SpecialtyColors: Story = {
  name: 'Specialty (AI & Sunoh)',
  args: { groups: [AI, SUNOH] },
};
