import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import '@fontsource-variable/inter';
import '@fontsource/source-sans-pro';

const piniaStore = createPinia();
const app = createApp(App);

app.use(piniaStore).mount('#app');
