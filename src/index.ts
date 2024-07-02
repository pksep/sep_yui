import { App, Plugin } from 'vue';
import * as components from './components';
import './styles/index.scss';

const YLibrary = {
  install(app: App) {
    for (const componentKey in components) {
      const component = components[
        componentKey as keyof typeof components
      ] as unknown as Plugin;
      app.use(component);
    }
  }
};

export default YLibrary;
export * from './components';
