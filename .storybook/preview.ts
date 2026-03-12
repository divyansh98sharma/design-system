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
