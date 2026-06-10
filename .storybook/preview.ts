import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import theme from './theme';

setCompodocJson(docJson);

// ─── Deprecation banner ───────────────────────────────────────────────────────
// Injected into the canvas when a story has the 'deprecated' tag.

const DEPRECATION_BANNER = `
  <div style="
    display:flex;
    align-items:flex-start;
    gap:10px;
    background:#fff8e1;
    border-left:4px solid #f59e0b;
    border-radius:0 4px 4px 0;
    padding:10px 14px;
    margin-bottom:16px;
    font-family:sans-serif;
    font-size:13px;
    line-height:1.5;
    color:#78350f;
  ">
    <span style="font-size:16px;line-height:1.3">⚠</span>
    <span>
      <strong>Deprecated</strong> — this component is scheduled for removal in the
      next major version. See the component Changelog for the replacement and
      migration steps.
    </span>
  </div>
`;

// ─── Preview config ───────────────────────────────────────────────────────────

const preview: Preview = {
  decorators: [
    (storyFn: any, context: any) => {
      const story = storyFn();
      if (!context.tags?.includes('deprecated')) return story;

      // Wrap template-based stories; component-based stories fall through
      // (the Docs page description handles those — see policy page)
      if (typeof story.template === 'string') {
        return { ...story, template: DEPRECATION_BANNER + story.template };
      }
      return story;
    },
  ],

  parameters: {
    layout: 'padded',
    docs: {
      theme,
    },
    options: {
      storySort: {
        order: [
          // 1. Understand the system
          'Design System', [
            'Introduction',
            'Philosophy',
            'Accessibility',
            'Changelog',
          ],
          // 2. Design primitives
          'Foundations', [
            'Overview',
            'Color Palette',
            'Typography',
            'Icons',
          ],
          // 3. Atomic design layers (smallest → largest)
          'Atoms', [
            'Button', ['Playground', '*'],
            'Input Field',
            'Checkbox',
            'Radio Button',
            'Toggle',
            'Chip', ['Playground', '*', 'Changelog'],
            'Avatar',
            'Tooltip',
            'Info Tooltip',
            'Loader',
            'Scrollbar',
            '*',
          ],
          'Molecules', [
            'Disclaimer',
            'Notification',
            'Toast',
            'Popover',
            'Breadcrumb & Navigation',
            'Patient Info',
            'Toggle Button Group',
            '*',
          ],
          'Organisms', [
            'Top Nav',
            'Left Nav',
            'Side Navigation',
            'Tabs', ['Standard Tabs', 'Floating Tabs', 'Header Tabs', 'Wizard Tabs'],
            'Table',
            'Modal',
            '*',
          ],
          // 4. Composition layers
          'Templates', [
            'Overview',
            '*',
          ],
          'Pages', [
            'Overview',
            '*',
          ],
          '*',
        ],
      },
    },
    backgrounds: {
      options: {
        white: { name: 'white', value: '#ffffff' },
        subtle: { name: 'subtle', value: '#f7f7f7' },
        dark: { name: 'dark', value: '#2d2d2d' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs'],

  initialGlobals: {
    backgrounds: {
      value: 'white',
    },
  },
};

export default preview;
