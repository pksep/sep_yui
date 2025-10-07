import { App, Plugin } from 'vue';
import * as components from './components';
import '@/assets/scss/_variables-native.scss';
import '@/assets/scss/blocks/table/_table.scss';
import vuePluginRemoveTestid from './helpers/vue-plugin-remove-testid';

const YLibrary = {
  install(app: App) {
    for (const componentKey in components) {
      const component = components[
        componentKey as keyof typeof components
      ] as unknown as Plugin;
      app.use(component).use(vuePluginRemoveTestid, { enabled: false });
    }
  }
};

export default YLibrary;
export * from './components';
export * from '@floating-ui/vue';
export { useSearch } from './extenstions/search';
