import { StoryFn, Meta } from '@storybook/vue3';
import Scrollbar from './Scrollbar.vue';

const meta = {
  title: 'Scrollbar/Scrollbar',
  component: scroll,
  argTypes: {
    thrumbStyle: {
      control: 'object',
      description: 'Custom style for the scrollbar thumb.'
    },
    railStyle: {
      control: 'object',
      description: 'Custom style for the scrollbar rail.'
    }
  },
  tags: ['autodocs']
} as Meta<typeof Scrollbar>;

export default meta;

const Template: StoryFn<typeof Scrollbar> = args => ({
  components: { Scrollbar },
  setup() {
    return { args };
  },
  template: `
    <Scrollbar
      style="width: 100px; height: 100px"
      :thrumbStyle="args.thrumbStyle"
      :railStyle="args.railStyle"
    >
      <div
        v-for="i of [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30
        ]"
        :key="i"
      >
        <span>new span{{ i }}</span>
      </div>
    </Scrollbar>
  `
});

export const Default = Template.bind({});

Default.args = {
  thrumbStyle: {
    y: {
      background: 'red'
    }
  },
  railStyle: {
    y: {
      background: 'black'
    }
  }
};
