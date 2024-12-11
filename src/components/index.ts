import { App } from 'vue';
import Badges from './Badges/Badges.vue';
import BreadCrumbs from './BreadCrumbs/BreadCrumbs.vue';
import Button from './Button/Button.vue';
import Switch from './Switch/Switch.vue';
import Dropdown from './Dropdown/Dropdown.vue';
import Dialog from './Dialog/Dialog.vue';
import Accordion from './Accordion/Accordion.vue';
import DragAndDrop from './DragAndDrop/DragAndDrop.vue';
import Card from './Card/Card.vue';
import Filter from './Filter/Filter.vue';
import Icon from './Icon/Icon.vue';
import Input from './Input/Input.vue';
import Search from './Search/Search.vue';
import Slider from './Slider/Slider.vue';
import Toggle from './Toggle/Toggle.vue';
import Scroll from './Scrollbar/Scrollbar.vue';
import Modal from './Modal/ModalAnimated.vue';
import Checkbox from './Checkbox/Checkbox.vue';
import UserMenu from './UserMenu/UserMenu.vue';
import Textarea from './Textarea/Textarea.vue';
import PushNotification from './Notification/Notification.vue';
import { createPinia } from 'pinia';
import CopyIcon from '@/components/CopyIcon/CopyIcon.vue';

const components = {
  Accordion,
  Badges,
  BreadCrumbs,
  Dialog,
  DragAndDrop,
  Card,
  Button,
  Switch,
  Dropdown,
  Textarea,
  Filter,
  Icon,
  Input,
  PushNotification,
  Scroll,
  Search,
  Modal,
  Slider,
  Checkbox,
  Toggle,
  UserMenu,
  CopyIcon
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
  Accordion,
  Badges,
  BreadCrumbs,
  Button,
  Dialog,
  Card,
  DragAndDrop,
  Switch,
  Dropdown,
  Textarea,
  Filter,
  Icon,
  Input,
  Search,
  PushNotification,
  Scroll,
  Modal,
  Slider,
  Checkbox,
  Toggle,
  UserMenu,
  CopyIcon
};
