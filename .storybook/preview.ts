import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import theme from './theme';

setCompodocJson(docJson);

const preview: Preview = {
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
            'Getting Started',
            'Accessibility',
            'Contributing',
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
            'Button', ['*'],
            'Input Field',
            'Checkbox',
            'Radio Button',
            'Toggle',
            'Chip',
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
        dark: { name: 'dark', value: '#2d2d2d' }
      }
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
      value: 'white'
    }
  }
};

export default preview;
