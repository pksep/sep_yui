import { StoryFn, Meta } from '@storybook/vue3';
import UserMenu from './UserMenu.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { MenuTypeEnum } from './enum/enum';

const meta = {
  title: 'UserMenu/UserMenu',
  component: UserMenu,
  argTypes: {
    user: {
      control: { type: 'object' }
    },
    languages: {
      control: { type: 'object' }
    },
    categories: {
      control: { type: 'object' }
    },
    texts: {
      control: { type: 'object' }
    },
    categoryLabels: {
      control: { type: 'object' }
    },
    isBlackTheme: {
      control: {
        type: StorybookControlEnum.boolean
      }
    },
    closeAfterClick: {
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
  },
  categories: [
    MenuTypeEnum.profile,
    MenuTypeEnum.theme,
    MenuTypeEnum.options,
    MenuTypeEnum.exit
  ],
  texts: {
    [MenuTypeEnum.profile]: 'My Profile',
    [MenuTypeEnum.options]: 'Preferences'
  },
  isBlackTheme: false,
  closeAfterClick: true
};
