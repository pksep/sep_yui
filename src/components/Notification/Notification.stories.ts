import type { StoryFn, Meta } from '@storybook/vue3';
import PushNotification from './Notification';

const meta = {
  title: 'Notification/Notification',
  component: PushNotification,
  tags: ['autodocs']
} as Meta<typeof PushNotification>;

export default meta;

const Template: StoryFn<typeof PushNotification> = args => ({
  components: { PushNotification },
  setup() {
    return { args };
  },
  template: `
  <div :style="{ width: '305px', height: '77px' }">
    <PushNotification />
  </div>
  `
});

export const Default = Template.bind({});
