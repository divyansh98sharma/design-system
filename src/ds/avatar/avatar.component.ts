import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avatar } from 'primeng/avatar';

export type AvatarVariant = 'text' | 'image' | 'dummy';
export type AvatarSize = 'sm' | 'lg';

@Component({
  selector: 'ds-avatar',
  standalone: true,
  imports: [CommonModule, Avatar],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  /** Display variant: `text` shows initials, `image` shows a photo, `dummy` shows a placeholder icon. */
  @Input() variant: AvatarVariant = 'text';

  /** Size: `sm` = 32 px, `lg` = 72 px. */
  @Input() size: AvatarSize = 'sm';

  /** Initials to display when variant is `text` (e.g. "MN"). Max 2 chars. */
  @Input() initials = 'MN';

  /** Image URL to display when variant is `image`. */
  @Input() imageUrl = '';

  /** Alt text for the image. */
  @Input() imageAlt = '';

  get isText(): boolean { return this.variant === 'text'; }
  get isImage(): boolean { return this.variant === 'image'; }
  get isDummy(): boolean { return this.variant === 'dummy'; }

  get hostClasses(): Record<string, boolean> {
    return {
      'ds-avatar': true,
      'ds-avatar--sm': this.size === 'sm',
      'ds-avatar--lg': this.size === 'lg',
      'ds-avatar--text': this.isText,
      'ds-avatar--image': this.isImage,
      'ds-avatar--dummy': this.isDummy,
    };
  }
}
