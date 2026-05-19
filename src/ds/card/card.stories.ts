import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CardComponent] })],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Card container — two flavors: **grouping** (passive shell) and **content** ' +
          '(header + meta + body + footer with optional checkbox, chip slot, and chevron). ' +
          'Selected state shows a cyan border and soft glow.',
      },
    },
  },
  argTypes: {
    variant: {
      description: '`grouping` — passive container · `content` — full header/body/footer card.',
      control: 'inline-radio',
      options: ['grouping', 'content'],
      table: { defaultValue: { summary: 'content' } },
    },
    state: {
      description: '`default` — grey border · `selected` — cyan border + glow.',
      control: 'inline-radio',
      options: ['default', 'selected'],
      table: { defaultValue: { summary: 'default' } },
    },
    title: { description: 'Header title text.' },
    subtitle: { description: 'Optional secondary header text appended after the title.' },
    showCheckbox: { description: 'Show a leading checkbox in the header.', control: 'boolean' },
    checked: { description: 'Checkbox value when shown.', control: 'boolean' },
    showChevron: { description: 'Show a trailing chevron-down in the header.', control: 'boolean' },
    hoverable: { description: 'Apply hover shadow + cursor.', control: 'boolean' },
    selectable: { description: 'Clicking the card toggles selected state.', control: 'boolean' },
    checkedChange: { action: 'checkedChange' },
    stateChange: { action: 'stateChange' },
    cardClick: { action: 'cardClick' },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Grouping: Story = {
  args: { variant: 'grouping', state: 'default' },
  render: (args) => ({
    props: args,
    template: `
      <ds-card [variant]="variant" [state]="state" [hoverable]="hoverable" [selectable]="selectable">
        <div style="width: 204px; height: 104px; background: #f7f7f7; border-radius: 8px;"></div>
      </ds-card>
    `,
  }),
};

export const PatientCard: Story = {
  args: {
    variant: 'content',
    state: 'default',
    title: 'TAYLOR, Michael',
    subtitle: '(38 yo M)',
    showCheckbox: true,
    showChevron: true,
    selectable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-card
        [variant]="variant"
        [state]="state"
        [title]="title"
        [subtitle]="subtitle"
        [showCheckbox]="showCheckbox"
        [showChevron]="showChevron"
        [selectable]="selectable"
      >
        <ng-template #dsCardChip>
          <span style="background: #f1fef8; color: #01562e; padding: 2px 8px; border-radius: 999px; font-size: 12px;">
            Chip Label
          </span>
        </ng-template>
        <ng-template #dsCardMeta>
          <span>{Meta data}</span>
          <span>{Meta data}</span>
          <span>{Meta data}</span>
        </ng-template>
        <ng-template #dsCardBody>
          <div style="height: 24px;"></div>
        </ng-template>
        <ng-template #dsCardFooter>
          <span class="ds-card__footer-label">{Date Label}</span>
          <span>MM/DD/YYYY at 00:00</span>
        </ng-template>
      </ds-card>
    `,
  }),
};

export const PatientSelected: Story = {
  args: { ...PatientCard.args, state: 'selected' },
  render: PatientCard.render,
};

export const GeneralCard: Story = {
  args: {
    variant: 'content',
    state: 'default',
    title: '{General Header}',
    showCheckbox: true,
    showChevron: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-card
        [variant]="variant"
        [state]="state"
        [title]="title"
        [showCheckbox]="showCheckbox"
        [showChevron]="showChevron"
      >
        <ng-template #dsCardChip>
          <span style="background: #f1fef8; color: #01562e; padding: 2px 8px; border-radius: 999px; font-size: 12px;">
            Chip Label
          </span>
        </ng-template>
        <ng-template #dsCardMeta>
          <span>{Meta data}</span>
          <span>{Meta data}</span>
          <span>{Meta data}</span>
        </ng-template>
        <ng-template #dsCardBody>
          <div style="height: 24px;"></div>
        </ng-template>
        <ng-template #dsCardFooter>
          <span class="ds-card__footer-label">{Date Label}</span>
          <span>MM/DD/YYYY at 00:00</span>
        </ng-template>
      </ds-card>
    `,
  }),
};
