import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

const ICONS = [
  'accessible','account-circle','account-settings','add','add-call','add-notes',
  'admin-panel-settings','ai-icon','alarm','arrow-down','arrow-left','arrow-right',
  'arrow-up','autorenew','barcode','barcode-scanner','block','cake','calendar-month',
  'call','call-end','call-merge','cancel','cardiologoy','caret-down','caret-left',
  'caret-right','caret-up','chat','check','checklist','chevron-down','chevron-left',
  'chevron-right','chevron-up','clinical-notes','close','confirmation-toast',
  'content-copy','content-paste','delete','delete-history','demography','dentist',
  'dialpad','download','drafts','drag-indiator','edit','edit-note','elderly-man',
  'elderly-woman','error','euro','eva','event-repeat','event-upcoming','family-group',
  'fast-forward','fast-rewind','favorite','fax','female','filter','fingerprint',
  'fingerprint-off','first-page','flight','folder','format-bold','format-color-text',
  'format-italic','format-underlined','forward','forward-10','franc','fullscreen',
  'fullscreen-exit','gridview','group','group-add','healow-insights','health-and-saftey',
  'help','history','home','inpatient','inventory','language','last-page','link',
  'link-off','lira','list','local-pharmacy','location','lock','lock-open','login',
  'logout','mail','male','man','manage-account','manage-account-1','manage-history',
  'medical-information','medical-mask','medication','menu','mic','mic-mute','mobile',
  'money','more-horizontal-dots','more-vert','notifications','open-in-new','oral-disease',
  'orthopedics','outpatient','pause','pending-actions','person','person-add',
  'person-add-disabled','person-check','person-edit','person-remove','person-search',
  'phone-forward','phone-in-talk','phone-missed','play-arrow','play-pause',
  'point-of-sale','pound','pregnant-woman','prescription','preview','preview-off',
  'priority-high','qr-code','qr-code-scanner','radiology','receipt','redo','referral',
  'refresh','remove','reorder','reorder-ascending','reorder-descending','replay-10',
  'reply','rheumatology','ribcage','ruble','rupee','schedule','school','search',
  'security','settings','skip-next','skip-previous','smart-forms','sort','speelcheck',
  'star-filled','star-unfilled','stethoscope','stop','sunoh','support-agent','surgical',
  'sync','sync-disabled','syringe','thumbs-down','thumbs-up','timer','transgender',
  'trend','troubleshoot','undo','update','update-disabled','upload','upload-file',
  'user-shield-orange','verified-user','visibility','visibility-off','volume-down',
  'volume-mute','volume-up','warning','woman','yen','yuan','zoom-in','zoom-out',
];

@Component({
  selector: 'ds-icon-gallery',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div style="padding: 24px;">
      <input
        type="text"
        placeholder="Search icons…"
        [(ngModel)]="search"
        style="width: 100%; max-width: 320px; padding: 8px 12px; margin-bottom: 24px;
               border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none;"
      />
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px;">
        @for (icon of filtered(); track icon) {
          <div
            style="display: flex; flex-direction: column; align-items: center; gap: 8px;
                   padding: 12px 8px; border: 1px solid #e5e7eb; border-radius: 8px;
                   cursor: pointer; transition: background 0.15s;"
            (mouseenter)="hovered = icon" (mouseleave)="hovered = ''"
            [style.background]="hovered === icon ? '#f3f4f6' : '#fff'"
            (click)="copy(icon)"
            [title]="'Click to copy: ' + icon"
          >
            <img [src]="'/icons/' + icon + '.svg'" [alt]="icon" width="24" height="24"
                 style="flex-shrink: 0;" />
            <span style="font-size: 10px; color: #6b7280; text-align: center;
                         word-break: break-word; line-height: 1.3;">
              {{ icon }}
            </span>
          </div>
        }
      </div>
      @if (copied) {
        <div style="position: fixed; bottom: 24px; right: 24px; background: #111827; color: #fff;
                    padding: 10px 16px; border-radius: 6px; font-size: 13px; z-index: 9999;">
          Copied "{{ copied }}"
        </div>
      }
      <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
        {{ filtered().length }} of {{ icons.length }} icons
      </p>
    </div>
  `,
})
class IconGalleryComponent {
  icons = ICONS;
  search = '';
  hovered = '';
  copied = '';

  filtered() {
    const q = this.search.toLowerCase();
    return q ? this.icons.filter(i => i.includes(q)) : this.icons;
  }

  copy(name: string) {
    navigator.clipboard.writeText(name).then(() => {
      this.copied = name;
      setTimeout(() => (this.copied = ''), 2000);
    });
  }
}

const meta: Meta = {
  title: 'Foundation/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'All available design-system icons. Click any icon to copy its name to the clipboard. ' +
          'Icons are served as static SVG files from `/icons/`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {
  name: 'Gallery',
  render: () => ({
    props: {},
    template: `<ds-icon-gallery></ds-icon-gallery>`,
    moduleMetadata: { imports: [IconGalleryComponent] },
  }),
};
