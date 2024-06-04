import { StoryFn, Meta } from '@storybook/vue3';
import Menu from './Menu.vue';
import { StorybookControl } from '../../common/storybook';

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
  template: `<Menu v-bind="args" /> `
});

export const Default = Template.bind({});
