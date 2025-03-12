import { App } from 'vue';
import Badges from './Badges/Badges.vue';
import BreadCrumbs from './BreadCrumbs/BreadCrumbs.vue';
import Button from './Button/Button.vue';
import Switch from './Switch/Switch.vue';
import Dropdown from './Select/Dropdown.vue';
import Calendar from './Calendar/Calendar.vue';
import Dialog from './Dialog/Dialog.vue';
import Accordion from './Accordion/Accordion.vue';
import DragAndDrop from './DragAndDrop/DragAndDrop.vue';
import Card from './Card/Card.vue';
import Filter from './Filter/Filter.vue';
import SelectFilter from './Select/Filter.vue';
import Combobox from './Select/Combobox.vue';
import SelectList from './Select/SelectList.vue';
import Icon from './Icon/Icon.vue';
import Input from './Input/Input.vue';
import InputNumber from './InputNumber/InputNumber.vue';
import Search from './Search/Search.vue';
import Slider from './Slider/Slider.vue';
import Toggle from './Toggle/Toggle.vue';
import Scroll from './Scrollbar/Scrollbar.vue';
import Modal from './Modal/ModalAnimated.vue';
import Checkbox from './Checkbox/Checkbox.vue';
import UserMenu from './UserMenu/UserMenu.vue';
import Textarea from './Textarea/Textarea.vue';
import Picture from './Picture/Picture.vue';
import PushNotification from './Notification/Notification.vue';
import { createPinia } from 'pinia';
import CopyIcon from '@/components/CopyIcon/CopyIcon.vue';
import Loader from '@/components/Loader/Loader.vue';
import FilterTag from '@/components/FilterTag/FilterTag.vue';
import CircularProgress from '@/components/CircularProgress/CircularProgress.vue';
import Popover from '@/components/Popover/Popover.vue';
import Table from '@/components/Table/Table.vue';
import TableRow from '@/components/Table/TableRow.vue';
import TableTd from '@/components/Table/TableTd.vue';
import TableTh from '@/components/Table/TableTh.vue';
import SectionTableRow from '@/components/Table/SectionTableRow.vue';
import HeadTableRow from '@/components/Table/HeadTableRow.vue';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue';
import Radio from '@/components/Radio/Radio.vue';
import Tooltip from '@/components/Tooltip/Tooltip.vue';

const components = {
  Accordion,
  Badges,
  BreadCrumbs,
  Dialog,
  DragAndDrop,
  Card,
  Combobox,
  Calendar,
  Button,
  Switch,
  SelectList,
  Dropdown,
  Textarea,
  Filter,
  SelectFilter,
  Icon,
  Input,
  InputNumber,
  PushNotification,
  Picture,
  Scroll,
  Search,
  Modal,
  Slider,
  Checkbox,
  Toggle,
  UserMenu,
  CopyIcon,
  Loader,
  FilterTag,
  CircularProgress,
  Popover,
  Table,
  TableRow,
  TableTd,
  TableTh,
  SectionTableRow,
  HeadTableRow,
  ScrollWrapper,
  Radio,
  Tooltip
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
  Calendar,
  DragAndDrop,
  Switch,
  SelectList,
  Dropdown,
  Textarea,
  Filter,
  Icon,
  Input,
  Combobox,
  InputNumber,
  Search,
  SelectFilter,
  PushNotification,
  Picture,
  Scroll,
  Modal,
  Slider,
  Checkbox,
  Toggle,
  UserMenu,
  CopyIcon,
  Loader,
  FilterTag,
  CircularProgress,
  Popover,
  Table,
  TableRow,
  TableTd,
  TableTh,
  SectionTableRow,
  HeadTableRow,
  ScrollWrapper,
  Radio,
  Tooltip
};
