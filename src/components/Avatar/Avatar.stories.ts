import { StoryFn, Meta } from '@storybook/vue3';
import Avatar from './Avatar.vue';

const meta = {
  title: 'Avatar/Avatar',
  component: Avatar,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof Avatar>;

export default meta;

const AvatarTemplate: StoryFn<typeof Avatar> = args => ({
  components: { Avatar },
  setup() {
    return { args };
  },
  template: `<Avatar v-bind="args" />`
});

export const AvatarInitials = AvatarTemplate.bind({});
AvatarInitials.args = {
  initials: 'Перов'
};

export const AvatarIcon = AvatarTemplate.bind({});
AvatarIcon.args = {
  isIcon: true
};

export const AvatarPicture = AvatarTemplate.bind({});
AvatarPicture.args = {
  url: '/default-avatar.jpg',
  alt: 'cat avatar'
};
