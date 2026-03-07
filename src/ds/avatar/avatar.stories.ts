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
          'User avatar in three variants — **text** (initials), **image** (photo), and **dummy** (placeholder icon). ' +
          'Available in **sm** (32 px) and **lg** (72 px) sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      description: '`text` — shows initials · `image` — shows a photo · `dummy` — shows a placeholder person icon.',
      control: 'select',
      options: ['text', 'image', 'dummy'],
      table: { defaultValue: { summary: 'text' } },
    },
    size: {
      description: '`sm` = 32 px · `lg` = 72 px.',
      control: 'select',
      options: ['sm', 'lg'],
      table: { defaultValue: { summary: 'sm' } },
    },
    initials: {
      description: 'Initials displayed when variant is `text`. Keep to 2 characters.',
      control: 'text',
      table: { defaultValue: { summary: 'MN' } },
    },
    imageUrl: {
      description: 'Image URL displayed when variant is `image`.',
      control: 'text',
      table: { defaultValue: { summary: '' } },
    },
    imageAlt: {
      description: 'Accessible alt text for the avatar image.',
      control: 'text',
      table: { defaultValue: { summary: '' } },
    },
  },
  args: {
    variant: 'text',
    size: 'sm',
    initials: 'MN',
    imageUrl: SAMPLE_IMAGE,
    imageAlt: 'User avatar',
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: { description: { story: 'Use the Controls panel below to configure every prop interactively.' } },
  },
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'All variants and sizes side-by-side.' } },
  },
  render: () => ({
    props: { imageUrl: SAMPLE_IMAGE },
    template: `
      <div style="display:flex;gap:24px;align-items:flex-end;flex-wrap:wrap;padding:16px;border:1px solid #e1e1e1;border-radius:8px">
        <!-- Small -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <ds-avatar variant="text"  size="sm" initials="MN"></ds-avatar>
          <ds-avatar variant="image" size="sm" [imageUrl]="imageUrl" imageAlt="User"></ds-avatar>
          <ds-avatar variant="dummy" size="sm"></ds-avatar>
          <span style="font-size:11px;color:#969696">Small (32px)</span>
        </div>
        <!-- Large -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <ds-avatar variant="text"  size="lg" initials="MN"></ds-avatar>
          <ds-avatar variant="image" size="lg" [imageUrl]="imageUrl" imageAlt="User"></ds-avatar>
          <ds-avatar variant="dummy" size="lg"></ds-avatar>
          <span style="font-size:11px;color:#969696">Large (72px)</span>
        </div>
      </div>
    `,
  }),
};

// ─── Text ─────────────────────────────────────────────────────────────────────

export const Text: Story = {
  name: 'Text (Initials)',
  parameters: {
    docs: { description: { story: 'Displays user initials on a light gray background. Text color uses the `user` brand token.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-avatar variant="text" size="sm" initials="MN"></ds-avatar>
        <ds-avatar variant="text" size="lg" initials="MN"></ds-avatar>
      </div>
    `,
  }),
};

// ─── Image ────────────────────────────────────────────────────────────────────

export const Image: Story = {
  name: 'Image (Photo)',
  parameters: {
    docs: { description: { story: 'Renders a user photo cropped into a circle.' } },
  },
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

// ─── Dummy ────────────────────────────────────────────────────────────────────

export const Dummy: Story = {
  name: 'Dummy (Placeholder)',
  parameters: {
    docs: { description: { story: 'Placeholder shown when no image or initials are available.' } },
  },
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-avatar variant="dummy" size="sm"></ds-avatar>
        <ds-avatar variant="dummy" size="lg"></ds-avatar>
      </div>
    `,
  }),
};

// ─── Small ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  name: 'Small (32px)',
  render: () => ({
    props: { imageUrl: SAMPLE_IMAGE },
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <ds-avatar variant="text"  size="sm" initials="MN"></ds-avatar>
        <ds-avatar variant="image" size="sm" [imageUrl]="imageUrl" imageAlt="User"></ds-avatar>
        <ds-avatar variant="dummy" size="sm"></ds-avatar>
      </div>
    `,
  }),
};

// ─── Large ────────────────────────────────────────────────────────────────────

export const Large: Story = {
  name: 'Large (72px)',
  render: () => ({
    props: { imageUrl: SAMPLE_IMAGE },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ds-avatar variant="text"  size="lg" initials="MN"></ds-avatar>
        <ds-avatar variant="image" size="lg" [imageUrl]="imageUrl" imageAlt="User"></ds-avatar>
        <ds-avatar variant="dummy" size="lg"></ds-avatar>
      </div>
    `,
  }),
};
