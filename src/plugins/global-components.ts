import { App } from 'vue';

import Badges from './../components/Badges/Badges.vue';
import BreadCrumbs from './../components/BreadCrumbs/BreadCrumbs.vue';
import Button from './../components/Button/Button.vue';
import Switch from './../components/Switch/Switch.vue';
import Dropdown from './../components/Dropdown/Dropdown.vue';
import Filter from './../components/Filter/Filter.vue';
import Icon from './../components/Icon/Icon.vue';
import Search from './../components/Search/Search.vue';
import Slider from './../components/Slider/Slider.vue';
import Table from './../components/Table/Table.vue';
import Toggle from './../components/Toggle/Toggle.vue';
import UserMenu from './../components/UserMenu/UserMenu.vue';

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
