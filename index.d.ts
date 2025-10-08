import { App } from 'vue';

declare const YLibrary: {
    install(app: App): void;
};
export default YLibrary;
export * from './components';
export { useSearch } from './extenstions/search';
