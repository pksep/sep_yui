import { StoryFn, Meta } from '@storybook/vue3';
import UserMenu from './UserMenu.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { userEvent, within } from '@storybook/test';
import { action } from '@storybook/addon-actions';

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
    path: {
      control: {
        type: StorybookControlEnum.text
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
  onClick: action('click'),
  onThemeChange: action('themeChange'),
  onLanguageSwitch: action('languageSwitch'),
  name: 'David Perov',
  role: 'admin',
  path: 'https://bogatyr.club/uploads/posts/2023-06/1686903015_bogatyr-club-p-derevo-na-fone-rassveta-instagram-45.jpg'
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttonOpen = canvas.getByRole('button');

  await userEvent.click(buttonOpen);
  await userEvent.click(buttonOpen, {
    delay: 5000
  });
};
