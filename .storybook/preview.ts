import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    rem: {
      // ...
      sizes: [
        { value: 6, title: 'Tiny' },
        { value: 12, title: 'Standard' },
        { value: 72, title: 'Huge' }
      ]
    },
    canvasRemPadding: true,
    docsRemPadding: true
  }
};

export default preview;
