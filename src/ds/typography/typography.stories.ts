import type { Meta, StoryObj } from '@storybook/angular';
import { TypographySpecimenComponent } from './typography-specimen.component';

const meta: Meta<TypographySpecimenComponent> = {
  title: 'Foundations/Typography',
  component: TypographySpecimenComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typography scale for the eClinicalWorks Design System. ' +
          '**Font family:** Open Sans (400 Regular, 600 SemiBold, 700 Bold). ' +
          'Apply styles using the CSS class names shown below — they match the Figma token names exactly.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TypographySpecimenComponent>;

export const TypeScale: Story = {
  name: 'Type Scale',
};
