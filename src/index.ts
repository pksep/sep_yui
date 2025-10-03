import { App, Plugin } from 'vue';
import * as components from './components';
import '@/assets/scss/_variables-native.scss';
import '@/assets/scss/blocks/table/_table.scss';
import vuePluginRemoveTestid from './helpers/vue-plugin-remove-testid';
import { useSearchStore } from './stores/search';
import { createPinia } from 'pinia';

const YLibrary = {
  install(app: App) {
    const store = createPinia();
    for (const componentKey in components) {
      const component = components[
        componentKey as keyof typeof components
      ] as unknown as Plugin;
      app
        .use(store)
        .use(component)
        .use(vuePluginRemoveTestid, { enabled: false });
    }
  }
};

export default YLibrary;
export * from './components';
export { useSearchStore };
