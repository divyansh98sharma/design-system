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
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'subtle', value: '#f7f7f7' },
        { name: 'dark', value: '#2d2d2d' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
