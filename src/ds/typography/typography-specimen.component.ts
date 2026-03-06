import { Component } from '@angular/core';

export interface TypeStyle {
  label: string;
  className: string;
  fontSizePx: string;
  lineHeightPx: string;
  weight: string;
  isItalic: boolean;
}

@Component({
  selector: 'ds-typography-specimen',
  standalone: true,
  templateUrl: './typography-specimen.component.html',
  styleUrl: './typography-specimen.component.scss',
})
export class TypographySpecimenComponent {
  readonly typeStyles: TypeStyle[] = [
    {
      label: 'Heading / Patient Title',
      className: 'heading-patient-title',
      fontSizePx: '16px',
      lineHeightPx: '20px',
      weight: '700 Bold',
      isItalic: false,
    },
    {
      label: 'Heading / Modal Heading',
      className: 'heading-modal-heading',
      fontSizePx: '14px',
      lineHeightPx: '20px',
      weight: '700 Bold',
      isItalic: false,
    },
    {
      label: 'Text / Default / Regular',
      className: 'text-default-regular',
      fontSizePx: '12px',
      lineHeightPx: '16px',
      weight: '400 Regular',
      isItalic: false,
    },
    {
      label: 'Text / Default / SemiBold',
      className: 'text-default-semibold',
      fontSizePx: '12px',
      lineHeightPx: '16px',
      weight: '600 SemiBold',
      isItalic: false,
    },
    {
      label: 'Text / Default / Bold',
      className: 'text-default-bold',
      fontSizePx: '12px',
      lineHeightPx: '16px',
      weight: '700 Bold',
      isItalic: false,
    },
    {
      label: 'Text / Default / Italic',
      className: 'text-default-italic',
      fontSizePx: '12px',
      lineHeightPx: '16px',
      weight: '400 Regular',
      isItalic: true,
    },
    {
      label: 'Text / Default / Bold Italic',
      className: 'text-default-bolditalic',
      fontSizePx: '12px',
      lineHeightPx: '16px',
      weight: '700 Bold',
      isItalic: true,
    },
    {
      label: 'Text / Large / Regular',
      className: 'text-large-regular',
      fontSizePx: '14px',
      lineHeightPx: '20px',
      weight: '400 Regular',
      isItalic: false,
    },
    {
      label: 'Text / Large / SemiBold',
      className: 'text-large-semibold',
      fontSizePx: '14px',
      lineHeightPx: '20px',
      weight: '600 SemiBold',
      isItalic: false,
    },
    {
      label: 'Text / Large / Bold',
      className: 'text-large-bold',
      fontSizePx: '14px',
      lineHeightPx: '20px',
      weight: '700 Bold',
      isItalic: false,
    },
    {
      label: 'Text / Large / Italic',
      className: 'text-large-italic',
      fontSizePx: '14px',
      lineHeightPx: '20px',
      weight: '400 Regular',
      isItalic: true,
    },
    {
      label: 'Text / Large / Bold Italic',
      className: 'text-large-bolditalic',
      fontSizePx: '14px',
      lineHeightPx: '20px',
      weight: '700 Bold',
      isItalic: true,
    },
  ];
}
