import { App } from 'vue';
import Badges from './Badges/Badges.vue';
import BreadCrumbs from './BreadCrumbs/BreadCrumbs.vue';
import Button from './Button/Button.vue';
import Switch from './Switch/Switch.vue';
import Dropdown from './Dropdown/Dropdown.vue';
import Dialog from './Dialog/Dialog.vue';
import DragAndDrop from './DragAndDrop/DragAndDrop.vue';
import Card from './Card/Card.vue';
import Filter from './Filter/Filter.vue';
import Icon from './Icon/Icon.vue';
import Search from './Search/Search.vue';
import Slider from './Slider/Slider.vue';
import Toggle from './Toggle/Toggle.vue';
import Scroll from './Scrollbar/Scrollbar.vue';
import UserMenu from './UserMenu/UserMenu.vue';
import { createPinia } from 'pinia';

const components = {
  Badges,
  BreadCrumbs,
  Dialog,
  DragAndDrop,
  Card,
  Button,
  Switch,
  Dropdown,
  Filter,
  Icon,
  Scroll,
  Search,
  Slider,
  Toggle,
  UserMenu
};

const pinia = createPinia();

const install = (app: App): void => {
  app.use(pinia);
  Object.keys(components).forEach(key => {
    app.component('Y' + key, components[key as keyof typeof components]);
  });
};

export default {
  install
};

export {
  Badges,
  BreadCrumbs,
  Button,
  Dialog,
  Card,
  DragAndDrop,
  Switch,
  Dropdown,
  Filter,
  Icon,
  Search,
  Scroll,
  Slider,
  Toggle,
  UserMenu
};
