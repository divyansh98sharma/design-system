import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarVariant = 'text' | 'image' | 'dummy';
export type AvatarSize = 'sm' | 'lg';

@Component({
  selector: 'ds-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() variant: AvatarVariant = 'text';
  @Input() size: AvatarSize = 'sm';
  @Input() initials = 'KR';
  @Input() imageUrl = '';
  @Input() imageAlt = '';

  get isText(): boolean { return this.variant === 'text'; }
  get isImage(): boolean { return this.variant === 'image'; }
  get isDummy(): boolean { return this.variant === 'dummy'; }

  get hostClass(): string {
    return [
      'ds-avatar',
      `ds-avatar--${this.size}`,
      `ds-avatar--${this.variant}`,
    ].join(' ');
  }

  get ariaLabel(): string | null {
    if (this.isImage) return this.imageAlt || 'User avatar';
    if (this.isText) return `User avatar, initials ${this.initials}`;
    return 'User avatar placeholder';
  }
}
