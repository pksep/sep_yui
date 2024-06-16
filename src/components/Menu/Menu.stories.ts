import { StoryFn, Meta } from '@storybook/vue3';
import Menu from './Menu.vue';
import { StorybookControl } from '../../common/storybook';
import { userEvent, within } from '@storybook/test';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Menu/Menu',
  component: Menu,
  argTypes: {
    name: {
      control: {
        type: StorybookControl.text
      }
    },
    role: {
      control: {
        type: StorybookControl.text
      }
    },
    path: {
      control: {
        type: StorybookControl.text
      }
    }
  },
  tags: ['autodocs']
} as Meta<typeof Menu>;

export default meta;

const Template: StoryFn<typeof Menu> = args => ({
  components: { Menu },
  setup() {
    return { args };
  },
  template: `<Menu v-bind="args"/> `
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
