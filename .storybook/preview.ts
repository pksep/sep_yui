import { type Preview, setup } from '@storybook/vue3';
import { type App } from 'vue';

import { createPinia } from 'pinia';

const pinia = createPinia();

setup((app: App) => {
  app.use(pinia);
});

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
