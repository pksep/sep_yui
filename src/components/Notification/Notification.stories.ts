import type { StoryFn, Meta } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import { MessageTypeEnum } from './enum/enum';
import PushNotification from './Notification';
import Button from '../Button/Button';

const meta = {
  title: 'Notification/Notification',
  component: PushNotification,
  argTypes: {
    type: {
      control: { type: StorybookControlEnum.select },
      options: MessageTypeEnum
    },
    pushKey: {
      control: { type: StorybookControlEnum.number,
      min: 1,
      max: 10,
      step: 1
      }
    }
  },
  args: {
    description: 'Уведомляем о операции',
    pushKey: 1
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
    <template v-for="i in args.pushKey" :key="i">
        <Button :popovertarget="i"> Get push notification </Button>
            <PushNotification :pushKey="i" :type="args.type" :description="args.description" :style="{ width: '305px', 'margin-top': i*8+'vh'}" />
    </template>
    </div>
  `
});

export const NotificationInfo = Template.bind({});
NotificationInfo.args = {
  type: MessageTypeEnum.info
};

export const NotificationError = Template.bind({});
NotificationError.args = {
  type: MessageTypeEnum.error,
  description: 'Ошибка операции'
};

export const NotificationWarning = Template.bind({});
NotificationWarning.args = {
  type: MessageTypeEnum.warning,
  description: 'Возможно, в следующий раз не сработает'
};

export const NotificationSuccess = Template.bind({});
NotificationSuccess.args = {
  type: MessageTypeEnum.success,
  description: 'Файл успешно добавлен в архив'
};
