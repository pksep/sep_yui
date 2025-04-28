import type { App } from 'vue';

export default {
  install(app: App, options = { enabled: true }) {
    const isEnabled = options.enabled ?? import.meta.env.MODE !== 'production';

    if (!isEnabled) {
      console.info('[removeDataTestidPlugin] Plugin is disabled.');
      return;
    }

    const removeDataTestidAttributes = (element: Element) => {
      element.removeAttribute('data-testid');
      Array.from(element.children).forEach(removeDataTestidAttributes);
    };

    app.mixin({
      mounted() {
        removeDataTestidAttributes(this.$el);
      }
    });
  }
};
