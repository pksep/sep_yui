import { App } from 'vue';

import Badges from './Badges/Badges.vue';
import BreadCrumbs from './BreadCrumbs/BreadCrumbs.vue';
import Button from './Button/Button.vue';
import Switch from './Switch/Switch.vue';
import Dropdown from './Dropdown/Dropdown.vue';
import Filter from './Filter/Filter.vue';
import Icon from './Icon/Icon.vue';
import Search from './Search/Search.vue';
import Slider from './Slider/Slider.vue';
import Table from './Table/Table.vue';
import Toggle from './Toggle/Toggle.vue';
import UserMenu from './UserMenu/UserMenu.vue';

const components = {
  Badges,
  Button,
  Icon,
  Switch,
  BreadCrumbs,
  Dropdown,
  Filter,
  Search,
  Slider,
  Toggle,
  Table,
  UserMenu
};

export default {
  install(app: App) {
    Object.keys(components).forEach(key => {
      app.component(key, components[key as keyof typeof components]);
    });
  }
};
