import { StoryFn, Meta } from '@storybook/vue3';
import Menu from './Menu.vue';
import { StorybookControl } from '../../common/storybook';
import { userEvent, within } from '@storybook/test';

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
  args: {
    onClick: e => {
      return {
        type: e.type
      };
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
  template: `<Menu v-bind="args" @click="args.onClick"/> `
});

export const Default = Template.bind({});
Default.args = {
  onClick: event => {
    console.log('Clicked item type:', event.type);
  }
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const nameMenu = canvasElement.querySelector('.menu__name');
  const roleMenu = canvasElement.querySelector('.menu__role');
  const imageMenu = canvasElement.querySelector('.menu__avatar img');
  const buttonOpen = canvas.getByRole('button');

  roleMenu.textContent = 'admin';
  nameMenu.textContent = 'David Perov';
  imageMenu.src =
    'https://sportishka.com/uploads/posts/2023-12/1702131190_sportishka-com-p-krasivie-mesta-v-prirode-oboi-3.jpg';

  await userEvent.click(buttonOpen);
  await userEvent.click(buttonOpen, {
    delay: 5000
  });
};
