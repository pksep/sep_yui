import { App } from 'vue';

import * as VueToolsCore from '@vueuse/core';
declare const YLibrary: {
    install(app: App): void;
};
export default YLibrary;
export * from './components';
export * from '@floating-ui/vue';
export * from '@vueuse/components';
export { useSearch } from './extenstions/search';
export { VueToolsCore };
