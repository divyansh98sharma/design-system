import { Component, Input } from '@angular/core';

export interface ColorSwatch {
  name: string;
  hex: string;
  cssVar: string;
}

export interface ColorGroup {
  name: string;
  swatches: ColorSwatch[];
}

@Component({
  selector: 'ds-color-palette',
  standalone: true,
  imports: [],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss',
})
export class ColorPaletteComponent {
  @Input() groups: ColorGroup[] = [];

  /** Returns true if the color is light enough to need a border for contrast. */
  isLight(hex: string): boolean {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 160;
  }
}
