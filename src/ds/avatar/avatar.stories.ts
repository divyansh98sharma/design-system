import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const SAMPLE_IMAGE = 'https://i.pravatar.cc/150?img=47';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'User avatar matching the CODE-A-TON Library Figma spec.\n\n' +
          '- **text** — initials on a terracotta background\n' +
          '- **image** — circular cropped photo\n' +
          '- **dummy** — gray placeholder with a generic person icon\n\n' +
          'Sizes: **sm** (32px) and **lg** (72px).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'image', 'dummy'],
      table: { defaultValue: { summary: 'text' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      table: { defaultValue: { summary: 'sm' } },
    },
    initials: { control: 'text', table: { defaultValue: { summary: 'KR' } } },
    imageUrl: { control: 'text' },
    imageAlt: { control: 'text' },
  },
  args: {
    variant: 'text',
    size: 'sm',
    initials: 'KR',
    imageUrl: SAMPLE_IMAGE,
    imageAlt: 'User avatar',
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Playground: Story = { name: 'Playground' };

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'All variants × sizes laid out as in Figma.' } },
  },
  render: () => ({
    props: { imageUrl: SAMPLE_IMAGE },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:16px;border:1px solid #e1e1e1;border-radius:8px">
        <div style="display:flex;gap:24px;align-items:center">
          <ds-avatar variant="text"  size="sm" initials="KR"></ds-avatar>
          <ds-avatar variant="image" size="sm" [imageUrl]="imageUrl" imageAlt="User"></ds-avatar>
          <ds-avatar variant="dummy" size="sm"></ds-avatar>
        </div>
        <div style="display:flex;gap:24px;align-items:center">
          <ds-avatar variant="text"  size="lg" initials="KR"></ds-avatar>
          <ds-avatar variant="image" size="lg" [imageUrl]="imageUrl" imageAlt="User"></ds-avatar>
          <ds-avatar variant="dummy" size="lg"></ds-avatar>
        </div>
      </div>
    `,
  }),
};

export const Text: Story = {
  name: 'Text (Initials)',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-avatar variant="text" size="sm" initials="KR"></ds-avatar>
        <ds-avatar variant="text" size="lg" initials="KR"></ds-avatar>
      </div>
    `,
  }),
};

export const Image: Story = {
  name: 'Image (Photo)',
  render: () => ({
    props: { imageUrl: SAMPLE_IMAGE },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-avatar variant="image" size="sm" [imageUrl]="imageUrl" imageAlt="User"></ds-avatar>
        <ds-avatar variant="image" size="lg" [imageUrl]="imageUrl" imageAlt="User"></ds-avatar>
      </div>
    `,
  }),
};

export const Dummy: Story = {
  name: 'Dummy (Placeholder)',
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-avatar variant="dummy" size="sm"></ds-avatar>
        <ds-avatar variant="dummy" size="lg"></ds-avatar>
      </div>
    `,
  }),
};
