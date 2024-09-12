import { StoryFn } from '@storybook/vue3';
import DragAndDrop from './DragAndDrop.vue';
import { fn } from '@storybook/test';

const meta = {
  title: 'DragAndDrop/DragAndDrop',
  component: DragAndDrop,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Gray' }
  },
  args: { fileDropped: fn() }
};

export default meta;

const Template: StoryFn<typeof DragAndDrop> = args => ({
  components: { DragAndDrop },
  setup() {
    return { args };
  },
  template: `
      <div :style="{height: '50px', width: '30rem' }">
          <DragAndDrop v-bind="args" />
      </div>
    `
});

export const Default = Template.bind({});
