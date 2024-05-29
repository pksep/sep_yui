import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

const piniaStore = createPinia();
const app = createApp(App);

app.use(piniaStore).mount('#app');
