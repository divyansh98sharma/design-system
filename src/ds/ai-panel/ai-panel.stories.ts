import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { AiPanelComponent } from './ai-panel.component';
import { AiPanelSectionComponent } from './ai-panel-section.component';
import { AiPanelTileComponent } from './ai-panel-tile.component';
import { AI_PANEL_ICONS } from './ai-panel-icons';

const meta: Meta<AiPanelComponent> = {
  title: 'Components/AI Panel',
  component: AiPanelComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AiPanelSectionComponent, AiPanelTileComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'AI Insights panel — gradient header with sparkles icon, scrollable body for ' +
          'composed sections + tiles, and a footer toolbar of icon buttons. Compose body ' +
          'content with `<ds-ai-panel-section>` and `<ds-ai-panel-tile>`, or project ' +
          'arbitrary markup via the default slot.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'Title shown next to the AI sparkles icon.',
      control: 'text',
    },
    titleSuffix: {
      description: 'Suffix shown after `title` (e.g. "Insights").',
      control: 'text',
    },
    showAiIcon: {
      description: 'Show the leading AI sparkles icon.',
      control: 'boolean',
    },
    headerActions: {
      description: 'Right-aligned header action buttons.',
      control: false,
    },
    footerActions: {
      description: 'Footer toolbar buttons. Pass `[]` to hide the footer.',
      control: false,
    },
    headerActionClick: {
      description: 'Emits when a header action is clicked.',
      table: { category: 'Events' },
    },
    footerActionClick: {
      description: 'Emits when a footer action is clicked.',
      table: { category: 'Events' },
    },
  },
  args: {
    title: 'Patient',
    titleSuffix: 'Insights',
    showAiIcon: true,
  },
};

export default meta;
type Story = StoryObj<AiPanelComponent>;

const PANEL_HOST_STYLE = 'height:640px;display:flex;align-items:flex-start';

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — Full Insights',
  parameters: {
    docs: {
      description: {
        story:
          'Full panel mock — sparkles header, multiple collapsible sections containing ' +
          'tiles and inline actions, and the default footer toolbar.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="${PANEL_HOST_STYLE}">
        <ds-ai-panel>

          <ds-ai-panel-section title="Care Gaps">
            <ds-ai-panel-tile title="Annual Wellness Visit">
              Last completed 14 months ago. Schedule a follow-up to maintain
              preventive care continuity.
            </ds-ai-panel-tile>
            <ds-ai-panel-tile title="Lipid Panel">
              No results in the last 12 months. Recommended every 6 months for
              this patient cohort.
            </ds-ai-panel-tile>
          </ds-ai-panel-section>

          <ds-ai-panel-section title="Recent Vitals">
            <ds-ai-panel-tile>
              <strong>BP</strong> 132 / 84 mmHg · <strong>HR</strong> 78 bpm ·
              <strong>SpO₂</strong> 97% — recorded today at 9:42 AM.
            </ds-ai-panel-tile>
          </ds-ai-panel-section>

          <ds-ai-panel-section title="Suggested Orders">
            <ds-ai-panel-tile variant="placeholder" placeholderText="No suggestions yet"/>
          </ds-ai-panel-section>

        </ds-ai-panel>
      </div>
    `,
  }),
};

// ─── Empty body ───────────────────────────────────────────────────────────────

export const EmptyBody: Story = {
  name: 'Empty Body',
  parameters: {
    docs: {
      description: {
        story:
          'Panel with no projected sections — the body collapses to the configured ' +
          'gap and the footer remains visible.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="${PANEL_HOST_STYLE}">
        <ds-ai-panel></ds-ai-panel>
      </div>
    `,
  }),
};

// ─── Collapsed sections ───────────────────────────────────────────────────────

