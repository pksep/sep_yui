import { StoryFn, Meta } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import Dialog from './Dialog.vue';
import Button from '@/components/Button/Button.vue';
import { action } from '@storybook/addon-actions';
import { userEvent, within } from '@storybook/test';

const meta = {
  title: 'Dialog/Dialog',
  component: Dialog,
  argTypes: {
    open: {
      control: { type: StorybookControlEnum.boolean },
      defaultValue: true
    }
  },
  args: {
    open: false
  },
  tags: ['autodocs']
} as Meta<typeof Dialog>;

export default meta;

const Template: StoryFn<typeof Dialog> = args => ({
  components: { Dialog, Button },
  setup() {
    return { args };
  },
  template: `
    <Button @click="args.open=true"> Open Dialog </Button>
    <Dialog v-bind="args" :open="args.open"  width="300px" height="300px" @close="args.open=false" />
  `
});

export const Default = Template.bind({});

Default.args = {
  onClick: action('click')
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const buttonOpen = canvas.getByRole('button');

  await userEvent.click(buttonOpen);
  await userEvent.click(buttonOpen, {
    delay: 5000
  });
};
