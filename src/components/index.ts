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
import BaseFilter from '@/components/Select/BaseFilter.vue';
import Range from '@/components/Range/Range.vue';
import TableNew from '@/components/Table/TableNew.vue';
import TableRowNew from '@/components/Table/TableRowNew.vue';
import HeadTableRowNew from '@/components/Table/HeadTableRowNew.vue';
import ScrollWrapperNew from '@/components/ScrollWrapper/ScrollWrapperNew.vue';
import TableSimple from '@/components/Table/TableSimple.vue';
import Avatar from '@/components/Avatar/Avatar.vue';
import Tabs from './Tabs/Tabs.vue';
import ContentEditor from './ContentEditor/ContentEditor.vue';
import ModalCroppedAvatar from './Cropper/ModalCroppedAvatar.vue';
import TimePicker from './TimePicker/TimePicker.vue';

import vuePluginRemoveTestid from '@/helpers/vue-plugin-remove-testid';
import { getFirstTime, getLastTime } from './Calendar/date-utils';

import type { IRangeForDatePicker } from './Calendar/interfaces/interfaces';
import type { OptionsObject } from './Select/interface/interface';
import type { IDialogProps } from '@/components/Modal/interface/interface';
import type { IDataTestIdProp } from '@/common/dataTestidProps';
import { IconNameEnum } from './Icon/enum/enum';
import { SizesEnum } from '@/common/sizes';
import { ButtonTypeEnum } from './Button/enum/enum';
import { ColorsEnum } from '@/common/colors';
import { BadgesTypeEnum } from './Badges/enum/enum';
import { ImageExtensionsEnum, VideoExtensionsEnum } from '@/common/extentions';
import { InputTypeEnum } from './Input/enum/enum';
import { TextareaTypeEnum } from './Textarea/enum';
import { TextFieldEnum } from './Input/enum/enum';
import { CheckboxSizeEnum } from './Checkbox/enum/enum';
import { MenuTypeEnum } from './UserMenu/enum/enum';

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
  Icon,
  Input,
  InputNumber,
  Picture,

  PushNotification,
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
  TableNew,
  TableSimple,
  TableRow,
  TableRowNew,
  TableTd,
  TableTh,
  SectionTableRow,
  HeadTableRow,
  HeadTableRowNew,
  ScrollWrapper,
  ScrollWrapperNew,
  Radio,
  Tooltip,
  BaseFilter,
  Range,
  Tabs,
  ContentEditor,
  ModalCroppedAvatar,
  Avatar,
  TimePicker
};

const install = (app: App): void => {
  Object.keys(components).forEach(key => {
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
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
  TableSimple,
  TableNew,
  TableRow,
  TableRowNew,
  TableTd,
  TableTh,
  SectionTableRow,
  HeadTableRow,
  HeadTableRowNew,
  ScrollWrapper,
  Radio,
  Tooltip,
  BaseFilter,
  Range,
  Avatar,
  Tabs,
  ContentEditor,
  ModalCroppedAvatar,
  TimePicker,
  type IDialogProps,
  type IRangeForDatePicker,
  type OptionsObject,
  type IDataTestIdProp,
  CheckboxSizeEnum,
  TextFieldEnum,
  IconNameEnum,
  SizesEnum,
  ButtonTypeEnum,
  ColorsEnum,
  ImageExtensionsEnum,
  BadgesTypeEnum,
  VideoExtensionsEnum,
  InputTypeEnum,
  TextareaTypeEnum,
  MenuTypeEnum,
  getLastTime,
  getFirstTime,
  vuePluginRemoveTestid
};
