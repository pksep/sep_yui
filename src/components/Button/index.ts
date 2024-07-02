import { App, Plugin } from 'vue';
import Button from './Button.vue';

export default {
  install(Vue: App) {
    Vue.component('YButton', Button);
  }
} as Plugin;

export { Button as YButton };
