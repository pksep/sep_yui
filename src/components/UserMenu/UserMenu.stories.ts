import { StoryFn, Meta } from '@storybook/vue3';
import UserMenu from './UserMenu.vue';
import { StorybookControlEnum } from '../../common/storybook';

const meta = {
  title: 'UserMenu/UserMenu',
  component: UserMenu,
  argTypes: {
    name: {
      control: {
        type: StorybookControlEnum.text
      }
    },
    role: {
      control: {
        type: StorybookControlEnum.text
      }
    },
    avatar: {
      control: {
        type: StorybookControlEnum.text
      }
    },
    languages: {
      control: {
        type: StorybookControlEnum.boolean
      }
    }
  },
  tags: ['autodocs']
} as Meta<typeof UserMenu>;

export default meta;

const Template: StoryFn<typeof UserMenu> = args => ({
  components: { UserMenu },
  setup() {
    return { args };
  },
  template: `<UserMenu v-bind="args"/> `
});

export const Default = Template.bind({});
Default.args = {
  user: {
    name: 'David Perov',
    role: 'Администратор',
    avatar: '/default-avatar.jpg'
  },
  languages: {
    items: ['En', 'Ru']
  }
};
