import type { StoryFn, Meta } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import { MessageTypes } from './enum/enum';
import PushNotification from './Notification';
import Button from '../Button/Button';

const meta = {
  title: 'Notification/Notification',
  component: PushNotification,
  argTypes: {
    messageType: {
      control: { type: StorybookControlEnum.select },
      options: MessageTypes
    }
  },
  args: {
    messageField: {
      description: 'Уведомляем о операции'
    },
    width: '305px'
  },
  tags: ['autodocs']
} as Meta<typeof PushNotification>;

export default meta;

const Template: StoryFn<typeof PushNotification> = args => ({
  components: { Button, PushNotification },
  setup() {
    return { args };
  },
  template: `
    <Button popovertarget="push-notify"> Get push notification </Button>
    <PushNotification v-bind="args"/>
  `
});

export const NotificationInfo = Template.bind({});
NotificationInfo.args = {
  messageType: MessageTypes.info
};

export const NotificationError = Template.bind({});
NotificationError.args = {
  messageType: MessageTypes.error,
  messageField: {
    description: 'Ошибка операции'
  }
};

export const NotificationWarning = Template.bind({});
NotificationWarning.args = {
  messageType: MessageTypes.warning,
  messageField: {
    description: 'Возможно, в следующий раз не сработает'
  }
};

export const NotificationSuccess = Template.bind({});
NotificationSuccess.args = {
  messageType: MessageTypes.success,
  messageField: {
    description: 'Файл успешно добавлен в архив'
  }
};
