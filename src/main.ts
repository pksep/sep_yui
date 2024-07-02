import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import globalComponents from './plugins/global-components';

const piniaStore = createPinia();
const app = createApp(App);

app.use(globalComponents);
app.use(piniaStore).mount('#app');