export const CollapsedSections: Story = {
  name: 'Collapsed Sections',
  parameters: {
    docs: {
      description: {
        story:
          'Sections opened/closed via the chevron header. The header is a `<button>` ' +
          'so keyboard users can toggle each section with Enter/Space.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="${PANEL_HOST_STYLE}">
        <ds-ai-panel>
          <ds-ai-panel-section title="Open by default" [expanded]="true">
            <ds-ai-panel-tile>This section is expanded.</ds-ai-panel-tile>
          </ds-ai-panel-section>
          <ds-ai-panel-section title="Collapsed by default" [expanded]="false">
            <ds-ai-panel-tile>You won't see this until the chevron is clicked.</ds-ai-panel-tile>
          </ds-ai-panel-section>
        </ds-ai-panel>
      </div>
    `,
  }),
};

// ─── Inline section actions ───────────────────────────────────────────────────

const INLINE_ACTIONS_TEMPLATE = `
  <div style="${PANEL_HOST_STYLE}">
    <ds-ai-panel [headerActions]="headerActions" [footerActions]="[]">

      <ds-ai-panel-section
        title="Risk Factors"
        [actions]="[{ kind: 'icon', iconPath: openInNew, label: 'Open in new' }]"
      >
        <ds-ai-panel-tile>Hypertension stage 1, family history of CAD.</ds-ai-panel-tile>
      </ds-ai-panel-section>

      <ds-ai-panel-section
        title="Medications"
        [actions]="[{ kind: 'text', label: 'View all' }]"
      >
        <ds-ai-panel-tile
          title="Lisinopril 10 mg"
          [actions]="[{ kind: 'button', label: 'Refill', iconPath: arrowForward, iconPosition: 'trailing' }]"
        >
          1 tablet daily, last dispensed 22 days ago.
        </ds-ai-panel-tile>
      </ds-ai-panel-section>

    </ds-ai-panel>
  </div>
`;

export const InlineActions: Story = {
  name: 'Inline Section & Tile Actions',
  parameters: {
    docs: {
      description: {
        story:
          'Sections and tiles each accept inline `actions` of three kinds: `icon`, ' +
          '`text`, and `button` (with optional leading or trailing icon). Header ' +
          'click toggling is suppressed when an inline action is clicked.',
      },
    },
  },
  render: () => ({
    props: {
      headerActions: [
        { iconPath: AI_PANEL_ICONS.refresh, label: 'Refresh' },
        { iconPath: AI_PANEL_ICONS.openInNew, label: 'Open in new tab' },
      ],
      openInNew: AI_PANEL_ICONS.openInNew,
      arrowForward: AI_PANEL_ICONS.arrowForward,
    },
    template: INLINE_ACTIONS_TEMPLATE,
  }),
};

// ─── No footer ────────────────────────────────────────────────────────────────

export const NoFooter: Story = {
  name: 'No Footer',
  parameters: {
    docs: {
      description: {
        story:
          'Pass `[footerActions]="[]"` to hide the footer entirely — useful when the ' +
          'panel is embedded inside another shell that already provides actions.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="${PANEL_HOST_STYLE}">
        <ds-ai-panel [footerActions]="[]">
          <ds-ai-panel-section title="Notes">
            <ds-ai-panel-tile>Embedded mode: no footer toolbar.</ds-ai-panel-tile>
          </ds-ai-panel-section>
        </ds-ai-panel>
      </div>
    `,
  }),
};

// ─── Custom header & footer ───────────────────────────────────────────────────

const CUSTOM_ACTIONS_TEMPLATE = `
  <div style="${PANEL_HOST_STYLE}">
    <ds-ai-panel
      title="Encounter"
      titleSuffix="Summary"
      [headerActions]="headerActions"
      [footerActions]="footerActions"
    >
      <ds-ai-panel-section title="Chief Complaint">
        <ds-ai-panel-tile>Cough and shortness of breath for 3 days.</ds-ai-panel-tile>
      </ds-ai-panel-section>
    </ds-ai-panel>
  </div>
`;

export const CustomActions: Story = {
  name: 'Custom Header & Footer',
  parameters: {
    docs: {
      description: {
        story:
          'Override `headerActions` and `footerActions` with your own `AiPanelAction[]`. ' +
          'Each action is a 24×24 icon button — supply `iconPath` and an accessible `label`.',
      },
    },
  },
  render: () => ({
    props: {
      headerActions: [
        { iconPath: AI_PANEL_ICONS.help, label: 'Help' },
        { iconPath: AI_PANEL_ICONS.openInNew, label: 'Open in new tab' },
      ],
      footerActions: [
        { iconPath: AI_PANEL_ICONS.person, label: 'Patient' },
        { iconPath: AI_PANEL_ICONS.list, label: 'Encounters' },
        { iconPath: AI_PANEL_ICONS.openInNew, label: 'Pop out' },
      ],
    },
    template: CUSTOM_ACTIONS_TEMPLATE,
  }),
};

// ─── Scrollable body ──────────────────────────────────────────────────────────

export const ScrollableBody: Story = {
  name: 'Scrollable Body',
  parameters: {
    docs: {
      description: {
        story:
          'When body content exceeds the available height, the body region scrolls ' +
          'while the header and footer remain pinned.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="height:520px;display:flex;align-items:flex-start">
        <ds-ai-panel>
          <ds-ai-panel-section title="History of Present Illness">
            <ds-ai-panel-tile>Patient reports onset of symptoms 3 days ago.</ds-ai-panel-tile>
            <ds-ai-panel-tile>Symptoms include fever, fatigue, and dry cough.</ds-ai-panel-tile>
            <ds-ai-panel-tile>No known recent travel.</ds-ai-panel-tile>
          </ds-ai-panel-section>

          <ds-ai-panel-section title="Past Medical History">
            <ds-ai-panel-tile>Hypertension — controlled.</ds-ai-panel-tile>
            <ds-ai-panel-tile>Type 2 diabetes — A1C 6.8.</ds-ai-panel-tile>
            <ds-ai-panel-tile>Mild persistent asthma.</ds-ai-panel-tile>
          </ds-ai-panel-section>

          <ds-ai-panel-section title="Family History">
            <ds-ai-panel-tile>Father — coronary artery disease.</ds-ai-panel-tile>
            <ds-ai-panel-tile>Mother — type 2 diabetes.</ds-ai-panel-tile>
          </ds-ai-panel-section>

          <ds-ai-panel-section title="Social History">
            <ds-ai-panel-tile>Non-smoker. Occasional alcohol use.</ds-ai-panel-tile>
            <ds-ai-panel-tile>Works in healthcare administration.</ds-ai-panel-tile>
          </ds-ai-panel-section>
        </ds-ai-panel>
      </div>
    `,
  }),
};
